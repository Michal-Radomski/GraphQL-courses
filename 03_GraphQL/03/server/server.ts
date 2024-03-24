import * as dotenv from "dotenv";
dotenv.config();
import { readFile } from "node:fs/promises";
import http from "http";

import express, { Express, Request } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import { useServer as useWsServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import morgan from "morgan";
import helmet from "helmet";

import { authMiddleware, decodeToken, handleLogin } from "./auth";
import { resolvers } from "./resolvers";
import { GraphQLSchema } from "graphql";

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

function getHttpContext({ req }: { req: CustomRequest }) {
  if (req.auth) {
    return { user: req.auth.sub };
  }
  return {};
}

function getWsContext({ connectionParams }: { connectionParams: { accessToken: string } }) {
  const accessToken = connectionParams?.accessToken;
  if (accessToken) {
    const payload = decodeToken(accessToken);
    // console.log("payload:", payload);
    return { user: payload.sub };
  }
  return {};
}

(async function () {
  const typeDefs = await readFile("./schema.graphql", "utf8");
  // console.log("typeDefs:", typeDefs);

  const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = await new ApolloServer({ schema });
  await apolloServer.start();
  app.use(
    "/graphql",
    authMiddleware,
    apolloMiddleware(apolloServer, {
      context: getHttpContext as any,
    })
  );

  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });
  useWsServer({ schema, context: getWsContext }, wsServer);

  httpServer.listen({ port: httpPort }, () => {
    console.log(`Server is listening at http://localhost:${httpPort}`);
    console.log(`Server running on port ${httpPort}`);
    console.log(`GraphQL endpoint: http://localhost:${httpPort}/graphql`);
    // For testing only
    console.log("Current Time:", new Date().toLocaleTimeString());
  });
})();
