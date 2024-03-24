import { connection } from "./connection";

const getUserTable = () => connection.table("user");

export async function getUser(username: string) {
  return await getUserTable().first().where({ username });
}
