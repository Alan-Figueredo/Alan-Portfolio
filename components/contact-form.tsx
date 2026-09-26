"use client";

import { useActionState } from "react";
import type { Locale } from "@/lib/db/queries";
import { copy } from "@/lib/i18n";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, action, pending] = useActionState(sendContactMessage, initialState);
  const t = copy[locale];
  return (
    <form action={action} className="contactForm">
      <div className="honeypot" aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <label>{t.name}<input name="name" minLength={2} maxLength={80} required autoComplete="name" /></label>
      <label>{t.email}<input name="email" type="email" maxLength={180} required autoComplete="email" /></label>
      <label>{t.message}<textarea name="message" rows={5} minLength={10} maxLength={3000} required /></label>
      <button className="primaryButton" disabled={pending}>{pending ? t.sending : t.send}</button>
      <p className={`formStatus ${state.status}`} role="status" aria-live="polite">{state.message}</p>
    </form>
  );
}
