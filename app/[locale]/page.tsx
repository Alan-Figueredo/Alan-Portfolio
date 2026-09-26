import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, FileDown, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { ExperienceSummary } from "@/components/experience-summary";
import { PortfolioSections } from "@/components/portfolio-sections";
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

          <PortfolioSections content={content} locale={locale} settings={settings} />
        </main>
        <footer><p>© {new Date().getFullYear()} {settings.name}</p><p>{t.rights}</p><Link href="/admin">Admin</Link></footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
