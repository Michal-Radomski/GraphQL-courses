import path from "path";
import http from "http";

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";

// //* Webpack
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";

// webpack server config
import webpackConfig from "../webpack.config";

//* Import GraphQL schema
import schema from "./schema/schema";

//* The server
const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "HEAD"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: false,
};

//* Middlewares
app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

//* Webpack
const webpackCompiler = webpack(webpackConfig);
app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));

//* Mongo DB
// console.log("process.env.MONGO_URL:", process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL as string)
  .then((con: { connection: { host: string } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Test route
// app.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

//* GraphQL
app.all(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

//* Port
const portHTTP = (process.env.PORT || 5000) as number;

const httpServer = http.createServer(app);
httpServer.listen({ port: portHTTP }, () => {
  console.log(`Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
