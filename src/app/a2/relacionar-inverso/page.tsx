import Link from "next/link";
import MatchExercise from "@/components/MatchExercise";
import { buildQuestion, itemsOf } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Relacionar inverso · A2 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function A2MatchReversePage() {
  const initialState = await getPracticeState("a2-match-rev");
  const initialQuestion = buildQuestion(itemsOf(initialState, "verb"), null, "en-es");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a2"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A2
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Relacionar inverso · Verbos A2
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Te damos el verbo en inglés y eliges qué significa en español.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <MatchExercise
          exercise="a2-match-rev"
          itemType="verb"
          panelTitle="Verbos"
          direction="en-es"
          initialState={initialState}
          initialQuestion={initialQuestion}
        />
      </div>
    </main>
  );
}
