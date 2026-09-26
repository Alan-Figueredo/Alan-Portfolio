"use client";

import type { Locale } from "@/lib/db/queries";

const CAREER_START_DATE = "2021-12-01";

function completedYearsSince(startDate: string) {
  const [year, month, day] = startDate.split("-").map(Number);
  const today = new Date();
  let years = today.getFullYear() - year;

  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    years -= 1;
  }

  return Math.max(0, years);
}

export function ExperienceSummary({ text, locale }: { text: string; locale: Locale }) {
  const years = new Intl.NumberFormat(locale).format(completedYearsSince(CAREER_START_DATE));

  return <p className="heroAbout" suppressHydrationWarning>{text.replace("{years}", years)}</p>;
}
