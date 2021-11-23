import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import * as http from "http";
import { createContext } from "./context";
import { schema } from "./schema";

const { graphqlUploadExpress } = require("graphql-upload");

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    context: createContext,
    formatError: (error) => {
      return {
        message: error.message,
      };
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    introspection: true,
  });

  await server.start();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });

  await new Promise((resolve: any) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
  );
}

startServer().catch((err) => console.log(err));
