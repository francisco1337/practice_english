import Link from "next/link";
import type { Level } from "@/lib/levels";

export default function LevelCard({ section }: { section: Level }) {
  const content = (
    <>
      <span className="text-2xl font-bold tracking-tight text-sky-600 sm:text-3xl dark:text-sky-400">
        {section.code}
      </span>
      <span className="mt-1 text-base font-semibold sm:text-lg">
        {section.name}
      </span>
      <span className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {section.description}
      </span>
    </>
  );

  const base = "flex h-full flex-col rounded-2xl border p-5 text-left sm:p-6";

  if (!section.available) {
    return (
      <div
        className={`${base} border-slate-200 bg-white/60 opacity-60 dark:border-slate-800 dark:bg-slate-900/40`}
        aria-disabled="true"
      >
        {content}
        <span className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
          Próximamente
        </span>
      </div>
    );
  }

  return (
    <Link
      href={section.href}
      className={`${base} border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-800 dark:bg-slate-900`}
    >
      {content}
      <span className="mt-4 text-sm font-medium text-sky-600 dark:text-sky-400">
        Empezar →
      </span>
    </Link>
  );
}
