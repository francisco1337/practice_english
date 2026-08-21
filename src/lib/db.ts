import mysql from "mysql2/promise";

/**
 * Pool de conexiones a MySQL (Aiven).
 * En dev se guarda en globalThis para no abrir un pool nuevo en cada hot reload.
 */
function createPool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Falta DATABASE_URL en .env.local");

  const parsed = new URL(url);

  return mysql.createPool({
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
    // Aiven usa su propia CA; si agregas el certificado, cambia a
    // ssl: { ca: fs.readFileSync("ca.pem") }
    ssl: { rejectUnauthorized: false },
    connectionLimit: 5,
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10_000,
    // Aiven corta las conexiones ociosas; se descartan antes de que eso pase.
    idleTimeout: 60_000,
    maxIdle: 2,
  });
}

const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

export const pool = globalForDb.pool ?? createPool();

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

/** Errores de conexión que se resuelven pidiendo otra conexión al pool. */
const RETRYABLE = new Set([
  "PROTOCOL_CONNECTION_LOST",
  "ECONNRESET",
  "ETIMEDOUT",
  "EPIPE",
  "ENOTFOUND",
  "ER_CLIENT_INTERACTION_TIMEOUT",
]);

function isRetryable(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code;
  return code !== undefined && RETRYABLE.has(code);
}

/**
 * Consulta con un reintento cuando la conexión venía muerta: si la app estuvo
 * inactiva un rato, el servidor ya cerró la conexión que guardaba el pool y el
 * primer intento falla aunque todo esté bien.
 */
type Params = Parameters<mysql.Pool["query"]>[1];

export async function query<T>(sql: string, params?: Params): Promise<T> {
  try {
    const [rows] = await pool.query(sql, params);
    return rows as T;
  } catch (error) {
    if (!isRetryable(error)) throw error;
    const [rows] = await pool.query(sql, params);
    return rows as T;
  }
}

export async function execute(sql: string, params?: Params): Promise<void> {
  try {
    await pool.query(sql, params);
  } catch (error) {
    if (!isRetryable(error)) throw error;
    await pool.query(sql, params);
  }
}
