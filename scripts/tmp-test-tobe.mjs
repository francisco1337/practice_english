const API = "http://localhost:3000/api";
const post = async (p, b) => (await fetch(`${API}${p}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) })).json();
const get = async (p) => (await fetch(`${API}${p}`)).json();

const keys = ["a1-match", "a1-match-rev", "a1-write", "a1-write-rev", "pron-match", "pron-match-rev", "translate", "tobe-match", "tobe-match-rev", "tobe-translate"];
for (const k of keys) {
  const st = await get(`/practice/${k}`);
  console.log(`${k.padEnd(15)} ${Object.entries(st.items).map(([t, l]) => `${t}=${l.length}`).join(" ")}`);
}

console.log("\nfrases de to be por nivel:");
for (const level of [1, 2, 3, 4, 5]) {
  const { sentence } = await get(`/translate/tobe/next?level=${level}`);
  console.log(`  nivel ${level}: ${sentence ? sentence.spanish : "sin frase"}`);
}

async function prueba(level, transformar, etiqueta) {
  const { sentence } = await get(`/translate/tobe/next?level=${level}`);
  const fallo = await post("/translate/tobe/check", { sentenceId: sentence.id, answer: "zzz" });
  const bien = await post("/translate/tobe/check", { sentenceId: sentence.id, answer: transformar(fallo.expected) });
  console.log(`  ${etiqueta}: "${transformar(fallo.expected)}" -> ${bien.correct} | error detectado: ${!fallo.correct} | explica: ${fallo.item.english} (${fallo.item.category})`);
}
console.log("\nrevisión de respuestas:");
await prueba(1, (e) => e, "exacta        ");
await prueba(2, (e) => e.replace("is not", "isn't").replace("are not", "aren't").replace("I am", "I'm"), "contracción   ");
await prueba(3, (e) => e.replace("was not", "wasn't").replace("were not", "weren't").toLowerCase(), "contracción pas");
await prueba(4, (e) => e.toLowerCase().replace(/[.?]/g, ""), "sin puntuación");
await prueba(4, (e) => e.replace("will be", "'ll be"), "will → 'll    ");

const st = await get("/practice/tobe-translate");
const target = st.settings.masteryTarget;
const { sentence } = await get("/translate/tobe/next?level=1");
const info = await post("/translate/tobe/check", { sentenceId: sentence.id, answer: "zzz" });
let last;
for (let i = 0; i < target; i++) last = await post("/translate/tobe/check", { sentenceId: sentence.id, answer: info.expected });
const forma = last.state.items.tobe.find((f) => f.english === info.item.english);
console.log(`\n${target} aciertos en «${info.item.english}» -> mastered=${forma.mastered}`);
let repite = 0;
for (let i = 0; i < 25; i++) {
  const r = await get("/translate/tobe/next?level=1");
  if (r.sentence && r.sentence.itemId === forma.id) repite++;
}
console.log(`frases con esa forma tras dominarla (de 25): ${repite}`);
const err = await post("/translate/tobe/check", { sentenceId: sentence.id, answer: "zzz" });
const tras = err.state.items.tobe.find((f) => f.id === forma.id);
console.log(`tras 1 error -> correct=${tras.correctCount} mastered=${tras.mastered}`);

const ids = st.items.tobe.map((f) => f.id);
const soloUna = st.items.tobe.find((f) => f.english === "there are");
await post("/practice/tobe-translate/active", { itemType: "tobe", itemIds: ids, active: false });
await post("/practice/tobe-translate/active", { itemType: "tobe", itemIds: [soloUna.id], active: true });
const vistos = new Set();
for (let i = 0; i < 8; i++) {
  const r = await get("/translate/tobe/next?level=4");
  if (r.sentence) vistos.add(r.sentence.itemId);
}
console.log(`\ncon solo «there are» activo, formas que salen: ${[...vistos]} (there are = ${soloUna.id})`);
const vacio = await get("/translate/tobe/next?level=1");
console.log(`nivel 1 con solo «there are» activo: ${JSON.stringify(vacio)}`);

await post("/practice/tobe-translate/active", { itemType: "tobe", itemIds: ids, active: true });
for (const k of ["tobe-translate", "tobe-match", "tobe-match-rev"]) await post(`/practice/${k}/reset`, {});
const fin = await get("/practice/tobe-translate");
console.log(`\nlimpio -> aciertos=${fin.items.tobe.reduce((a, f) => a + f.correctCount, 0)} activos=${fin.items.tobe.filter((f) => f.active).length}/53`);
