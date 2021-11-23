import { and, rule, shield } from "graphql-shield";
import { getUserId } from "../utils";
import { Context } from "../context";
import { ApolloError } from "apollo-server-express";

const rules = {
  isAuthenticatedUser: rule()((parent, args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isAccountOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    return userId === author?.id;
  }),
  isProjectOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context);

    const author = await context.prisma.project
      .findUnique({
        where: { id: id },
      })
      .author();

    return userId === author?.id;
  }),
  isCommentOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context);

    const author = await context.prisma.comment
      .findUnique({
        where: { id: Number(id) },
      })
      .author();

    return userId === author?.id;
  }),
  isProfileOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context);

    const author = await context.prisma.profile
      .findUnique({
        where: { id: Number(id) },
      })
      .author();

    return userId === author?.id;
  }),
};

export const permissions = shield(
  {
    Query: {
      me: rules.isAuthenticatedUser,
    },
    Mutation: {
      createProject: rules.isAuthenticatedUser,
      updateProject: and(rules.isAuthenticatedUser, rules.isProjectOwner),
      deleteProject: and(rules.isAuthenticatedUser, rules.isProjectOwner),
      // prettier-ignore
      updateProjectThumbnail: and(rules.isAuthenticatedUser, rules.isProjectOwner),

      toggleLikeProject: rules.isAuthenticatedUser,

      createComment: rules.isAuthenticatedUser,
      updateComment: and(rules.isAuthenticatedUser, rules.isCommentOwner),
      deleteComment: and(rules.isAuthenticatedUser, rules.isCommentOwner),

      updateProfile: and(rules.isAuthenticatedUser, rules.isProfileOwner),

      updateUser: and(rules.isAuthenticatedUser, rules.isAccountOwner),

      followUser: and(rules.isAuthenticatedUser),
      unFollowUser: and(rules.isAuthenticatedUser),
    },
  },
  {
    fallbackError: async (thrownThing) => {
      if (thrownThing instanceof Error) {
        return new ApolloError(thrownThing.message);
      } else {
        return new ApolloError("Not authorized to perform operation");
      }
    },
  }
);
