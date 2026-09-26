"use server";

import { z } from "zod";

export type ContactState = { status: "idle" | "success" | "error"; message: string };

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(180),
  message: z.string().trim().min(10).max(3000),
  company: z.string().max(0),
});

export async function sendContactMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Revisa los campos e inténtalo de nuevo. / Please review the fields and try again." };

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return { status: "error", message: "El formulario aún no está configurado. Escríbeme por email. / The form is not configured yet. Please email me." };

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: parsed.data }),
    cache: "no-store",
  });
  if (!response.ok) return { status: "error", message: "No se pudo enviar. Prueba por email. / Could not send. Please try email." };
  return { status: "success", message: "Mensaje enviado. Te responderé pronto. / Message sent. I’ll reply soon." };
}
