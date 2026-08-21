import Link from "next/link";
import LevelCard from "@/components/LevelCard";
import { levels } from "@/lib/levels";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mb-8 flex items-start justify-between gap-4 sm:mb-12">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Practice Inglés
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
            Elige un nivel para empezar a practicar.
          </p>
        </div>

        <Link
          href="/configuracion"
          className="shrink-0 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Configuración
        </Link>
      </header>

      <section aria-labelledby="niveles">
        <h2
          id="niveles"
          className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Niveles
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {levels.map((level) => (
            <LevelCard key={level.href} section={level} />
          ))}
        </div>
      </section>
    </main>
  );
}
