import { connection } from "./connection";
import { generateId } from "./ids";

const getJobTable = () => connection.table("job");

export async function countJobs() {
  const { count } = (await getJobTable().first().count("* as count")) as any;
  return count;
}

export async function getJobs(limit: number, offset: number) {
  const query = getJobTable().select().orderBy("createdAt", "desc");
  if (limit) {
    query.limit(limit);
  }
  if (offset) {
    query.offset(offset);
  }
  return await query;
}

export async function getJobsByCompany(companyId: string) {
  return await getJobTable().select().where({ companyId });
}

export async function getJob(id: string) {
  return await getJobTable().first().where({ id });
}

export async function createJob({
  companyId,
  title,
  description,
}: {
  companyId: string;
  title: string;
  description: string;
}) {
  const job = {
    id: generateId(),
    companyId,
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  await getJobTable().insert(job);
  return job;
}

export async function deleteJob(id: string, companyId: string) {
  const job = await getJobTable().first().where({ id, companyId });
  if (!job) {
    return null;
  }
  await getJobTable().delete().where({ id });
  return job;
}

export async function updateJob({
  id,
  companyId,
  title,
  description,
}: {
  id: string;
  companyId: string;
  title: string;
  description: string;
}) {
  const job = await getJobTable().first().where({ id, companyId });
  if (!job) {
    return null;
  }
  const updatedFields = { title, description };
  await getJobTable().update(updatedFields).where({ id });
  return { ...job, ...updatedFields };
}
