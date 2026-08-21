import Link from "next/link";
import { REVIEW_INTERVALS } from "@/lib/practice";
import { getReviewSummary } from "@/lib/practice-db";
import { EXERCISE_INFO } from "@/lib/review-labels";

export const metadata = {
  title: "Repaso · A1 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const summary = await getReviewSummary();
  const due = summary.filter((r) => r.due > 0);
  const upcoming = summary
    .filter((r) => r.due === 0 && r.nextInDays !== null)
    .sort((a, b) => (a.nextInDays ?? 0) - (b.nextInDays ?? 0));

  const totalDue = summary.reduce((a, r) => a + r.due, 0);
  const totalWeek = summary.reduce((a, r) => a + r.thisWeek, 0);
  const totalMastered = summary.reduce((a, r) => a + r.mastered, 0);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Repaso espaciado
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Lo que dominas no desaparece: vuelve a los {REVIEW_INTERVALS.join(", ")}{" "}
        días. Si lo aciertas se aleja al siguiente intervalo; si lo fallas
        regresa a la práctica normal desde cero.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Toca hoy", value: totalDue, tone: "text-amber-600 dark:text-amber-400" },
          { label: "Esta semana", value: totalWeek, tone: "" },
          { label: "Dominado", value: totalMastered, tone: "text-emerald-600 dark:text-emerald-400" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className={`text-2xl font-bold tabular-nums ${card.tone}`}>
              {card.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Pendiente de repasar
      </h2>
      {due.length === 0 ? (
        <p className="mt-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          Nada por repasar hoy. Los repasos aparecen aquí cuando les toca, y
          también se cuelan solos en el ejercicio correspondiente.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {due.map((row) => {
            const info = EXERCISE_INFO[row.exercise];
            return (
              <li key={`${row.exercise}-${row.itemType}`}>
                <Link
                  href={info?.href ?? "/a1"}
                  className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50/60 px-4 py-3 transition hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/30"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {info?.name ?? row.exercise}
                  </span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-amber-700 dark:text-amber-300">
                    {row.due}
                  </span>
                  <span className="shrink-0 text-sm text-sky-600 dark:text-sky-400">
                    Repasar →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {upcoming.length > 0 && (
        <>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Programado
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {upcoming.map((row) => {
              const info = EXERCISE_INFO[row.exercise];
              return (
                <li
                  key={`${row.exercise}-${row.itemType}`}
                  className="flex items-center gap-3 px-1 text-slate-600 dark:text-slate-400"
                >
                  <span className="min-w-0 flex-1 truncate">
                    {info?.name ?? row.exercise}
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {row.mastered} dominados
                  </span>
                  <span className="shrink-0 tabular-nums">
                    el más cercano en {row.nextInDays}{" "}
                    {row.nextInDays === 1 ? "día" : "días"}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <p className="mt-8 text-xs text-slate-500">
        No hace falta entrar aquí: cuando algo vence, el propio ejercicio lo
        vuelve a preguntar y lo marca como repaso. Esta pantalla es para saber
        qué te espera.
      </p>
    </main>
  );
}
