"use client";

import { GripVertical, Check, LoaderCircle } from "lucide-react";
import { useState, useTransition, type ReactNode } from "react";
import { reorderContentAction, saveSectionOrderAction } from "./actions";
import { useAdminToast } from "./admin-feedback";
import type { SectionKey } from "@/lib/db/queries";

type SortableItem = { id: number; label: string };

export function SortableAdminList({ kind, items, children }: { kind: "experience" | "projects" | "technologies" | "education"; items: SortableItem[]; children: ReactNode[] }) {
  const [order, setOrder] = useState(items);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const showToast = useAdminToast();

  function move(targetId: number) {
    if (draggedId === null || draggedId === targetId) return;
    setOrder((current) => {
      const next = [...current];
      const from = next.findIndex((item) => item.id === draggedId);
      const to = next.findIndex((item) => item.id === targetId);
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function save() {
    setSaved(false);
    startTransition(async () => {
      try {
        await reorderContentAction(kind, order.map((item) => item.id));
        setSaved(true);
        showToast({ type: "success", message: "Orden subido correctamente." });
      } catch (error) {
        showToast({ type: "error", message: error instanceof Error ? error.message : "No se ha podido subir el orden." });
      }
    });
  }

  const childrenById = new Map(items.map((item, index) => [item.id, children[index]]));
  return <>
    <div className="sortableList" aria-label={`Orden de ${kind}`}>
      {order.map((item) => <div key={item.id} className={`sortableItem${draggedId === item.id ? " sortableDragging" : ""}`} onDragOver={(event) => { event.preventDefault(); move(item.id); }}>
        <button type="button" className="dragHandle" draggable aria-label={`Mover ${item.label}`} onDragStart={() => setDraggedId(item.id)} onDragEnd={() => setDraggedId(null)} title="Arrastra para reordenar"><GripVertical size={18} /></button>
        <div className="sortableContent">{childrenById.get(item.id)}</div>
      </div>)}
    </div>
    {items.length > 1 && <div className="sortActions"><button type="button" className="sortSave" onClick={save} disabled={isPending}>{isPending ? <LoaderCircle size={15} className="spin" /> : saved ? <Check size={15} /> : null}{isPending ? "Subiendo cambios…" : saved ? "Orden guardado" : "Guardar orden"}</button></div>}
  </>;
}

const sectionLabels: Record<SectionKey, string> = { experience: "Experiencia", projects: "Proyectos", technologies: "Tecnologías", education: "Formación", personal: "Idiomas e intereses", contact: "Contacto" };

export function SectionOrderEditor({ initialOrder }: { initialOrder: SectionKey[] }) {
  const [order, setOrder] = useState(initialOrder);
  const [dragged, setDragged] = useState<SectionKey | null>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const showToast = useAdminToast();
  function move(target: SectionKey) {
    if (!dragged || dragged === target) return;
    setOrder((current) => { const next = [...current]; const from = next.indexOf(dragged); const to = next.indexOf(target); const [item] = next.splice(from, 1); next.splice(to, 0, item); return next; });
  }
  function save() { setSaved(false); startTransition(async () => { try { await saveSectionOrderAction(order); setSaved(true); showToast({ type: "success", message: "Orden de secciones subido correctamente." }); } catch (error) { showToast({ type: "error", message: error instanceof Error ? error.message : "No se ha podido subir el orden." }); } }); }
  return <details className="sectionOrderEditor">
    <summary>Editar orden de secciones</summary>
    <p>Arrastra las secciones para decidir cómo aparecen en la web principal.</p>
    <div className="sectionOrderList">
      {order.map((key, index) => <div key={key} className="sectionOrderItem" onDragOver={(event) => { event.preventDefault(); move(key); }}>
        <button type="button" className="dragHandle" draggable aria-label={`Mover ${sectionLabels[key]}`} onDragStart={() => setDragged(key)} onDragEnd={() => setDragged(null)}><GripVertical size={18} /></button><span><b>{String(index + 1).padStart(2, "0")}</b>{sectionLabels[key]}</span>
      </div>)}
    </div>
    <button type="button" className="sortSave" onClick={save} disabled={isPending}>{isPending ? <><LoaderCircle size={15} className="spin" />Subiendo cambios…</> : saved ? "Orden guardado" : "Guardar orden de secciones"}</button>
  </details>;
}
