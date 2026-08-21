import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { thereExercises } from "@/lib/exercises";

export const metadata = {
  title: "There is / there are · A1 · Practice Inglés",
};

export default function ThereIsArePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        There is / there are
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        El «hay» del español: singular y plural, incontables, negativo con{" "}
        <em>any</em>, preguntas con <em>how many / how much</em>, pasado{" "}
        (<em>there was</em>) y futuro (<em>there will be</em>).
      </p>

      <ExerciseMenu exercises={thereExercises} />
    </main>
  );
}
