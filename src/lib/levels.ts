export type Level = {
  /** Ruta: /a1 */
  href: string;
  code: string;
  name: string;
  description: string;
  available: boolean;
};

/** Niveles del MCER. Agrega A2, B1… cuando estén listos. */
export const levels: Level[] = [
  {
    href: "/a1",
    code: "A1",
    name: "Principiante",
    description:
      "Verbos básicos, pronombres, presente simple y frases del día a día.",
    available: true,
  },
  {
    href: "/a2",
    code: "A2",
    name: "Básico",
    description:
      "90 verbos nuevos, pasado, futuro, modales, comparativos, conectores e inglés de trabajo.",
    available: true,
  },
];
