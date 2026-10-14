/**
 * Futuro con will y going to (A2). Decisiones, promesas y ofrecimientos con will;
 * planes y predicciones con evidencia con going to; negativos, preguntas, wh- y oraciones con if.
 * items: [slug, english, spanish, category, hint, englishAlt?]
 * sentences: [nivel, slug, español, inglés, clozeText, clozeAnswer, inglésConError, alternativas?]
 */
export const items = [
  ["will-decision", "I will call you", "te llamaré (decisión del momento)", "fut-will", "Usa will + verbo base para decisiones que tomas en el momento. Ej.: It is cold. I will close the window."],
  ["will-promesa", "I will fix it today", "lo arreglaré hoy (promesa)", "fut-will", "Para promesas usa will + verbo base, sin 'to'. Ej.: I promise I will fix the bug today."],
  ["will-ofrecimiento", "I will help you", "te ayudaré (ofrecimiento)", "fut-will", "Para ofrecer ayuda usa will + verbo base. Ej.: That box is heavy. I will help you."],
  ["will-third", "she will send it", "ella lo enviará", "fut-will", "Con will el verbo no cambia en tercera persona: nada de -s. Ej.: Ana will send (no 'will sends') the report."],
  ["will-think", "I think it will work", "creo que funcionará (opinión)", "fut-prediccion", "Para predicciones basadas en tu opinión usa I think + will + verbo base. Ej.: I think it will be hot tomorrow."],
  ["will-neg", "I won't forget", "no olvidaré (promesa)", "fut-will-neg", "Negativo: will not (won't) + verbo base. No uses 'don't will'. Ej.: I will not forget your birthday.", ["I will not forget"]],
  ["will-neg-third", "it will not take long", "no tardará mucho", "fut-will-neg", "En negativo, will not sirve igual para todas las personas y el verbo va en forma base. Ej.: The meeting will not take long.", ["it won't take long"]],
  ["will-pregunta", "Will you help me?", "¿me ayudarás?", "fut-will-pregunta", "Pregunta: Will + sujeto + verbo base. No uses 'do' ni 'to'. Ej.: Will you review my code today?"],
  ["will-pregunta-third", "Will it be ready?", "¿estará listo?", "fut-will-pregunta", "Con 'be' en futuro: Will + sujeto + be. Ej.: Will the server be ready tomorrow? (no 'Will the server is')."],
  ["will-corta-si", "Yes, I will.", "sí (respuesta corta con will)", "fut-will-pregunta", "A una pregunta con will se responde con will, no con do. Ej.: Will you come? Yes, I will."],
  ["will-corta-no", "No, I won't.", "no (respuesta corta con will)", "fut-will-pregunta", "Respuesta corta negativa: No, I will not (won't). Ej.: Will you work on Saturday? No, I won't.", ["No, I will not."]],
  ["going-plan-i", "I am going to study", "voy a estudiar (plan)", "fut-going", "Para planes ya decididos: am/is/are + going to + verbo base. Ej.: I am going to study English tonight."],
  ["going-plan-we", "we are going to migrate", "vamos a migrar (plan)", "fut-going", "Con we/you/they usa are going to + verbo base. No olvides 'are'. Ej.: We are going to migrate the database next week."],
  ["going-plan-she", "she is going to travel", "ella va a viajar (plan)", "fut-going", "Con he/she/it usa is going to + verbo base, sin -s en el verbo. Ej.: Luis is going to write the tests."],
  ["going-neg", "I am not going to work", "no voy a trabajar (plan)", "fut-going-neg", "Negativo: am/is/are + not + going to + verbo base. No uses 'don't'. Ej.: We are not going to deploy today."],
  ["going-neg-third", "he is not going to come", "él no va a venir", "fut-going-neg", "Con he/she/it: is not (isn't) going to + verbo base. Ej.: The client is not going to pay more."],
  ["going-pregunta", "Are you going to deploy?", "¿vas a hacer el deploy?", "fut-going-pregunta", "Pregunta: Am/Is/Are + sujeto + going to + verbo base. Ej.: Are they going to hire another developer?"],
  ["going-evidencia", "it is going to rain", "va a llover (evidencia)", "fut-prediccion", "Si ves evidencia ahora, usa going to para predecir. Ej.: Look at those clouds. It is going to rain."],
  ["going-evidencia-fail", "the build is going to fail", "el build va a fallar (evidencia)", "fut-prediccion", "Predicción por lo que ves ahora (logs, la hora...): is/are going to + verbo base. Ej.: We are going to be late."],
  ["wh-will", "When will it be ready?", "¿cuándo estará listo?", "fut-wh", "Pregunta wh- con will: palabra wh- + will + sujeto + verbo base. Ej.: When will the bug be fixed? (no 'When the bug will be')."],
  ["wh-going", "What are you going to do?", "¿qué vas a hacer?", "fut-wh", "Pregunta wh- con going to: palabra wh- + am/is/are + sujeto + going to + verbo. Ej.: Where are we going to deploy the app?"],
  ["if-will", "If it rains, I will stay home", "si llueve, me quedaré en casa (condición)", "fut-if", "Con if, la parte del if va en presente y la otra con will. Ej.: If the tests pass, we will deploy (no 'If the tests will pass')."],
];

