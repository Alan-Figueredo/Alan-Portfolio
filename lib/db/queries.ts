import { asc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "./index";
import {
  education,
  experiences,
  experienceTasks,
  personalItems,
  projects,
  siteSettings,
  technologies,
} from "./schema";

export type Locale = "es" | "en";

export const SECTION_KEYS = ["experience", "projects", "technologies", "education", "personal", "contact"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];
export const DEFAULT_SECTION_ORDER: SectionKey[] = [...SECTION_KEYS];

function parseSectionOrder(value: string | null | undefined): SectionKey[] {
  try {
    const parsed = JSON.parse(value ?? "") as unknown;
    if (!Array.isArray(parsed)) return DEFAULT_SECTION_ORDER;
    const order = parsed.filter((item): item is SectionKey => typeof item === "string" && SECTION_KEYS.includes(item as SectionKey));
    return [...order, ...DEFAULT_SECTION_ORDER.filter((key) => !order.includes(key))];
  } catch {
    return DEFAULT_SECTION_ORDER;
  }
}

export async function getPortfolioContent(includeDrafts = false) {
  const published = <T extends { published: unknown }>(table: T) =>
    includeDrafts ? undefined : eq(table.published as never, true);

  const [settingsRows, experienceRows, taskRows, educationRows, technologyRows, projectRows, personalRows] =
    await Promise.all([
      db.select().from(siteSettings).limit(1),
      db.select().from(experiences).where(published(experiences)).orderBy(asc(experiences.sortOrder)),
      db.select().from(experienceTasks).orderBy(asc(experienceTasks.sortOrder)),
      db.select().from(education).where(published(education)).orderBy(asc(education.sortOrder)),
      db.select().from(technologies).where(published(technologies)).orderBy(asc(technologies.sortOrder)),
      db.select().from(projects).where(published(projects)).orderBy(asc(projects.sortOrder)),
      db.select().from(personalItems).where(published(personalItems)).orderBy(asc(personalItems.sortOrder)),
    ]);

  const experienceWithTasks = experienceRows.map((experience) => ({
    ...experience,
    tasks: taskRows.filter((task) => task.experienceId === experience.id),
  }));

  return {
    settings: settingsRows[0],
    sectionOrder: parseSectionOrder(settingsRows[0]?.sectionOrder),
    experiences: experienceWithTasks,
    education: educationRows,
    technologies: technologyRows,
    projects: projectRows,
    personalItems: personalRows,
  };
}

export const getCachedPortfolioContent = cache(() => getPortfolioContent(false));

export async function getSiteSettings() {
  const [settings] = await db.select().from(siteSettings).limit(1);
  return settings;
}
