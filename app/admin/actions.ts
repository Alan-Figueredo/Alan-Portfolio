"use server";

import { del, put } from "@vercel/blob";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { education, experiences, experienceTasks, mediaAssets, personalItems, projects, siteSettings, technologies } from "@/lib/db/schema";
import { SECTION_KEYS, type SectionKey } from "@/lib/db/queries";

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const optional = (data: FormData, key: string) => text(data, key) || null;
const number = (data: FormData, key: string) => Number(text(data, key) || 0);
const published = (data: FormData) => data.get("published") === "on";

function refreshPublicPages() {
  revalidatePath("/es");
  revalidatePath("/en");
  revalidatePath("/sitemap.xml");
  revalidatePath("/cv");
}

const reorderTables = {
  experience: experiences,
  projects,
  technologies,
  education,
} as const;

export async function reorderContentAction(kind: keyof typeof reorderTables, orderedIds: number[]) {
  await requireAdmin();
  const table = reorderTables[kind];
  if (!table || !Array.isArray(orderedIds) || orderedIds.some((id) => !Number.isInteger(id) || id <= 0)) throw new Error("Orden no válido.");
  for (const [index, id] of orderedIds.entries()) {
    await db.update(table).set({ sortOrder: index + 1 }).where(eq(table.id, id));
  }
  refreshPublicPages();
}

export async function saveSectionOrderAction(order: SectionKey[]) {
  await requireAdmin();
  const normalized = Array.isArray(order) ? order.filter((key): key is SectionKey => SECTION_KEYS.includes(key)) : [];
  if (normalized.length !== SECTION_KEYS.length || new Set(normalized).size !== SECTION_KEYS.length) throw new Error("Orden de secciones no válido.");
  await db.update(siteSettings).set({ sectionOrder: JSON.stringify(normalized) }).where(eq(siteSettings.id, 1));
  refreshPublicPages();
}

async function uploadFile(file: File | null, kind: "image" | "cv") {
  if (!file || file.size === 0) return null;
  const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  const valid = kind === "cv" ? file.type === "application/pdf" : imageTypes.includes(file.type);
  const limit = kind === "cv" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (!valid || file.size > limit) throw new Error(kind === "cv" ? "El CV debe ser un PDF de hasta 10 MB." : "La imagen debe ser JPEG, PNG, WebP o AVIF y pesar hasta 5 MB.");
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("Configura BLOB_READ_WRITE_TOKEN para subir archivos.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const blob = await put(`${kind}/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
  await db.insert(mediaAssets).values({ url: blob.url, pathname: blob.pathname, kind, createdAt: new Date().toISOString() });
  return blob.url;
}

async function deleteBlobIfUnused(url: string | null | undefined) {
  if (!url?.includes("blob.vercel-storage.com") || !process.env.BLOB_READ_WRITE_TOKEN) return;
  const [settingsAvatar, settingsCv, job, study, tech, project] = await Promise.all([
    db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.avatarUrl, url)),
    db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.cvUrl, url)),
    db.select({ id: experiences.id }).from(experiences).where(eq(experiences.imageUrl, url)),
    db.select({ id: education.id }).from(education).where(eq(education.imageUrl, url)),
    db.select({ id: technologies.id }).from(technologies).where(eq(technologies.imageUrl, url)),
    db.select({ id: projects.id }).from(projects).where(eq(projects.imageUrl, url)),
  ]);
  if ([settingsAvatar, settingsCv, job, study, tech, project].some((rows) => rows.length)) return;
  await del(url);
  await db.delete(mediaAssets).where(eq(mediaAssets.url, url));
}

const bilingual = z.object({ es: z.string().min(1), en: z.string().min(1) });
function validateBilingual(es: string, en: string, shouldPublish: boolean) {
  if (shouldPublish) bilingual.parse({ es, en });
}

