import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Request, Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import * as dotenv from "dotenv";
dotenv.config();

import { readFile } from "node:fs/promises";
import http from "http";

import { authMiddleware, handleLogin } from "./auth";
import { resolvers } from "./resolvers";
import { createCompanyLoader } from "./db/companies";
import { getUser } from "./db/users";

interface CustomRequest extends Request {
  auth: { sub: string };
}

// Port
const httpPort = (process.env.PORT || 4000) as number;

// The server
const app: Express = express();

// Middlewares
app.use(cors(), express.json(), authMiddleware);
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

app.post("/login", handleLogin);

async function getContext({ req }: { req: CustomRequest }) {
  const companyLoader = createCompanyLoader();
  const context = { companyLoader };
  // console.log("context:", context);
  if (req.auth) {
    (context as any).user = await getUser(req.auth.sub);
  }
  return context;
}

(async function () {
  const typeDefs = await readFile("./schema.graphql", "utf8");
  // console.log("typeDefs:", typeDefs);

  const apolloServer = await new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext as any }));

  const httpServer = http.createServer(app);
  httpServer.listen({ port: httpPort }, () => {
    console.log(`Server is listening at http://localhost:${httpPort}`);
    console.log(`Server running on port ${httpPort}`);
    console.log(`GraphQL endpoint: http://localhost:${httpPort}/graphql`);
    // For testing only
    console.log("Current Time:", new Date().toLocaleTimeString());
  });
})();
