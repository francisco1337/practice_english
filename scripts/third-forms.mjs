/**
 * Tercera persona del singular: [slug, english, spanish, category, hint]
 * La -s de he/she/it, sus reglas de ortografía, los irregulares y los casos
 * donde la -s NO va (tras does, en plural) o donde sí va aunque no lo parezca.
 */
export const thirdForms = [
  // La -s simple
  ["s-works", "works", "trabaja (he/she/it)", "regla-s", "Con he, she e it el verbo lleva -s: he works."],
  ["s-needs", "needs", "necesita", "regla-s", "she needs, con -s. La -s es solo de la tercera persona del singular."],
  ["s-uses", "uses", "usa", "regla-s", "he uses, con -s."],
  ["s-lives", "lives", "vive", "regla-s", "she lives, con -s."],
  ["s-helps", "helps", "ayuda", "regla-s", "he helps, con -s."],
  ["s-walks", "walks", "camina", "regla-s", "she walks, con -s."],

  // Verbos que llevan -es
  ["es-watches", "watches", "observa, ve", "regla-es", "Verbos en -ch llevan -es: watch → watches, nunca «watchs»."],
  ["es-pushes", "pushes", "empuja", "regla-es", "Verbos en -sh llevan -es: push → pushes."],
  ["es-touches", "touches", "toca", "regla-es", "Verbos en -ch llevan -es: touch → touches."],
  ["es-passes", "passes", "pasa", "regla-es", "Verbos en -s llevan -es: pass → passes."],

  // Consonante + y → ies
  ["ies-studies", "studies", "estudia", "regla-ies", "Consonante + y: la y se cambia por ies: study → studies, nunca «studys»."],
  ["ies-carries", "carries", "carga, lleva", "regla-ies", "carry → carries."],
  ["ies-tries", "tries", "intenta", "regla-ies", "try → tries."],
  ["ies-applies", "applies", "aplica", "regla-ies", "apply → applies."],

  // Vocal + y → solo -s
  ["y-plays", "plays", "juega, toca", "regla-y", "Vocal + y solo lleva -s: play → plays, no «plaies»."],
  ["y-stays", "stays", "se queda", "regla-y", "Vocal + y solo lleva -s: stay → stays."],

  // Irregulares
  ["irr-has", "has", "tiene", "irregular", "have es irregular: he has, nunca «he haves» ni «he have»."],
  ["irr-goes", "goes", "va", "irregular", "go → goes, con -es."],
  ["irr-does", "does", "hace", "irregular", "do → does, con -es."],
  ["irr-is", "is", "es, está", "irregular", "be es totalmente irregular: he is, no «he are»."],

  // Donde la -s no va, o va aunque no lo parezca
  ["t-does-not", "does not work", "no trabaja", "trampa", "Tras does el verbo pierde la -s: he does not work, nunca «does not works»."],
  ["t-does-q", "does he work?", "¿trabaja él?", "trampa", "En preguntas con does el verbo va sin -s: Does he work?"],
  ["t-plural", "they work", "ellos trabajan", "trampa", "En plural no hay -s: they work. La -s es solo de he, she e it."],
  ["t-noun-subject", "my brother works", "mi hermano trabaja", "trampa", "Un sustantivo singular equivale a he o she: my brother works."],
  ["t-everybody", "everybody works", "todos trabajan", "trampa", "everybody, somebody y nobody son singulares: everybody works."],
  ["t-two-subjects", "she and he work", "ella y él trabajan", "trampa", "Dos sujetos juntos son plural: van sin -s."],
  ["t-never", "he never works", "él nunca trabaja", "trampa", "Con never el verbo sigue llevando la -s: he never works."],
  ["t-thing", "the car works", "el coche funciona", "trampa", "Las cosas también son tercera persona: the car works."],
];
