/**
 * Frases de presente simple por nivel. Cada frase sirve para los tres
 * ejercicios: traducir (es→en), traducir inverso (en→es) y completar la oración.
 * Formato: [nivel, slug, español, inglés, clozeText, clozeAnswer, alternativas?]
 * - clozeText lleva ___ donde va el hueco y una pista entre paréntesis.
 * - alternativas: { en?: [...], es?: [...] } para variantes válidas.
 * Al revisar el español ya se acepta con o sin el pronombre sujeto.
 */
export const presentSentences = [
  // Nivel 1 — afirmativo, rutinas cortas
  [1, "ps-i", "Yo trabajo todos los días.", "I work every day.", "I ___ (work) every day.", "work"],
  [1, "ps-you", "Tú estudias inglés en la tarde.", "You study English in the afternoon.", "You ___ (study) English in the afternoon.", "study"],
  [1, "ps-we", "Nosotros preparamos la cena juntos.", "We prepare dinner together.", "We ___ (prepare) dinner together.", "prepare"],
  [1, "ps-they", "Ellos caminan al parque los sábados.", "They walk to the park on Saturdays.", "They ___ (walk) to the park on Saturdays.", "walk"],
  [1, "ps-he", "Él trabaja en un hospital.", "He works at a hospital.", "He ___ (work) at a hospital.", "works"],
  [1, "ps-she", "Ella cocina todos los días.", "She cooks every day.", "She ___ (cook) every day.", "cooks"],
  [1, "ps-it", "Eso funciona bien.", "It works well.", "It ___ (work) well.", "works"],
  [1, "fr-every-day", "Yo estudio todos los días.", "I study every day.", "I study ___. (todos los días)", "every day"],
  [1, "ps-i", "Yo empiezo el trabajo temprano.", "I start work early.", "I ___ (start) work early.", "start"],
  [1, "ps-we", "Nosotros vivimos en una ciudad grande.", "We live in a big city.", "We ___ (live) in a big city.", "live"],
  [1, "ps-they", "Ellos ayudan en la casa.", "They help at home.", "They ___ (help) at home.", "help"],
  [1, "ps-you", "Tú esperas el autobús cada mañana.", "You wait for the bus every morning.", "You ___ (wait) for the bus every morning.", "wait"],

  // Nivel 2 — tercera persona y su ortografía
  [2, "sp-studies", "Ella estudia inglés todos los días.", "She studies English every day.", "She ___ (study) English every day.", "studies"],
  [2, "sp-watches", "Él observa el partido los domingos.", "He watches the game on Sundays.", "He ___ (watch) the game on Sundays.", "watches"],
  [2, "sp-passes", "El autobús pasa a las ocho.", "The bus passes at eight.", "The bus ___ (pass) at eight.", "passes"],
  [2, "sp-carries", "Él carga su mochila todos los días.", "He carries his backpack every day.", "He ___ (carry) his backpack every day.", "carries"],
  [2, "sp-tries", "Ella intenta otra vez.", "She tries again.", "She ___ (try) again.", "tries"],
  [2, "sp-pushes", "Él empuja la puerta cada mañana.", "He pushes the door every morning.", "He ___ (push) the door every morning.", "pushes"],
  [2, "sp-touches", "Ella toca el agua con la mano.", "She touches the water with her hand.", "She ___ (touch) the water with her hand.", "touches"],
  [2, "ps-he", "Él regresa a casa a las seis.", "He returns home at six.", "He ___ (return) home at six.", "returns"],
  [2, "ps-she", "Ella visita a su madre los domingos.", "She visits her mother on Sundays.", "She ___ (visit) her mother on Sundays.", "visits"],
  [2, "ps-it", "El coche funciona bien.", "The car works well.", "The car ___ (work) well.", "works"],
  [2, "sp-studies", "Mi hermano estudia en una universidad.", "My brother studies at a university.", "My brother ___ (study) at a university.", "studies"],
  [2, "sp-watches", "Ella observa a los niños en el parque.", "She watches the children at the park.", "She ___ (watch) the children at the park.", "watches"],

  // Nivel 3 — negativo con do / does
  [3, "neg-i", "Yo no trabajo los domingos.", "I do not work on Sundays.", "I ___ (not / work) on Sundays.", "do not work"],
  [3, "neg-you", "Tú no estudias en la mañana.", "You do not study in the morning.", "You ___ (not / study) in the morning.", "do not study"],
  [3, "neg-he", "Él no trabaja aquí.", "He does not work here.", "He ___ (not / work) here.", "does not work"],
  [3, "neg-she", "Ella no cocina los lunes.", "She does not cook on Mondays.", "She ___ (not / cook) on Mondays.", "does not cook"],
  [3, "neg-it", "Eso no funciona.", "It does not work.", "It ___ (not / work).", "does not work"],
  [3, "neg-we", "Nosotros no vivimos aquí.", "We do not live here.", "We ___ (not / live) here.", "do not live"],
  [3, "neg-they", "Ellos no ayudan en la casa.", "They do not help at home.", "They ___ (not / help) at home.", "do not help"],
  [3, "neg-he", "Él no estudia inglés.", "He does not study English.", "He ___ (not / study) English.", "does not study"],
  [3, "neg-she", "Ella no espera el autobús.", "She does not wait for the bus.", "She ___ (not / wait) for the bus.", "does not wait"],
  [3, "neg-i", "Yo no necesito ayuda.", "I do not need help.", "I ___ (not / need) help.", "do not need"],
  [3, "neg-they", "Ellos no caminan al trabajo.", "They do not walk to work.", "They ___ (not / walk) to work.", "do not walk"],
  [3, "neg-we", "Nosotros no cocinamos en la mañana.", "We do not cook in the morning.", "We ___ (not / cook) in the morning.", "do not cook"],

  // Nivel 4 — preguntas
  [4, "q-you", "¿Trabajas todos los días?", "Do you work every day?", "___ (you / work) every day?", "Do you work"],
  [4, "q-he", "¿Trabaja él en un hospital?", "Does he work at a hospital?", "___ (he / work) at a hospital?", "Does he work"],
  [4, "q-she", "¿Estudia ella inglés?", "Does she study English?", "___ (she / study) English?", "Does she study"],
  [4, "q-it", "¿Funciona?", "Does it work?", "___ (it / work)?", "Does it work"],
  [4, "q-we", "¿Empezamos ahora?", "Do we start now?", "___ (we / start) now?", "Do we start"],
  [4, "q-they", "¿Viven ellos aquí?", "Do they live here?", "___ (they / live) here?", "Do they live"],
  [4, "q-i", "¿Necesito yo un uniforme?", "Do I need a uniform?", "___ (I / need) a uniform?", "Do I need"],
  [4, "q-you", "¿Cocinas los domingos?", "Do you cook on Sundays?", "___ (you / cook) on Sundays?", "Do you cook"],
  [4, "q-he", "¿Camina él al trabajo?", "Does he walk to work?", "___ (he / walk) to work?", "Does he walk"],
  [4, "q-she", "¿Prepara ella el desayuno?", "Does she prepare breakfast?", "___ (she / prepare) breakfast?", "Does she prepare"],
  [4, "q-they", "¿Estudian ellos en la tarde?", "Do they study in the afternoon?", "___ (they / study) in the afternoon?", "Do they study"],
  [4, "q-we", "¿Necesitamos un coche?", "Do we need a car?", "___ (we / need) a car?", "Do we need"],

  // Nivel 5 — frecuencia y dos cláusulas
  [5, "fr-always", "Ella siempre prepara el desayuno.", "She always prepares breakfast.", "She ___ prepares breakfast. (siempre)", "always"],
  [5, "fr-usually", "Yo normalmente trabajo en casa.", "I usually work at home.", "I ___ work at home. (normalmente)", "usually"],
  [5, "fr-often", "Ellos seguido visitan a sus padres.", "They often visit their parents.", "They ___ visit their parents. (seguido)", "often"],
  [5, "fr-sometimes", "A veces nosotros cocinamos juntos.", "Sometimes we cook together.", "___ we cook together. (a veces)", "Sometimes"],
  [5, "fr-never", "Él nunca estudia en la noche.", "He never studies at night.", "He ___ studies at night. (nunca)", "never"],
  [5, "fr-on-mondays", "Ella trabaja los lunes.", "She works on Mondays.", "She works ___. (los lunes)", "on Mondays"],
  [5, "fr-twice-a-week", "Yo estudio dos veces por semana.", "I study twice a week.", "I study ___. (dos veces por semana)", "twice a week"],
  [5, "fr-every-day", "Ellos caminan todos los días.", "They walk every day.", "They walk ___. (todos los días)", "every day"],
  [5, "fr-always", "Ella siempre empieza temprano porque vive cerca.", "She always starts early because she lives near.", "She ___ starts early because she lives near. (siempre)", "always"],
  [5, "fr-never", "Yo nunca trabajo los domingos pero estudio un poco.", "I never work on Sundays but I study a little.", "I ___ work on Sundays but I study a little. (nunca)", "never"],
  [5, "fr-sometimes", "A veces él cocina cuando ella trabaja tarde.", "Sometimes he cooks when she works late.", "___ he cooks when she works late. (a veces)", "Sometimes"],
  [5, "fr-often", "Nosotros seguido preparamos la cena y los niños ayudan.", "We often prepare dinner and the children help.", "We ___ prepare dinner and the children help. (seguido)", "often"],
];
