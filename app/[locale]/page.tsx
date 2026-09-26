import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileDown, Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { EducationList } from "@/components/education-list";
import { ExperienceSummary } from "@/components/experience-summary";
import { ProjectFilter } from "@/components/project-filter";
import { SiteHeader } from "@/components/site-header";
import { getCachedPortfolioContent, type Locale } from "@/lib/db/queries";
import { copy, locales, localized } from "@/lib/i18n";

export const dynamicParams = false;
export const revalidate = false;

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: candidate } = await params;
  if (!locales.includes(candidate as Locale)) return {};
  const locale = candidate as Locale;
  const { settings } = await getCachedPortfolioContent();
  if (!settings) return {};
  const title = localized(settings, "seoTitle", locale);
  const description = localized(settings, "seoDescription", locale);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}`, languages: { "es-ES": "/es", "en": "/en" } },
    openGraph: { title, description, type: "website", locale: locale === "es" ? "es_ES" : "en_GB", url: `/${locale}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale: candidate } = await params;
  if (!locales.includes(candidate as Locale)) notFound();
  const locale = candidate as Locale;
  const t = copy[locale];
  const content = await getCachedPortfolioContent();
  const { settings } = content;
  if (!settings) return <main className="emptyState">{t.empty}</main>;

  const projectCards = content.projects.map((project) => ({
    ...project,
    description: localized(project, "description", locale),
  }));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    url: `${siteUrl}/${locale}`,
    image: settings.avatarUrl.startsWith("http") ? settings.avatarUrl : `${siteUrl}${settings.avatarUrl}`,
    jobTitle: localized(settings, "eyebrow", locale),
    email: `mailto:${settings.email}`,
    sameAs: [settings.githubUrl, settings.linkedinUrl],
  };

  return (
    <>
      <a className="skipLink" href="#main">{t.skip}</a>
      <div className="pageShell">
        <SiteHeader locale={locale} name={settings.name} />
        <main id="main" lang={locale}>
          <section className="hero" id="perfil">
            <div className="heroCopy">
              <p className="eyebrow"><span />{localized(settings, "eyebrow", locale)}</p>
              <h1>{localized(settings, "headline", locale)}</h1>
              <ExperienceSummary text={localized(settings, "about", locale)} locale={locale} />
              <div className="heroActions">
                <a className="primaryButton" href="#proyectos">{t.heroCta}<ArrowDown size={17} /></a>
                {settings.cvUrl && <a className="secondaryButton" href="/cv" target="_blank" rel="noreferrer">{t.cv}<FileDown size={17} /></a>}
              </div>
              <div className="heroMeta">
                <span><MapPin size={16} />{localized(settings, "location", locale)}</span>
                <span className="availability"><i />{localized(settings, "availability", locale)}</span>
              </div>
            </div>
            <div className="portraitWrap">
              <div className="portraitFrame">
                <Image src={settings.avatarUrl} alt={settings.name} fill sizes="(max-width: 760px) 82vw, 38vw" priority />
              </div>
              <p>FULL—STACK<br />DEVELOPER</p>
            </div>
          </section>

          <section className="section ruled" id="experiencia">
            <header className="sectionHeader"><p className="sectionNumber">01</p><div><h2>{t.experience}</h2><p>{t.experienceIntro}</p></div></header>
            <div className="timeline sectionContentOffset">
              {content.experiences.map((experience) => (
                <article className="timelineItem" key={experience.id}>
                  <div className="timelineMeta">
                    <div className="timelineDate">{localized(experience, "date", locale)}</div>
                    {experience.imageUrl && (
                      <div className="companyLogo">
                        <Image
                          src={experience.imageUrl}
                          alt={`${experience.company} logo`}
                          width={84}
                          height={84}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="kicker">{experience.company}</p>
                    <h3>{localized(experience, "role", locale)}</h3>
                    <ul>{experience.tasks.map((task) => <li key={task.id}>{localized(task, "text", locale)}</li>)}</ul>
                    {experience.companyUrl && <a className="textLink" href={experience.companyUrl} target="_blank" rel="noreferrer">{experience.company}<ArrowUpRight size={15} /></a>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="proyectos">
            <header className="sectionHeader"><p className="sectionNumber">02</p><div><h2>{t.projects}</h2><p>{t.projectsIntro}</p></div></header>
            <div className="sectionContentOffset">
              <ProjectFilter projects={projectCards} locale={locale} />
            </div>
          </section>

          <section className="section stackSection" id="stack">
            <header className="sectionHeader"><p className="sectionNumber">03</p><div><h2>{t.stack}</h2></div></header>
            <div className="techGrid">
              {content.technologies.map((technology) => (
                <article key={technology.id} className="techItem">
                  {technology.imageUrl && <Image src={technology.imageUrl} alt="" width={44} height={44} />}
                  <div><h3>{technology.name}</h3><p>{localized(technology, "category", locale)}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="section ruled" id="formacion">
            <header className="sectionHeader"><p className="sectionNumber">04</p><div><h2>{t.education}</h2></div></header>
            <EducationList hasMore={content.education.length > 5} loadMoreLabel={t.loadMoreEducation}>
              {content.education.map((item) => (
                <article key={item.id}>
                  <p className="educationDate">{localized(item, "date", locale)}</p>
                  <div className="educationTitleRow">
                    {item.imageUrl && (
                      <div className="educationLogo">
                        <Image
                          src={item.imageUrl}
                          alt={`${item.institution} logo`}
                          width={58}
                          height={58}
                        />
                      </div>
                    )}
                    <div>
                      <h3>{localized(item, "title", locale)}</h3>
                      <p className="kicker">{item.institution}</p>
                    </div>
                  </div>
                  {localized(item, "detail", locale) && <p>{localized(item, "detail", locale)}</p>}
                </article>
              ))}
            </EducationList>
          </section>

          <section className="section personalSection" id="personal">
            <header className="sectionHeader"><p className="sectionNumber">05</p><div><h2>{t.personal}</h2></div></header>
            <div className="personalGrid sectionContentOffset">
              {(["language", "hobby"] as const).map((type) => (
                <div key={type}>
                  <p className="kicker">{type === "language" ? t.languages : t.hobbies}</p>
                  {content.personalItems.filter((item) => item.type === type).map((item) => (
                    <div className="personalItem" key={item.id}><h3>{localized(item, "label", locale)}</h3><p>{localized(item, "detail", locale)}</p></div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="contactSection" id="contacto">
            <div className="contactCopy"><p className="sectionNumber">06</p><h2>{t.contact}</h2><p>{t.contactIntro}</p>
              <div className="socialLinks">
                <a href={`mailto:${settings.email}`}><Mail size={18} />{settings.email}</a>
                <a href={settings.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn</a>
                <a href={settings.githubUrl} target="_blank" rel="noreferrer"><Github size={18} />GitHub</a>
                <a href={settings.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp</a>
              </div>
            </div>
            <ContactForm locale={locale} />
          </section>
        </main>
        <footer><p>© {new Date().getFullYear()} {settings.name}</p><p>{t.rights}</p><Link href="/admin">Admin</Link></footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
