"use client";

import { useCallback, useState } from "react";
import type { ExerciseKey, ItemType, PracticeState } from "./practice";

/**
 * Estado del ejercicio en el cliente. Cada acción llama a la API y reemplaza el
 * estado con lo que responde el servidor, que es la fuente de verdad.
 */
export function usePracticeState(
  exercise: ExerciseKey,
  initialState: PracticeState,
) {
  const [state, setState] = useState(initialState);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = useCallback(
    async (path: string, body: unknown): Promise<PracticeState | null> => {
      setBusy(true);
      setError(null);
      try {
        const res = await fetch(path, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: PracticeState = await res.json();
        setState(data);
        return data;
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "No se pudo guardar el progreso",
        );
        return null;
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  const registerAnswer = useCallback(
    (itemType: ItemType, itemId: number, correct: boolean) =>
      post(`/api/practice/${exercise}/answer`, { itemType, itemId, correct }),
    [exercise, post],
  );

  const setActive = useCallback(
    (itemType: ItemType, itemIds: number[], active: boolean) =>
      post(`/api/practice/${exercise}/active`, { itemType, itemIds, active }),
    [exercise, post],
  );

  const resetProgress = useCallback(
    (itemType?: ItemType, itemId?: number) =>
      post(`/api/practice/${exercise}/reset`, { itemType, itemId }),
    [exercise, post],
  );

  const setMasteryTarget = useCallback(
    (masteryTarget: number) =>
      post("/api/settings", { masteryTarget, exercise }),
    [exercise, post],
  );

  return {
    state,
    setState,
    busy,
    error,
    setError,
    registerAnswer,
    setActive,
    resetProgress,
    setMasteryTarget,
  };
}
