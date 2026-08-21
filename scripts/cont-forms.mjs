/**
 * Presente continuo: [slug, english, spanish, category, hint]
 * be + verbo-ing: afirmativo, ortografía del -ing, negativo, preguntas,
 * el contraste con el presente simple y los errores típicos.
 */
export const contForms = [
  // Afirmativo
  ["am-ing", "I am working", "yo estoy trabajando", "afirmativo", "Con I va am + verbo-ing: I am working (I'm working)."],
  ["is-ing", "he is working", "él está trabajando", "afirmativo", "Con he, she e it va is + verbo-ing: he is working."],
  ["are-ing", "they are working", "ellos están trabajando", "afirmativo", "Con you, we y they va are + verbo-ing: they are working."],
  ["marker-now", "now, right now, at the moment", "ahora, en este momento", "afirmativo", "El continuo va con now, right now, at the moment, today: acciones de este momento."],

  // Ortografía del -ing
  ["ing-simple", "watching", "observando", "ortografia", "La mayoría solo agrega -ing: watch → watching."],
  ["ing-drop-e", "using", "usando", "ortografia", "Si el verbo termina en -e muda, esa e se quita: use → using, live → living."],
  ["ing-double", "stopping", "deteniendo", "ortografia", "Consonante-vocal-consonante final: se duplica la consonante: stop → stopping, drop → dropping."],
  ["ing-double-plan", "planning", "planeando", "ortografia", "plan → planning, también duplica la n."],
  ["ing-ie-y", "dying", "muriendo", "ortografia", "Los verbos en -ie cambian a y: die → dying."],
  ["ing-y-keeps", "studying", "estudiando", "ortografia", "La y se queda tal cual: study → studying (aquí no cambia como en studies)."],
  ["ing-carry", "carrying", "cargando", "ortografia", "carry → carrying: la y se conserva."],

  // Negativo
  ["neg-am", "I am not working", "yo no estoy trabajando", "negativo", "am not (I'm not). En inglés no existe «amn't»."],
  ["neg-is", "he is not working", "él no está trabajando", "negativo", "is not (isn't) + verbo-ing."],
  ["neg-are", "they are not working", "ellos no están trabajando", "negativo", "are not (aren't) + verbo-ing."],
  ["neg-short", "no, I am not", "no, no estoy", "negativo", "Respuesta corta negativa: No, I am not (I'm not)."],

  // Preguntas
  ["q-am", "am I working?", "¿estoy trabajando?", "pregunta", "Se invierte el verbo be: Am I working?"],
  ["q-is", "is he working?", "¿está trabajando él?", "pregunta", "Is he working? Sin do ni does."],
  ["q-are", "are they working?", "¿están trabajando ellos?", "pregunta", "Are they working?"],
  ["q-short", "yes, he is", "sí, está", "pregunta", "Respuesta corta: Yes, he is / No, he isn't. No se repite el verbo-ing."],
  ["q-wh", "what are you doing?", "¿qué estás haciendo?", "pregunta", "Palabra WH + be + sujeto + verbo-ing: What are you doing?"],

  // Contraste con el presente simple
  ["contrast-now", "he is working now", "está trabajando ahora", "contraste", "El continuo es para lo que pasa AHORA: he is working now."],
  ["contrast-every-day", "he works every day", "trabaja todos los días", "contraste", "Las rutinas van en presente simple: he works every day, no «he is working every day»."],
  ["contrast-state", "I want a coffee", "quiero un café", "contraste", "Los verbos de estado (want, need, prefer, believe, seem) no van en continuo: nunca «I am wanting»."],
  ["contrast-temporary", "she is living in Mexico this year", "está viviendo en México este año", "contraste", "El continuo también sirve para algo temporal: this year, these days."],

  // Errores típicos
  ["trap-no-be", "she is studying (nunca «she studying»)", "no se puede quitar el be", "trampa", "El continuo necesita be: she IS studying. Sin be la frase no existe."],
  ["trap-no-do", "he is not working (nunca «he does not working»)", "sin do ni does", "trampa", "En continuo no se usa do/does: he is not working, is he working?"],
  ["trap-ing-required", "they are playing (nunca «they are play»)", "el verbo lleva -ing", "trampa", "Después de be el verbo va en -ing: they are playing."],
  ["trap-be-agrees", "the children are playing", "el be concuerda con el sujeto", "trampa", "Sujeto plural lleva are: the children are playing, no «the children is playing»."],
];
