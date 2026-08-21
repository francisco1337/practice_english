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

/** Estado del motor de voz del navegador, para poder avisar cuando falla. */
export type SpeechHealth = "desconocido" | "ok" | "sin-respuesta";

/**
 * La Web Speech API es frágil: si una locución se cancela justo cuando iba a
 * empezar, el motor del navegador puede quedarse trabado (speaking = true para
 * siempre) y dejar de reproducir hasta que se cierra el navegador. Por eso aquí
 * NO se confía en synth.speaking: se lleva un estado propio y se evita cancelar
 * salvo cuando de verdad estamos reproduciendo algo.
 */
let hablando = false;
let salud: SpeechHealth = "desconocido";
const saludListeners = new Set<() => void>();

function setSalud(nueva: SpeechHealth) {
  if (salud === nueva) return;
  salud = nueva;
  saludListeners.forEach((listener) => listener());
}

export function useSpeechHealth(): SpeechHealth {
  return useSyncExternalStore(
    (onChange) => {
      saludListeners.add(onChange);
      return () => saludListeners.delete(onChange);
    },
    () => salud,
    () => "desconocido" as SpeechHealth,
  );
}

/**
 * Intenta despertar el motor: cancela lo pendiente, lo reanuda y prueba una
 * locución corta. A veces lo recupera; si no, hay que reiniciar el navegador.
 */
export function resetSpeechEngine(): Promise<boolean> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return Promise.resolve(false);
  }
  const synth = window.speechSynthesis;
  hablando = false;
  synth.cancel();
  if (synth.paused) synth.resume();

  return new Promise((resolve) => {
    window.setTimeout(() => {
      const prueba = new SpeechSynthesisUtterance("Ready.");
      const voice = resolveVoice(readStoredVoice());
      if (voice) prueba.voice = voice;
      prueba.lang = voice?.lang ?? "en-US";
      let arrancó = false;
      prueba.onstart = () => {
        arrancó = true;
        setSalud("ok");
      };
      prueba.onend = () => resolve(arrancó);
      prueba.onerror = () => resolve(false);
      synth.speak(prueba);
      window.setTimeout(() => {
        if (!arrancó) {
          setSalud("sin-respuesta");
          resolve(false);
        }
      }, 1500);
    }, 250);
  });
}

/**
 * Pronuncia texto en inglés con la voz del navegador (Web Speech API).
 * No requiere servicios externos y funciona igual en la laptop y en el celular.
 * En iOS la primera lectura necesita venir de un gesto del usuario: aquí siempre
 * ocurre justo después de responder o de un clic, así que cumple.
 */
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

      const lanzar = () => {
        // La voz se resuelve al hablar: así se usa la que se acaba de elegir.
        const voice = resolveVoice(readStoredVoice());
        const utterance = new SpeechSynthesisUtterance(spoken);
        if (voice) utterance.voice = voice;
        utterance.lang = voice?.lang ?? "en-US";
        utterance.rate = rate;

        let arrancó = false;
        utterance.onstart = () => {
          arrancó = true;
          hablando = true;
          setSalud("ok");
        };
        utterance.onend = () => {
          hablando = false;
        };
        utterance.onerror = () => {
          hablando = false;
        };

        if (synth.paused) synth.resume();
        synth.speak(utterance);

        // Sin cancelar ni reintentar: solo se anota que el motor no respondió,
        // para poder avisarlo en la configuración.
        window.setTimeout(() => {
          if (!arrancó) setSalud("sin-respuesta");
          hablando = false;
        }, 1500);
      };

      if (hablando) {
        // Solo se interrumpe lo que nosotros mismos estamos reproduciendo, y se
        // espera un momento: cancel() es asíncrono y encolar de inmediato hace
        // que el motor cancele también la locución nueva.
        hablando = false;
        synth.cancel();
        window.setTimeout(lanzar, 160);
      } else {
        lanzar();
      }
    },
    [enabled, rate],
  );
}
