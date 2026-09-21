import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { a2Groups } from "@/lib/exercises";
import { getMenuProgress } from "@/lib/menu-progress";

export const metadata = {
  title: "A2 · Practice Inglés",
};

export default async function A2Page() {
  const { overall } = await getMenuProgress("A2");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Niveles
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
          A2 · Básico
        </h1>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
          {overall.percent}% dominado
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Elige qué quieres practicar. Llevas {overall.done} de {overall.total}{" "}
        elementos dominados en todo el nivel.
      </p>

      <div className="mt-4 h-2 w-full max-w-2xl overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-600 transition-all"
          style={{ width: `${overall.percent}%` }}
        />
      </div>

      {a2Groups.map((group) => (
        <section key={group.id} aria-labelledby={group.id} className="mt-8">
          <h2
            id={group.id}
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {group.title}
          </h2>
          <ExerciseMenu exercises={group.items} level="A2" />
        </section>
      ))}
    </main>
  );
}
