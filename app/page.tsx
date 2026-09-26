import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPreferredLocale } from "@/lib/i18n";

export default async function Home() {
  const requestHeaders = await headers();
  const locale = getPreferredLocale(requestHeaders.get("accept-language"));
  redirect(`/${locale}`);
}
