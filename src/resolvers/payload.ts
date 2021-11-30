import { objectType } from "nexus";
import { Context } from "../context";

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

export const ProfileInfo = objectType({
  name: "ProfileInfo",
  definition(t) {
    t.nonNull.int("id");
    t.string("bio");
    t.string("website");
  },
});

export const ProfileAvatar = objectType({
  name: "ProfileAvatar",
  definition(t) {
    t.nonNull.int("id");
    t.string("avatar");
  },
});
