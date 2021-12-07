import { objectType } from "nexus";
import { Context } from "../../context";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.nonNull.int("id");
    t.int("parentId");
    t.nonNull.string("message");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.field("author", {
      type: "User",
      resolve: (parent, args, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });

    t.nonNull.field("project", {
      type: "Project",
      resolve: (parent, args, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .project();
      },
    });

    t.nonNull.list.nonNull.field("children", {
      type: "Comment",
      resolve: (parent, args, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .childrens();
      },
    });
  },
});
