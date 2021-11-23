import { objectType } from "nexus";
import { Context } from "../../context";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("username");
    t.nonNull.field("verifiedAt", { type: "DateTime" });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });

    t.field("_count", { type: "UserCountPayload" });

    t.field("profile", {
      type: "Profile",
      resolve: (parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .profile();
      },
    });

    t.nonNull.list.nonNull.field("projects", {
      type: "Project",
      resolve: (parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .projects();
      },
    });

    t.nonNull.list.nonNull.field("comments", {
      type: "Comment",
      resolve: (parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .comments();
      },
    });

    t.nonNull.list.nonNull.field("likes", {
      type: "Like",
      resolve: (parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .likes();
      },
    });

    t.nonNull.list.nonNull.field("following", {
      type: "User",
      resolve: (parent, args, context: Context): any => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .following();
      },
    });

    t.nonNull.list.nonNull.field("followers", {
      type: "User",
      resolve: (parent, args, context: Context): any => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .followers();
      },
    });

    t.nonNull.list.nonNull.field("notifications", {
      type: "Notification",
      resolve: (parent, args, context: Context): any => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .notifications();
      },
    });
  },
});
