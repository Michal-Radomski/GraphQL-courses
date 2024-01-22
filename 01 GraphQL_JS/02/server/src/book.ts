import query from "./db";

export async function allBooks() {
  const sql = `
  select * from hb.book;
  `;
  try {
    const result = await query(sql, []);
    // console.log("result:", result);
    return result?.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
