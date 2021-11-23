import { objectType } from "nexus";

export const UserPayload = objectType({
  name: "UserCountPayload",
  definition(t) {
    t.int("projects");
    t.int("following");
    t.int("followers");
  },
});

export const ProjectPayload = objectType({
  name: "ProjectCountPayload",
  definition(t) {
    t.int("likes");
    t.int("comments");
    t.int("views");
  },
});

export const ExistencePayload = objectType({
  name: "ExistencePayload",
  definition(t) {
    t.boolean("exist");
  },
});
