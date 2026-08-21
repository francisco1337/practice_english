import Link from "next/link";
import WriteExercise from "@/components/WriteExercise";
import { itemsOf, pickItem } from "@/lib/practice";
import { getPracticeState } from "@/lib/practice-db";

export const metadata = {
  title: "Escribir inverso · A1 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function A1WriteReversePage() {
  const initialState = await getPracticeState("a1-write-rev");
  const initialItem = pickItem(itemsOf(initialState, "verb"), null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Escribir inverso · Verbos A1
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Te damos el verbo en inglés y lo escribes en español. Se aceptan
        sinónimos comunes y no importan los acentos.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <WriteExercise
          exercise="a1-write-rev"
          itemType="verb"
          panelTitle="Verbos"
          direction="en-es"
          initialState={initialState}
          initialItem={initialItem}
        />
      </div>
    </main>
  );
}
