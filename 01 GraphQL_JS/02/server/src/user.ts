import * as R from "ramda";
import DataLoader from "dataloader";

import query from "./db";

async function findUsersByIds(ids: string[]) {
  const sql = `
  select * 
  from hb.user
  where hb.user.id = ANY($1);
  `;
  const params = [ids];
  try {
    const result = await query(sql, params);
    const rowsById = (R.groupBy as any)((user: { id: string }) => user.id, result?.rows);
    return R.map((id) => {
      const user = rowsById[id] ? rowsById[id][0] : null;
      return user;
    }, ids);
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

export function findUsersByIdsLoader() {
  return new DataLoader(findUsersByIds as any);
}
