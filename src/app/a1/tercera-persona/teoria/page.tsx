import Link from "next/link";
import TheoryView from "@/components/TheoryView";
import { getTheory } from "@/lib/theory";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Teoría · Tercera persona · Practice Inglés",
};

export default function Page() {
  const theory = getTheory("tercera-persona");
  if (!theory) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/tercera-persona"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Tercera persona
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Teoría · Tercera persona
      </h1>

      <div className="mt-6">
        <TheoryView theory={theory} />
      </div>

      <Link
        href="/a1/tercera-persona"
        className="mt-10 inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
      >
        Ir a practicar
      </Link>
    </main>
  );
}
