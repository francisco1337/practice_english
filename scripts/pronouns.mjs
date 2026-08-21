/**
 * Pronombres en inglés: [slug, english, spanish, category, hint]
 * El slug distingue palabras repetidas (you sujeto/objeto, her, his, it).
 * El hint es la retroalimentación que se muestra al equivocarse.
 */
export const pronouns = [
  // Sujeto
  ["i", "I", "yo", "sujeto", "Sujeto de 1ª persona singular. En inglés siempre se escribe con mayúscula: I work."],
  ["you", "you", "tú, usted, ustedes (sujeto)", "sujeto", "Sirve para singular y plural, y el verbo va sin -s: you work, you are."],
  ["he", "he", "él", "sujeto", "Sujeto masculino singular. En presente el verbo lleva -s: he works."],
  ["she", "she", "ella", "sujeto", "Sujeto femenino singular. En presente el verbo lleva -s: she works."],
  ["it", "it", "ello, eso (cosa o animal, sujeto)", "sujeto", "Sujeto para cosas, animales y clima. En español casi nunca se traduce: it works = funciona."],
  ["we", "we", "nosotros, nosotras", "sujeto", "Sujeto de 1ª persona plural: we work."],
  ["they", "they", "ellos, ellas", "sujeto", "Sujeto plural, para personas y cosas: they work."],

  // Objeto
  ["me", "me", "mí, me (objeto)", "objeto", "Pronombre de objeto: va después del verbo o de una preposición (help me, for me), nunca como sujeto."],
  ["you-obj", "you", "ti, te (objeto)", "objeto", "Misma palabra que el sujeto you, pero aquí recibe la acción: I help you."],
  ["him", "him", "lo, le, a él (objeto)", "objeto", "Objeto masculino: I call him. Como sujeto sería he."],
  ["her-obj", "her", "la, le, a ella (objeto)", "objeto", "Objeto femenino: I call her. Ojo: her también es posesivo (her car)."],
  ["it-obj", "it", "lo, eso (objeto: cosa)", "objeto", "Objeto para cosas: I use it. Va después del verbo."],
  ["us", "us", "nos, a nosotros (objeto)", "objeto", "Objeto de 1ª persona plural: she helps us."],
  ["them", "them", "los, les, a ellos (objeto)", "objeto", "Objeto plural: I visit them. Como sujeto sería they."],

  // Adjetivos posesivos (van antes de un sustantivo)
  ["my", "my", "mi, mis (antes de sustantivo)", "posesivo-adj", "Adjetivo posesivo: siempre va delante de un sustantivo (my car) y nunca solo."],
  ["your", "your", "tu, su (de ti; antes de sustantivo)", "posesivo-adj", "Delante de sustantivo: your house. No confundir con you're (= you are)."],
  ["his-adj", "his", "su (de él; antes de sustantivo)", "posesivo-adj", "Delante de sustantivo: his book. No cambia según el género de la cosa."],
  ["her-adj", "her", "su (de ella; antes de sustantivo)", "posesivo-adj", "Delante de sustantivo: her book. Misma forma que el objeto her."],
  ["its", "its", "su (de una cosa; antes de sustantivo)", "posesivo-adj", "Posesivo de cosas y animales: its color. Sin apóstrofo, porque it's significa it is."],
  ["our", "our", "nuestro, nuestra (antes de sustantivo)", "posesivo-adj", "Delante de sustantivo: our house."],
  ["their", "their", "su (de ellos; antes de sustantivo)", "posesivo-adj", "Delante de sustantivo: their house. No confundir con there ni they're."],

  // Pronombres posesivos (van solos, sustituyen al sustantivo)
  ["mine", "mine", "mío, el mío", "posesivo-pron", "Sustituye al sustantivo y va solo: this book is mine. Nunca «mine book»."],
  ["yours", "yours", "tuyo, suyo (de ti)", "posesivo-pron", "Va solo, sin sustantivo: this is yours. Sin apóstrofo."],
  ["his-pron", "his", "suyo, el de él", "posesivo-pron", "His es igual como adjetivo y como pronombre: his book is his."],
  ["hers", "hers", "suya, la de ella", "posesivo-pron", "Va solo, sin sustantivo: this book is hers. Nunca «her's»."],
  ["ours", "ours", "nuestro, el nuestro", "posesivo-pron", "Va solo: this house is ours."],
  ["theirs", "theirs", "suyo, el de ellos", "posesivo-pron", "Va solo: these books are theirs."],
];
