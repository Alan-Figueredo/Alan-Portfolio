import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const settings = await getSiteSettings();
  if (!settings?.cvUrl) return new NextResponse("CV not available", { status: 404 });
  return NextResponse.redirect(new URL(settings.cvUrl, request.url), 307);
}
