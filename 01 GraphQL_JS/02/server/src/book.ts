import * as R from "ramda";
import DataLoader from "dataloader";

import query from "./db";

async function findBooksByIds(ids: string[]) {
  const sql = `
  select * 
  from hb.book
  where hb.book.id = ANY($1);
  `;

  const params = [ids];

  try {
    const result = await query(sql, params);
    const rowsById = (R.groupBy as any)((book: { id: string }) => book.id, result?.rows);
    return R.map((id) => {
      const book = rowsById[id] ? rowsById[id][0] : null;
      return book;
    }, ids);
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

export function findBooksByIdsLoader() {
  return new DataLoader(findBooksByIds as any);
}

export async function findBookById(id: string[]) {
  const sql = `
  select * 
  from hb.book
  where hb.book.id = $1;
  `;

  const params = [id];

  try {
    const result = await query(sql, params);
    return (result as any)?.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const ORDER_BY = {
  ID_DESC: "id desc",
  RATING_DESC: "rating desc",
};

export async function allBooks(args: { [key: string]: string }) {
  const orderBy = ORDER_BY[args.orderBy as keyof typeof ORDER_BY];
  const sql = `
  select * from hb.book
  order by ${orderBy};
  `;

  try {
    const result = await query(sql);
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
