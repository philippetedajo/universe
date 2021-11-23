import { objectType } from "nexus";
import { Context } from "../../context";

export const View = objectType({
  name: "View",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("ip");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.field("project", {
      type: "Project",
      resolve: (parent, args, context: Context) => {
        return context.prisma.view
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .project();
      },
    });
  },
});
