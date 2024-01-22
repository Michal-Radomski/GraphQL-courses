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
    console.log({ err });
    throw err;
  }
}

export function imageUrl(size: string, id: string) {
  const zoom = size === "SMALL" ? 1 : 0;
  return `//books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`;
}