export async function saveSettingsAction(data: FormData) {
  await requireAdmin();
  const [current] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  if (!current) throw new Error("Missing site settings");
  const avatar = await uploadFile(data.get("avatar") as File | null, "image");
  const cv = await uploadFile(data.get("cv") as File | null, "cv");
  const email = text(data, "email");
  const parsedEmail = email ? z.email().safeParse(email) : null;
  if (parsedEmail && !parsedEmail.success) throw new Error("El email del perfil no es válido.");
  const values = {
    name: text(data, "name"), eyebrowEs: text(data, "eyebrowEs"), eyebrowEn: text(data, "eyebrowEn"),
    headlineEs: text(data, "headlineEs"), headlineEn: text(data, "headlineEn"), aboutEs: text(data, "aboutEs"), aboutEn: text(data, "aboutEn"),
    locationEs: text(data, "locationEs"), locationEn: text(data, "locationEn"), availabilityEs: text(data, "availabilityEs"), availabilityEn: text(data, "availabilityEn"),
    email: email || current.email, whatsappUrl: text(data, "whatsappUrl"), githubUrl: text(data, "githubUrl"), linkedinUrl: text(data, "linkedinUrl"),
    avatarUrl: avatar ?? current.avatarUrl, cvUrl: cv ?? current.cvUrl, seoTitleEs: text(data, "seoTitleEs"), seoTitleEn: text(data, "seoTitleEn"),
    seoDescriptionEs: text(data, "seoDescriptionEs"), seoDescriptionEn: text(data, "seoDescriptionEn"),
  };
  validateBilingual(values.headlineEs, values.headlineEn, true);
  await db.update(siteSettings).set(values).where(eq(siteSettings.id, 1));
  await Promise.all([avatar ? deleteBlobIfUnused(current.avatarUrl) : null, cv ? deleteBlobIfUnused(current.cvUrl) : null]);
  refreshPublicPages();
}

export async function saveExperienceAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id");
  const isPublished = published(data);
  const roleEs = text(data, "roleEs"), roleEn = text(data, "roleEn");
  validateBilingual(roleEs, roleEn, isPublished);
  const [current] = id ? await db.select().from(experiences).where(eq(experiences.id, id)) : [];
  const image = await uploadFile(data.get("image") as File | null, "image");
  const values = { roleEs, roleEn, company: text(data, "company"), dateEs: text(data, "dateEs"), dateEn: text(data, "dateEn"), companyUrl: optional(data, "companyUrl"), imageUrl: image ?? current?.imageUrl ?? null, sortOrder: number(data, "sortOrder"), published: isPublished };
  if (id) await db.update(experiences).set(values).where(eq(experiences.id, id)); else await db.insert(experiences).values(values);
  if (image) await deleteBlobIfUnused(current?.imageUrl);
  refreshPublicPages();
}

export async function saveTaskAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id");
  const values = { experienceId: number(data, "experienceId"), textEs: text(data, "textEs"), textEn: text(data, "textEn"), sortOrder: number(data, "sortOrder") };
  bilingual.parse({ es: values.textEs, en: values.textEn });
  if (id) await db.update(experienceTasks).set(values).where(eq(experienceTasks.id, id)); else await db.insert(experienceTasks).values(values);
  refreshPublicPages();
}

export async function saveEducationAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id"), isPublished = published(data);
  const titleEs = text(data, "titleEs"), titleEn = text(data, "titleEn"); validateBilingual(titleEs, titleEn, isPublished);
  const [current] = id ? await db.select().from(education).where(eq(education.id, id)) : [];
  const image = await uploadFile(data.get("image") as File | null, "image");
  const values = { titleEs, titleEn, institution: text(data, "institution"), dateEs: text(data, "dateEs"), dateEn: text(data, "dateEn"), detailEs: optional(data, "detailEs"), detailEn: optional(data, "detailEn"), imageUrl: image ?? current?.imageUrl ?? null, institutionUrl: optional(data, "institutionUrl"), sortOrder: number(data, "sortOrder"), published: isPublished };
  if (id) await db.update(education).set(values).where(eq(education.id, id)); else await db.insert(education).values(values);
  if (image) await deleteBlobIfUnused(current?.imageUrl); refreshPublicPages();
}

