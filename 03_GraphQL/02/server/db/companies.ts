import DataLoader from "dataloader";

import { connection } from "./connection";

const getCompanyTable = () => connection.table("company");

export async function getCompany(id: string) {
  return await getCompanyTable().first().where({ id });
}

export function createCompanyLoader(): DataLoader<string, any, string> {
  return new DataLoader(async (ids: readonly string[]) => {
    const companies = await getCompanyTable().select().whereIn("id", ids);
    return ids.map((id) => companies.find((company) => company.id === id));
  });
}
