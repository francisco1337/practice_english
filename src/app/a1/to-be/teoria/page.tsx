import Link from "next/link";
import TheoryView from "@/components/TheoryView";
import { getTheory } from "@/lib/theory";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Teoría · Verbo to be · Practice Inglés",
};

export default function Page() {
  const theory = getTheory("to-be");
  if (!theory) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/a1/to-be"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Verbo to be
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Teoría · Verbo to be
      </h1>

      <div className="mt-6">
        <TheoryView theory={theory} />
      </div>

      <Link
        href="/a1/to-be"
        className="mt-10 inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
      >
        Ir a practicar
      </Link>
    </main>
  );
}
