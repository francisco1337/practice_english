/**
 * Teoría de cada tema: la explicación que se consulta antes de practicar.
 * Se guarda en código (no en la base) porque es contenido fijo, y así se
 * versiona junto a los ejercicios que la ejercitan.
 */

export type TheoryBlock =
  | { kind: "text"; text: string }
  /** Tabla con encabezados y filas; la última columna suele ser el ejemplo. */
  | { kind: "table"; head: string[]; rows: string[][] }
  /** Regla con su ejemplo bien y, si aplica, el error típico. */
  | { kind: "rules"; items: { rule: string; ok: string; bad?: string }[] }
  /** Aviso de lo que más se equivoca. */
  | { kind: "warning"; title: string; text: string };

export type TheorySection = { title: string; blocks: TheoryBlock[] };

export type Theory = {
  /** Ruta del tema, sin /teoria */
  slug: string;
  title: string;
  intro: string;
  sections: TheorySection[];
};

export const THEORY: Theory[] = [
  {
    slug: "pronombres",
    title: "Pronombres",
    intro:
      "En inglés el pronombre cambia según su papel en la frase: quién hace la acción, quién la recibe, y de quién es algo. En español muchas veces se omite el sujeto; en inglés casi nunca se puede.",
    sections: [
      {
        title: "Los cuatro grupos",
        blocks: [
          {
            kind: "table",
            head: ["Sujeto", "Objeto", "Adjetivo posesivo", "Pronombre posesivo"],
            rows: [
              ["I", "me", "my", "mine"],
              ["you", "you", "your", "yours"],
              ["he", "him", "his", "his"],
              ["she", "her", "her", "hers"],
              ["it", "it", "its", "—"],
              ["we", "us", "our", "ours"],
              ["they", "them", "their", "theirs"],
            ],
          },
          {
            kind: "text",
            text: "El sujeto va antes del verbo; el objeto, después del verbo o de una preposición. El adjetivo posesivo siempre lleva un sustantivo detrás; el pronombre posesivo va solo.",
          },
        ],
      },
      {
        title: "Cómo elegir",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "Quien hace la acción va como sujeto", ok: "She calls me every day." },
              { rule: "Quien la recibe va como objeto", ok: "I call her every day." },
              { rule: "Antes de un sustantivo va el adjetivo posesivo", ok: "This is my car.", bad: "This is mine car." },
              { rule: "Sin sustantivo detrás va el pronombre posesivo", ok: "This car is mine.", bad: "This car is my." },
              { rule: "El sujeto no se omite, aunque en español sí", ok: "It is cold today.", bad: "Is cold today." },
            ],
          },
        ],
      },
      {
        title: "Lo que más se confunde",
        blocks: [
          {
            kind: "warning",
            title: "Palabras que se escriben igual",
            text: "you sirve de sujeto y de objeto; her es objeto (I call her) y también posesivo (her car); his es adjetivo y pronombre (his book is his); it es sujeto y objeto.",
          },
          {
            kind: "warning",
            title: "its, it's, their, there, they're",
            text: "its es posesivo y it's es it is. their es «su (de ellos)», there es «ahí/hay» y they're es they are.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-be",
    title: "Verbo to be",
    intro:
      "To be es «ser» y «estar» a la vez, y es el único verbo con tres formas distintas en presente. También se usa para la edad, el clima y para formar el presente continuo.",
    sections: [
      {
        title: "Presente, pasado y futuro",
        blocks: [
          {
            kind: "table",
            head: ["Sujeto", "Presente", "Pasado", "Futuro"],
            rows: [
              ["I", "am (I'm)", "was", "will be"],
              ["you / we / they", "are (you're)", "were", "will be"],
              ["he / she / it", "is (he's)", "was", "will be"],
            ],
          },
          {
            kind: "text",
            text: "El negativo se hace con not después del verbo (is not, isn't) y la pregunta invirtiendo el orden (Is he…?). Nunca se usa do ni does con to be.",
          },
        ],
      },
      {
        title: "Reglas",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "Negativo: not después de be", ok: "She is not at home.", bad: "She does not be at home." },
              { rule: "Pregunta: be antes del sujeto", ok: "Are you ready?", bad: "Do you ready?" },
              { rule: "Respuesta corta: se repite be", ok: "Yes, I am.", bad: "Yes, I do." },
              { rule: "La edad va con be", ok: "She is 20 years old.", bad: "She has 20 years." },
              { rule: "No existe «amn't»", ok: "I am not tired. / I'm not tired.", bad: "I amn't tired." },
            ],
          },
        ],
      },
      {
        title: "There is / there are",
        blocks: [
          {
            kind: "text",
            text: "«Hay» se dice there is con singular e incontables, y there are con plural. En pasado, there was y there were. En futuro, there will be para los dos.",
          },
          {
            kind: "warning",
            title: "Nunca con have",
            text: "«Hay un libro» es There is a book, no «It has a book». Y people es plural: there are people.",
          },
        ],
      },
    ],
  },
  {
    slug: "articulos",
    title: "Artículos a / an / the",
    intro:
      "a y an son «un/una» y solo van con singulares contables. the es «el, la, los, las» y no cambia nunca. Y hay muchos casos donde el inglés no lleva artículo aunque el español sí.",
    sections: [
      {
        title: "a o an: manda el sonido",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "a antes de sonido de consonante", ok: "a book, a car, a hotel" },
              { rule: "an antes de sonido de vocal", ok: "an apple, an idea, an office" },
              { rule: "Decide el sonido, no la letra", ok: "a university, a European country", bad: "an university" },
              { rule: "La h muda cuenta como vocal", ok: "an hour, an honest man", bad: "a hour" },
              { rule: "Mira la palabra que sigue, sea adjetivo o sustantivo", ok: "an old car, a used car" },
            ],
          },
        ],
      },
      {
        title: "the",
        blocks: [
          {
            kind: "text",
            text: "the se usa cuando ya se sabe de qué se habla, con cosas únicas (the sun) y con same (the same problem). Sirve igual para singular y plural: the book, the books.",
          },
        ],
      },
      {
        title: "Sin artículo",
        blocks: [
          {
            kind: "table",
            head: ["Caso", "Inglés", "Español"],
            rows: [
              ["Cosas en general", "I prefer music.", "Prefiero la música."],
              ["Plurales generales", "Dogs are loyal.", "Los perros son leales."],
              ["Idiomas", "I study English.", "Estudio el inglés."],
              ["Comidas", "I prepare breakfast.", "Preparo el desayuno."],
              ["Días", "She returns on Monday.", "Regresa el lunes."],
              ["Países", "They visit Mexico.", "Visitan México."],
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "presente-simple",
    title: "Presente simple",
    intro:
      "Es el tiempo de las rutinas y de lo que es siempre cierto: I work every day. Su dificultad no es el verbo, es la -s de la tercera persona y los auxiliares do y does.",
    sections: [
      {
        title: "Afirmativo, negativo y pregunta",
        blocks: [
          {
            kind: "table",
            head: ["", "I / you / we / they", "he / she / it"],
            rows: [
              ["Afirmativo", "I work", "he works"],
              ["Negativo", "I do not work (don't)", "he does not work (doesn't)"],
              ["Pregunta", "Do you work?", "Does he work?"],
              ["Respuesta corta", "Yes, I do. / No, I don't.", "Yes, he does. / No, he doesn't."],
            ],
          },
        ],
      },
      {
        title: "La -s de tercera persona",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "Regla general: se agrega -s", ok: "work → works, live → lives" },
              { rule: "Verbos en -ch, -sh, -s, -x, -o: se agrega -es", ok: "watch → watches, push → pushes, pass → passes" },
              { rule: "Consonante + y: la y se vuelve ies", ok: "study → studies, carry → carries", bad: "studys" },
              { rule: "Vocal + y: solo -s", ok: "play → plays, stay → stays", bad: "plaies" },
              { rule: "Irregulares", ok: "have → has, go → goes, do → does, be → is" },
            ],
          },
          {
            kind: "warning",
            title: "La -s desaparece con do y does",
            text: "El auxiliar ya marca la persona: he does not work y Does he work?, nunca «does not works» ni «Does he works?».",
          },
        ],
      },
      {
        title: "Frecuencia",
        blocks: [
          {
            kind: "text",
            text: "Los adverbios de frecuencia van antes del verbo (she always works) pero después de be (she is always late). Las expresiones de tiempo van al final: every day, on Mondays, twice a week.",
          },
        ],
      },
    ],
  },
  {
    slug: "tercera-persona",
    title: "Tercera persona",
    intro:
      "En presente simple, he, she e it llevan -s. Suena simple y es el error más frecuente, porque hay que reconocer cuándo un sujeto es tercera persona y cuándo la -s desaparece.",
    sections: [
      {
        title: "Cuándo lleva -s",
        blocks: [
          {
            kind: "table",
            head: ["Sujeto", "Es tercera persona", "Verbo"],
            rows: [
              ["he, she, it", "sí", "works"],
              ["my brother, the car", "sí, un singular equivale a he/she/it", "works"],
              ["everybody, somebody, nobody", "sí, son singulares", "works"],
              ["I, you, we, they", "no", "work"],
              ["my brother and I / she and he", "no, dos sujetos son plural", "work"],
              ["the children, people", "no, son plurales", "work"],
            ],
          },
        ],
      },
      {
        title: "Cuándo NO lleva -s",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "Después de does", ok: "He does not work. / Does he work?", bad: "He does not works." },
              { rule: "En plural", ok: "They work every day.", bad: "They works every day." },
              { rule: "Con never sí la conserva", ok: "He never works on Sundays.", bad: "He never work on Sundays." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "presente-continuo",
    title: "Presente continuo",
    intro:
      "Es lo que pasa ahora mismo: I am working now. Se forma con el verbo be más el verbo en -ing, y su trampa es confundirlo con el presente simple.",
    sections: [
      {
        title: "Cómo se forma",
        blocks: [
          {
            kind: "table",
            head: ["", "Ejemplo"],
            rows: [
              ["Afirmativo", "I am working / he is working / they are working"],
              ["Negativo", "I am not working / he is not working (isn't)"],
              ["Pregunta", "Am I working? / Is he working?"],
              ["Respuesta corta", "Yes, he is. / No, he isn't."],
            ],
          },
          {
            kind: "warning",
            title: "Sin be no existe, y sin -ing tampoco",
            text: "She is studying, nunca «She studying» ni «She is study». Y en continuo no se usa do ni does: he is not working.",
          },
        ],
      },
      {
        title: "Ortografía del -ing",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "Regla general", ok: "work → working, watch → watching" },
              { rule: "Termina en -e muda: se quita la e", ok: "use → using, live → living", bad: "useing" },
              { rule: "Consonante-vocal-consonante: se duplica", ok: "stop → stopping, plan → planning", bad: "stoping" },
              { rule: "Termina en -ie: se vuelve y", ok: "die → dying", bad: "dieing" },
              { rule: "La y se conserva", ok: "study → studying, carry → carrying" },
            ],
          },
        ],
      },
      {
        title: "Continuo o simple",
        blocks: [
          {
            kind: "table",
            head: ["Para", "Tiempo", "Ejemplo"],
            rows: [
              ["Lo que pasa ahora", "continuo", "She is studying now."],
              ["Rutinas y lo habitual", "simple", "She studies every day."],
              ["Algo temporal", "continuo", "She is living in Mexico this year."],
              ["Verbos de estado", "siempre simple", "I want a coffee."],
            ],
          },
          {
            kind: "warning",
            title: "Verbos que no van en continuo",
            text: "want, need, prefer, believe, seem, know: nunca «I am wanting». Se usan en presente simple aunque hablen de ahora.",
          },
        ],
      },
    ],
  },
  {
    slug: "there-is-are",
    title: "There is / there are",
    intro:
      "Es el «hay» del español: sirve para decir que algo existe o está en un lugar. El verbo concuerda con lo que sigue, no con there.",
    sections: [
      {
        title: "Presente, pasado y futuro",
        blocks: [
          {
            kind: "table",
            head: ["", "Singular e incontable", "Plural"],
            rows: [
              ["Presente", "there is a book / there is water", "there are three books"],
              ["Negativo", "there is not (isn't) any water", "there are not (aren't) any books"],
              ["Pregunta", "Is there a book?", "Are there any books?"],
              ["Pasado", "there was a party", "there were many people"],
              ["Futuro", "there will be a party", "there will be many people"],
            ],
          },
        ],
      },
      {
        title: "Reglas",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "El verbo concuerda con el sustantivo", ok: "There are three books.", bad: "There is three books." },
              { rule: "Con una lista, concuerda con lo primero", ok: "There is a book and two pens on the table." },
              { rule: "Los incontables van en singular", ok: "There is water in the bottle.", bad: "There are water." },
              { rule: "En negativo y pregunta se usa any", ok: "There aren't any chairs. / Is there any water?" },
              { rule: "Para contar: how many; para incontables: how much", ok: "How many books are there? / How much water is there?" },
            ],
          },
          {
            kind: "warning",
            title: "Los tres errores clásicos",
            text: "people es plural (there are people); «hay» nunca se traduce con have ni con it has; y there no es their.",
          },
        ],
      },
    ],
  },
  {
    slug: "preguntas-respuestas",
    title: "Preguntas y respuestas con do / does",
    intro:
      "En inglés la pregunta no se marca solo con la entonación: hace falta un auxiliar. Con los verbos normales en presente, ese auxiliar es do o does.",
    sections: [
      {
        title: "Cómo se arma la pregunta",
        blocks: [
          {
            kind: "table",
            head: ["Auxiliar", "Sujeto", "Verbo", "Resto"],
            rows: [
              ["Do", "I / you / we / they", "work", "every day?"],
              ["Does", "he / she / it", "work", "at a hospital?"],
              ["What / Where / When / Why + do", "you", "need", "?"],
            ],
          },
          {
            kind: "text",
            text: "Con does el verbo pierde la -s, porque el auxiliar ya marca la tercera persona. Con el verbo be no se usa do: Are you ready?",
          },
        ],
      },
      {
        title: "Respuestas cortas",
        blocks: [
          {
            kind: "rules",
            items: [
              { rule: "Se repite el auxiliar, no el verbo", ok: "Does he work? — Yes, he does.", bad: "Yes, he works." },
              { rule: "En negativo", ok: "No, he does not. / No, he doesn't." },
              { rule: "Con Do I…? la persona cambia", ok: "Do I need a uniform? — Yes, you do." },
              { rule: "Las preguntas WH se contestan con frase completa", ok: "Where does he work? — He works at a hospital." },
            ],
          },
        ],
      },
    ],
  },
];

export function getTheory(slug: string): Theory | undefined {
  return THEORY.find((t) => t.slug === slug);
}
