import mysql from "mysql2/promise";

const parsed = new URL(process.env.DATABASE_URL);
const conn = await mysql.createConnection({
  host: parsed.hostname,
  port: Number(parsed.port),
  user: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  database: parsed.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
});

const [tables] = await conn.query("SHOW TABLES");
console.log("Tablas:", tables);
for (const row of tables) {
  const name = Object.values(row)[0];
  const [cols] = await conn.query(`SHOW COLUMNS FROM \`${name}\``);
  const [[{ n }]] = await conn.query(`SELECT COUNT(*) AS n FROM \`${name}\``);
  console.log(`\n${name} (${n} filas)`);
  console.log(cols.map((c) => `  ${c.Field} ${c.Type}`).join("\n"));
}
await conn.end();
