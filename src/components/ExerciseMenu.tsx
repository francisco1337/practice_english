import Link from "next/link";
import type { ExerciseCard } from "@/lib/exercises";

export default function ExerciseMenu({
  exercises,
}: {
  exercises: ExerciseCard[];
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {exercises.map((exercise) => (
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
          <span className="mt-4 text-sm font-medium text-sky-600 dark:text-sky-400">
            Practicar →
          </span>
        </Link>
      ))}
    </div>
  );
}
