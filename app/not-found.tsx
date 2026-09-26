import Link from "next/link";

export default function NotFound() {
  return <main className="emptyState"><div><h1>404</h1><p>Esta página no existe.</p><Link href="/es">Volver al portfolio</Link></div></main>;
}
