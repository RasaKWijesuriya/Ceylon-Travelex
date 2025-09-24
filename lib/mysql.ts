import mysql from "mysql2/promise";

let pool: mysql.Pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      connectionLimit: 5,
      // ssl: { rejectUnauthorized: true } // uncomment if your provider requires SSL
    });
  }
  return pool;
}
