import { connection } from "./connection";

const getUserTable = () => connection.table("user");

export async function getUser(id: string) {
  return await getUserTable().first().where({ id });
}

export async function getUserByEmail(email: string) {
  return await getUserTable().first().where({ email });
}
