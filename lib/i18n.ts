import type { Locale } from "./db/queries";

export const locales: Locale[] = ["es", "en"];

/**
 * Returns the best supported locale from the browser's Accept-Language header.
 * Spanish is the default so the site remains predictable when the header is
 * missing or contains an unsupported language.
 */
export function getPreferredLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return "es";

  const preferred = acceptLanguage
    .split(",")
    .map((entry) => {
      const [language, ...parameters] = entry.trim().toLowerCase().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const weight = quality ? Number.parseFloat(quality.trim().slice(2)) : 1;
      return { language, weight: Number.isNaN(weight) ? 0 : weight };
    })
    .filter(({ language, weight }) => language && weight > 0)
    .sort((a, b) => b.weight - a.weight);

  const supported = preferred.find(
    ({ language }) => language === "es" || language.startsWith("es-") || language === "en" || language.startsWith("en-"),
  );

  if (!supported) return "es";
  return supported.language === "en" || supported.language.startsWith("en-") ? "en" : "es";
}

export const copy = {
  es: {
    skip: "Saltar al contenido",
    nav: { about: "Perfil", experience: "Experiencia", projects: "Proyectos", stack: "Stack", education: "Formación", contact: "Contacto" },
    menu: "Abrir menú",
    heroCta: "Ver proyectos",
    cv: "Descargar CV",
    experience: "Experiencia",
    experienceIntro: "Productos reales, equipos diversos y una obsesión constante por mejorar lo que ya existe.",
    projects: "Trabajo seleccionado",
    projectsIntro: "Una mezcla de producto, frontend y diseño centrado en resolver necesidades concretas.",
    all: "Todos",
    development: "Desarrollo",
    ux: "Diseño UX",
    viewProject: "Ver proyecto",
    viewCode: "Código",
    stack: "Herramientas con las que construyo",
    education: "Formación",
    loadMoreEducation: "Cargar más",
    personal: "Más allá del código",
    languages: "Idiomas",
    hobbies: "Intereses",
    contact: "Hablemos",
    contactIntro: "¿Tienes un producto que mejorar, una idea que validar o un equipo al que pueda aportar? Escríbeme.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando…",
    rights: "Diseñado y desarrollado con intención.",
    empty: "Contenido en preparación.",
  },
  en: {
    skip: "Skip to content",
    nav: { about: "Profile", experience: "Experience", projects: "Projects", stack: "Stack", education: "Education", contact: "Contact" },
    menu: "Open menu",
    heroCta: "See projects",
    cv: "Download résumé",
    experience: "Experience",
    experienceIntro: "Real products, diverse teams and a constant drive to improve what already exists.",
    projects: "Selected work",
    projectsIntro: "A blend of product, frontend and design focused on solving concrete needs.",
    all: "All",
    development: "Development",
    ux: "UX design",
    viewProject: "View project",
    viewCode: "Code",
    stack: "Tools I build with",
    education: "Education",
    loadMoreEducation: "Show more",
    personal: "Beyond code",
    languages: "Languages",
    hobbies: "Interests",
    contact: "Let’s talk",
    contactIntro: "Have a product to improve, an idea to validate or a team I could contribute to? Write to me.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    rights: "Designed and developed with intent.",
    empty: "Content coming soon.",
  },
} as const;

export function localized<T extends Record<string, unknown>>(item: T, base: string, locale: Locale) {
  const key = `${base}${locale === "es" ? "Es" : "En"}`;
  return String(item[key] ?? "");
}
