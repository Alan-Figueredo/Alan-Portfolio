"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/db/queries";
import { copy } from "@/lib/i18n";

export function SiteHeader({ locale, name }: { locale: Locale; name: string }) {
  const [open, setOpen] = useState(false);
  const t = copy[locale];
  const links = [
    ["#perfil", t.nav.about], ["#experiencia", t.nav.experience], ["#proyectos", t.nav.projects],
    ["#stack", t.nav.stack], ["#formacion", t.nav.education], ["#contacto", t.nav.contact],
  ];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="siteHeader">
      <a className="wordmark" href="#perfil" aria-label={`${name} — home`} onClick={() => setOpen(false)}>
        AF<span>.</span>
      </a>
      <button className="menuButton" aria-label={t.menu} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <button
        className={`navBackdrop${open ? " navBackdropOpen" : ""}`}
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label={locale === "es" ? "Cerrar menú" : "Close menu"}
        onClick={() => setOpen(false)}
      />
      <nav id="primary-navigation" className={open ? "mainNav mainNavOpen" : "mainNav"} aria-label="Primary">
        <p className="mobileNavLabel">{locale === "es" ? "Navegación" : "Navigation"}</p>
        {links.map(([href, label], index) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <span className="navIndex">{String(index + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
        <div className="languageSwitch" role="group" aria-label="Language">
          <Link href="/es" aria-current={locale === "es" ? "page" : undefined}>ES</Link>
          <span>/</span>
          <Link href="/en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
        </div>
      </nav>
    </header>
  );
}
