import type { Metadata } from "next";
import Link from "next/link";
import { auth, isGitHubAuthConfigured, signIn, signOut } from "@/auth";
import { getPortfolioContent } from "@/lib/db/queries";
import {
  deleteContentAction, saveEducationAction, saveExperienceAction, savePersonalItemAction,
  saveProjectAction, saveSettingsAction, saveTaskAction, saveTechnologyAction,
} from "./actions";
import { SectionOrderEditor, SortableAdminList } from "./sortable-list";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administración", robots: { index: false, follow: false } };

function Field({ label, name, value = "", type = "text", required = false, accept }: { label: string; name: string; value?: string | number | null; type?: string; required?: boolean; accept?: string }) {
  return <label>{label}<input name={name} type={type} defaultValue={value ?? ""} required={required} accept={accept} /></label>;
}
function Area({ label, name, value = "", required = false }: { label: string; name: string; value?: string | null; required?: boolean }) {
  return <label className="wide">{label}<textarea name={name} rows={4} defaultValue={value ?? ""} required={required} /></label>;
}
function PublishFields({ sortOrder = 0, published = true }: { sortOrder?: number; published?: boolean }) {
  return <><Field label="Orden" name="sortOrder" type="number" value={sortOrder} /><label className="check"><input name="published" type="checkbox" defaultChecked={published} /> Publicado</label></>;
}
function DeleteButton({ kind, id }: { kind: string; id: number }) {
  return <form action={deleteContentAction}><input type="hidden" name="kind" value={kind} /><input type="hidden" name="id" value={id} /><button className="danger">Eliminar</button></form>;
}

