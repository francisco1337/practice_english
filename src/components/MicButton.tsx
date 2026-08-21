"use client";

import {
  RECOGNITION_MESSAGES,
  type RecognitionStatus,
} from "@/lib/use-recognition";

/** Botón de micrófono con su estado, compartido por los ejercicios de hablar. */
export default function MicButton({
  status,
  interim,
  onListen,
  onStop,
  disabled = false,
}: {
  status: RecognitionStatus;
  interim: string;
  onListen: () => void;
  onStop: () => void;
  disabled?: boolean;
}) {
  const bloqueado =
    status === "no-soportado" || status === "sin-contexto-seguro";
  const escuchando = status === "escuchando";
  const mensaje = RECOGNITION_MESSAGES[status];

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        disabled={disabled || bloqueado}
        onClick={escuchando ? onStop : onListen}
        aria-label={escuchando ? "Detener" : "Hablar"}
        className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white transition disabled:opacity-40 ${
          escuchando
            ? "animate-pulse bg-rose-600"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {escuchando ? "■" : "🎤"}
      </button>

      <p className="min-h-5 text-center text-sm text-slate-600 dark:text-slate-400">
        {escuchando && interim ? `«${interim}»` : mensaje || "Toca y habla."}
      </p>
    </div>
  );
}
