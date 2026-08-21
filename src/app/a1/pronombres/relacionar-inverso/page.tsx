import Link from "next/link";
import MatchExercise from "@/components/MatchExercise";
import { buildQuestion, itemsOf } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Relacionar inverso · Pronombres · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function PronounMatchReversePage() {
  const initialState = await getPracticeState("pron-match-rev");
  const initialQuestion = buildQuestion(itemsOf(initialState, "pronoun"), null, "en-es");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/pronombres"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Pronombres
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Relacionar inverso · Pronombres
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Te damos el pronombre en inglés y eliges cuál es en español. Con los que
        se escriben igual (you, her, his, it) nunca aparecen dos opciones
        válidas: la respuesta dice el uso.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <MatchExercise
          exercise="pron-match-rev"
          itemType="pronoun"
          panelTitle="Pronombres"
          direction="en-es"
          initialState={initialState}
          initialQuestion={initialQuestion}
        />
      </div>
    </main>
  );
}
