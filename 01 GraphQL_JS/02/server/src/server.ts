import path from "path";
import http from "http";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { pool } from "./db";
import loaders from "./loader";

(async function expressGraphQLServer() {
  // console.log("loaders:", loaders);

  const schema = await makeExecutableSchema({ typeDefs, resolvers });

  //* The server
  const app: Express = express();
  const httpServer = await http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  //* Middlewares: Global
  await app.use(cors(), morgan("combined"), bodyParser.json(), bodyParser.urlencoded({ extended: true }));

  //* Middlewares: GraphQL
  await app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async () => ({ loaders: loaders() }),
    })
  );

  //* Favicon
  await app.get("/favicon.ico", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/favicon.svg"));
  });
  //* Test route
  await app.get("/", (req: Request, res: Response) => {
    console.log("req.ip:", req.ip);
    res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
  });

  //* PostgresQL DB
  pool
    .connect()
    .then(() => {
      console.log("Connected to the PostgreSQL DB successfully...");
    })
    .catch((error) => console.error({ error }));

  //* Port
  const portHTTP = (process.env.PORT || 5000) as number;

  await new Promise<void>((resolve) => httpServer.listen({ port: portHTTP }, resolve));
  console.log(`Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
})();
