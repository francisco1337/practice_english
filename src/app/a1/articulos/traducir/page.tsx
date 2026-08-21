import Link from "next/link";
import SentenceExercise from "@/components/SentenceExercise";
import { getNextSentence, getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Traducir frase con artículos · A1 · Practice Inglés",
};

export const dynamic = "force-dynamic";

const INITIAL_LEVEL = 1;

export default async function ArticleTranslatePage() {
  const [initialState, initialSentence] = await Promise.all([
    getPracticeState("art-translate"),
    getNextSentence("art-translate", INITIAL_LEVEL),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/articulos"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Artículos
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Traducir frase · Artículos
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Lee la frase en español y escríbela en inglés. Cada frase practica un
        uso del artículo; al fallar te explicamos ese uso.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SentenceExercise
          exercise="art-translate"
          panels={[{ itemType: "article", title: "Artículos" }]}
          initialState={initialState}
          initialSentence={initialSentence}
          initialLevel={INITIAL_LEVEL}
        />
      </div>
    </main>
  );
}