export const sentences = [
  // Nivel 1: will para decisiones, promesas y ofrecimientos
  [1, "will-decision", "Hace frío. Cerraré la ventana.", "It is cold. I will close the window.", "It is cold. I ___ (close) the window.", "will close", "It is cold. I will to close the window.", { es: ["Hace frío. Voy a cerrar la ventana."] }],
  [1, "will-decision", "Está sonando el teléfono. Yo contestaré.", "The phone is ringing. I will answer it.", "The phone is ringing. I ___ (answer) it.", "will answer", "The phone is ringing. I will answering it."],
  [1, "will-decision", "Tengo hambre. Pediré una pizza.", "I am hungry. I will order a pizza.", "I am hungry. I ___ (order) a pizza.", "will order", "I am hungry. I will ordered a pizza.", { es: ["Tengo hambre. Voy a pedir una pizza."] }],
  [1, "will-promesa", "Te prometo que arreglaré el bug hoy.", "I promise I will fix the bug today.", "I promise I ___ (fix) the bug today.", "will fix", "I promise I will fixed the bug today."],
  [1, "will-promesa", "Te llamaré mañana.", "I will call you tomorrow.", "I ___ (call) you tomorrow.", "will call", "I will calling you tomorrow.", { es: ["Te voy a llamar mañana."] }],
  [1, "will-promesa", "Revisaré tu pull request esta noche.", "I will review your pull request tonight.", "I ___ (review) your pull request tonight.", "will review", "I review will your pull request tonight."],
  [1, "will-ofrecimiento", "Esa caja está pesada. Te ayudaré.", "That box is heavy. I will help you.", "That box is heavy. I ___ (help) you.", "will help", "That box is heavy. I will helps you."],
  [1, "will-ofrecimiento", "Te enviaré los logs.", "I will send you the logs.", "I ___ (send) you the logs.", "will send", "I will to send you the logs."],
  [1, "will-third", "Ana te enviará el reporte el lunes.", "Ana will send you the report on Monday.", "Ana ___ (send) you the report on Monday.", "will send", "Ana will sends you the report on Monday."],
  [1, "will-third", "El equipo terminará la tarea pronto.", "The team will finish the task soon.", "The team ___ (finish) the task soon.", "will finish", "The team wills finish the task soon."],

  // Nivel 2: will not y preguntas con will
  [2, "will-neg", "No olvidaré tu cumpleaños.", "I will not forget your birthday.", "I ___ (not / forget) your birthday.", "will not forget", "I will not to forget your birthday."],
  [2, "will-neg", "No le diré a nadie.", "I will not tell anyone.", "I ___ (not / tell) anyone.", "will not tell", "I don't will tell anyone."],
  [2, "will-neg", "No volveré a hacer push directo a main.", "I will not push directly to main again.", "I ___ (not / push) directly to main again.", "will not push", "I will not pushing directly to main again."],
  [2, "will-neg-third", "La reunión no tardará mucho.", "The meeting will not take long.", "The meeting ___ (not / take) long.", "will not take", "The meeting will not takes long."],
  [2, "will-neg-third", "Luis no estará en la oficina mañana.", "Luis will not be in the office tomorrow.", "Luis ___ (not / be) in the office tomorrow.", "will not be", "Luis will not is in the office tomorrow."],
  [2, "will-pregunta", "¿Me ayudarás con la mudanza?", "Will you help me with the move?", "___ (you / help) me with the move?", "Will you help", "Will you to help me with the move?", { es: ["¿Me vas a ayudar con la mudanza?"] }],
  [2, "will-pregunta", "¿Revisarás mi código hoy?", "Will you review my code today?", "___ (you / review) my code today?", "Will you review", "Do you will review my code today?", { en: ["Will you check my code today?"] }],
  [2, "will-pregunta-third", "¿Estará listo el servidor mañana?", "Will the server be ready tomorrow?", "___ (the server / be) ready tomorrow?", "Will the server be", "Will the server is ready tomorrow?"],
  [2, "will-corta-si", "¿Vendrás a la fiesta? Sí.", "Will you come to the party? Yes, I will.", "Will you come to the party? Yes, I ___.", "will", "Will you come to the party? Yes, I do."],
  [2, "will-corta-no", "¿Trabajarás el sábado? No.", "Will you work on Saturday? No, I will not.", "Will you work on Saturday? No, I ___.", "will not", "Will you work on Saturday? No, I don't."],

  // Nivel 3: going to para planes e intenciones
  [3, "going-plan-i", "Voy a estudiar inglés esta noche.", "I am going to study English tonight.", "I ___ (study) English tonight.", "am going to study", "I going to study English tonight."],
  [3, "going-plan-i", "Voy a comprar una laptop nueva el próximo mes.", "I am going to buy a new laptop next month.", "I ___ (buy) a new laptop next month.", "am going to buy", "I am going to buying a new laptop next month."],
  [3, "going-plan-i", "Voy a aprender Docker este año.", "I am going to learn Docker this year.", "I ___ (learn) Docker this year.", "am going to learn", "I am go to learn Docker this year."],
  [3, "going-plan-we", "Vamos a migrar la base de datos la próxima semana.", "We are going to migrate the database next week.", "We ___ (migrate) the database next week.", "are going to migrate", "We is going to migrate the database next week."],
  [3, "going-plan-we", "Vamos a visitar a mis papás el domingo.", "We are going to visit my parents on Sunday.", "We ___ (visit) my parents on Sunday.", "are going to visit", "We are going visit my parents on Sunday."],
  [3, "going-plan-we", "Vamos a tener una reunión de planeación mañana.", "We are going to have a planning meeting tomorrow.", "We ___ (have) a planning meeting tomorrow.", "are going to have", "We are going to has a planning meeting tomorrow."],
  [3, "going-plan-we", "Ellos van a cocinar algo especial esta noche.", "They are going to cook something special tonight.", "They ___ (cook) something special tonight.", "are going to cook", "They is going to cook something special tonight."],
  [3, "going-plan-she", "Ana va a cambiar de trabajo.", "Ana is going to change jobs.", "Ana ___ (change) jobs.", "is going to change", "Ana are going to change jobs.", { en: ["Ana is going to change her job."] }],
  [3, "going-plan-she", "Mi hermano va a viajar a Canadá en dos semanas.", "My brother is going to travel to Canada in two weeks.", "My brother ___ (travel) to Canada in two weeks.", "is going to travel", "My brother is going to travels to Canada in two weeks."],
  [3, "going-plan-she", "Luis va a escribir las pruebas unitarias.", "Luis is going to write the unit tests.", "Luis ___ (write) the unit tests.", "is going to write", "Luis going to write the unit tests."],

  // Nivel 4: going to negativo, preguntas y predicciones con evidencia
  [4, "going-neg", "No voy a trabajar este fin de semana.", "I am not going to work this weekend.", "I ___ (not / work) this weekend.", "am not going to work", "I not going to work this weekend."],
  [4, "going-neg", "No vamos a hacer el deploy hoy.", "We are not going to deploy today.", "We ___ (not / deploy) today.", "are not going to deploy", "We don't going to deploy today."],
  [4, "going-neg-third", "Él no va a venir a la reunión.", "He is not going to come to the meeting.", "He ___ (not / come) to the meeting.", "is not going to come", "He does not going to come to the meeting."],
  [4, "going-neg-third", "El cliente no va a pagar más.", "The client is not going to pay more.", "The client ___ (not / pay) more.", "is not going to pay", "The client is not going to pays more."],
  [4, "going-pregunta", "¿Vas a hacer el deploy esta tarde?", "Are you going to deploy this afternoon?", "___ (you / deploy) this afternoon?", "Are you going to deploy", "Do you going to deploy this afternoon?"],
  [4, "going-pregunta", "¿Van a contratar a otro desarrollador?", "Are they going to hire another developer?", "___ (they / hire) another developer?", "Are they going to hire", "Are they going to hiring another developer?"],
  [4, "going-evidencia", "Mira esas nubes. Va a llover.", "Look at those clouds. It is going to rain.", "Look at those clouds. It ___ (rain).", "is going to rain", "Look at those clouds. It is going rain."],
  [4, "going-evidencia", "¡Cuidado! Te vas a caer.", "Be careful! You are going to fall.", "Be careful! You ___ (fall).", "are going to fall", "Be careful! You going to fall."],
  [4, "going-evidencia-fail", "Hay muchos errores en los logs. El build va a fallar.", "There are a lot of errors in the logs. The build is going to fail.", "There are a lot of errors in the logs. The build ___ (fail).", "is going to fail", "There are a lot of errors in the logs. The build is going to failed."],
  [4, "going-evidencia-fail", "Son las 8:55. Vamos a llegar tarde a la reunión.", "It is 8:55. We are going to be late for the meeting.", "It is 8:55. We ___ (be) late for the meeting.", "are going to be", "It is 8:55. We are going to late for the meeting."],

  // Nivel 5: will o going to, preguntas wh- y dos cláusulas
  [5, "will-think", "Creo que el nuevo diseño les gustará.", "I think they will like the new design.", "I think they ___ (like) the new design.", "will like", "I think they will likes the new design.", { es: ["Creo que les va a gustar el nuevo diseño."] }],
  [5, "will-think", "Creo que mañana hará calor.", "I think it will be hot tomorrow.", "I think it ___ (be) hot tomorrow.", "will be", "I think it will is hot tomorrow.", { es: ["Creo que mañana va a hacer calor."] }],
  [5, "will-think", "No creo que el cambio rompa nada.", "I do not think the change will break anything.", "I do not think the change ___ (break) anything.", "will break", "I do not think the change will breaks anything."],
  [5, "wh-will", "¿Cuándo estará arreglado el bug?", "When will the bug be fixed?", "When ___ (the bug / be) fixed?", "will the bug be", "When the bug will be fixed?"],
  [5, "wh-will", "¿A qué hora llegarás?", "What time will you arrive?", "What time ___ (you / arrive)?", "will you arrive", "What time you will arrive?"],
  [5, "wh-going", "¿Qué vas a hacer este fin de semana?", "What are you going to do this weekend?", "What ___ (you / do) this weekend?", "are you going to do", "What you are going to do this weekend?"],
  [5, "wh-going", "¿Dónde vamos a desplegar la aplicación?", "Where are we going to deploy the app?", "Where ___ (we / deploy) the app?", "are we going to deploy", "Where we are going to deploy the app?", { en: ["Where are we going to deploy the application?"] }],
  [5, "if-will", "Si los tests pasan, haremos el deploy hoy.", "If the tests pass, we will deploy today.", "If the tests pass, we ___ (deploy) today.", "will deploy", "If the tests will pass, we will deploy today."],
  [5, "if-will", "Si llueve mañana, veremos una película en casa.", "If it rains tomorrow, we will watch a movie at home.", "If it rains tomorrow, we ___ (watch) a movie at home.", "will watch", "If it will rain tomorrow, we will watch a movie at home."],
  [5, "going-plan-i", "Voy a trabajar desde casa mañana, así que te llamaré en la tarde.", "I am going to work from home tomorrow, so I will call you in the afternoon.", "I ___ (work) from home tomorrow, so I will call you in the afternoon.", "am going to work", "I am going to working from home tomorrow, so I will call you in the afternoon."],
];
