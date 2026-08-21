import Link from "next/link";
import MatchExercise from "@/components/MatchExercise";
import { buildQuestion, itemsOf } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Relacionar pronombres · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function PronounMatchPage() {
  const initialState = await getPracticeState("pron-match");
  const initialQuestion = buildQuestion(itemsOf(initialState, "pronoun"), null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/pronombres"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Pronombres
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Relacionar · Pronombres
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Elige el pronombre correcto en inglés. Ojo con los que se escriben igual
        (you, her, his, it): la pista está en el uso que dice el español.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <MatchExercise
          exercise="pron-match"
          itemType="pronoun"
          panelTitle="Pronombres"
          initialState={initialState}
          initialQuestion={initialQuestion}
        />
      </div>
    </main>
  );
}
