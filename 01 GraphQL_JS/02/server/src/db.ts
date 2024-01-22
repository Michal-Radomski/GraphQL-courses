import * as dotenv from "dotenv";
dotenv.config();
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
    return client.query(sql, params);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export default query;
