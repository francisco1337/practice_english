/**
 * Conectores: causa, resultado, contraste, propósito y secuencia (A2). Une ideas con and/but/or,
 * explica causas (because / because of), resultados (so), contrastes (although / even though),
 * propósitos (to + verbo / in order to) y pasos en orden (first, then, after that, finally).
 * items: [slug, english, spanish, category, hint, englishAlt?]
 * sentences: [nivel, slug, español, inglés, clozeText, clozeAnswer, inglésConError, alternativas?]
 */
export const items = [
  ["and", "and", "y", "conn-basico", "Une dos ideas que se suman. Ej.: \"I opened the laptop and checked my email.\""],
  ["or", "or", "o", "conn-basico", "Presenta opciones. Ej.: \"You can restart the service or clear the cache.\""],
  ["but", "but", "pero", "conn-contraste", "Contrasta dos ideas y va entre ellas. Ej.: \"The code works, but it is very slow.\" Nunca lo uses junto con although."],
  ["although", "although", "aunque", "conn-contraste", "Va al inicio de la idea que contrasta; la otra parte va sin but. Ej.: \"Although I was tired, I finished the report.\""],
  ["even-though", "even though", "aun cuando / a pesar de que", "conn-contraste", "Igual que although, pero más fuerte. Siempre son dos palabras: \"Even though we restarted the server, the error continued.\""],
  ["because", "because", "porque", "conn-causa", "Va seguido de una oración completa (sujeto + verbo). Ej.: \"I stayed home because I was sick.\""],
  ["because-of", "because of", "por (causa) + sustantivo", "conn-causa", "Va seguido de un sustantivo, no de una oración. Ej.: \"We arrived late because of the traffic.\""],
  ["so", "so", "así que / por eso", "conn-resultado", "Introduce el resultado; la causa va antes. Ej.: \"The build failed, so I checked the logs.\""],
  ["to-verb", "to + verbo", "para + verbo", "conn-proposito", "Para decir para qué haces algo usa to + verbo, nunca for + verbo. Ej.: \"We added a cache to improve performance.\""],
  ["in-order-to", "in order to", "con el fin de + verbo", "conn-proposito", "Versión más formal de to + verbo. Ej.: \"We changed the query in order to reduce the response time.\""],
  ["first", "first", "primero", "conn-secuencia", "Marca el primer paso de una secuencia. Ej.: \"First restart the service; then check the logs.\""],
  ["then", "then", "luego", "conn-secuencia", "Marca el siguiente paso. Ojo: es then, no than. Ej.: \"I had breakfast and then I went to work.\""],
  ["next", "next", "a continuación", "conn-secuencia", "Otro paso en una lista de instrucciones. Ej.: \"Next, clear the browser cache.\""],
  ["after-that", "after that", "después de eso", "conn-secuencia", "Conecta con el paso anterior; no lleva of. Ej.: \"Open the terminal. After that, run the script.\""],
  ["finally", "finally", "finalmente / por último", "conn-secuencia", "Marca el último paso. Ej.: \"Finally, we deployed to production.\"", ["lastly"]],
  ["before", "before", "antes de (que)", "conn-tiempo", "Va con sustantivo, verbo en -ing u oración, nunca con el verbo solo. Ej.: \"Before merging, run the tests.\""],
  ["after", "after", "después de (que)", "conn-tiempo", "Va con sustantivo, -ing u oración, sin of. Ej.: \"After the meeting, I updated the ticket.\""],
  ["when", "when", "cuando", "conn-tiempo", "Une dos acciones en el tiempo. Ej.: \"When I got home, I had dinner.\" (got home, sin to)."],
];

