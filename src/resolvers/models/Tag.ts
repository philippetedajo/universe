import { objectType } from "nexus";
import { Context } from "../../context";

export const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.list.nonNull.field("tagOnProjects", {
      // @ts-ignore
      type: "TagOnProject",
      resolve: (parent, args, context: Context) => {
        return context.prisma.tag
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .tagOnProjects();
      },
    });
  },
});
