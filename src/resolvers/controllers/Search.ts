import { extendType, stringArg } from "nexus";
import { Context } from "../../context";
import { Response } from "../../_types/Response";

export const Search = extendType({
  type: "Query",
  definition(t) {
    t.field("search", {
      type: "SearchResponse",
      args: {
        term: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          const projects = await context.prisma.project.findMany({
            where: {
              title: {
                search: args.term,
              },
            },
          });

          const users = await context.prisma.user.findMany({
            where: {
              NOT: {
                verifiedAt: null,
              },
              username: {
                search: args.term,
              },
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Search term successfully !",
            data: {
              projectSearch: projects,
              userSearch: users,
            },
          };
        } catch (err) {
          console.log(err.message);
        }
      },
    });
  },
});
