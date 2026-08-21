"use client";

import Link from "next/link";

/**
 * Pantalla de error de las páginas que leen la base. El caso típico es que la
 * base no esté accesible (sin red, o el servidor rechazando la conexión).
 */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
        No pudimos cargar tu progreso
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        Casi siempre es la conexión con la base de datos: revisa que tengas red
        y vuelve a intentar. Tu avance está guardado en la base, no se pierde.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
