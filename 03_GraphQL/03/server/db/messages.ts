import { connection } from "./connection";
import { generateId } from "./ids";

const getMessageTable = () => connection.table("message");

export async function getMessages() {
  return await getMessageTable().select().orderBy("createdAt", "asc");
}

export async function createMessage(user: string, text: string) {
  const message = {
    id: generateId(),
    user,
    text,
    createdAt: new Date().toISOString(),
  };
  await getMessageTable().insert(message);
  return message;
}
