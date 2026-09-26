import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:portfolio.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const schema = [
  `CREATE TABLE IF NOT EXISTS site_settings (id INTEGER PRIMARY KEY, name TEXT NOT NULL, eyebrow_es TEXT NOT NULL, eyebrow_en TEXT NOT NULL, headline_es TEXT NOT NULL, headline_en TEXT NOT NULL, about_es TEXT NOT NULL, about_en TEXT NOT NULL, location_es TEXT NOT NULL, location_en TEXT NOT NULL, availability_es TEXT NOT NULL, availability_en TEXT NOT NULL, email TEXT NOT NULL, whatsapp_url TEXT NOT NULL, github_url TEXT NOT NULL, linkedin_url TEXT NOT NULL, avatar_url TEXT NOT NULL, cv_url TEXT, seo_title_es TEXT NOT NULL, seo_title_en TEXT NOT NULL, seo_description_es TEXT NOT NULL, seo_description_en TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS experiences (id INTEGER PRIMARY KEY AUTOINCREMENT, role_es TEXT NOT NULL, role_en TEXT NOT NULL, company TEXT NOT NULL, date_es TEXT NOT NULL, date_en TEXT NOT NULL, image_url TEXT, company_url TEXT, sort_order INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS experience_tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, experience_id INTEGER NOT NULL REFERENCES experiences(id) ON DELETE CASCADE, text_es TEXT NOT NULL, text_en TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS education (id INTEGER PRIMARY KEY AUTOINCREMENT, title_es TEXT NOT NULL, title_en TEXT NOT NULL, institution TEXT NOT NULL, date_es TEXT NOT NULL, date_en TEXT NOT NULL, detail_es TEXT, detail_en TEXT, image_url TEXT, institution_url TEXT, sort_order INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS technologies (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category_es TEXT NOT NULL, category_en TEXT NOT NULL, image_url TEXT, sort_order INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description_es TEXT NOT NULL, description_en TEXT NOT NULL, category TEXT NOT NULL CHECK(category IN ('development','ux')), image_url TEXT, live_url TEXT, source_url TEXT, featured INTEGER NOT NULL DEFAULT 0, sort_order INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS personal_items (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL CHECK(type IN ('language','hobby')), label_es TEXT NOT NULL, label_en TEXT NOT NULL, detail_es TEXT, detail_en TEXT, sort_order INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1)`,
  `CREATE TABLE IF NOT EXISTS media_assets (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL UNIQUE, pathname TEXT NOT NULL, kind TEXT NOT NULL CHECK(kind IN ('image','cv')), created_at TEXT NOT NULL)`,
];

await client.batch(schema.map((sql) => ({ sql })), "write");
const existing = await client.execute("SELECT id FROM site_settings WHERE id = 1");

