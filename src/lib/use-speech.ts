"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * Voces que suenan bien para aprender, en orden de preferencia. Son las
 * naturales de macOS, iOS, Chrome y Windows.
 */
const PREFERRED = [
  "Google US English",
  "Google UK English Female",
  "Google UK English Male",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Samantha",
  "Alex",
  "Ava",
  "Allison",
  "Susan",
  "Daniel",
  "Karen",
  "Moira",
  "Tessa",
  "Rishi",
];

/**
 * Voces de broma o de efectos de sonido: macOS las expone junto a las normales
 * y el navegador puede entregar cualquiera de ellas por defecto (por eso salía
 * «Albert»). No se ofrecen ni se eligen solas.
 */
const NOVELTY = new Set(
  [
    "Albert", "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Buenas noticias",
    "Cellos", "Good News", "Jester", "Junior", "Kathy", "Organ", "Ralph",
    "Superstar", "Trinoids", "Whisper", "Wobble", "Zarvox", "Fred", "Bruce",
    "Agnes", "Princess", "Deranged", "Hysterical", "Malas noticias",
  ].map((n) => n.toLowerCase()),
);

function isNovelty(voice: SpeechSynthesisVoice) {
  return NOVELTY.has(voice.name.toLowerCase());
}

/** Voces en inglés utilizables, con las recomendadas primero. */
export function englishVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith("en") && !isNovelty(v));

  const rank = (v: SpeechSynthesisVoice) => {
    const preferred = PREFERRED.findIndex(
      (name) => name.toLowerCase() === v.name.toLowerCase(),
    );
    if (preferred >= 0) return preferred;
    return PREFERRED.length + (v.lang === "en-US" ? 0 : 1);
  };

  return voices.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

function resolveVoice(voiceName: string | null): SpeechSynthesisVoice | null {
  const voices = englishVoices();
  if (voices.length === 0) return null;
  if (voiceName) {
    const exact = voices.find((v) => v.name === voiceName);
    if (exact) return exact;
  }
  return voices[0];
}

// --- Voz elegida en ESTE dispositivo ---------------------------------------
// Android, Windows, macOS e iOS ofrecen catálogos distintos, así que la voz no
// se sincroniza: se guarda en localStorage del propio equipo.
const VOICE_KEY = "practice_ingles.voice";
const voiceListeners = new Set<() => void>();

export function setStoredVoice(name: string | null) {
  if (typeof window === "undefined") return;
  if (name) window.localStorage.setItem(VOICE_KEY, name);
  else window.localStorage.removeItem(VOICE_KEY);
  voiceListeners.forEach((listener) => listener());
}

function subscribeVoice(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  voiceListeners.add(onChange);
  // «storage» avisa de cambios hechos en otra pestaña del mismo navegador.
  window.addEventListener("storage", onChange);
  return () => {
    voiceListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readStoredVoice(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(VOICE_KEY);
}

export function useStoredVoice(): string | null {
  return useSyncExternalStore(subscribeVoice, readStoredVoice, () => null);
}

const noop = () => () => {};

/**
 * Si el navegador puede pronunciar. Va por useSyncExternalStore porque en el
 * servidor no existe speechSynthesis: así no hay desajuste de hidratación.
 */
export function useSpeechAvailable(): boolean {
  return useSyncExternalStore(
    noop,
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    () => false,
  );
}

/** Lista de voces para el selector de configuración. */
export function useEnglishVoices(): { name: string; lang: string }[] {
  const subscribe = useCallback((onChange: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return () => {};
    }
    window.speechSynthesis.addEventListener("voiceschanged", onChange);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", onChange);
  }, []);

  const snapshotRef = useRef<string>("[]");
  const getSnapshot = useCallback(() => {
    const serialized = JSON.stringify(
      englishVoices().map((v) => ({ name: v.name, lang: v.lang })),
    );
    // useSyncExternalStore exige una referencia estable si nada cambió.
    if (serialized !== snapshotRef.current) snapshotRef.current = serialized;
    return snapshotRef.current;
  }, []);

  const serialized = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  return JSON.parse(serialized) as { name: string; lang: string }[];
}

export type SpeechOptions = {
  enabled: boolean;
  rate?: number;
};

/**
 * Pronuncia texto en inglés con la voz del navegador (Web Speech API).
 * No requiere servicios externos y funciona igual en la laptop y en el celular.
 * En iOS la primera lectura necesita venir de un gesto del usuario: aquí siempre
 * ocurre justo después de responder, así que cumple.
 */
/**
 * Estado propio de reproducción. La API del navegador es poco confiable:
 * speechSynthesis.speaking se queda en true si una locución se cancela en
 * carrera, y a partir de ahí deja de reproducir.
 */
let hablando = false;

export function useSpeech({ enabled, rate = 0.95 }: SpeechOptions) {
  return useCallback(
    (text: string) => {
      if (!enabled) return;
      const clean = text.replace(/\s*\([^)]*\)/g, "").trim();
      if (!clean) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const synth = window.speechSynthesis;
      // Una palabra sola sin puntuación se corta en varios motores; el punto
      // final le da entonación de cierre y evita que se pierda.
      const spoken = /[.?!]$/.test(clean) ? clean : `${clean}.`;

      // La voz se resuelve al momento de hablar: así se usa la que el usuario
      // acaba de elegir, sin esperar a que un efecto refresque nada.
      const build = () => {
        const voice = resolveVoice(readStoredVoice());
        const utterance = new SpeechSynthesisUtterance(spoken);
        if (voice) utterance.voice = voice;
        utterance.lang = voice?.lang ?? "en-US";
        utterance.rate = rate;
        return utterance;
      };

      const lanzar = (reintento: boolean) => {
        const utterance = build();
        let arrancó = false;
        utterance.onstart = () => {
          arrancó = true;
          hablando = true;
        };
        utterance.onend = () => {
          hablando = false;
        };
        utterance.onerror = () => {
          hablando = false;
        };
        if (synth.paused) synth.resume();
        synth.speak(utterance);

        // Si no arrancó, el motor se trabó: se reinicia y se intenta una vez más.
        if (!reintento) {
          window.setTimeout(() => {
            if (arrancó) return;
            synth.cancel();
            hablando = false;
            window.setTimeout(() => lanzar(true), 120);
          }, 400);
        }
      };

      if (synth.speaking || synth.pending || hablando) {
        // cancel() es asíncrono: encolar de inmediato hace que el motor cancele
        // también la nueva locución (error «canceled») y no se oiga nada.
        synth.cancel();
        hablando = false;
        window.setTimeout(() => lanzar(false), 140);
      } else {
        lanzar(false);
      }
    },
    [enabled, rate],
  );
}
