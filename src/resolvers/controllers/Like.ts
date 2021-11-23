import { extendType, stringArg } from "nexus";
import { Context } from "../../context";
import { getUserId } from "../../utils";
import { Response } from "../../_types/Response";

export const LikeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("toggleLikeProject", {
      type: "LikeResponse",
      args: { id: stringArg() },
      resolve: async (parent, args, context: Context) => {
        try {
          const userId = getUserId(context);

          const [like] = await context.prisma.like.findMany({
            where: {
              AND: [{ author: { id: userId } }, { project: { id: args.id } }],
            },
          });

          // 1. check if the like already exists, if yes remove it
          if (like) {
            const unlike = await context.prisma.like.delete({
              where: { id: like.id },
            });

            return {
              code: Response.SUCCESS,
              message: "Project unlike successfully !",
              data: null,
            };
          }

          // 2. if not, create a like
          const giveLike = await context.prisma.like.create({
            data: {
              author: { connect: { id: Number(userId) } },
              project: { connect: { id: args.id } },
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Project like successfully !",
            data: giveLike,
          };
        } catch (err: any) {
          if (err.code === "P2025") {
            return {
              code: Response.FAILURE,
              message: `No project to like`,
            };
          }
        }
      },
    });
  },
});
