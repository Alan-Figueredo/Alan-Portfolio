"use client";

import { LoaderCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useTransition, type FormEvent, type ReactNode } from "react";

type Toast = { type: "success" | "error"; message: string };
type AdminAction = (data: FormData) => Promise<void>;

const ToastContext = createContext<(toast: Toast) => void>(() => undefined);
const PendingContext = createContext(false);

export function AdminFeedback({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return <ToastContext.Provider value={setToast}>
    {children}
    {toast && <div className={`adminToast ${toast.type}`} role="status" aria-live="polite">
      <span>{toast.message}</span><button type="button" aria-label="Cerrar mensaje" onClick={() => setToast(null)}><X size={16} /></button>
    </div>}
  </ToastContext.Provider>;
}

export function useAdminToast() {
  return useContext(ToastContext);
}

export function AdminForm({ action, children, successMessage = "Cambios subidos correctamente.", className }: { action: AdminAction; children: ReactNode; successMessage?: string; className?: string }) {
  const [isPending, startTransition] = useTransition();
  const showToast = useAdminToast();
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      try {
        await action(data);
        showToast({ type: "success", message: successMessage });
        router.refresh();
      } catch (error) {
        showToast({ type: "error", message: error instanceof Error ? error.message : "No se han podido subir los cambios." });
      }
    });
  }

  return <PendingContext.Provider value={isPending}><form action={action} onSubmit={submit} className={className}>{children}</form></PendingContext.Provider>;
}

export function AdminSubmitButton({ children, className = "save", loadingLabel = "Subiendo cambios…" }: { children: ReactNode; className?: string; loadingLabel?: string }) {
  const isPending = useContext(PendingContext);
  return <button type="submit" className={className} disabled={isPending}>{isPending ? <><LoaderCircle size={15} className="spin" />{loadingLabel}</> : children}</button>;
}

export function AdminActionButton({ children, className = "danger", loadingLabel = "Subiendo cambios…" }: { children: ReactNode; className?: string; loadingLabel?: string }) {
  const isPending = useContext(PendingContext);
  return <button type="submit" className={className} disabled={isPending}>{isPending ? <><LoaderCircle size={15} className="spin" />{loadingLabel}</> : children}</button>;
}
