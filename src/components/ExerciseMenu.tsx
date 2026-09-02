import Link from "next/link";
import type { ExerciseCard } from "@/lib/exercises";
import { getMenuProgress } from "@/lib/menu-progress";

export default async function ExerciseMenu({
  exercises,
}: {
  exercises: ExerciseCard[];
}) {
  const progreso = await getMenuProgress();

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {exercises.map((exercise) => {
        const avance = progreso.forHref(exercise.href);
        return (
          <Link
            key={exercise.href}
            href={exercise.href}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="text-lg font-semibold sm:text-xl">
              {exercise.name}
            </span>
            <span className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {exercise.description}
            </span>

            {/* Pegado abajo para que las barras de una fila queden a la par. */}
            <span className="mt-auto block pt-4">
              {avance && (
                <span className="block">
                  <span className="flex items-baseline justify-between text-xs text-slate-500">
                    <span>{avance.caption}</span>
                    <span className="font-semibold tabular-nums">
                      {avance.percent}%
                    </span>
                  </span>
                  <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <span
                      className={`block h-full rounded-full ${
                        avance.percent === 100 ? "bg-emerald-500" : "bg-sky-600"
                      }`}
                      style={{ width: `${avance.percent}%` }}
                    />
                  </span>
                </span>
              )}

              <span
                className={`block text-sm font-medium text-sky-600 dark:text-sky-400 ${
                  avance ? "mt-3" : ""
                }`}
              >
                {exercise.cta ?? "Practicar"} →
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