export default async function AdminPage() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isGitHubAuthConfigured) return (
    <main className="loginPage">
      <div>
        <p className="adminKicker">Alan Figueredo · Portfolio</p>
        <h1>{isProduction ? "Panel no disponible" : "Configuración pendiente"}</h1>
        <p>{isProduction ? "El panel privado no está disponible temporalmente." : "Configura la aplicación OAuth de GitHub antes de acceder al panel privado."}</p>
        {!isProduction && <p><code>AUTH_GITHUB_ID</code>, <code>AUTH_GITHUB_SECRET</code> y <code>ADMIN_GITHUB_USER_ID</code></p>}
        <Link href="/es">Volver al portfolio</Link>
      </div>
    </main>
  );

  const session = await auth();
  const authorized = session?.user?.githubId && session.user.githubId === process.env.ADMIN_GITHUB_USER_ID;
  if (!authorized) return (
    <main className="loginPage">
      <div><p className="adminKicker">Alan Figueredo · Portfolio</p><h1>Panel privado</h1><p>Accede con la cuenta de GitHub autorizada para gestionar el contenido.</p>
        <form action={async () => { "use server"; await signIn("github", { redirectTo: "/admin" }); }}><button>Entrar con GitHub</button></form>
        <Link href="/es">Volver al portfolio</Link>
      </div>
    </main>
  );

  const content = await getPortfolioContent(true);
  const settings = content.settings;
  if (!settings) return <main className="loginPage">Ejecuta <code>npm run db:bootstrap</code>.</main>;
  return (
    <main className="adminShell">
      <header className="adminHeader"><div><p className="adminKicker">CMS privado</p><h1>Contenido del portfolio</h1></div><div><Link href="/es">Ver web</Link><form action={async () => { "use server"; await signOut({ redirectTo: "/es" }); }}><button className="secondary">Salir</button></form></div></header>

      <section><h2>Perfil, SEO y CV</h2><SectionOrderEditor initialOrder={content.sectionOrder} /><form action={saveSettingsAction} className="adminForm">
        <Field label="Nombre" name="name" value={settings.name} required />
        <Field label="Email" name="email" value={settings.email} type="email" required />
        <Field label="Etiqueta ES" name="eyebrowEs" value={settings.eyebrowEs} required /><Field label="Label EN" name="eyebrowEn" value={settings.eyebrowEn} required />
        <Area label="Titular ES" name="headlineEs" value={settings.headlineEs} required /><Area label="Headline EN" name="headlineEn" value={settings.headlineEn} required />
        <Area label="Sobre mí ES" name="aboutEs" value={settings.aboutEs} required /><Area label="About EN" name="aboutEn" value={settings.aboutEn} required />
        <Field label="Ubicación ES" name="locationEs" value={settings.locationEs} required /><Field label="Location EN" name="locationEn" value={settings.locationEn} required />
        <Field label="Disponibilidad ES" name="availabilityEs" value={settings.availabilityEs} required /><Field label="Availability EN" name="availabilityEn" value={settings.availabilityEn} required />
        <Field label="GitHub" name="githubUrl" value={settings.githubUrl} required /><Field label="LinkedIn" name="linkedinUrl" value={settings.linkedinUrl} required />
        <Field label="WhatsApp" name="whatsappUrl" value={settings.whatsappUrl} required />
        <Field label="Avatar (máx. 5 MB)" name="avatar" type="file" accept="image/jpeg,image/png,image/webp,image/avif" /><Field label="CV PDF (máx. 10 MB)" name="cv" type="file" accept="application/pdf" />
        <Field label="Título SEO ES" name="seoTitleEs" value={settings.seoTitleEs} required /><Field label="SEO title EN" name="seoTitleEn" value={settings.seoTitleEn} required />
        <Area label="Descripción SEO ES" name="seoDescriptionEs" value={settings.seoDescriptionEs} required /><Area label="SEO description EN" name="seoDescriptionEn" value={settings.seoDescriptionEn} required />
        <button className="save">Guardar perfil</button>
      </form></section>

      <AdminCollection title="Experiencia" kind="experience" items={content.experiences.map((item) => ({ id: item.id, label: `${item.company} — ${item.roleEs}` }))} newLabel="Nueva experiencia" newForm={<ExperienceForm />}>
        {content.experiences.map((item) => <details key={item.id}><summary>{item.company} — {item.roleEs}</summary><ExperienceForm item={item} /><DeleteButton kind="experience" id={item.id} />
          <div className="nested"><h3>Tareas</h3>{item.tasks.map((task) => <details key={task.id}><summary>{task.textEs}</summary><form action={saveTaskAction} className="adminForm compact"><input type="hidden" name="id" value={task.id} /><input type="hidden" name="experienceId" value={item.id} /><Area label="Tarea ES" name="textEs" value={task.textEs} required /><Area label="Task EN" name="textEn" value={task.textEn} required /><Field label="Orden" name="sortOrder" value={task.sortOrder} type="number" /><button className="save">Guardar</button></form><DeleteButton kind="task" id={task.id} /></details>)}
            <details><summary>Nueva tarea</summary><form action={saveTaskAction} className="adminForm compact"><input type="hidden" name="experienceId" value={item.id} /><Area label="Tarea ES" name="textEs" required /><Area label="Task EN" name="textEn" required /><Field label="Orden" name="sortOrder" type="number" /><button className="save">Añadir tarea</button></form></details>
          </div>
        </details>)}
      </AdminCollection>

      <AdminCollection title="Proyectos" kind="projects" items={content.projects.map((item) => ({ id: item.id, label: item.title }))} newLabel="Nuevo proyecto" newForm={<ProjectForm />}>
        {content.projects.map((item) => <details key={item.id}><summary>{item.title}</summary><ProjectForm item={item} /><DeleteButton kind="project" id={item.id} /></details>)}
      </AdminCollection>
      <AdminCollection title="Tecnologías" kind="technologies" items={content.technologies.map((item) => ({ id: item.id, label: item.name }))} newLabel="Nueva tecnología" newForm={<TechnologyForm />}>
        {content.technologies.map((item) => <details key={item.id}><summary>{item.name}</summary><TechnologyForm item={item} /><DeleteButton kind="technology" id={item.id} /></details>)}
      </AdminCollection>
      <AdminCollection title="Formación" kind="education" items={content.education.map((item) => ({ id: item.id, label: `${item.institution} — ${item.titleEs}` }))} newLabel="Nueva formación" newForm={<EducationForm />}>
        {content.education.map((item) => <details key={item.id}><summary>{item.institution} — {item.titleEs}</summary><EducationForm item={item} /><DeleteButton kind="education" id={item.id} /></details>)}
      </AdminCollection>
      <AdminCollection title="Idiomas e intereses" newLabel="Nuevo elemento" newForm={<PersonalForm />}>
        {content.personalItems.map((item) => <details key={item.id}><summary>{item.labelEs}</summary><PersonalForm item={item} /><DeleteButton kind="personal" id={item.id} /></details>)}
      </AdminCollection>
    </main>
  );
}

function AdminCollection({ title, kind, items, newLabel, newForm, children }: { title: string; kind?: "experience" | "projects" | "technologies" | "education"; items?: { id: number; label: string }[]; newLabel: string; newForm: React.ReactNode; children: React.ReactNode[] }) {
  return <section><h2>{title}</h2>{kind && items ? <SortableAdminList kind={kind} items={items} children={children} /> : <div className="adminList">{children}</div>}<div className="adminList"><details className="newItem"><summary>{newLabel}</summary>{newForm}</details></div></section>;
}