if (existing.rows.length === 0) {
  await client.execute({
    sql: `INSERT INTO site_settings VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      "Alan Figueredo",
      "Desarrollador full stack · Málaga",
      "Full-stack developer · Málaga",
      "Creo productos web escalables.",
      "I build scalable web products.",
      "Soy desarrollador web full stack con más de {years} años de experiencia en entornos empresariales. Me especializo en modernizar productos, resolver problemas complejos y convertir requisitos en experiencias digitales mantenibles.",
      "I am a full-stack web developer with more than {years} years of experience in enterprise environments. I specialise in modernising products, solving complex problems and turning requirements into maintainable digital experiences.",
      "Málaga, España",
      "Málaga, Spain",
      "Disponible para nuevos retos",
      "Open to new opportunities",
      "afigueredo2000@gmail.com",
      "https://api.whatsapp.com/send?phone=34611676101",
      "https://github.com/Alan-Figueredo",
      "https://www.linkedin.com/in/alan-figueredo/",
      "/images/Alan.jpg",
      null,
      "Alan Figueredo · Desarrollador Full Stack",
      "Alan Figueredo · Full-stack Developer",
      "Portfolio de Alan Figueredo: experiencia, proyectos y tecnologías como desarrollador web full stack.",
      "Alan Figueredo's portfolio: experience, projects and technologies as a full-stack web developer.",
    ],
  });

  const jobs = [
    ["Desarrollador Full Stack", "Full-stack Developer", "AERTEC Solutions", "Nov 2023 — Actualidad", "Nov 2023 — Present", "/images/aertec_logo.png", "https://aertecsolutions.com/", 1],
    ["Desarrollador React", "React Developer", "Bots Logistics", "Abr 2022 — Nov 2023", "Apr 2022 — Nov 2023", "/images/BOTS.jfif", "https://www.botslogistics.com/", 2],
    ["Desarrollador React", "React Developer", "Accenture", "Dic 2021 — Mar 2022", "Dec 2021 — Mar 2022", "/images/accenture-logo.png", "https://www.accenture.com/", 3],
  ];
  for (const job of jobs) {
    await client.execute({ sql: `INSERT INTO experiences (role_es, role_en, company, date_es, date_en, image_url, company_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, args: job });
  }
  const tasks = [
    [1, "Migración y refactorización de aplicaciones frontend a gran escala", "Migration and refactoring of large-scale frontend applications", 1],
    [1, "Análisis de soluciones e implementación de mejoras técnicas", "Solution analysis and implementation of technical improvements", 2],
    [1, "Desarrollo backend, bases de datos, tests y documentación técnica", "Backend development, databases, testing and technical documentation", 3],
    [2, "Desarrollo completo de interfaces responsive con React", "End-to-end development of responsive React interfaces", 1],
    [2, "Integración de APIs y colaboración con equipos multidisciplinares", "API integration and collaboration with multidisciplinary teams", 2],
    [3, "Frontend responsive integrado con APIs y Firebase", "Responsive frontend integrated with APIs and Firebase", 1],
    [3, "Optimización de rendimiento y accesibilidad", "Performance and accessibility optimisation", 2],
  ];
  for (const task of tasks) await client.execute({ sql: `INSERT INTO experience_tasks (experience_id, text_es, text_en, sort_order) VALUES (?, ?, ?, ?)`, args: task });

  const studies = [
    ["Ingeniería Informática", "Computer Science Engineering", "UADE", "Mar 2019 — Jun 2022", "Mar 2019 — Jun 2022", "Formación universitaria en ingeniería de software.", "University education in software engineering.", "/images/uade_logo.jpeg", "https://www.uade.edu.ar/", 1],
    ["Desarrollo Web Full Stack", "Full-stack Web Development", "DePC Suite", "Ago 2020 — Ene 2021", "Aug 2020 — Jan 2021", "Proyecto integrador con base de datos.", "Capstone project with a database.", "/images/depc.png", "https://depcsuite.com/", 2],
    ["React.js", "React.js", "Coderhouse", "Dic 2021 — Feb 2022", "Dec 2021 — Feb 2022", "Proyecto final con React, Bootstrap y Firebase.", "Final project with React, Bootstrap and Firebase.", "/images/coder.png", "https://www.coderhouse.com/", 3],
    ["JavaScript", "JavaScript", "Coderhouse", "Sep 2021 — Nov 2021", "Sep 2021 — Nov 2021", "Proyecto final con JavaScript y jQuery.", "Final project with JavaScript and jQuery.", "/images/coder.png", "https://www.coderhouse.com/", 4],
    ["Análisis funcional", "Functional Analysis", "Educación IT", "Jul 2021 — Sep 2021", "Jul 2021 — Sep 2021", "Proyecto grupal gestionado con Jira.", "Group project managed with Jira.", "/images/Educacion-IT.jpg", "https://www.educacionit.com/", 5],
    ["TypeScript", "TypeScript", "Código Facilito", "Nov 2022", "Nov 2022", null, null, "/images/CodigoFacilitoLogo.png", "https://www.codigofacilito.com/", 6],
    ["Consumo de APIs con Axios", "Consuming APIs with Axios", "Código Facilito", "Nov 2022", "Nov 2022", null, null, "/images/CodigoFacilitoLogo.png", "https://www.codigofacilito.com/", 7],
    ["Redux desde cero", "Redux from Scratch", "Código Facilito", "Dic 2022 — Ene 2023", "Dec 2022 — Jan 2023", null, null, "/images/CodigoFacilitoLogo.png", "https://www.codigofacilito.com/", 8],
    ["Diseño UX", "UX Design", "CENEC Málaga", "Jul 2023 — Ago 2023", "Jul 2023 — Aug 2023", "Proyectos de diseño colaborativos e individuales en Figma.", "Collaborative and individual design projects in Figma.", "/images/Cenec.png", "https://www.cenecmalaga.es/", 9],
  ];
  for (const study of studies) await client.execute({ sql: `INSERT INTO education (title_es, title_en, institution, date_es, date_en, detail_es, detail_en, image_url, institution_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, args: study });

  const tech = [
    ["React", "Frontend", "Frontend", "/images/react.png"], ["JavaScript", "Lenguaje", "Language", "/images/js.png"], ["TypeScript", "Lenguaje", "Language", "/images/Typescript.jpeg"], ["Next.js", "Frontend", "Frontend", "/images/nextjs.png"], ["CSS", "Frontend", "Frontend", "/images/css.png"], ["HTML", "Frontend", "Frontend", "/images/html5.png"], ["C# / .NET", "Backend", "Backend", "/images/dotnet.png"], ["Firebase", "Datos", "Data", "/images/firebase.png"], ["MongoDB", "Datos", "Data", "/images/MongoDB.jpeg"], ["SQL Server", "Datos", "Data", "/images/sqlserver.png"], ["GitHub", "Herramientas", "Tools", "/images/github.png"], ["Bitbucket", "Herramientas", "Tools", "/images/BitBucket.jpeg"], ["Jira", "Herramientas", "Tools", "/images/jira.png"], ["Jest", "Testing", "Testing", "/images/jest.png"], ["Testing Library", "Testing", "Testing", "/images/react-testing-library.png"], ["Codex", "IA", "AI", "/images/codex.svg"], ["OpenCode", "IA", "AI", "/images/opencode.svg"]
  ];
  for (let i = 0; i < tech.length; i++) await client.execute({ sql: `INSERT INTO technologies (name, category_es, category_en, image_url, sort_order) VALUES (?, ?, ?, ?, ?)`, args: [...tech[i], i + 1] });

  const portfolioProjects = [
    ["Prepaid Standard", "Plantilla web para servicios de seguros de salud.", "Web template for health insurance services.", "development", "/images/prepaid.png", "https://prepaid-template-bgds-kevinfigueredo2000.vercel.app/", null, 1, 1],
    ["App2u", "Web responsive creada con React, Vite y Bootstrap para el proyecto App2u.", "Responsive website built with React, Vite and Bootstrap for App2u.", "development", "/images/app2u.png", "https://app2u.vercel.app/", "https://github.com/Alan-Figueredo/app2u", 1, 2],
    ["De la Cruz Peluquería", "Aplicación para una peluquería creada con React, Axios y Firebase.", "Hair salon application built with React, Axios and Firebase.", "development", "/images/ProyectoDeLaCruz.png", null, null, 0, 3],
    ["Coffix", "Web personal para presentar servicios de desarrollo freelance.", "Personal website presenting freelance development services.", "development", "/images/coffix.png", "https://coffix-web.com", null, 0, 4],
    ["GameCloud", "Explorador del catálogo de Steam construido sobre una API externa.", "Steam catalogue explorer built on top of an external API.", "development", "/images/Steam.png", "https://steamstoremock.vercel.app/", "https://github.com/Alan-Figueredo/gamecloud", 0, 5],
    ["Tienda React", "E-commerce desarrollado como proyecto final con React y Firebase.", "E-commerce developed as a final project with React and Firebase.", "development", "/images/Tienda-react.png", "https://tusbebidasonline.netlify.app/", "https://github.com/Alan-Figueredo/TusBebidasOnline", 0, 6],
    ["Cajero Santander", "Rediseño UX del flujo de extracción de efectivo.", "UX redesign of the cash withdrawal flow.", "ux", "/images/Santander.png", "https://www.figma.com/file/bG3Y4x1fRshTcTVEmUhKco/Santa-Banca", null, 0, 7],
    ["Sanidapp", "Rediseño colaborativo de una aplicación de gestión de citas médicas.", "Collaborative redesign of a medical appointment management app.", "ux", "/images/Sanidapp.jpg", "https://www.figma.com/proto/sl88DTJ33dmIwuaZoh9TeN/Untitled", null, 0, 8],
  ];
  for (const project of portfolioProjects) await client.execute({ sql: `INSERT INTO projects (title, description_es, description_en, category, image_url, live_url, source_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, args: project });

  const personal = [
    ["language", "Inglés", "English", "C1 · Cambridge FCE", "C1 · Cambridge FCE", 1],
    ["language", "Español", "Spanish", "Nativo", "Native", 2],
    ["hobby", "Batería", "Drums", "Música y ritmo", "Music and rhythm", 3],
    ["hobby", "Videojuegos", "Video games", "Diseño e interacción", "Design and interaction", 4],
    ["hobby", "Programación", "Programming", "También fuera del trabajo", "Beyond work too", 5],
  ];
  for (const item of personal) await client.execute({ sql: `INSERT INTO personal_items (type, label_es, label_en, detail_es, detail_en, sort_order) VALUES (?, ?, ?, ?, ?, ?)`, args: item });
}

await client.execute({
  sql: `UPDATE site_settings SET headline_es = ?, headline_en = ? WHERE id = 1 AND headline_es = ?`,
  args: [
    "Creo productos web escalables.",
    "I build scalable web products.",
    "Construyo productos web claros, rápidos y preparados para crecer.",
  ],
});

await client.execute({
  sql: `UPDATE site_settings SET headline_es = ?, headline_en = ? WHERE id = 1 AND headline_es = ?`,
  args: [
    "Creo productos web escalables.",
    "I build scalable web products.",
    "Creo productos web que funcionan.",
  ],
});

await client.execute({
  sql: `UPDATE site_settings SET about_es = ?, about_en = ? WHERE id = 1 AND about_es = ?`,
  args: [
    "Soy desarrollador web full stack con más de {years} años de experiencia en entornos empresariales. Me especializo en modernizar productos, resolver problemas complejos y convertir requisitos en experiencias digitales mantenibles.",
    "I am a full-stack web developer with more than {years} years of experience in enterprise environments. I specialise in modernising products, solving complex problems and turning requirements into maintainable digital experiences.",
    "Soy desarrollador web full stack con más de cuatro años de experiencia en entornos empresariales. Me especializo en modernizar productos, resolver problemas complejos y convertir requisitos en experiencias digitales mantenibles.",
  ],
});

await client.execute({
  sql: `UPDATE site_settings SET cv_url = NULL WHERE id = 1 AND cv_url = ?`,
  args: ["https://drive.google.com/file/d/1_KachtCDyvc1kKi2pb5Gk3JAYwcw3aLv/view?usp=sharing"],
});

const aiTools = [
  ["Codex", "IA", "AI", "/images/codex.svg", 16],
  ["OpenCode", "IA", "AI", "/images/opencode.svg", 17],
];
for (const tool of aiTools) {
  await client.execute({
    sql: `INSERT INTO technologies (name, category_es, category_en, image_url, sort_order)
      SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM technologies WHERE name = ?)`,
    args: [...tool, tool[0]],
  });
}

console.log(`Database ready: ${process.env.TURSO_DATABASE_URL ? "Turso" : "portfolio.db"}`);
