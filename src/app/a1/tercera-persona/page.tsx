import Link from "next/link";
import ExerciseMenu from "@/components/ExerciseMenu";
import { thirdExercises } from "@/lib/exercises";

export const metadata = {
  title: "Tercera persona · A1 · Practice Inglés",
};

export default function ThirdPersonPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/a1"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← A1
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        Tercera persona
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400">
        La -s de <em>he, she, it</em>: cuándo se agrega, cómo se escribe
        (<em>studies</em>, <em>watches</em>, <em>plays</em>), los irregulares
        (<em>has</em>, <em>goes</em>, <em>does</em>, <em>is</em>) y los casos donde{" "}
        <strong>no</strong> va.
      </p>

      <ExerciseMenu exercises={thirdExercises} />
    </main>
  );
}
