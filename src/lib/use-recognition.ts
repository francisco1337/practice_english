"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * Reconocimiento de voz del navegador. Chrome (escritorio y Android) y Edge lo
 * traen como webkitSpeechRecognition; Safari lo soporta desde 14.1. Exige
 * contexto seguro: funciona en localhost y en HTTPS, no en http://IP-local.
 */
type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<
    ArrayLike<{ transcript: string; confidence: number }> & { isFinal: boolean }
  >;
};

type RecognitionConstructor = new () => RecognitionLike;

function getConstructor(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type RecognitionStatus =
  | "no-soportado"
  | "sin-contexto-seguro"
  | "listo"
  | "escuchando"
  | "sin-permiso"
  | "sin-voz"
  | "error";

export const RECOGNITION_MESSAGES: Record<RecognitionStatus, string> = {
  "no-soportado":
    "Este navegador no puede escuchar. Chrome (también en Android) y Edge sí; en iPhone, Safari 14.1 o más nuevo.",
  "sin-contexto-seguro":
    "El micrófono solo funciona en HTTPS o en localhost. Abre la app por su dirección https.",
  listo: "",
  escuchando: "Escuchando… habla ahora.",
  "sin-permiso":
    "El navegador no dio permiso del micrófono. Habilítalo en los ajustes del sitio y vuelve a intentar.",
  "sin-voz": "No se escuchó nada. Acércate al micrófono e intenta otra vez.",
  error: "El reconocimiento falló. Revisa tu conexión e intenta otra vez.",
};

const noop = () => () => {};

/**
 * Soporte del navegador, calculado con useSyncExternalStore para que el
 * servidor y el cliente no discrepen al hidratar.
 */
export function useRecognitionSupport():
  | "no-soportado"
  | "sin-contexto-seguro"
  | "ok" {
  return useSyncExternalStore(
    noop,
    () => {
      if (!getConstructor()) return "no-soportado" as const;
      if (!window.isSecureContext) return "sin-contexto-seguro" as const;
      return "ok" as const;
    },
    () => "no-soportado" as const,
  );
}

type Fase = "inactivo" | "escuchando" | "sin-voz" | "sin-permiso" | "error";

export function useRecognition() {
  const support = useRecognitionSupport();
  const [fase, setFase] = useState<Fase>("inactivo");
  const [interim, setInterim] = useState("");
  const recognitionRef = useRef<RecognitionLike | null>(null);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  /** Escucha una frase y entrega la transcripción final al terminar. */
  const listen = useCallback(
    (onFinal: (transcript: string) => void) => {
      const Constructor = getConstructor();
      if (!Constructor || !window.isSecureContext) return;

      recognitionRef.current?.abort();
      const recognition = new Constructor();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let dicho = "";
      let ultimoParcial = "";
      setInterim("");

      recognition.onstart = () => setFase("escuchando");
      recognition.onresult = (event) => {
        let parcial = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const alternativa = event.results[i][0];
          if (event.results[i].isFinal) dicho += `${alternativa.transcript} `;
          else parcial += alternativa.transcript;
        }
        ultimoParcial = parcial.trim();
        setInterim(ultimoParcial);
      };
      recognition.onerror = (event) => {
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setFase("sin-permiso");
        } else if (event.error === "no-speech") {
          setFase("sin-voz");
        } else if (event.error !== "aborted") {
          setFase("error");
        }
      };
      recognition.onend = () => {
        const texto = (dicho.trim() || ultimoParcial).trim();
        setInterim("");
        setFase(texto ? "inactivo" : "sin-voz");
        if (texto) onFinal(texto);
      };

      try {
        recognition.start();
      } catch {
        setFase("error");
      }
    },
    [],
  );

  useEffect(() => () => recognitionRef.current?.abort(), []);

  const status: RecognitionStatus =
    support !== "ok" ? support : fase === "inactivo" ? "listo" : fase;

  return { status, interim, listen, stop };
}
