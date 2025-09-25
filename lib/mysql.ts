// lib/mysql.ts
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    const url = process.env.DATABASE_URL!;
    pool = mysql.createPool(url); // MYSQL_PUBLIC_URL works here
  }
  return pool;
}
