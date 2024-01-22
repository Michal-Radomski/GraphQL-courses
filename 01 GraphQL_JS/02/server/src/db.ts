import * as dotenv from "dotenv";
dotenv.config();
import humps from "humps";

import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
});

async function query(sql: string, params: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    const rows = humps.camelizeKeys(result.rows);
    return { ...result, rows };
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export default query;
