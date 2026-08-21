"use client";

/** Botón para volver a escuchar el texto en inglés. */
export default function SpeakButton({
  onSpeak,
  label = "Escuchar otra vez",
}: {
  onSpeak: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSpeak}
      title={label}
      aria-label={label}
      className="rounded-lg border border-slate-300 px-2 py-1 text-sm text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      🔊
    </button>
  );
}
