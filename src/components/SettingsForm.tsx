"use client";

import { useState } from "react";
import {
  DAILY_GOAL_MAX,
  DAILY_GOAL_MIN,
  MASTERY_TARGET_MAX,
  MASTERY_TARGET_MIN,
  SPEECH_RATE_MAX,
  SPEECH_RATE_MIN,
  type Settings,
} from "@/lib/practice";
import {
  resetSpeechEngine,
  setStoredVoice,
  useEnglishVoices,
  useSpeech,
  useSpeechAvailable,
  useSpeechHealth,
  useStoredVoice,
} from "@/lib/use-speech";

const DEMO = "This is how it sounds. Nice to meet you. There are three books on the table.";

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [settings, setSettings] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const available = useSpeechAvailable();
  const health = useSpeechHealth();
  const [reviving, setReviving] = useState(false);
  const voices = useEnglishVoices();
  const voice = useStoredVoice();
  // En esta pantalla se prueba la voz aunque la pronunciación esté apagada.
  const speak = useSpeech({ enabled: true, rate: settings.speechRate });

  async function save(change: Partial<Settings>) {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(change),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: { settings: Settings } = await res.json();
      setSettings(data.settings);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          {error}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">Pronunciar en inglés</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Con cada acierto se lee en voz alta el texto en inglés. En los
              ejercicios queda además un botón 🔊 para volver a escucharlo.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.speechEnabled}
            aria-label="Pronunciar en inglés"
            disabled={busy}
            onClick={() => {
              const next = !settings.speechEnabled;
              void save({ speechEnabled: next }).then(() => {
                if (next) speak("Nice. Let's practice.");
              });
            }}
            className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
              settings.speechEnabled
                ? "bg-sky-600"
                : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                settings.speechEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {!available ? (
          <p className="mt-4 text-sm text-amber-700 dark:text-amber-300">
            Este navegador no tiene voces disponibles.
          </p>
        ) : (
          <>
            <label className="mt-5 block">
              <span className="text-sm font-medium">Voz</span>
              <select
                value={voice ?? ""}
                onChange={(e) => {
                  const name = e.target.value || null;
                  setStoredVoice(name);
                  speak(DEMO);
                }}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="">
                  Automática{voices[0] ? ` (${voices[0].name})` : ""}
                </option>
                {voices.map((v) => (
                  <option key={`${v.name}-${v.lang}`} value={v.name}>
                    {v.name} · {v.lang}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-xs text-slate-500">
                {voices.length} voces en inglés en este dispositivo. La voz se
                guarda solo aquí, porque cada equipo trae las suyas (Android usa
                las de Google, Windows las de Microsoft, iPhone y Mac las de
                Apple). Al elegirla se escucha de inmediato.
              </span>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-medium">
                Velocidad: {settings.speechRate.toFixed(2)}×
              </span>
              <input
                type="range"
                min={SPEECH_RATE_MIN}
                max={SPEECH_RATE_MAX}
                step={0.05}
                value={settings.speechRate}
                disabled={busy}
                onChange={(e) =>
                  setSettings({ ...settings, speechRate: Number(e.target.value) })
                }
                onMouseUp={(e) => {
                  void save({ speechRate: Number(e.currentTarget.value) }).then(
                    () => speak(DEMO),
                  );
                }}
                onTouchEnd={(e) => {
                  void save({ speechRate: Number(e.currentTarget.value) }).then(
                    () => speak(DEMO),
                  );
                }}
                className="mt-2 w-full accent-sky-600"
              />
              <span className="mt-1 block text-xs text-slate-500">
                Más lento ayuda a distinguir palabras; esta sí se sincroniza
                entre dispositivos.
              </span>
            </label>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => speak(DEMO)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                🔊 Probar la voz
              </button>

              <button
                type="button"
                disabled={reviving}
                onClick={() => {
                  setReviving(true);
                  void resetSpeechEngine().finally(() => setReviving(false));
                }}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {reviving ? "Probando…" : "Reiniciar el motor de voz"}
              </button>

              {health === "ok" && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  El navegador está reproduciendo bien.
                </span>
              )}
            </div>

            {health === "sin-respuesta" && (
              <div className="mt-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                <p className="font-semibold">
                  El navegador aceptó la orden pero no reprodujo nada.
                </p>
                <p className="mt-1">
                  Le pasa a Chrome y a Safari: el motor de voz se traba y deja de
                  sonar hasta que se reinicia. Prueba en este orden:
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  <li>Pulsa «Reiniciar el motor de voz».</li>
                  <li>Revisa que el volumen del sistema no esté en silencio.</li>
                  <li>
                    Cierra el navegador por completo y vuelve a abrirlo: el motor
                    vive en el proceso del navegador, así que recargar la página
                    no lo arregla.
                  </li>
                  <li>Si sigue, prueba otra voz de la lista.</li>
                </ol>
              </div>
            )}
          </>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">Plan del día</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              El inicio propone qué practicar hoy: primero los repasos vencidos,
              luego lo más flojo, y siempre un bloque de oído y uno de boca.
              Apagado, el inicio queda como antes y entras a cada ejercicio por
              tu cuenta.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.dailyPlanEnabled}
            aria-label="Plan del día"
            disabled={busy}
            onClick={() => void save({ dailyPlanEnabled: !settings.dailyPlanEnabled })}
            className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
              settings.dailyPlanEnabled
                ? "bg-sky-600"
                : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                settings.dailyPlanEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {settings.dailyPlanEnabled && (
          <label className="mt-5 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Respuestas por día
            </span>
            <input
              key={settings.dailyGoal}
              type="number"
              min={DAILY_GOAL_MIN}
              max={DAILY_GOAL_MAX}
              step={5}
              defaultValue={settings.dailyGoal}
              disabled={busy}
              onBlur={(e) => {
                const value = Number(e.currentTarget.value);
                if (!Number.isFinite(value)) return;
                const clamped = Math.min(
                  DAILY_GOAL_MAX,
                  Math.max(DAILY_GOAL_MIN, Math.round(value)),
                );
                e.currentTarget.value = String(clamped);
                if (clamped !== settings.dailyGoal) {
                  void save({ dailyGoal: clamped });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-right tabular-nums dark:border-slate-700 dark:bg-slate-800"
            />
          </label>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-semibold">Aciertos para dominar</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Cuántos aciertos hacen falta para marcar algo como dominado y dejar de
          preguntarlo. Un error reinicia ese contador a 0. Aplica a todos los
          ejercicios.
        </p>
        <input
          key={settings.masteryTarget}
          type="number"
          min={MASTERY_TARGET_MIN}
          max={MASTERY_TARGET_MAX}
          defaultValue={settings.masteryTarget}
          disabled={busy}
          onBlur={(e) => {
            const value = Number(e.currentTarget.value);
            if (!Number.isFinite(value)) return;
            const clamped = Math.min(
              MASTERY_TARGET_MAX,
              Math.max(MASTERY_TARGET_MIN, Math.round(value)),
            );
            e.currentTarget.value = String(clamped);
            if (clamped !== settings.masteryTarget) {
              void save({ masteryTarget: clamped });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          className="mt-4 w-20 rounded-lg border border-slate-300 px-3 py-2 text-right tabular-nums dark:border-slate-700 dark:bg-slate-800"
        />
      </section>

      <p className="text-xs text-slate-500">
        {saved
          ? "Guardado. El interruptor y la velocidad valen para todos tus dispositivos; la voz, solo para este."
          : "El interruptor y la velocidad se guardan en la base; la voz, en este dispositivo."}
      </p>
    </div>
  );
}
