import { objectType } from "nexus";
import { Context } from "../../context";

export const Like = objectType({
  name: "Like",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.field("author", {
      type: "User",
      resolve: (parent, args, context: Context) => {
        return context.prisma.like
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });

    t.nonNull.field("project", {
      type: "Project",
      resolve: (parent, args, context: Context) => {
        return context.prisma.like
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .project();
      },
    });
  },
});
