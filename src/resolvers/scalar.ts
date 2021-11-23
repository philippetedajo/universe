import { asNexusMethod } from "nexus";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
const { GraphQLUpload } = require("graphql-upload");

export const Date_Time = asNexusMethod(DateTimeResolver, "date");
export const Json = asNexusMethod(JSONObjectResolver, "json");
export const Upload = asNexusMethod(GraphQLUpload, "upload");
