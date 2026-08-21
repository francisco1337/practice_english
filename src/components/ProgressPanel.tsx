"use client";

import { useMemo, useState } from "react";
import {
  MASTERY_TARGET_MAX,
  MASTERY_TARGET_MIN,
  type PracticeItem,
} from "@/lib/practice";

export default function ProgressPanel({
  title,
  items,
  masteryTarget,
  busy,
  primary = "answer",
  showCounters = true,
  onToggleActive,
  onReset,
  onSetMasteryTarget,
}: {
  title: string;
  items: PracticeItem[];
  masteryTarget: number;
  busy: boolean;
  /** Cuál de los dos idiomas va como título de cada renglón. */
  primary?: "answer" | "prompt";
  /** false para listas que solo filtran (los verbos en «traducir frase»). */
  showCounters?: boolean;
  onToggleActive: (itemIds: number[], active: boolean) => void;
  onReset?: (itemId?: number) => void;
  onSetMasteryTarget?: (masteryTarget: number) => void;
}) {
  const [filter, setFilter] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const mastered = items.filter((v) => v.mastered).length;
  const active = items.filter((v) => v.active).length;

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (v) =>
        v.answer.toLowerCase().includes(q) || v.prompt.toLowerCase().includes(q),
    );
  }, [items, filter]);

  /** El input es no controlado: se confirma al salir del campo o con Enter. */
  function commitTarget(input: HTMLInputElement) {
    if (!onSetMasteryTarget) return;
    const value = Number(input.value);
    if (!Number.isFinite(value) || input.value.trim() === "") {
      input.value = String(masteryTarget);
      return;
    }
    const clamped = Math.min(
      MASTERY_TARGET_MAX,
      Math.max(MASTERY_TARGET_MIN, Math.round(value)),
    );
    input.value = String(clamped);
    if (clamped !== masteryTarget) onSetMasteryTarget(clamped);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <span className="text-sm text-slate-500">
          {showCounters
            ? `${mastered} / ${items.length} dominados`
            : `${active} / ${items.length} activos`}
        </span>
      </div>

      {showCounters && (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${items.length ? (mastered / items.length) * 100 : 0}%`,
            }}
          />
        </div>
      )}

      {onSetMasteryTarget && (
        <>
          <label className="mt-4 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Aciertos para dominar
            </span>
            <input
              key={masteryTarget}
              type="number"
              min={MASTERY_TARGET_MIN}
              max={MASTERY_TARGET_MAX}
              defaultValue={masteryTarget}
              disabled={busy}
              onBlur={(e) => commitTarget(e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitTarget(e.currentTarget);
                  e.currentTarget.blur();
                }
              }}
              className="w-16 rounded-lg border border-slate-300 px-2 py-1 text-right tabular-nums dark:border-slate-700 dark:bg-slate-800"
            />
          </label>
          <p className="mt-1 text-xs text-slate-500">
            Un error reinicia el contador a 0.
          </p>
        </>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          disabled={busy}
          onClick={() => onToggleActive(items.map((v) => v.id), true)}
          className="rounded-lg border border-slate-300 px-2.5 py-1.5 font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Todos
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => onToggleActive(items.map((v) => v.id), false)}
          className="rounded-lg border border-slate-300 px-2.5 py-1.5 font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Ninguno
        </button>
        {onReset && (
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              // Doble clic para confirmar, sin diálogo del navegador.
              if (!confirmReset) {
                setConfirmReset(true);
                return;
              }
              setConfirmReset(false);
              onReset(undefined);
            }}
            onBlur={() => setConfirmReset(false)}
            className={`rounded-lg border px-2.5 py-1.5 font-medium disabled:opacity-50 ${
              confirmReset
                ? "border-rose-600 bg-rose-600 text-white"
                : "border-slate-300 text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:text-rose-400 dark:hover:bg-rose-950"
            }`}
          >
            {confirmReset ? "¿Seguro?" : "Reiniciar todo"}
          </button>
        )}
        {showCounters && (
          <span className="ml-auto self-center text-slate-500">
            {active} activos
          </span>
        )}
      </div>

      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar…"
        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
      />

      <ul className="mt-3 max-h-72 divide-y divide-slate-100 overflow-y-auto lg:max-h-[46vh] dark:divide-slate-800">
        {visible.map((item) => (
          <li key={item.id} className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              checked={item.active}
              disabled={busy}
              onChange={(e) => onToggleActive([item.id], e.target.checked)}
              className="size-4 shrink-0 accent-sky-600"
              aria-label={`Practicar ${item.answer}`}
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {primary === "answer" ? item.answer : item.prompt}
                {item.mastered && showCounters && (
                  <span className="ml-1.5 text-emerald-600 dark:text-emerald-400">
                    ✓
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-slate-500">
                {primary === "answer" ? item.prompt : item.answer}
              </p>
            </div>

            {showCounters && (
              <span
                className={`shrink-0 text-xs tabular-nums ${
                  item.dueForReview
                    ? "font-semibold text-amber-600 dark:text-amber-400"
                    : item.mastered
                      ? "font-semibold text-emerald-600 dark:text-emerald-400"
                      : "text-slate-500"
                }`}
                title={
                  item.mastered && item.reviewInDays !== null
                    ? item.dueForReview
                      ? "Toca repasarlo"
                      : `Próximo repaso en ${item.reviewInDays} días`
                    : undefined
                }
              >
                {item.mastered && item.reviewInDays !== null
                  ? item.dueForReview
                    ? "repaso"
                    : `↻ ${item.reviewInDays}d`
                  : `${item.correctCount}/${masteryTarget}`}
              </span>
            )}

            {onReset && (
              <button
                type="button"
                disabled={
                  busy || (item.correctCount === 0 && item.wrongCount === 0)
                }
                onClick={() => onReset(item.id)}
                title={`Reiniciar contador de ${item.answer}`}
                className="shrink-0 rounded-md px-1.5 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                ↺
              </button>
            )}
          </li>
        ))}
        {visible.length === 0 && (
          <li className="py-4 text-center text-sm text-slate-500">
            Sin resultados
          </li>
        )}
      </ul>
    </section>
  );
}
