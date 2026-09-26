import { describe, expect, it } from "vitest";
import { getPortfolioContent } from "../lib/db/queries";
import { localized } from "../lib/i18n";

describe("portfolio content", () => {
  it("loads normalized published content from LibSQL", async () => {
    const content = await getPortfolioContent();
    expect(content.settings?.name).toBe("Alan Figueredo");
    expect(content.experiences.length).toBeGreaterThan(0);
    expect(content.experiences[0].tasks.length).toBeGreaterThan(0);
    expect(content.projects.every((project) => project.published)).toBe(true);
  });

  it("selects the requested manual translation", () => {
    const item = { titleEs: "Formación", titleEn: "Education" };
    expect(localized(item, "title", "es")).toBe("Formación");
    expect(localized(item, "title", "en")).toBe("Education");
  });
});
