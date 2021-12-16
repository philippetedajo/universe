import { extendType, intArg, nonNull, stringArg } from "nexus";
import { Context } from "../../context";
import { getUserId } from "../../utils";
import { hash } from "bcryptjs";
import { Response } from "../../_types/Response";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("hotUsers", {
      type: "UsersResponse",
      args: { take: intArg() },
      resolve: async (parent, args, context: Context) => {
        const users = await context.prisma.user.findMany({
          take: args.take,
          orderBy: [
            {
              followers: {
                _count: "desc",
              },
            },
          ],
          include: {
            _count: {
              select: {
                following: true,
                followers: true,
              },
            },
          },
        });

        return {
          code: Response.SUCCESS,
          message: `Hot users found successfully !`,
          data: users,
        };
      },
    });

    t.field("users", {
      type: "UsersResponse",
      resolve: async (parent, args, context: Context) => {
        const users = await context.prisma.user.findMany({
          include: {
            _count: {
              select: {
                following: true,
                followers: true,
              },
            },
          },
        });

        return {
          code: Response.SUCCESS,
          message: `Users found successfully !`,
          data: users,
        };
      },
    });

    t.field("user", {
      type: "UserResponse",
      args: {
        username: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            username: args.username,
          },
          include: {
            _count: {
              select: {
                following: true,
                followers: true,
                projects: true,
              },
            },
          },
        });

        if (!user) {
          return {
            code: Response.FAILURE,
            message: `User not found !`,
          };
        }

        return {
          code: Response.SUCCESS,
          message: `User found successfully !`,
          data: user,
        };
      },
    });

    t.field("me", {
      type: "UserResponse",
      resolve: async (parent, args, context: Context) => {
        const userId = getUserId(context);
        const me = await context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
          include: {
            _count: {
              select: {
                following: true,
                followers: true,
                projects: true,
              },
            },
          },
        });

        return {
          code: Response.SUCCESS,
          message: `My infos found successfully !`,
          data: me,
        };
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUser", {
      type: "UserResponse",
      args: {
        id: intArg(),
        username: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const hashPassword = await hash(args.password, 10);
        try {
          const user = await context.prisma.user.update({
            where: { id: Number(args.id) },
            data: {
              username: args.username,
              email: args.email,
              password: hashPassword,
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Info update successfully !",
            data: user,
          };
        } catch (err: any) {
          if (err.code === "P2025")
            return {
              code: Response.FAILURE,
              message: "User not found!",
            };

          if (err.code === "P2002")
            return {
              code: Response.FAILURE,
              message: `This ${err.meta.target[0]} is already taken !`,
            };
        }
      },
    });

    t.field("followUser", {
      type: "UserResponse",
      args: {
        following_id: nonNull(intArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const userId = getUserId(context);

        if (userId === args.following_id) {
          return {
            code: Response.FAILURE,
            message: `You cannot follow yourself !`,
          };
        }

        try {
          await context.prisma.user.update({
            where: { id: userId },
            data: { following: { connect: { id: args.following_id } } },
          });

          return {
            code: Response.SUCCESS,
            message: `User follow successfully !`,
          };
        } catch (err: any) {
          if (err.code === "P2025")
            return {
              code: Response.FAILURE,
              message: `User to follow not found !`,
            };
        }
      },
    });

    t.field("unFollowUser", {
      type: "UserResponse",
      args: {
        following_id: nonNull(intArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const userId = getUserId(context);

        if (userId === args.following_id) {
          return {
            code: Response.FAILURE,
            message: `You cannot unfollow yourself !`,
          };
        }

        try {
          await context.prisma.user.update({
            where: { id: userId },
            data: { following: { disconnect: { id: args.following_id } } },
          });

          return {
            code: Response.SUCCESS,
            message: `User unfollow successfully !`,
          };
        } catch (err: any) {
          if (err.code === "P2025")
            return {
              code: Response.FAILURE,
              message: `User to unfollow not found !`,
            };
        }
      },
    });
  },
});
