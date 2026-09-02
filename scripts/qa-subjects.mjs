import { advForms } from "./adv-forms.mjs";
import { verbForms } from "./verb-forms.mjs";

/**
 * Saca el sujeto de la pregunta y el de la respuesta de un par con do / does.
 *
 * En «traducir el par» y en «preguntar y responder» el español no siempre dice
 * quién es el sujeto («¿Trabaja aquí?» puede ser él, ella o usted), y ahí lo
 * que se está practicando es elegir do o does. Estos sujetos se guardan en la
 * base y se muestran como pista para que la duda sea do/does y no adivinar el
 * pronombre.
 *
 * La regla: el sujeto va entre el auxiliar y el primer verbo o adverbio.
 */

/** Todas las formas verbales conocidas: donde empieza el verbo, termina el sujeto. */
const VERBOS = new Set();
for (const [base, tercera, ing, pasado, participio] of verbForms) {
  for (const forma of [base, tercera, ing, pasado, participio]) VERBOS.add(forma);
}
// Verbos que no están en la lista A1 pero aparecen en los pares.
for (const forma of [
  "be", "am", "is", "are", "was", "were", "being", "been",
  "have", "has", "had", "having", "do", "does", "did", "done", "doing",
  "want", "wants", "work", "works", "live", "lives", "pass", "passes",
  "happen", "happens", "watch", "watches", "visit", "visits", "wait", "waits",
]) {
  VERBOS.add(forma);
}

const ADVERBIOS = new Set(advForms.map(([, english]) => english));
for (const adverbio of ["ever", "never", "always", "still", "just", "also", "really"]) {
  ADVERBIOS.add(adverbio);
}

/** Palabras que cierran el sujeto. */
const CORTE = new Set([...VERBOS, ...ADVERBIOS, "not", "no"]);

const WH = /^(what|where|when|why|who|whom|which|whose|how)$/;
const AUXILIAR = /^(do|does|did)$/;

const limpiar = (palabra) => palabra.toLowerCase().replace(/[?.,!"']/g, "");
const sinPuntuacion = (palabra) => palabra.replace(/[?.,!"]/g, "");

/** Junta palabras hasta la primera que cierra el sujeto. */
function hasta(palabras) {
  const sujeto = [];
  for (const palabra of palabras) {
    if (CORTE.has(limpiar(palabra))) break;
    sujeto.push(sinPuntuacion(palabra));
  }
  return sujeto.join(" ");
}

/** «I» se queda en mayúscula; lo demás se muestra en minúscula. */
function normalizar(sujeto) {
  return sujeto === "I" ? sujeto : sujeto.charAt(0).toLowerCase() + sujeto.slice(1);
}

function sujetoDePregunta(english) {
  const palabras = english.split(/\s+/);
  let i = WH.test(limpiar(palabras[0])) ? 1 : 0;
  if (!AUXILIAR.test(limpiar(palabras[i] ?? ""))) return "";
  return hasta(palabras.slice(i + 1));
}

function sujetoDeRespuesta(english) {
  const sinSiNo = english.replace(/^(Yes|No),\s*/i, "");
  return hasta(sinSiNo.split(/\s+/));
}

/**
 * Sujetos de un par. Los pares pueden traer el suyo escrito a mano como
 * `"the car|it"` cuando la forma de la frase no se deja leer sola.
 */
export function qaSubjects(englishQuestion, englishAnswer, manual) {
  if (manual) {
    const [question = "", answer = ""] = manual.split("|");
    if (!question || !answer) {
      throw new Error(`Sujetos escritos a mano incompletos: "${manual}"`);
    }
    return { question, answer };
  }

  const question = sujetoDePregunta(englishQuestion);
  const answer = sujetoDeRespuesta(englishAnswer);
  if (!question || !answer) {
    throw new Error(
      `No se pudo leer el sujeto de «${englishQuestion} / ${englishAnswer}». ` +
        "Agrega el sujeto a mano al final de la fila, por ejemplo \"the car|it\".",
    );
  }
  return { question: normalizar(question), answer: normalizar(answer) };
}
