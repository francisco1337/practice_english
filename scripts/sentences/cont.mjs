/**
 * Frases de presente continuo por nivel.
 * Formato: [nivel, slug, español, inglés correcto, inglés CON EL ERROR]
 */
export const contSentences = [
  // Nivel 1 — afirmativo con am / is / are + -ing
  [1, "am-ing", "Yo estoy trabajando ahora.", "I am working now.", "I working now."],
  [1, "is-ing", "Él está trabajando ahora.", "He is working now.", "He are working now."],
  [1, "are-ing", "Ellos están estudiando ahora.", "They are studying now.", "They is studying now."],
  [1, "marker-now", "Ella está cocinando en este momento.", "She is cooking at the moment.", "She cooking at the moment."],
  [1, "am-ing", "Yo estoy esperando el autobús.", "I am waiting for the bus.", "I is waiting for the bus."],
  [1, "is-ing", "Ella está ayudando en la casa.", "She is helping at home.", "She are helping at home."],
  [1, "are-ing", "Nosotros estamos preparando la cena.", "We are preparing dinner.", "We is preparing dinner."],
  [1, "marker-now", "Ellos están jugando ahora mismo.", "They are playing right now.", "They playing right now."],
  [1, "is-ing", "El autobús está pasando ahora.", "The bus is passing now.", "The bus are passing now."],
  [1, "am-ing", "Yo estoy estudiando inglés hoy.", "I am studying English today.", "I studying English today."],

  // Nivel 2 — ortografía del -ing
  [2, "ing-drop-e", "Él está usando mi teléfono.", "He is using my phone.", "He is useing my phone."],
  [2, "ing-drop-e", "Ella está viviendo en una ciudad grande.", "She is living in a big city.", "She is liveing in a big city."],
  [2, "ing-double", "Ellos están parando el coche.", "They are stopping the car.", "They are stoping the car."],
  [2, "ing-double-plan", "Nosotros estamos planeando una fiesta.", "We are planning a party.", "We are planing a party."],
  [2, "ing-ie-y", "Las plantas están muriendo.", "The plants are dying.", "The plants are dieing."],
  [2, "ing-y-keeps", "Ella está estudiando en su cuarto.", "She is studying in her room.", "She is studing in her room."],
  [2, "ing-carry", "Él está cargando la caja.", "He is carrying the box.", "He is carring the box."],
  [2, "ing-simple", "Ellos están observando el partido.", "They are watching the game.", "They are watcheing the game."],
  [2, "ing-double", "Ella está dejando caer los libros.", "She is dropping the books.", "She is droping the books."],
  [2, "ing-drop-e", "Yo estoy preparando el desayuno.", "I am preparing breakfast.", "I am prepareing breakfast."],

  // Nivel 3 — negativo, preguntas y respuestas cortas
  [3, "neg-am", "Yo no estoy trabajando ahora.", "I am not working now.", "I amn't working now."],
  [3, "neg-is", "Él no está estudiando.", "He is not studying.", "He does not studying."],
  [3, "neg-are", "Ellos no están jugando.", "They are not playing.", "They not are playing."],
  [3, "q-am", "¿Estoy hablando muy rápido?", "Am I talking too fast?", "I am talking too fast?"],
  [3, "q-is", "¿Está él trabajando hoy?", "Is he working today?", "Does he working today?"],
  [3, "q-are", "¿Están ellos esperando afuera?", "Are they waiting outside?", "Are they wait outside?"],
  [3, "q-short", "Sí, está.", "Yes, he is.", "Yes, he does."],
  [3, "neg-short", "No, no estoy.", "No, I am not.", "No, I amn't."],
  [3, "q-wh", "¿Qué estás haciendo?", "What are you doing?", "What you are doing?"],
  [3, "q-wh", "¿Dónde está estudiando ella?", "Where is she studying?", "Where does she studying?"],

  // Nivel 4 — continuo contra presente simple
  [4, "contrast-now", "Él trabaja todos los días pero hoy no está trabajando.", "He works every day but today he is not working.", "He is working every day but today he does not work."],
  [4, "contrast-every-day", "Ella estudia inglés todos los días.", "She studies English every day.", "She is studying English every day."],
  [4, "contrast-now", "Normalmente ella cocina, pero ahora está estudiando.", "She usually cooks, but now she is studying.", "She is usually cooking, but now she studies."],
  [4, "contrast-state", "Yo quiero un café.", "I want a coffee.", "I am wanting a coffee."],
  [4, "contrast-state", "Ella necesita ayuda ahora.", "She needs help now.", "She is needing help now."],
  [4, "contrast-temporary", "Ella está viviendo en México este año.", "She is living in Mexico this year.", "She is live in Mexico this year."],
  [4, "contrast-every-day", "Ellos caminan al trabajo los lunes.", "They walk to work on Mondays.", "They are walking to work on Mondays."],
  [4, "contrast-now", "Nosotros estamos esperando ahora.", "We are waiting now.", "We wait now."],
  [4, "contrast-state", "Él prefiere el té.", "He prefers tea.", "He is preferring tea."],
  [4, "contrast-every-day", "El autobús pasa a las ocho todos los días.", "The bus passes at eight every day.", "The bus is passing at eight every day."],

  // Nivel 5 — errores típicos y dos cláusulas
  [5, "trap-no-be", "Ella está estudiando porque tiene un examen.", "She is studying because she has a test.", "She studying because she has a test."],
  [5, "trap-no-do", "Él no está ayudando porque está trabajando.", "He is not helping because he is working.", "He does not helping because he is working."],
  [5, "trap-ing-required", "Los niños están jugando en el parque.", "The children are playing in the park.", "The children are play in the park."],
  [5, "trap-be-agrees", "Los maestros están esperando afuera.", "The teachers are waiting outside.", "The teachers is waiting outside."],
  [5, "trap-be-agrees", "Mi hermano está estudiando inglés.", "My brother is studying English.", "My brother are studying English."],
  [5, "q-wh", "¿Qué están haciendo los niños?", "What are the children doing?", "What the children are doing?"],
  [5, "trap-no-be", "Yo estoy cocinando mientras ella estudia.", "I am cooking while she studies.", "I cooking while she studies."],
  [5, "contrast-now", "Ellos siempre trabajan los sábados pero hoy no están trabajando.", "They always work on Saturdays but today they are not working.", "They are always working on Saturdays but today they not working."],
  [5, "ing-drop-e", "Ella está usando el coche de él porque el suyo no funciona.", "She is using his car because hers does not work.", "She is useing his car because hers does not work."],
  [5, "trap-no-do", "¿Está ella cocinando o está estudiando?", "Is she cooking or is she studying?", "Does she cooking or does she studying?"],
];
