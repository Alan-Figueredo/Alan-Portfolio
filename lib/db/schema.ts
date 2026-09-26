import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const publishing = {
  sortOrder: integer("sort_order").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
};

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  eyebrowEs: text("eyebrow_es").notNull(),
  eyebrowEn: text("eyebrow_en").notNull(),
  headlineEs: text("headline_es").notNull(),
  headlineEn: text("headline_en").notNull(),
  aboutEs: text("about_es").notNull(),
  aboutEn: text("about_en").notNull(),
  locationEs: text("location_es").notNull(),
  locationEn: text("location_en").notNull(),
  availabilityEs: text("availability_es").notNull(),
  availabilityEn: text("availability_en").notNull(),
  email: text("email").notNull(),
  whatsappUrl: text("whatsapp_url").notNull(),
  githubUrl: text("github_url").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  cvUrl: text("cv_url"),
  seoTitleEs: text("seo_title_es").notNull(),
  seoTitleEn: text("seo_title_en").notNull(),
  seoDescriptionEs: text("seo_description_es").notNull(),
  seoDescriptionEn: text("seo_description_en").notNull(),
  sectionOrder: text("section_order").notNull().default("[\"experience\",\"projects\",\"technologies\",\"education\",\"personal\",\"contact\"]"),
});

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roleEs: text("role_es").notNull(),
  roleEn: text("role_en").notNull(),
  company: text("company").notNull(),
  dateEs: text("date_es").notNull(),
  dateEn: text("date_en").notNull(),
  imageUrl: text("image_url"),
  companyUrl: text("company_url"),
  ...publishing,
});

export const experienceTasks = sqliteTable("experience_tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  experienceId: integer("experience_id").notNull().references(() => experiences.id, { onDelete: "cascade" }),
  textEs: text("text_es").notNull(),
  textEn: text("text_en").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titleEs: text("title_es").notNull(),
  titleEn: text("title_en").notNull(),
  institution: text("institution").notNull(),
  dateEs: text("date_es").notNull(),
  dateEn: text("date_en").notNull(),
  detailEs: text("detail_es"),
  detailEn: text("detail_en"),
  imageUrl: text("image_url"),
  institutionUrl: text("institution_url"),
  ...publishing,
});

export const technologies = sqliteTable("technologies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  categoryEs: text("category_es").notNull(),
  categoryEn: text("category_en").notNull(),
  imageUrl: text("image_url"),
  ...publishing,
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  descriptionEs: text("description_es").notNull(),
  descriptionEn: text("description_en").notNull(),
  category: text("category", { enum: ["development", "ux"] }).notNull(),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  sourceUrl: text("source_url"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  ...publishing,
});

export const personalItems = sqliteTable("personal_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["language", "hobby"] }).notNull(),
  labelEs: text("label_es").notNull(),
  labelEn: text("label_en").notNull(),
  detailEs: text("detail_es"),
  detailEn: text("detail_en"),
  ...publishing,
});

export const mediaAssets = sqliteTable("media_assets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull().unique(),
  pathname: text("pathname").notNull(),
  kind: text("kind", { enum: ["image", "cv"] }).notNull(),
  createdAt: text("created_at").notNull(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type ExperienceTask = typeof experienceTasks.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Technology = typeof technologies.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type PersonalItem = typeof personalItems.$inferSelect;
