import Link from "next/link";
import SettingsForm from "@/components/SettingsForm";
import { getSettings } from "@/lib/practice-db";

export const metadata = {
  title: "Configuración · Practice Inglés",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/"
        className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
      >
        ← Inicio
      </Link>

      <h1 className="mt-3 text-xl font-bold tracking-tight sm:text-3xl">
        Configuración
      </h1>
      <p className="mt-1 mb-6 text-sm text-slate-600 dark:text-slate-400">
        Ajustes que valen para toda la app.
      </p>

      <SettingsForm initial={settings} />
    </main>
  );
}
