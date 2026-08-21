import Link from "next/link";
import MatchExercise from "@/components/MatchExercise";
import { buildQuestion, itemsOf } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Relacionar to be · A1 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function ToBeMatchPage() {
  const initialState = await getPracticeState("tobe-match");
  const initialQuestion = buildQuestion(itemsOf(initialState, "tobe"), null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/to-be"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Verbo to be
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Relacionar · Verbo to be
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Te damos la forma en español y eliges cómo se dice en inglés.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <MatchExercise
          exercise="tobe-match"
          itemType="tobe"
          panelTitle="Formas de to be"
          initialState={initialState}
          initialQuestion={initialQuestion}
        />
      </div>
    </main>
  );
}
