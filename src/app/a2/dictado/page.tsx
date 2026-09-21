import Link from "next/link";
import WriteExercise from "@/components/WriteExercise";
import { itemsOf, pickItem } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Dictado · Verbos A2 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialState = await getPracticeState("a2-dict");
  const initialItem = pickItem(itemsOf(initialState, "verb"), null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a2"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A2
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Dictado · Verbos A2
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Se pronuncia el verbo en inglés y tú lo escribes. Sin niveles: son los 90 verbos, y puedes filtrar cuáles practicar en el panel.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <WriteExercise
          exercise="a2-dict"
          itemType="verb"
          panelTitle="Verbos"
          direction="es-en"
          dictation
          initialState={initialState}
          initialItem={initialItem}
        />
      </div>
    </main>
  );
}