type WithPublishing = { id: number; sortOrder: number; published: boolean };
function ExperienceForm({ item }: { item?: WithPublishing & { roleEs: string; roleEn: string; company: string; dateEs: string; dateEn: string; companyUrl: string | null } }) {
  return <form action={saveExperienceAction} className="adminForm">{item && <input type="hidden" name="id" value={item.id} />}<Field label="Puesto ES" name="roleEs" value={item?.roleEs} /><Field label="Role EN" name="roleEn" value={item?.roleEn} /><Field label="Empresa" name="company" value={item?.company} required /><Field label="Fecha ES" name="dateEs" value={item?.dateEs} required /><Field label="Date EN" name="dateEn" value={item?.dateEn} required /><Field label="Web empresa" name="companyUrl" value={item?.companyUrl} /><Field label="Logo" name="image" type="file" /><PublishFields sortOrder={item?.sortOrder} published={item?.published} /><button className="save">Guardar</button></form>;
}
function ProjectForm({ item }: { item?: WithPublishing & { title: string; descriptionEs: string; descriptionEn: string; category: "development" | "ux"; liveUrl: string | null; sourceUrl: string | null; featured: boolean } }) {
  return <form action={saveProjectAction} className="adminForm">{item && <input type="hidden" name="id" value={item.id} />}<Field label="Título" name="title" value={item?.title} required /><label>Categoría<select name="category" defaultValue={item?.category ?? "development"}><option value="development">Desarrollo</option><option value="ux">UX</option></select></label><Area label="Descripción ES" name="descriptionEs" value={item?.descriptionEs} /><Area label="Description EN" name="descriptionEn" value={item?.descriptionEn} /><Field label="URL online" name="liveUrl" value={item?.liveUrl} /><Field label="Repositorio" name="sourceUrl" value={item?.sourceUrl} /><Field label="Imagen" name="image" type="file" /><PublishFields sortOrder={item?.sortOrder} published={item?.published} /><label className="check"><input type="checkbox" name="featured" defaultChecked={item?.featured} /> Destacado</label><button className="save">Guardar</button></form>;
}
function TechnologyForm({ item }: { item?: WithPublishing & { name: string; categoryEs: string; categoryEn: string } }) {
  return <form action={saveTechnologyAction} className="adminForm">{item && <input type="hidden" name="id" value={item.id} />}<Field label="Nombre" name="name" value={item?.name} required /><Field label="Categoría ES" name="categoryEs" value={item?.categoryEs} /><Field label="Category EN" name="categoryEn" value={item?.categoryEn} /><Field label="Icono" name="image" type="file" /><PublishFields sortOrder={item?.sortOrder} published={item?.published} /><button className="save">Guardar</button></form>;
}
function EducationForm({ item }: { item?: WithPublishing & { titleEs: string; titleEn: string; institution: string; dateEs: string; dateEn: string; detailEs: string | null; detailEn: string | null; institutionUrl: string | null } }) {
  return <form action={saveEducationAction} className="adminForm">{item && <input type="hidden" name="id" value={item.id} />}<Field label="Título ES" name="titleEs" value={item?.titleEs} /><Field label="Title EN" name="titleEn" value={item?.titleEn} /><Field label="Institución" name="institution" value={item?.institution} required /><Field label="Fecha ES" name="dateEs" value={item?.dateEs} required /><Field label="Date EN" name="dateEn" value={item?.dateEn} required /><Area label="Detalle ES" name="detailEs" value={item?.detailEs} /><Area label="Detail EN" name="detailEn" value={item?.detailEn} /><Field label="Web institución" name="institutionUrl" value={item?.institutionUrl} /><Field label="Logo" name="image" type="file" /><PublishFields sortOrder={item?.sortOrder} published={item?.published} /><button className="save">Guardar</button></form>;
}
function PersonalForm({ item }: { item?: WithPublishing & { type: "language" | "hobby"; labelEs: string; labelEn: string; detailEs: string | null; detailEn: string | null } }) {
  return <form action={savePersonalItemAction} className="adminForm">{item && <input type="hidden" name="id" value={item.id} />}<label>Tipo<select name="type" defaultValue={item?.type ?? "language"}><option value="language">Idioma</option><option value="hobby">Interés</option></select></label><Field label="Nombre ES" name="labelEs" value={item?.labelEs} /><Field label="Name EN" name="labelEn" value={item?.labelEn} /><Field label="Detalle ES" name="detailEs" value={item?.detailEs} /><Field label="Detail EN" name="detailEn" value={item?.detailEn} /><PublishFields sortOrder={item?.sortOrder} published={item?.published} /><button className="save">Guardar</button></form>;
}
