/**
 * Presente simple (rutinas): [slug, english, spanish, category, hint]
 * Cubre afirmativo, la -s de tercera persona con sus reglas de ortografía,
 * negativo con do/does, preguntas y adverbios de frecuencia.
 */
export const presentForms = [
  // Afirmativo
  ["ps-i", "I work", "yo trabajo", "afirmativo", "En afirmativo el verbo va igual que el infinitivo, salvo en tercera persona: I work."],
  ["ps-you", "you work", "tú trabajas", "afirmativo", "you work, sin -s (you sirve para singular y plural)."],
  ["ps-he", "he works", "él trabaja", "afirmativo", "Con he, she e it el verbo lleva -s: he works."],
  ["ps-she", "she works", "ella trabaja", "afirmativo", "Con he, she e it el verbo lleva -s: she works."],
  ["ps-it", "it works", "eso funciona", "afirmativo", "it works: la -s de tercera persona también aplica a las cosas."],
  ["ps-we", "we work", "nosotros trabajamos", "afirmativo", "we work, sin -s."],
  ["ps-they", "they work", "ellos trabajan", "afirmativo", "they work, sin -s."],

  // Ortografía de la tercera persona
  ["sp-studies", "she studies", "ella estudia", "ortografia", "Consonante + y: la y se cambia por ies: study → studies."],
  ["sp-carries", "he carries", "él carga", "ortografia", "Consonante + y: carry → carries."],
  ["sp-tries", "she tries", "ella intenta", "ortografia", "Consonante + y: try → tries."],
  ["sp-watches", "he watches", "él observa", "ortografia", "Verbos en -ch, -sh, -s, -x y -o llevan -es: watch → watches."],
  ["sp-pushes", "he pushes", "él empuja", "ortografia", "Verbos en -sh llevan -es: push → pushes."],
  ["sp-touches", "she touches", "ella toca", "ortografia", "Verbos en -ch llevan -es: touch → touches."],
  ["sp-passes", "it passes", "eso pasa", "ortografia", "Verbos en -s llevan -es: pass → passes."],

  // Negativo
  ["neg-i", "I do not work", "yo no trabajo", "negativo", "do not + verbo en infinitivo: I do not work (I don't work)."],
  ["neg-you", "you do not work", "tú no trabajas", "negativo", "you do not work (you don't work)."],
  ["neg-he", "he does not work", "él no trabaja", "negativo", "does not + verbo SIN -s: he does not work, nunca «he does not works»."],
  ["neg-she", "she does not work", "ella no trabaja", "negativo", "does not + verbo sin -s: she does not work."],
  ["neg-it", "it does not work", "eso no funciona", "negativo", "it does not work (it doesn't work)."],
  ["neg-we", "we do not work", "nosotros no trabajamos", "negativo", "we do not work (we don't work)."],
  ["neg-they", "they do not work", "ellos no trabajan", "negativo", "they do not work (they don't work)."],

  // Preguntas
  ["q-i", "do I work?", "¿trabajo yo?", "pregunta", "Do + sujeto + verbo: Do I work?"],
  ["q-you", "do you work?", "¿trabajas tú?", "pregunta", "Do you work? El verbo va sin -s y sin to."],
  ["q-he", "does he work?", "¿trabaja él?", "pregunta", "Does + sujeto + verbo SIN -s: Does he work?, nunca «Does he works?»."],
  ["q-she", "does she work?", "¿trabaja ella?", "pregunta", "Does she work? El does ya marca la tercera persona."],
  ["q-it", "does it work?", "¿funciona?", "pregunta", "Does it work?"],
  ["q-we", "do we work?", "¿trabajamos nosotros?", "pregunta", "Do we work?"],
  ["q-they", "do they work?", "¿trabajan ellos?", "pregunta", "Do they work?"],

  // Frecuencia
  ["fr-always", "always", "siempre", "frecuencia", "Los adverbios de frecuencia van antes del verbo: she always works."],
  ["fr-usually", "usually", "normalmente", "frecuencia", "usually va antes del verbo: I usually work at home."],
  ["fr-often", "often", "seguido, a menudo", "frecuencia", "often va antes del verbo: they often visit."],
  ["fr-sometimes", "sometimes", "a veces", "frecuencia", "sometimes puede ir antes del verbo o al inicio de la frase."],
  ["fr-never", "never", "nunca", "frecuencia", "never ya es la negación, el verbo va en afirmativo: he never works, no «he never doesn't work»."],
  ["fr-every-day", "every day", "todos los días", "frecuencia", "Va al final: I work every day. Son dos palabras (everyday es otra cosa)."],
  ["fr-on-mondays", "on Mondays", "los lunes", "frecuencia", "Para días que se repiten: on Mondays, con on y en plural."],
  ["fr-twice-a-week", "twice a week", "dos veces por semana", "frecuencia", "once a week, twice a week, three times a week."],
];