export async function saveTechnologyAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id"), isPublished = published(data);
  const categoryEs = text(data, "categoryEs"), categoryEn = text(data, "categoryEn"); validateBilingual(categoryEs, categoryEn, isPublished);
  const [current] = id ? await db.select().from(technologies).where(eq(technologies.id, id)) : [];
  const image = await uploadFile(data.get("image") as File | null, "image");
  const values = { name: text(data, "name"), categoryEs, categoryEn, imageUrl: image ?? current?.imageUrl ?? null, sortOrder: number(data, "sortOrder"), published: isPublished };
  if (id) await db.update(technologies).set(values).where(eq(technologies.id, id)); else await db.insert(technologies).values(values);
  if (image) await deleteBlobIfUnused(current?.imageUrl); refreshPublicPages();
}

export async function saveProjectAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id"), isPublished = published(data);
  const descriptionEs = text(data, "descriptionEs"), descriptionEn = text(data, "descriptionEn"); validateBilingual(descriptionEs, descriptionEn, isPublished);
  const [current] = id ? await db.select().from(projects).where(eq(projects.id, id)) : [];
  const image = await uploadFile(data.get("image") as File | null, "image");
  const category = z.enum(["development", "ux"]).parse(text(data, "category"));
  const values = { title: text(data, "title"), descriptionEs, descriptionEn, category, imageUrl: image ?? current?.imageUrl ?? null, liveUrl: optional(data, "liveUrl"), sourceUrl: optional(data, "sourceUrl"), featured: data.get("featured") === "on", sortOrder: number(data, "sortOrder"), published: isPublished };
  if (id) await db.update(projects).set(values).where(eq(projects.id, id)); else await db.insert(projects).values(values);
  if (image) await deleteBlobIfUnused(current?.imageUrl); refreshPublicPages();
}

export async function savePersonalItemAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id"), isPublished = published(data);
  const labelEs = text(data, "labelEs"), labelEn = text(data, "labelEn"); validateBilingual(labelEs, labelEn, isPublished);
  const values = { type: z.enum(["language", "hobby"]).parse(text(data, "type")), labelEs, labelEn, detailEs: optional(data, "detailEs"), detailEn: optional(data, "detailEn"), sortOrder: number(data, "sortOrder"), published: isPublished };
  if (id) await db.update(personalItems).set(values).where(eq(personalItems.id, id)); else await db.insert(personalItems).values(values);
  refreshPublicPages();
}

export async function deleteContentAction(data: FormData) {
  await requireAdmin();
  const id = number(data, "id"); const kind = text(data, "kind"); let oldImage: string | null = null;
  if (kind === "experience") { const [row] = await db.select().from(experiences).where(eq(experiences.id, id)); oldImage = row?.imageUrl ?? null; await db.delete(experiences).where(eq(experiences.id, id)); }
  else if (kind === "task") await db.delete(experienceTasks).where(eq(experienceTasks.id, id));
  else if (kind === "education") { const [row] = await db.select().from(education).where(eq(education.id, id)); oldImage = row?.imageUrl ?? null; await db.delete(education).where(eq(education.id, id)); }
  else if (kind === "technology") { const [row] = await db.select().from(technologies).where(eq(technologies.id, id)); oldImage = row?.imageUrl ?? null; await db.delete(technologies).where(eq(technologies.id, id)); }
  else if (kind === "project") { const [row] = await db.select().from(projects).where(eq(projects.id, id)); oldImage = row?.imageUrl ?? null; await db.delete(projects).where(eq(projects.id, id)); }
  else if (kind === "personal") await db.delete(personalItems).where(eq(personalItems.id, id));
  await deleteBlobIfUnused(oldImage); refreshPublicPages();
}
