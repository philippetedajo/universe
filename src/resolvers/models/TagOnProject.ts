import { objectType } from "nexus";
import { Context } from "../../context";

export const TagOnProject = objectType({
  name: "TagOnProject",
  definition(t) {
    t.nonNull.string("assignedBy");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.field("project", {
      type: "Project",
      resolve: (parent, args, context: Context): any => {
        return context.prisma.tagOnProject
          .findUnique({
            where: { projectId_tagId: parent.id || undefined },
          })
          .project();
      },
    });

    t.nonNull.field("tag", {
      type: "Tag",
      resolve: (parent, args, context: Context): any => {
        return context.prisma.tagOnProject
          .findUnique({
            where: { projectId_tagId: parent.id || undefined },
          })
          .tag();
      },
    });
  },
});
