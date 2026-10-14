/**
 * Comparativos y superlativos (A2). Adjetivos cortos con -er, ortografía
 * (bigger, easier), more con adjetivos largos, irregulares, superlativos
 * (the -est / the most) y comparaciones de igualdad (as … as, less … than).
 * items: [slug, english, spanish, category, hint, englishAlt?]
 * sentences: [nivel, slug, español, inglés, clozeText, clozeAnswer, inglésConError, alternativas?]
 */
export const items = [
  // comp-er
  ["faster-than", "faster than", "más rápido que", "comp-er", "Adjetivo corto (una sílaba): se agrega -er y luego than. Ej.: This server is faster than the old one. Nunca \"more fast\"."],
  ["cheaper-than", "cheaper than", "más barato que", "comp-er", "Cheap es corto: cheap → cheaper than. Ej.: The bus is cheaper than the taxi. Nunca \"more cheap\"."],
  ["older-than", "older than", "más viejo que", "comp-er", "Old → older than (también \"mayor que\" para edad). Ej.: My dad is older than my mom."],
  ["smaller-than", "smaller than", "más pequeño que", "comp-er", "Small → smaller than. Ej.: My apartment is smaller than yours. El \"que\" del español es than, no that ni then."],
  ["slower-than", "slower than", "más lento que", "comp-er", "Slow → slower than. Ej.: My home connection is slower than the office connection."],
  // comp-ortografia
  ["bigger", "bigger", "más grande", "comp-ortografia", "Consonante + vocal + consonante: se duplica la última consonante. big → bigger. Ej.: Your house is bigger than mine."],
  ["easier", "easier", "más fácil", "comp-ortografia", "Si termina en consonante + y, la y cambia a i: easy → easier. Ej.: English is easier than German."],
  ["safer", "safer", "más seguro", "comp-ortografia", "Si ya termina en -e, solo se agrega -r: safe → safer. Ej.: This neighborhood is safer than the other one."],
  ["hotter", "hotter", "más caluroso", "comp-ortografia", "Hot termina en consonante + vocal + consonante: se duplica la t. hot → hotter. Ej.: Today is hotter than yesterday."],
  ["busier", "busier", "más ocupado", "comp-ortografia", "Consonante + y → ier: busy → busier. Ej.: My team is busier in December."],
  // comp-more
  ["more-expensive-than", "more expensive than", "más caro que", "comp-more", "Adjetivo largo (tres sílabas o más): more + adjetivo + than. Ej.: This phone is more expensive than mine. Nunca \"expensiver\"."],
  ["more-reliable-than", "more reliable than", "más confiable que", "comp-more", "Reliable es largo: more reliable than. Ej.: A cable is more reliable than wifi. No uses \"most\" para comparar dos cosas."],
  ["more-difficult-than", "more difficult than", "más difícil que", "comp-more", "Difficult es largo: more difficult than. Ej.: The exam was more difficult than the homework. Otra opción: harder than."],
  // comp-irregular
  ["better", "better", "mejor", "comp-irregular", "Good es irregular: good → better → the best. Ej.: This coffee is better than the coffee at the office. Nunca \"more better\" ni \"gooder\"."],
  ["worse", "worse", "peor", "comp-irregular", "Bad es irregular: bad → worse → the worst. Ej.: Today's bug is worse than yesterday's. Nunca \"badder\"."],
  ["farther", "farther", "más lejos", "comp-irregular", "Far es irregular: far → farther (o further) → the farthest. Ej.: My office is farther than yours.", ["further"]],
  ["more", "more", "más (cantidad)", "comp-irregular", "Much/many → more → the most. Ej.: This year I have more work than last year. Después va than, no that."],
  ["less", "less", "menos (cantidad)", "comp-irregular", "Little → less → the least. Ej.: This program uses less memory than the other one."],
  // comp-superlativo
  ["the-fastest", "the fastest", "el más rápido", "comp-superlativo", "Superlativo de adjetivo corto: the + -est. Ej.: It is the fastest server in the company. Nunca \"the most fast\"."],
  ["the-biggest", "the biggest", "el más grande", "comp-superlativo", "Big duplica la g también en superlativo: the biggest. Ej.: It is the biggest city in the country. Con lugares se usa in."],
  ["the-most-important", "the most important", "el más importante", "comp-superlativo", "Adjetivo largo: the most + adjetivo. Ej.: This is the most important meeting of the week. Nunca \"the importantest\"."],
  ["the-best", "the best", "el mejor", "comp-superlativo", "Good → better → the best. Ej.: Ana is the best programmer on the team. Nunca \"the goodest\"."],
  ["the-worst", "the worst", "el peor", "comp-superlativo", "Bad → worse → the worst. Ej.: Monday is the worst day to deploy. Nunca \"the most bad\"."],
  // comp-igualdad
  ["as-fast-as", "as fast as", "tan rápido como", "comp-igualdad", "Igualdad: as + adjetivo (forma normal) + as. Ej.: This laptop is as fast as mine. Nunca \"as fast than\" ni \"as faster as\"."],
  ["not-as-good-as", "not as good as", "no tan bueno como", "comp-igualdad", "Para decir que algo es inferior: not as + adjetivo + as. Ej.: The movie is not as good as the book."],
  ["less-expensive-than", "less expensive than", "menos caro que", "comp-igualdad", "Less + adjetivo (forma normal) + than = menos … que. Ej.: The train is less expensive than the plane. Nunca \"less expensiver\"."],
];

