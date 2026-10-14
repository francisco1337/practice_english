/**
 * Pasado simple (A2). Verbos regulares con -ed y su ortografía, irregulares comunes,
 * negativo con did not, preguntas con did y respuestas cortas, preguntas wh- y oraciones de dos cláusulas.
 * items: [slug, english, spanish, category, hint, englishAlt?]
 * sentences: [nivel, slug, español, inglés, clozeText, clozeAnswer, inglésConError, alternativas?]
 */
export const items = [
  // Regular -ed
  ["regular-i", "I worked", "yo trabajé", "past-regular", "Para el pasado de un verbo regular agrega -ed: work → worked. Ej.: I worked from home yesterday."],
  ["regular-she", "she worked", "ella trabajó", "past-regular", "En pasado no hay -s para he/she/it: la forma es igual para todas las personas. Ej.: She worked late. (no: she workeds)"],
  ["regular-they", "they worked", "ellos trabajaron", "past-regular", "We/they/you usan la misma forma con -ed que I y she. Ej.: They fixed the bug on Monday."],
  // Ortografía
  ["ed-d", "used (use)", "usé (use: solo se agrega -d)", "past-ortografia", "Si el verbo termina en -e, solo agrega -d: use → used, like → liked. Ej.: I used a new library."],
  ["ed-y-ied", "studied (study)", "estudié (study: y → ied)", "past-ortografia", "Consonante + y: cambia la y por -ied: study → studied, try → tried. Pero vocal + y solo agrega -ed: play → played."],
  ["ed-double-stop", "stopped (stop)", "se detuvo (stop: doble p)", "past-ortografia", "Verbo corto que termina en consonante-vocal-consonante: duplica la última consonante: stop → stopped. Ej.: The server stopped."],
  ["ed-double-plan", "planned (plan)", "planeé (plan: doble n)", "past-ortografia", "Igual que stop: plan → planned (doble n). Ej.: We planned the sprint last Monday."],
  // Irregulares
  ["irr-was-were", "was / were (be)", "estaba / estuvo (be)", "past-irregular", "Be tiene dos formas: was para I/he/she/it y were para you/we/they. Ej.: I was tired. The users were angry."],
  ["irr-went", "went (go)", "fui (go)", "past-irregular", "Go es irregular: el pasado es went, nunca goed. Ej.: We went to the beach last summer."],
  ["irr-had", "had (have)", "tuve (have)", "past-irregular", "Have es irregular: el pasado es had para todas las personas. Ej.: I had a meeting yesterday."],
  ["irr-wrote", "wrote (write)", "escribí (write)", "past-irregular", "Write es irregular: write → wrote. Ej.: She wrote the documentation in 2020."],
  ["irr-sent", "sent (send)", "envié (send)", "past-irregular", "Send es irregular: send → sent (no sended). Ej.: I sent you the link five minutes ago."],
  ["irr-broke", "broke (break)", "rompí (break)", "past-irregular", "Break es irregular: break → broke (no breaked). Ej.: Luis broke his phone a week ago."],
  // Negativo
  ["neg-i", "I did not work", "yo no trabajé", "past-negativo", "Negativo: did not (didn't) + verbo en forma base, sin -ed. Ej.: I did not work on Sunday. (no: did not worked)"],
  ["neg-she", "she did not work", "ella no trabajó", "past-negativo", "Con he/she/it también es did not + forma base. El pasado ya lo marca did. Ej.: She did not come. (no: did not came)"],
  // Preguntas con did
  ["q-did-you", "Did you work?", "¿trabajaste?", "past-pregunta", "Pregunta: Did + sujeto + verbo base. Ej.: Did you check the pull request? (no: Did you checked)"],
  ["q-did-she", "Did she work?", "¿ella trabajó?", "past-pregunta", "Did sirve para todas las personas: Did she/he/it + verbo base. Ej.: Did Ana finish the ticket?"],
  ["q-did-they", "Did they work?", "¿ellos trabajaron?", "past-pregunta", "Did + they + verbo base. Ej.: Did they pay the bill? (no: Did they paid)"],
  ["short-yes", "Yes, I did.", "sí, yo sí (respuesta corta)", "past-pregunta", "Respuesta corta afirmativa: Yes + sujeto + did, sin repetir el verbo. Ej.: Did you see it? Yes, I did."],
  ["short-no", "No, she did not.", "no, ella no (respuesta corta)", "past-pregunta", "Respuesta corta negativa: No + sujeto + did not (didn't). Ej.: Did she come? No, she did not."],
  // Wh-
  ["wh-when", "When did it start?", "¿cuándo empezó?", "past-wh", "Palabra wh- + did + sujeto + verbo base. Ej.: When did the problem start? (no: When the problem started?)"],
  ["wh-did", "Where did you go?", "¿a dónde fuiste?", "past-wh", "Where/Why/What + did + sujeto + verbo base. Ej.: Why did you leave early? (no: Why you left?)"],
  ["wh-what-happened", "What happened?", "¿qué pasó?", "past-wh", "Cuando what es el sujeto no se usa did; el verbo va en pasado. Ej.: What happened to the server?"],
  ["wh-who", "Who fixed it?", "¿quién lo arregló?", "past-wh", "Who como sujeto: sin did, verbo en pasado. Ej.: Who fixed the bug? (no: Who did fix the bug?)"],
  // Dos cláusulas
  ["clause-when", "When I arrived, they left.", "cuando llegué, ellos se fueron", "past-clausulas", "Con when, las dos acciones van en pasado simple. Ej.: When I saw the error, I wrote to my boss."],
  ["clause-because", "I left because I was tired.", "me fui porque estaba cansado", "past-clausulas", "Con because, ambas partes van en pasado. Ej.: We restarted the server because it crashed."],
];

