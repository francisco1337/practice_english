import Link from "next/link";
import { PLAN_KIND_LABEL, type DailyPlan } from "@/lib/plan";

/** Plan del día en el inicio: qué toca y por dónde seguir. */
export default function DailyPlanCard({ plan }: { plan: DailyPlan }) {
  const siguiente = plan.blocks.find((b) => b.done < b.target);
  const listos = plan.blocks.filter((b) => b.done >= b.target).length;
  const avance = Math.min(100, Math.round((plan.answersToday / plan.goal) * 100));

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold sm:text-lg">Tu plan de hoy</h2>
        <p className="text-sm text-slate-500">
          {plan.answersToday} de {plan.goal} respuestas
          {plan.streak > 0 && ` · racha ${plan.streak} ${plan.streak === 1 ? "día" : "días"}`}
        </p>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-600 transition-all"
          style={{ width: `${avance}%` }}
        />
      </div>

      {plan.blocks.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          No hay nada urgente: ni repasos vencidos ni pendientes activos. Entra a
          cualquier tema y practica lo que quieras.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {plan.blocks.map((block) => {
            const hecho = block.done >= block.target;
            const esSiguiente = block.exercise === siguiente?.exercise;
            return (
              <li key={block.exercise}>
                <Link
                  href={block.href}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    hecho
                      ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                      : esSiguiente
                        ? "border-sky-400 bg-sky-50/60 dark:border-sky-700 dark:bg-sky-950/30"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
                  }`}
                >
                  <span
                    className={`shrink-0 text-sm ${
                      hecho
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    {hecho ? "✓" : esSiguiente ? "▸" : "·"}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {block.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {PLAN_KIND_LABEL[block.kind]}
                    </span>
                  </span>

                  <span className="shrink-0 text-xs tabular-nums text-slate-500">
                    {hecho
                      ? "hecho"
                      : `${Math.min(block.done, block.target)}/${block.target}`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {siguiente && (
          <Link
            href={siguiente.href}
            className="rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700"
          >
            {listos > 0 ? "Seguir" : "Empezar"}
          </Link>
        )}
        {!siguiente && plan.blocks.length > 0 && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Plan de hoy terminado. {plan.correctToday} aciertos de{" "}
            {plan.answersToday}.
          </p>
        )}
        <Link
          href="/configuracion"
          className="text-xs text-slate-500 hover:underline"
        >
          Ajustar o quitar el plan
        </Link>
      </div>
    </section>
  );
}