export const sentences = [
  // Nivel 1: Adjetivos cortos: -er than
  [1, "faster-than", "Este servidor es más rápido que el viejo.", "This server is faster than the old one.", "This server is ___ (fast) than the old one.", "faster", "This server is more fast than the old one."],
  [1, "faster-than", "Mi hermano corre más rápido que yo.", "My brother runs faster than me.", "My brother runs ___ (fast) than me.", "faster", "My brother runs more fast than me.", { en: ["My brother runs faster than I do."] }],
  [1, "cheaper-than", "El camión es más barato que el taxi.", "The bus is cheaper than the taxi.", "The bus is ___ (cheap) than the taxi.", "cheaper", "The bus is more cheap than the taxi.", { es: ["El autobús es más barato que el taxi."] }],
  [1, "cheaper-than", "Este plan en la nube es más barato que el otro.", "This cloud plan is cheaper than the other one.", "This cloud plan is ___ (cheap) than the other one.", "cheaper", "This cloud plan is cheaper that the other one.", { en: ["This cloud plan is cheaper than the other."], es: ["Este plan en la nube es más económico que el otro."] }],
  [1, "older-than", "Mi papá es mayor que mi mamá.", "My dad is older than my mom.", "My dad is ___ (old) than my mom.", "older", "My dad is more old than my mom.", { en: ["My father is older than my mother."] }],
  [1, "older-than", "Esta laptop es más vieja que la tuya.", "This laptop is older than yours.", "This laptop is ___ (old) than yours.", "older", "This laptop is older that yours."],
  [1, "smaller-than", "Mi departamento es más pequeño que el tuyo.", "My apartment is smaller than yours.", "My apartment is ___ (small) than yours.", "smaller", "My apartment is more small than yours.", { es: ["Mi departamento es más chico que el tuyo."] }],
  [1, "smaller-than", "El archivo nuevo es más pequeño que el original.", "The new file is smaller than the original one.", "The new file is ___ (small) than the original one.", "smaller", "The new file is smaller then the original one.", { en: ["The new file is smaller than the original."], es: ["El archivo nuevo es más chico que el original."] }],
  [1, "slower-than", "Mi conexión de casa es más lenta que la de la oficina.", "My home connection is slower than the office connection.", "My home connection is ___ (slow) than the office connection.", "slower", "My home connection is more slow than the office connection.", { en: ["My connection at home is slower than the one at the office."] }],
  [1, "slower-than", "Hoy el tráfico es más lento que ayer.", "Today the traffic is slower than yesterday.", "Today the traffic is ___ (slow) than yesterday.", "slower", "Today the traffic is slower as yesterday.", { en: ["The traffic is slower today than yesterday."] }],

  // Nivel 2: Ortografía: bigger, easier, safer
  [2, "bigger", "Tu casa es más grande que la mía.", "Your house is bigger than mine.", "Your house is ___ (big) than mine.", "bigger", "Your house is biger than mine."],
  [2, "bigger", "Necesitamos un servidor más grande.", "We need a bigger server.", "We need a ___ (big) server.", "bigger", "We need a more big server."],
  [2, "easier", "El inglés es más fácil que el alemán.", "English is easier than German.", "English is ___ (easy) than German.", "easier", "English is easyer than German."],
  [2, "easier", "Esta herramienta es más fácil de usar.", "This tool is easier to use.", "This tool is ___ (easy) to use.", "easier", "This tool is more easy to use."],
  [2, "safer", "Es más seguro guardar las contraseñas en un gestor.", "It is safer to keep passwords in a password manager.", "It is ___ (safe) to keep passwords in a password manager.", "safer", "It is more safe to keep passwords in a password manager.", { en: ["It is safer to store passwords in a password manager."] }],
  [2, "safer", "Esta colonia es más segura que la otra.", "This neighborhood is safer than the other one.", "This neighborhood is ___ (safe) than the other one.", "safer", "This neighborhood is saffer than the other one.", { en: ["This neighborhood is safer than the other."] }],
  [2, "hotter", "Hoy hace más calor que ayer.", "Today is hotter than yesterday.", "Today is ___ (hot) than yesterday.", "hotter", "Today is hoter than yesterday.", { en: ["It is hotter today than yesterday.", "Today it is hotter than yesterday."] }],
  [2, "hotter", "El cuarto de servidores está más caliente que la oficina.", "The server room is hotter than the office.", "The server room is ___ (hot) than the office.", "hotter", "The server room is more hot than the office."],
  [2, "busier", "Esta semana estoy más ocupado que la semana pasada.", "This week I am busier than last week.", "This week I am ___ (busy) than last week.", "busier", "This week I am busyer than last week.", { en: ["I am busier this week than last week."], es: ["Esta semana estoy más ocupada que la semana pasada."] }],
  [2, "busier", "Mi equipo está más ocupado en diciembre.", "My team is busier in December.", "My team is ___ (busy) in December.", "busier", "My team is more busy in December."],

  // Nivel 3: Adjetivos largos (more) e irregulares
  [3, "more-expensive-than", "Este celular es más caro que el mío.", "This phone is more expensive than mine.", "This phone is ___ (expensive) than mine.", "more expensive", "This phone is expensiver than mine.", { en: ["This cell phone is more expensive than mine."] }],
  [3, "more-expensive-than", "La nube es más cara que nuestro propio servidor.", "The cloud is more expensive than our own server.", "The cloud is ___ (expensive) than our own server.", "more expensive", "The cloud is more expensive that our own server."],
  [3, "more-reliable-than", "Esta base de datos es más confiable que la anterior.", "This database is more reliable than the previous one.", "This database is ___ (reliable) than the previous one.", "more reliable", "This database is reliabler than the previous one."],
  [3, "more-reliable-than", "Un cable es más confiable que el wifi.", "A cable is more reliable than wifi.", "A cable is ___ (reliable) than wifi.", "more reliable", "A cable is most reliable than wifi.", { en: ["A cable is more reliable than Wi-Fi.", "A cable is more reliable than the wifi."] }],
  [3, "more-difficult-than", "El examen fue más difícil que la tarea.", "The exam was more difficult than the homework.", "The exam was ___ (difficult) than the homework.", "more difficult", "The exam was difficulter than the homework.", { en: ["The exam was harder than the homework."] }],
  [3, "better", "Este café es mejor que el de la oficina.", "This coffee is better than the coffee at the office.", "This coffee is ___ (good) than the coffee at the office.", "better", "This coffee is more better than the coffee at the office.", { en: ["This coffee is better than the office coffee."] }],
  [3, "worse", "El error de hoy es peor que el de ayer.", "Today's bug is worse than yesterday's.", "Today's bug is ___ (bad) than yesterday's.", "worse", "Today's bug is badder than yesterday's.", { en: ["Today's bug is worse than yesterday's bug.", "Today's error is worse than yesterday's."] }],
  [3, "farther", "Mi oficina está más lejos que la tuya.", "My office is farther than yours.", "My office is ___ (far) than yours.", "farther", "My office is more far than yours.", { en: ["My office is further than yours.", "My office is farther away than yours."] }],
  [3, "more", "Este año tengo más trabajo que el año pasado.", "This year I have more work than last year.", "This year I have ___ (much) work than last year.", "more", "This year I have more work that last year.", { en: ["I have more work this year than last year."] }],
  [3, "less", "Este programa usa menos memoria que el otro.", "This program uses less memory than the other one.", "This program uses ___ (little) memory than the other one.", "less", "This program uses littler memory than the other one.", { en: ["This program uses less memory than the other."] }],

  // Nivel 4: Superlativos: the -est y the most
  [4, "the-fastest", "Es el servidor más rápido de la empresa.", "It is the fastest server in the company.", "It is ___ (fast) server in the company.", "the fastest", "It is the most fast server in the company."],
  [4, "the-fastest", "Luis es el más rápido de la clase.", "Luis is the fastest in the class.", "Luis is ___ (fast) in the class.", "the fastest", "Luis is the more fast in the class."],
  [4, "the-biggest", "Es la ciudad más grande del país.", "It is the biggest city in the country.", "It is ___ (big) city in the country.", "the biggest", "It is the bigest city in the country.", { en: ["It is the largest city in the country."] }],
  [4, "the-biggest", "Este es el archivo más grande del proyecto.", "This is the biggest file in the project.", "This is ___ (big) file in the project.", "the biggest", "This is the most big file in the project.", { en: ["This is the largest file in the project."] }],
  [4, "the-most-important", "La seguridad es lo más importante.", "Security is the most important thing.", "Security is ___ (important) thing.", "the most important", "Security is the importantest thing."],
  [4, "the-most-important", "Esta es la reunión más importante de la semana.", "This is the most important meeting of the week.", "This is ___ (important) meeting of the week.", "the most important", "This is the more important meeting of the week."],
  [4, "the-best", "Ana es la mejor programadora del equipo.", "Ana is the best programmer on the team.", "Ana is ___ (good) programmer on the team.", "the best", "Ana is the goodest programmer on the team.", { en: ["Ana is the best developer on the team.", "Ana is the best programmer in the team.", "Ana is the best developer in the team."] }],
  [4, "the-best", "Fue el mejor día de mis vacaciones.", "It was the best day of my vacation.", "It was ___ (good) day of my vacation.", "the best", "It was the most good day of my vacation.", { en: ["It was the best day of my vacations."] }],
  [4, "the-worst", "Ese fue el peor restaurante de la ciudad.", "That was the worst restaurant in the city.", "That was ___ (bad) restaurant in the city.", "the worst", "That was the baddest restaurant in the city."],
  [4, "the-worst", "El lunes es el peor día para hacer un deploy.", "Monday is the worst day to deploy.", "Monday is ___ (bad) day to deploy.", "the worst", "Monday is the most bad day to deploy.", { en: ["Monday is the worst day to do a deploy.", "Monday is the worst day for a deploy."] }],

  // Nivel 5: as … as, not as … as y comparaciones largas
  [5, "as-fast-as", "Esta laptop es tan rápida como la mía.", "This laptop is as fast as mine.", "This laptop is ___ (fast) mine.", "as fast as", "This laptop is as fast than mine."],
  [5, "as-fast-as", "Mi hermana corre tan rápido como yo.", "My sister runs as fast as me.", "My sister runs ___ (fast) me.", "as fast as", "My sister runs so fast as me.", { en: ["My sister runs as fast as I do."] }],
  [5, "as-fast-as", "La red de la oficina es tan rápida como la de mi casa.", "The office network is as fast as my home network.", "The office network is ___ (fast) my home network.", "as fast as", "The office network is as faster as my home network.", { en: ["The office network is as fast as the one at my house."] }],
  [5, "as-fast-as", "¿Este servidor es tan rápido como el otro?", "Is this server as fast as the other one?", "Is this server ___ (fast) the other one?", "as fast as", "Is this server as fast that the other one?", { en: ["Is this server as fast as the other?"], es: ["¿Es este servidor tan rápido como el otro?"] }],
  [5, "not-as-good-as", "La película no es tan buena como el libro.", "The movie is not as good as the book.", "The movie is ___ (good) the book.", "not as good as", "The movie is not as good than the book."],
  [5, "not-as-good-as", "Este framework no es tan bueno como dicen.", "This framework is not as good as people say.", "This framework is ___ (good) people say.", "not as good as", "This framework is not as better as people say.", { en: ["This framework is not as good as they say."] }],
  [5, "not-as-good-as", "Mi inglés no es tan bueno como el tuyo.", "My English is not as good as yours.", "My English is ___ (good) yours.", "not as good as", "My English is not good as yours."],
  [5, "less-expensive-than", "Este hosting es menos caro que el otro.", "This hosting is less expensive than the other one.", "This hosting is ___ (expensive) than the other one.", "less expensive", "This hosting is less expensiver than the other one.", { en: ["This hosting is less expensive than the other."] }],
  [5, "less-expensive-than", "El tren es menos caro que el avión.", "The train is less expensive than the plane.", "The train is ___ (expensive) than the plane.", "less expensive", "The train is less expensive that the plane."],
  [5, "less-expensive-than", "Comer en casa es menos caro que comer en restaurantes.", "Eating at home is less expensive than eating at restaurants.", "Eating at home is ___ (expensive) than eating at restaurants.", "less expensive", "Eating at home is more less expensive than eating at restaurants.", { en: ["Eating at home is less expensive than eating in restaurants."] }],
];