export const sentences = [
  // Nivel 1: afirmativo regular -ed
  [1, "regular-i", "Trabajé desde casa ayer.", "I worked from home yesterday.", "I ___ (work) from home yesterday.", "worked", "I work from home yesterday.", { en: ["Yesterday I worked from home."], es: ["Ayer trabajé desde casa."] }],
  [1, "regular-she", "Ana llamó a su mamá anoche.", "Ana called her mom last night.", "Ana ___ (call) her mom last night.", "called", "Ana call her mom last night.", { en: ["Ana called her mother last night."] }],
  [1, "regular-they", "Ellos arreglaron el error el lunes.", "They fixed the bug on Monday.", "They ___ (fix) the bug on Monday.", "fixed", "They fix the bug on Monday.", { en: ["They fixed the error on Monday."], es: ["Ellos corrigieron el error el lunes."] }],
  [1, "regular-i", "Revisé los logs esta mañana.", "I checked the logs this morning.", "I ___ (check) the logs this morning.", "checked", "I check the logs this morning.", { en: ["This morning I checked the logs."], es: ["Esta mañana revisé los logs."] }],
  [1, "regular-they", "Vimos una película el sábado.", "We watched a movie on Saturday.", "We ___ (watch) a movie on Saturday.", "watched", "We watch a movie on Saturday.", { es: ["El sábado vimos una película."] }],
  [1, "regular-she", "Luis terminó el reporte a las cinco.", "Luis finished the report at five.", "Luis ___ (finish) the report at five.", "finished", "Luis finish the report at five.", { en: ["Luis finished the report at five o'clock."] }],
  [1, "regular-she", "La reunión empezó a las diez.", "The meeting started at ten.", "The meeting ___ (start) at ten.", "started", "The meeting start at ten.", { en: ["The meeting started at ten o'clock."], es: ["La junta empezó a las diez.", "La reunión comenzó a las diez."] }],
  [1, "regular-i", "Ayudé a mi hermano con su tarea.", "I helped my brother with his homework.", "I ___ (help) my brother with his homework.", "helped", "I help my brother with his homework."],
  [1, "regular-they", "Instalamos la nueva versión la semana pasada.", "We installed the new version last week.", "We ___ (install) the new version last week.", "installed", "We install the new version last week.", { es: ["La semana pasada instalamos la nueva versión."] }],
  [1, "regular-she", "Mi jefe pidió un reporte hace dos días.", "My boss asked for a report two days ago.", "My boss ___ (ask) for a report two days ago.", "asked", "My boss ask for a report two days ago."],

  // Nivel 2: ortografía del -ed e irregulares
  [2, "ed-y-ied", "Estudié inglés por dos horas anoche.", "I studied English for two hours last night.", "I ___ (study) English for two hours last night.", "studied", "I studyed English for two hours last night.", { es: ["Anoche estudié inglés por dos horas."] }],
  [2, "ed-double-stop", "El servidor se detuvo a las tres de la mañana.", "The server stopped at three in the morning.", "The server ___ (stop) at three in the morning.", "stopped", "The server stoped at three in the morning.", { es: ["El servidor se paró a las tres de la mañana."] }],
  [2, "ed-double-plan", "Planeamos el sprint el lunes pasado.", "We planned the sprint last Monday.", "We ___ (plan) the sprint last Monday.", "planned", "We planed the sprint last Monday.", { es: ["El lunes pasado planeamos el sprint."] }],
  [2, "ed-d", "Usé una nueva librería para el proyecto.", "I used a new library for the project.", "I ___ (use) a new library for the project.", "used", "I use a new library for the project.", { es: ["Usé una biblioteca nueva para el proyecto.", "Usé una librería nueva para el proyecto."] }],
  [2, "irr-went", "Fuimos a la playa el verano pasado.", "We went to the beach last summer.", "We ___ (go) to the beach last summer.", "went", "We goed to the beach last summer.", { es: ["El verano pasado fuimos a la playa."] }],
  [2, "irr-had", "Tuve una reunión con el cliente ayer.", "I had a meeting with the client yesterday.", "I ___ (have) a meeting with the client yesterday.", "had", "I haved a meeting with the client yesterday.", { es: ["Ayer tuve una junta con el cliente.", "Tuve una junta con el cliente ayer."] }],
  [2, "irr-wrote", "Ella escribió la documentación en 2020.", "She wrote the documentation in 2020.", "She ___ (write) the documentation in 2020.", "wrote", "She writed the documentation in 2020."],
  [2, "irr-broke", "Luis rompió su teléfono hace una semana.", "Luis broke his phone a week ago.", "Luis ___ (break) his phone a week ago.", "broke", "Luis breaked his phone a week ago.", { en: ["Luis broke his phone one week ago."], es: ["Luis rompió su celular hace una semana."] }],
  [2, "irr-sent", "Te envié el enlace hace cinco minutos.", "I sent you the link five minutes ago.", "I ___ (send) you the link five minutes ago.", "sent", "I sended you the link five minutes ago.", { en: ["I sent the link to you five minutes ago."], es: ["Te mandé el enlace hace cinco minutos.", "Te mandé el link hace cinco minutos."] }],
  [2, "irr-was-were", "Los usuarios estaban molestos por el error.", "The users were angry about the bug.", "The users ___ (be) angry about the bug.", "were", "The users was angry about the bug.", { en: ["The users were upset about the bug.", "The users were angry about the error.", "The users were upset about the error."] }],

  // Nivel 3: negativo con did not
  [3, "neg-i", "No trabajé el domingo.", "I did not work on Sunday.", "I ___ (not / work) on Sunday.", "did not work", "I did not worked on Sunday.", { es: ["El domingo no trabajé."] }],
  [3, "neg-she", "Ella no vino a la reunión.", "She did not come to the meeting.", "She ___ (not / come) to the meeting.", "did not come", "She did not came to the meeting.", { es: ["Ella no vino a la junta."] }],
  [3, "neg-i", "No vi tu mensaje.", "I did not see your message.", "I ___ (not / see) your message.", "did not see", "I did not saw your message."],
  [3, "neg-she", "La prueba no pasó en el servidor.", "The test did not pass on the server.", "The test ___ (not / pass) on the server.", "did not pass", "The test did not passed on the server."],
  [3, "neg-i", "No desayunamos esta mañana.", "We did not have breakfast this morning.", "We ___ (not / have) breakfast this morning.", "did not have", "We did not had breakfast this morning.", { en: ["We did not eat breakfast this morning."], es: ["Esta mañana no desayunamos."] }],
  [3, "neg-she", "Luis no encontró sus llaves.", "Luis did not find his keys.", "Luis ___ (not / find) his keys.", "did not find", "Luis did not found his keys."],
  [3, "neg-i", "No hicieron el deploy el viernes.", "They did not deploy on Friday.", "They ___ (not / deploy) on Friday.", "did not deploy", "They not deployed on Friday.", { en: ["They did not do the deploy on Friday.", "They did not deploy it on Friday."] }],
  [3, "neg-she", "El error no apareció en los logs.", "The error did not appear in the logs.", "The error ___ (not / appear) in the logs.", "did not appear", "The error did not appeared in the logs.", { en: ["The bug did not appear in the logs."] }],
  [3, "neg-i", "No pagué la renta el mes pasado.", "I did not pay the rent last month.", "I ___ (not / pay) the rent last month.", "did not pay", "I did not paid the rent last month.", { en: ["I did not pay rent last month."], es: ["El mes pasado no pagué la renta."] }],
  [3, "neg-she", "Mi mamá no supo la respuesta.", "My mom did not know the answer.", "My mom ___ (not / know) the answer.", "did not know", "My mom did not knew the answer.", { en: ["My mother did not know the answer."], es: ["Mi mamá no sabía la respuesta."] }],

  // Nivel 4: preguntas con did y respuestas cortas
  [4, "q-did-you", "¿Trabajaste ayer?", "Did you work yesterday?", "___ you work yesterday?", "Did", "You worked yesterday?"],
  [4, "q-did-you", "¿Revisaste el pull request?", "Did you check the pull request?", "Did you ___ (check) the pull request?", "check", "Did you checked the pull request?", { en: ["Did you review the pull request?"] }],
  [4, "q-did-she", "¿Ana terminó el ticket?", "Did Ana finish the ticket?", "___ Ana finish the ticket?", "Did", "Did Ana finished the ticket?"],
  [4, "short-yes", "¿Viste el partido anoche? Sí, lo vi.", "Did you see the game last night? Yes, I did.", "Did you see the game last night? Yes, I ___.", "did", "Did you see the game last night? Yes, I saw.", { en: ["Did you see the game last night? Yes, I saw it.", "Did you watch the game last night? Yes, I did."] }],
  [4, "short-no", "¿Luis vino a la oficina? No, no vino.", "Did Luis come to the office? No, he did not.", "Did Luis come to the office? No, he ___.", "did not", "Did Luis came to the office? No, he did not.", { en: ["Did Luis come to the office? No, he did not come."] }],
  [4, "q-did-they", "¿Ellos pagaron la cuenta?", "Did they pay the bill?", "___ they pay the bill?", "Did", "Did they paid the bill?", { en: ["Did they pay the check?"] }],
  [4, "q-did-you", "¿Subiste los cambios a GitHub?", "Did you push the changes to GitHub?", "Did you ___ (push) the changes to GitHub?", "push", "Did you pushed the changes to GitHub?", { en: ["Did you upload the changes to GitHub?"] }],
  [4, "short-yes", "¿El deploy funcionó? Sí, funcionó.", "Did the deploy work? Yes, it did.", "Did the deploy work? Yes, it ___.", "did", "Did the deploy worked? Yes, it did.", { en: ["Did the deploy work? Yes, it worked."] }],
  [4, "short-no", "¿Dormiste bien anoche? No, no dormí bien.", "Did you sleep well last night? No, I did not.", "Did you sleep well last night? No, I ___.", "did not", "Did you slept well last night? No, I did not.", { en: ["Did you sleep well last night? No, I did not sleep well."] }],
  [4, "q-did-she", "¿Tu hermana te llamó el fin de semana?", "Did your sister call you on the weekend?", "___ your sister call you on the weekend?", "Did", "Did your sister called you on the weekend?", { en: ["Did your sister call you over the weekend?"] }],

  // Nivel 5: preguntas wh- y dos cláusulas
  [5, "wh-when", "¿Cuándo empezó el problema?", "When did the problem start?", "When ___ the problem start?", "did", "When the problem started?", { en: ["When did the issue start?"], es: ["¿Cuándo comenzó el problema?"] }],
  [5, "wh-what-happened", "¿Qué pasó con el servidor anoche?", "What happened to the server last night?", "What ___ (happen) to the server last night?", "happened", "What did happen to the server last night?", { en: ["What happened with the server last night?"], es: ["¿Qué le pasó al servidor anoche?"] }],
  [5, "wh-who", "¿Quién arregló el error?", "Who fixed the bug?", "Who ___ (fix) the bug?", "fixed", "Who did fix the bug?", { en: ["Who fixed the error?"], es: ["¿Quién corrigió el error?"] }],
  [5, "wh-did", "¿Dónde compraste esa laptop?", "Where did you buy that laptop?", "Where ___ you buy that laptop?", "did", "Where did you bought that laptop?", { es: ["¿Dónde compraste esa computadora portátil?"] }],
  [5, "wh-did", "¿Por qué saliste temprano del trabajo?", "Why did you leave work early?", "Why ___ you leave work early?", "did", "Why you left work early?", { es: ["¿Por qué te fuiste temprano del trabajo?"] }],
  [5, "clause-when", "Cuando llegué a casa, mi perro estaba dormido.", "When I got home, my dog was asleep.", "When I ___ (get) home, my dog was asleep.", "got", "When I get home, my dog was asleep.", { en: ["When I arrived home, my dog was asleep."] }],
  [5, "clause-when", "Cuando vi el error, le escribí a mi jefe.", "When I saw the error, I wrote to my boss.", "When I ___ (see) the error, I wrote to my boss.", "saw", "When I seed the error, I wrote to my boss.", { en: ["When I saw the bug, I wrote to my boss.", "When I saw the error, I wrote my boss."] }],
  [5, "clause-because", "Me fui temprano porque estaba cansado.", "I left early because I was tired.", "I left early because I ___ (be) tired.", "was", "I left early because I were tired.", { es: ["Me fui temprano porque estaba cansada.", "Salí temprano porque estaba cansado."] }],
  [5, "clause-because", "Reiniciamos el servidor porque se cayó.", "We restarted the server because it crashed.", "We ___ (restart) the server because it crashed.", "restarted", "We restart the server because it crashed.", { en: ["We rebooted the server because it crashed."] }],
  [5, "wh-who", "¿Quién mandó el correo al cliente?", "Who sent the email to the client?", "Who ___ (send) the email to the client?", "sent", "Who did send the email to the client?", { en: ["Who sent the client the email?"], es: ["¿Quién envió el correo al cliente?"] }],
];
