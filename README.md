# Alan Figueredo — Portfolio

Portfolio bilingüe construido con Next.js App Router, TypeScript, Turso/LibSQL y Drizzle ORM. Las rutas públicas se generan como HTML estático y el panel privado usa GitHub OAuth, Server Actions y Vercel Blob.

## Desarrollo local

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

`npm run dev` crea automáticamente `portfolio.db`, aplica el esquema e importa el contenido inicial de manera idempotente. Si se definen `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`, el mismo proceso trabaja contra Turso.

Rutas principales:

- `/es` y `/en`: portfolio SSG.
- `/admin`: panel privado.
- `/cv`: enlace estable al último PDF cargado.
- `/sitemap.xml`, `/robots.txt` y `/manifest.webmanifest`: SEO y metadata.

## Servicios y variables

Copiar `.env.example` a `.env.local` y configurar:

- `NEXT_PUBLIC_SITE_URL`: dominio de producción, sin barra final.
- `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`: base de datos de producción.
- `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`: aplicación OAuth de GitHub.
- `ADMIN_GITHUB_USER_ID`: ID numérico de la única cuenta autorizada; no usar el nombre de usuario.
- `BLOB_READ_WRITE_TOKEN`: se añade automáticamente al conectar un store de Vercel Blob.
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`: servicio del formulario.

En GitHub OAuth, la callback de producción es `https://TU_DOMINIO/api/auth/callback/github`; en local es `http://localhost:3000/api/auth/callback/github`.

## Datos y publicación

El esquema está en `lib/db/schema.ts`. No hay JSON de contenido ni consultas de datos desde el navegador. El panel permite editar y ordenar perfil, experiencia, tareas, proyectos, tecnologías, formación, idiomas e intereses. Un elemento publicado requiere textos ES/EN.

Las imágenes aceptan JPEG, PNG, WebP o AVIF hasta 5 MB. El CV debe ser PDF de hasta 10 MB. Al guardar, las rutas `/es` y `/en` se regeneran y los blobs sustituidos sin referencias se eliminan.

## Calidad

```bash
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

El resumen de `next build` debe marcar `/es` y `/en` como `SSG`; `/admin`, `/api/auth` y `/cv` son las únicas rutas dinámicas de aplicación.

## Despliegue en Vercel

1. Crear la base de datos Turso y añadir sus credenciales al proyecto.
2. Conectar Vercel Blob.
3. Crear la GitHub OAuth App y cargar las variables de Auth.js.
4. Añadir las variables EmailJS y `NEXT_PUBLIC_SITE_URL`.
5. Desplegar. El build prepara el esquema y la semilla solo se inserta si la base está vacía.
6. Entrar en `/admin`, revisar el contenido y subir el CV actualizado.
