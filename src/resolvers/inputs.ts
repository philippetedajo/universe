import { inputObjectType } from "nexus";

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("email");
    t.string("name");
    t.field("profile", { type: "ProfileCreateInput" });
    t.nonNull.list.nonNull.field("projects", { type: "ProjectCreateInput" });
    t.nonNull.list.nonNull.field("comments", { type: "CommentCreateInput" });
  },
});

export const VerificationTokenCreateInput = inputObjectType({
  name: "VerificationTokenCreateInput",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("token");
    t.nonNull.field("expiredAt", { type: "DateTime" });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
  },
});

export const ProfileCreateInput = inputObjectType({
  name: "ProfileCreateInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("avatar");
    t.string("bio");
    t.string("website");
  },
});

export const ProjectCreateInput = inputObjectType({
  name: "ProjectCreateInput",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.field("editor_input", { type: "JSONObject" });
  },
});

export const CommentCreateInput = inputObjectType({
  name: "CommentCreateInput",
  definition(t) {
    t.string("message");
  },
});

export const LikeCreateInput = inputObjectType({
  name: "LikeCreateInput",
  definition(t) {
    t.nonNull.int("id");
  },
});

export const ProjectOrderByInput = inputObjectType({
  name: "ProjectOrderByInput",
  definition(t) {
    t.nonNull.field("createdAt", { type: "SortOrder" });
  },
});
