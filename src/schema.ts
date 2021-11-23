import { makeSchema } from "nexus";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./permissions";
import * as types from "./resolvers";

const baseSchema = makeSchema({
  types,
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

export const schema = applyMiddleware(baseSchema, permissions);
