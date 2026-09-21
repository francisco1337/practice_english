import Link from "next/link";
import VerbList from "@/components/VerbList";
import { getSettings, getVerbList } from "@/lib/practice-db";

export const metadata = {
  title: "Lista de verbos · A2 · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function VerbListPage() {
  const [verbs, settings] = await Promise.all([getVerbList("A2"), getSettings()]);
  const irregular = verbs.filter((v) => v.irregular).length;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a2"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A2
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Lista de verbos · A2
      </h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Los {verbs.length} verbos con sus formas: tercera persona, -ing, pasado y
        participio, más un ejemplo en cada tiempo. En listas separadas:{" "}
        {irregular} irregulares y {verbs.length - irregular} regulares. Toca un
        verbo para ver sus tiempos y escucharlo.
      </p>

      <div className="mt-6">
        <VerbList
          verbs={verbs}
          level="A2"
          speechEnabled={settings.speechEnabled}
          speechRate={settings.speechRate}
        />
      </div>
    </main>
  );
}
