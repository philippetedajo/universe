import { objectType } from "nexus";
import { Context } from "../../context";

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.string("id");
    t.string("title");
    t.string("description");
    t.string("thumbnail");
    t.field("editor_input", { type: "JSONObject" });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.field("_count", { type: "ProjectCountPayload" });

    t.nonNull.field("author", {
      type: "User",
      resolve: (parent, args, context: Context): any => {
        return context.prisma.project
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });

    t.nonNull.list.nonNull.field("comments", {
      type: "Comment",
      resolve: (parent, args, context: Context) => {
        return context.prisma.project
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .comments();
      },
    });

    t.nonNull.list.nonNull.field("likes", {
      type: "Like",
      resolve: (parent, args, context: Context) => {
        return context.prisma.project
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .likes();
      },
    });
  },
});
