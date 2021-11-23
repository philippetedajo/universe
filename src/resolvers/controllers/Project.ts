import { arg, extendType, intArg, stringArg } from "nexus";
const requestIp = require("request-ip");
import { Context } from "../../context";
import { getUserId } from "../../utils";
import { projectSchema } from "../../validation";
import { Response } from "../../_types/Response";
import { createPagination } from "../../utils";
import { screenShoot } from "../../services";

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("projects", {
      type: "ProjectsResponse",
      args: {
        first: intArg(),
        after: stringArg(),
        orderBy: arg({
          type: "ProjectOrderByInput",
        }),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          return createPagination(context.prisma.project, args, "Project", {
            orderBy: {
              createdAt: args.orderBy.createdAt,
            },
            include: {
              _count: {
                select: {
                  likes: true,
                  comments: true,
                  views: true,
                },
              },
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    });

    t.field("project", {
      type: "ProjectResponse",
      args: { id: stringArg() },
      resolve: async (parent, args, context: Context) => {
        //implement transaction
        const clientIp = await requestIp.getClientIp(context.req);

        const view = await context.prisma.view.findUnique({
          where: {
            ip_projectId: {
              projectId: args.id,
              ip: clientIp,
            },
          },
        });

        if (!view) {
          await context.prisma.view.create({
            data: {
              ip: clientIp,
              project: { connect: { id: args.id } },
            },
          });
        }

        //implement transaction
        const project = await context.prisma.project.findUnique({
          where: { id: args.id },
          include: {
            _count: {
              select: {
                likes: true,
                comments: true,
                views: true,
              },
            },
          },
        });

        if (!project) {
          return {
            code: Response.FAILURE,
            message: "Project not found",
            data: project,
          };
        }
        return {
          code: Response.SUCCESS,
          message: "Project found successfully !",
          data: project,
        };
      },
    });

    t.field("myProjects", {
      type: "ProjectsResponse",
      args: {
        first: intArg(),
        after: stringArg(),
        orderBy: arg({
          type: "ProjectOrderByInput",
        }),
      },
      resolve: async (parent, args, context: Context) => {
        const userId = getUserId(context);
        try {
          return createPagination(context.prisma.project, args, "Project", {
            where: { authorId: Number(userId) },
            orderBy: {
              createdAt: args.orderBy.createdAt,
            },
            include: {
              _count: {
                select: {
                  likes: true,
                  comments: true,
                  views: true,
                },
              },
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    });

    t.field("projectsByUsername", {
      type: "ProjectsResponse",
      args: {
        username: stringArg(),
        first: intArg(),
        after: stringArg(),
        orderBy: arg({
          type: "ProjectOrderByInput",
        }),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          return createPagination(context.prisma.project, args, "Project", {
            where: { author: { username: args.username } },
            orderBy: {
              createdAt: args.orderBy.createdAt,
            },
            include: {
              _count: {
                select: {
                  likes: true,
                  comments: true,
                  views: true,
                },
              },
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
    });
  },
});

export const ProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProject", {
      type: "ProjectResponse",
      args: {
        title: stringArg(),
        editor_input: arg({ type: "JSONObject" }),
        description: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await projectSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const userId = getUserId(context);

        const newUser = await context.prisma.project.create({
          data: {
            title: args.title,
            editor_input: args.editor_input,
            description: args.description,
            author: { connect: { id: Number(userId) } },
          },
        });

        return {
          code: Response.SUCCESS,
          message: "Projects created successfully !",
          data: newUser,
        };
      },
    });

    t.field("updateProject", {
      type: "ProjectResponse",
      args: {
        id: stringArg(),
        title: stringArg(),
        editor_input: arg({ type: "JSONObject" }),
        description: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await projectSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const updateProject = await context.prisma.project.update({
          where: { id: args.id },
          data: {
            title: args.title,
            editor_input: args.editor_input,
            description: args.description,
          },
        });

        return {
          code: Response.SUCCESS,
          message: "Projects updated successfully !",
          data: updateProject,
        };
      },
    });

    t.field("updateProjectThumbnail", {
      type: "ProjectResponse",
      args: {
        id: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await projectSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const thumbnail = await screenShoot(args.id);

        const updatedProject = await context.prisma.project.update({
          where: { id: args.id },
          data: {
            // @ts-ignore
            thumbnail: thumbnail?.secure_url,
          },
        });

        return {
          code: Response.SUCCESS,
          message: "Project thumbnail updated successfully !",
          data: updatedProject,
        };
      },
    });

    t.field("deleteProject", {
      type: "ProjectResponse",
      args: { id: stringArg() },
      resolve: async (parent, args, context: Context) => {
        const deleteProject = await context.prisma.project.delete({
          where: { id: args.id },
        });
        return {
          code: Response.SUCCESS,
          message: "Projects deleted successfully !",
          data: deleteProject,
        };
      },
    });
  },
});
