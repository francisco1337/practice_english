import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { a1Groups, examGroup, expressionGroup } from "@/lib/exercises";

export const metadata = {
  title: "A1 · Practice Inglés",
};

export default function A1Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Niveles
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        A1 · Principiante
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Elige qué quieres practicar.
      </p>

      {[...a1Groups, expressionGroup, examGroup].map((group) => (
        <section key={group.id} aria-labelledby={group.id} className="mt-8">
          <h2
            id={group.id}
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {group.title}
          </h2>
          <ExerciseMenu exercises={group.items} />
        </section>
      ))}
    </main>
  );
}
