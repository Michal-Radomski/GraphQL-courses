import { map } from "ramda";

import query from "./db";

export async function search(term: string[]) {
  const books = await searchBooks(term);
  const users = await searchUser(term);
  const authors = await searchAuthors(term);
  const reviews = await searchReviews(term);
  return [...books, ...users, ...authors, ...reviews];
}

async function searchBooks(term: string[]) {
  const sql = `
  select * from hb.book
  where tokens @@ to_tsquery($1);
  `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map((obj: object[]) => ({ ...obj, __type: "Book" }), result!.rows) as object[];
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function searchUser(term: string[]) {
  const sql = `
  select * from hb.user
  where tokens @@ to_tsquery($1);
  `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map((user: object[]) => ({ ...user, __type: "User" }), result!.rows) as object[];
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function searchAuthors(term: string[]) {
  const sql = `
  select * from hb.author
  where tokens @@ to_tsquery($1);
  `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map((author: object[]) => ({ ...author, __type: "Author" }), result!.rows) as object[];
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

async function searchReviews(term: string[]) {
  const sql = `
  select * from hb.review
  where tokens @@ to_tsquery($1);
  `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map((review: object[]) => ({ ...review, __type: "Review" }), result!.rows) as object[];
  } catch (err) {
    console.log({ err });
    throw err;
  }
}
