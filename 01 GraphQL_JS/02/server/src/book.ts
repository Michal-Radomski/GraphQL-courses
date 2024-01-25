import * as R from "ramda";
import DataLoader from "dataloader";
import axios from "axios";
import stripTags from "striptags";

import query from "./db";

export async function searchBook(query: string) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
  try {
    const result = await axios(url);
    const items = R.pathOr([], ["data", "items"], result);
    const books = R.map((book: any) => ({ id: book.id, ...book.volumeInfo }), items);
    return books;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

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

export async function createBook(googleBookId: string) {
  try {
    const book = await findBookByGoogleId(googleBookId);
    const { title = "", subtitle = "", description = "", authors = [], pageCount = 0 } = book;
    const sql = `
    select * from hb.create_book($1, $2, $3, $4, $5, $6);
    `;
    const params = [googleBookId, stripTags(title), stripTags(subtitle), stripTags(description), authors, pageCount];
    const result = (await query(sql, params)) as any;
    return result?.rows[0];
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function findBookByGoogleId(googleBookId: string) {
  const url = `https://www.googleapis.com/books/v1/volumes/${googleBookId}`;
  try {
    const result = await axios(url);
    const book = R.pathOr({} as any, ["data"], result);
    return { ...book, ...book.volumeInfo };
  } catch (err) {
    console.log({ err });
    throw err;
  }
}
