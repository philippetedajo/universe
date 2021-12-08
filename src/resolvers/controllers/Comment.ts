import { extendType, intArg, stringArg } from "nexus";
import { Context } from "../../context";
import { getUserId } from "../../utils";
import { Response } from "../../_types/Response";
import { commentSchema } from "../../validation";

export const CommentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createComment", {
      type: "CommentResponse",
      args: { id: stringArg(), message: stringArg() },
      resolve: async (parent, args, context: Context) => {
        try {
          await commentSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const userId = getUserId(context);

        try {
          const comment = await context.prisma.comment.create({
            data: {
              message: args.message,
              author: { connect: { id: Number(userId) } },
              project: { connect: { id: args.id } },
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Comment created successfully !",
            data: comment,
          };
        } catch (err: any) {
          if (err.code === "P2025") {
            return {
              code: Response.FAILURE,
              message: `No project was found for create comment !`,
            };
          }
        }
      },
    });

    t.field("createChildComment", {
      type: "CommentResponse",
      args: { parentId: intArg(), message: stringArg() },
      resolve: async (parent, args, context: Context) => {
        try {
          await commentSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const userId = getUserId(context);

        try {
          const comment = await context.prisma.comment.create({
            data: {
              parent: { connect: { id: args.parentId } },
              message: args.message,
              author: { connect: { id: Number(userId) } },
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Comment created successfully !",
            data: comment,
          };
        } catch (err: any) {
          if (err.code === "P2025") {
            return {
              code: Response.FAILURE,
              message: `No parent comment was found for create comment !`,
            };
          }
          console.log(err.message);
        }
      },
    });

    t.field("updateComment", {
      type: "CommentResponse",
      args: { id: intArg(), message: stringArg() },
      resolve: async (parent, args, context: Context) => {
        try {
          await commentSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        try {
          const updateComment = await context.prisma.comment.update({
            where: { id: Number(args.id) },
            data: {
              message: args.message,
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Comment updated successfully !",
            data: updateComment,
          };
        } catch (err: any) {
          if (err.code === "P2025") {
            return {
              code: Response.FAILURE,
              message: `No comment comment to update was found !`,
            };
          }
        }
      },
    });

    t.field("deleteComment", {
      type: "CommentResponse",
      args: { id: intArg() },
      resolve: async (parent, args, context: Context) => {
        try {
          await context.prisma.comment.delete({
            where: { id: Number(args.id) },
          });

          return {
            code: Response.SUCCESS,
            message: "Comment deleted successfully !",
            data: null,
          };
        } catch (err: any) {
          if (err.code === "P2025") {
            return {
              code: Response.FAILURE,
              message: `No comment to delete was found !`,
            };
          }
        }
      },
    });
  },
});