export const sentences = [
  // Nivel 1: and, but y because
  [1, "and", "Abrí la laptop y revisé mi correo.", "I opened the laptop and checked my email.", "I opened the laptop ___ checked my email.", "and", "I opened the laptop and check my email.", { en: ["I opened the laptop and I checked my email."] }],
  [1, "and", "Ana escribe el código y Luis lo prueba.", "Ana writes the code and Luis tests it.", "Ana writes the code ___ Luis tests it.", "and", "Ana writes the code and Luis test it."],
  [1, "but", "Quiero ir a la playa, pero no tengo tiempo.", "I want to go to the beach, but I do not have time.", "I want to go to the beach, ___ I do not have time. (pero)", "but", "I want to go to the beach, but I have not time."],
  [1, "but", "El código funciona, pero es muy lento.", "The code works, but it is very slow.", "The code works, ___ it is very slow. (pero)", "but", "The code works, but is very slow."],
  [1, "because", "Me quedé en casa porque estaba enfermo.", "I stayed home because I was sick.", "I stayed home ___ I was sick. (porque)", "because", "I stayed home because was sick.", { en: ["I stayed at home because I was sick."] }],
  [1, "because", "No pude conectarme porque el servidor estaba caído.", "I could not connect because the server was down.", "I could not connect ___ the server was down. (porque)", "because", "I could not connect because of the server was down."],
  [1, "because-of", "Llegamos tarde por el tráfico.", "We arrived late because of the traffic.", "We arrived late ___ the traffic. (por + sustantivo)", "because of", "We arrived late because the traffic.", { en: ["We were late because of the traffic."], es: ["Llegamos tarde por culpa del tráfico."] }],
  [1, "because-of", "La página es lenta por el tamaño de las imágenes.", "The page is slow because of the size of the images.", "The page is slow ___ the size of the images. (por + sustantivo)", "because of", "The page is slow because the size of the images.", { en: ["The page is slow because of the image size."] }],
  [1, "or", "¿Quieres té o café?", "Do you want tea or coffee?", "Do you want tea ___ coffee?", "or", "You want tea or coffee?", { en: ["Would you like tea or coffee?"] }],
  [1, "or", "Puedes reiniciar el servicio o borrar la caché.", "You can restart the service or clear the cache.", "You can restart the service ___ clear the cache.", "or", "You can restart the service or to clear the cache.", { en: ["You can restart the service or delete the cache."] }],

  // Nivel 2: so, causa y resultado
  [2, "so", "Estaba cansado, así que me fui a dormir temprano.", "I was tired, so I went to bed early.", "I was tired, ___ I went to bed early. (así que)", "so", "I was tired, because I went to bed early.", { en: ["I was tired, so I went to sleep early."], es: ["Estaba cansado, por eso me fui a dormir temprano."] }],
  [2, "so", "El build falló, así que revisé los logs.", "The build failed, so I checked the logs.", "The build failed, ___ I checked the logs. (así que)", "so", "The build failed, because I checked the logs.", { es: ["El build falló, por eso revisé los logs."] }],
  [2, "so", "Llovía mucho, así que tomamos un taxi.", "It was raining a lot, so we took a taxi.", "It was raining a lot, ___ we took a taxi. (así que)", "so", "It was raining a lot, so we take a taxi.", { en: ["It was raining hard, so we took a taxi."] }],
  [2, "so", "No tenía hambre, así que no comí.", "I was not hungry, so I did not eat.", "I was not hungry, ___ I did not eat. (así que)", "so", "I was not hungry, so I did not ate."],
  [2, "so", "La prueba falló, por eso no hicimos el deploy.", "The test failed, so we did not deploy.", "The test failed, ___ we did not deploy. (por eso)", "so", "The test failed, because we did not deploy.", { es: ["La prueba falló, así que no hicimos el deploy."] }],
  [2, "so", "El servidor se quedó sin memoria, así que se reinició.", "The server ran out of memory, so it restarted.", "The server ran out of memory, ___ it restarted. (así que)", "so", "The server ran out of memory, so restarted."],
  [2, "so", "La tienda estaba cerrada, así que fuimos a otra.", "The store was closed, so we went to another one.", "The store was closed, ___ we went to another one. (así que)", "so", "The store was closed, because we went to another one.", { en: ["The store was closed, so we went to another store.", "The shop was closed, so we went to another one."] }],
  [2, "because", "Revisé los logs porque el build falló.", "I checked the logs because the build failed.", "I checked the logs ___ the build failed. (porque)", "because", "I checked the logs so the build failed."],
  [2, "so", "Hacía frío, así que me puse una chamarra.", "It was cold, so I put on a jacket.", "It was cold, ___ I put on a jacket. (así que)", "so", "It was cold, so I put a jacket.", { es: ["Hacía frío, por eso me puse una chamarra."] }],
  [2, "so", "La API cambió, así que actualizamos el cliente.", "The API changed, so we updated the client.", "The API changed, ___ we updated the client. (así que)", "so", "The API changed, because we updated the client."],

  // Nivel 3: although y but, contraste
  [3, "although", "Aunque estaba cansado, terminé el reporte.", "Although I was tired, I finished the report.", "___ I was tired, I finished the report. (aunque)", "Although", "Although I was tired, but I finished the report.", { en: ["Even though I was tired, I finished the report."] }],
  [3, "although", "Aunque llovía, salimos a caminar.", "Although it was raining, we went for a walk.", "___ it was raining, we went for a walk. (aunque)", "Although", "Although it was raining, but we went for a walk.", { en: ["Even though it was raining, we went for a walk."] }],
  [3, "although", "Aunque el código es viejo, funciona bien.", "Although the code is old, it works well.", "___ the code is old, it works well. (aunque)", "Although", "Although the code is old, works well.", { en: ["Even though the code is old, it works well."] }],
  [3, "even-though", "La prueba pasó aunque el código tenía un bug.", "The test passed even though the code had a bug.", "The test passed ___ the code had a bug. (a pesar de que)", "even though", "The test passed even the code had a bug.", { en: ["The test passed although the code had a bug."] }],
  [3, "but", "Estudié mucho, pero no pasé el examen.", "I studied a lot, but I did not pass the exam.", "I studied a lot, ___ I did not pass the exam. (pero)", "but", "Although I studied a lot, but I did not pass the exam."],
  [3, "but", "El servicio está corriendo, pero no responde.", "The service is running, but it does not respond.", "The service is running, ___ it does not respond. (pero)", "but", "The service is running, but it not responds.", { en: ["The service is running, but it is not responding."] }],
  [3, "although", "Aunque no hablo bien inglés, entiendo mucho.", "Although I do not speak English well, I understand a lot.", "___ I do not speak English well, I understand a lot. (aunque)", "Although", "Although I do not speak English well, but I understand a lot.", { en: ["Even though I do not speak English well, I understand a lot."] }],
  [3, "even-though", "Aun cuando reiniciamos el servidor, el error continuó.", "Even though we restarted the server, the error continued.", "___ we restarted the server, the error continued. (aun cuando)", "Even though", "Even we restarted the server, the error continued.", { en: ["Although we restarted the server, the error continued.", "Even though we restarted the server, the error persisted."] }],
  [3, "but", "Me gusta mi trabajo, pero el horario es difícil.", "I like my job, but the schedule is difficult.", "I like my job, ___ the schedule is difficult. (pero)", "but", "I like my job, but the schedule it is difficult.", { en: ["I like my job, but the schedule is hard."] }],
  [3, "although", "Aunque la casa es pequeña, es muy cómoda.", "Although the house is small, it is very comfortable.", "___ the house is small, it is very comfortable. (aunque)", "Although", "Although the house is small, but it is very comfortable.", { en: ["Even though the house is small, it is very comfortable."] }],

  // Nivel 4: to + verbo, para qué
  [4, "to-verb", "Agregamos una caché para mejorar el rendimiento.", "We added a cache to improve performance.", "We added a cache ___ improve performance. (para)", "to", "We added a cache for improve performance.", { en: ["We added a cache in order to improve performance.", "We added a cache to improve the performance."] }],
  [4, "to-verb", "Fui a la tienda para comprar leche.", "I went to the store to buy milk.", "I went to the store ___ buy milk. (para)", "to", "I went to the store for buy milk.", { en: ["I went to the store in order to buy milk."] }],
  [4, "to-verb", "Estudio inglés para conseguir un trabajo remoto.", "I study English to get a remote job.", "I study English ___ get a remote job. (para)", "to", "I study English for to get a remote job.", { en: ["I am studying English to get a remote job.", "I study English in order to get a remote job."] }],
  [4, "to-verb", "Reinicié el router para arreglar la conexión.", "I restarted the router to fix the connection.", "I restarted the router ___ fix the connection. (para)", "to", "I restarted the router for fixing the connection.", { en: ["I restarted the router in order to fix the connection."] }],
  [4, "to-verb", "Ana se levanta temprano para hacer ejercicio.", "Ana gets up early to exercise.", "Ana gets up early ___ exercise. (para)", "to", "Ana gets up early for to exercise.", { en: ["Ana gets up early in order to exercise."] }],
  [4, "in-order-to", "Cambiamos la consulta con el fin de reducir el tiempo de respuesta.", "We changed the query in order to reduce the response time.", "We changed the query ___ reduce the response time. (con el fin de)", "in order to", "We changed the query in order for reduce the response time.", { en: ["We changed the query to reduce the response time."] }],
  [4, "to-verb", "Agregué logs para entender el problema.", "I added logs to understand the problem.", "I added logs ___ understand the problem. (para)", "to", "I added logs for understand the problem.", { en: ["I added logs in order to understand the problem."] }],
  [4, "to-verb", "Ahorro dinero para viajar a Canadá.", "I save money to travel to Canada.", "I save money ___ travel to Canada. (para)", "to", "I save money for travel to Canada.", { en: ["I am saving money to travel to Canada."] }],
  [4, "in-order-to", "Escribimos pruebas con el fin de evitar errores.", "We write tests in order to avoid errors.", "We write tests ___ avoid errors. (con el fin de)", "in order to", "We write tests for avoid errors.", { en: ["We wrote tests in order to avoid errors.", "We write tests to avoid errors.", "We wrote tests to avoid errors.", "We write tests in order to avoid bugs."] }],
  [4, "to-verb", "Te llamo para preguntarte algo.", "I am calling you to ask you something.", "I am calling you ___ ask you something. (para)", "to", "I am calling you for ask you something.", { en: ["I am calling to ask you something.", "I am calling you in order to ask you something."] }],

  // Nivel 5: secuencia, first, then, after that, finally
  [5, "first", "Primero reinicia el servicio; luego revisa los logs.", "First restart the service; then check the logs.", "___ restart the service; then check the logs. (primero)", "First", "First restart the service; than check the logs.", { en: ["First restart the service; next check the logs."] }],
  [5, "then", "Desayuné y luego fui al trabajo.", "I had breakfast and then I went to work.", "I had breakfast and ___ I went to work. (luego)", "then", "I had breakfast and after I went to work.", { en: ["I had breakfast and then went to work.", "I ate breakfast and then I went to work."] }],
  [5, "after-that", "Abre la terminal. Después de eso, ejecuta el script.", "Open the terminal. After that, run the script.", "Open the terminal. ___, run the script. (después de eso)", "After that", "Open the terminal. After of that, run the script.", { en: ["Open the terminal. Then run the script."] }],
  [5, "finally", "Finalmente, hicimos el deploy a producción.", "Finally, we deployed to production.", "___, we deployed to production. (finalmente)", "Finally", "Finally, we deploy to production."],
  [5, "next", "A continuación, borra la caché del navegador.", "Next, clear the browser cache.", "___, clear the browser cache. (a continuación)", "Next", "Next, clear the cache browser.", { en: ["Then clear the browser cache.", "Next, delete the browser cache."] }],
  [5, "before", "Lávate las manos antes de comer.", "Wash your hands before eating.", "Wash your hands ___ eating. (antes de)", "before", "Wash your hands before eat.", { en: ["Wash your hands before you eat."] }],
  [5, "after", "Después de la reunión, actualicé el ticket.", "After the meeting, I updated the ticket.", "___ the meeting, I updated the ticket. (después de)", "After", "After of the meeting, I updated the ticket."],
  [5, "when", "Cuando llegué a casa, cené.", "When I got home, I had dinner.", "___ I got home, I had dinner. (cuando)", "When", "When I got to home, I had dinner.", { en: ["When I arrived home, I had dinner.", "When I got home, I ate dinner."] }],
  [5, "before", "Antes de hacer el merge, ejecuta las pruebas.", "Before merging, run the tests.", "___ merging, run the tests. (antes de)", "Before", "Before merge, run the tests.", { en: ["Before you merge, run the tests.", "Before doing the merge, run the tests."] }],
  [5, "finally", "Por último, apaga las luces.", "Finally, turn off the lights.", "___, turn off the lights. (por último)", "Finally", "Finally, turn of the lights.", { en: ["Lastly, turn off the lights."] }],
];
