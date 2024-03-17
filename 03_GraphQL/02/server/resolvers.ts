import { GraphQLError } from "graphql";

import { getCompany } from "./db/companies";
import { countJobs, createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from "./db/jobs";

export const resolvers = {
  Query: {
    // greeting: () => "Hello world!",
    // test: () => {
    //   return {
    //     title: "test",
    //     subtitle: "subtitle",
    //   };
    // },
    jobs: async (_root: any, { limit, offset }: { limit: number; offset: number }) => {
      // console.log("_root:", _root);
      const items = await getJobs(limit, offset);
      // console.log("items:", items);
      const totalCount = await countJobs();
      return { items, totalCount };
    },

    job: async (_root: any, { id }: { id: string }) => {
      const job = await getJob(id);
      // console.log("job:", job);
      if (!job) {
        throw notFoundError("No Job found with id " + id);
      }
      return job;
    },

    company: async (_root: any, { id }: { id: string }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError("No Company found with id " + id);
      }
      return company;
    },
  },

  Mutation: {
    createJob: (
      _root: any,
      { input: { title, description } }: { input: { title: string; description: string } },
      { user }: { user: { companyId: string } }
    ) => {
      if (!user) {
        throw unauthorizedError("Missing authentication");
      }
      return createJob({ companyId: user.companyId, title, description });
    },

    deleteJob: async (_root: any, { id }: { id: string }, { user }: { user: { companyId: string } }) => {
      if (!user) {
        throw unauthorizedError("Missing authentication");
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError("No Job found with id " + id);
      }
      return job;
    },

    updateJob: async (
      _root: any,
      { input: { id, title, description } }: { input: { id: string; title: string; description: string } },
      { user }: { user: { companyId: string } }
    ) => {
      if (!user) {
        throw unauthorizedError("Missing authentication");
      }
      const job = await updateJob({ id, companyId: user.companyId, title, description });
      if (!job) {
        throw notFoundError("No Job found with id " + id);
      }
      return job;
    },
  },

  Company: {
    jobs: (company: { id: string }) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job: { companyId: string }, _args: any, { companyLoader }: { companyLoader: { load: Function } }) => {
      return companyLoader.load(job.companyId);
    },
    date: (job: { createdAt: string }) => toIsoDate(job.createdAt),
  },
};

function notFoundError(message: string) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}

function unauthorizedError(message: string) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED" },
  });
}

//* Get Date
function toIsoDate(value: string) {
  return value.slice(0, "yyyy-mm-dd".length);
}
