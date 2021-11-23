import { objectType, enumType } from "nexus";
import { Context } from "../../context";

export const Notification = objectType({
  name: "Notification",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("message");
    t.nonNull.boolean("read");
    t.nonNull.field("notification", { type: "NotificationSource" });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.nonNull.field("author", {
      type: "User",
      resolve: (parent, args, context: Context) => {
        return context.prisma.notification
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
  },
});

export const NotificationSource = enumType({
  name: "NotificationSource",
  members: {
    comment: 1,
    like: 2,
    follow: 3,
    unfollow: 4,
  },
});
