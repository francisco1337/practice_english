import Link from "next/link";
import { notFound } from "next/navigation";
import TheoryView from "@/components/TheoryView";
import { findA2Topic } from "@/lib/a2";

export async function generateMetadata({
  params,
}: PageProps<"/a2/[tema]/teoria">) {
  const topic = findA2Topic((await params).tema);
  return { title: `Teoría · ${topic?.title ?? "A2"} · Practice Inglés` };
}

export default async function Page({ params }: PageProps<"/a2/[tema]/teoria">) {
  const topic = findA2Topic((await params).tema);
  if (!topic?.theory) notFound();
  const back = `/a2/${topic.slug}`;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href={back}
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← {topic.title}
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Teoría · {topic.title}
      </h1>

      <div className="mt-6">
        <TheoryView theory={topic.theory} />
      </div>

      <Link
        href={back}
        className="mt-10 inline-block rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
      >
        Ir a practicar
      </Link>
    </main>
  );
}
