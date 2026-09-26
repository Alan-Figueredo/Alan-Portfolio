"use client";

import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/lib/db/queries";
import { copy } from "@/lib/i18n";

type ProjectCard = {
  id: number;
  title: string;
  description: string;
  category: "development" | "ux";
  imageUrl: string | null;
  liveUrl: string | null;
  sourceUrl: string | null;
  featured: boolean;
};

export function ProjectFilter({ projects, locale }: { projects: ProjectCard[]; locale: Locale }) {
  const [filter, setFilter] = useState<"all" | "development" | "ux">("all");
  const t = copy[locale];
  const shown = filter === "all" ? projects : projects.filter((project) => project.category === filter);
  return (
    <div>
      <div className="filters" role="group" aria-label={t.projects}>
        {(["all", "development", "ux"] as const).map((value) => (
          <button key={value} className={filter === value ? "filterActive" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)}>
            {value === "all" ? t.all : value === "development" ? t.development : t.ux}
          </button>
        ))}
      </div>
      <div className="projectGrid">
        {shown.map((project, index) => (
          <article className={`projectCard ${project.featured ? "projectFeatured" : ""}`} key={project.id}>
            <div className="projectImage">
              {project.imageUrl ? <Image src={project.imageUrl} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /> : <div className="imagePlaceholder" />}
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="projectBody">
              <p className="kicker">{project.category === "development" ? t.development : t.ux}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="projectLinks">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">{t.viewProject} <ArrowUpRight size={16} /></a>}
                {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer"><Github size={16} /> {t.viewCode}</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
