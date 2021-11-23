import { objectType } from "nexus";
import { Context } from "../../context";

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.int("id");
    t.string("avatar");
    t.string("bio");
    t.string("website");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.field("author", {
      type: "User",
      resolve: (parent, args, context: Context) => {
        return context.prisma.profile
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
  },
});
