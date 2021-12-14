import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../context";
import { APP_SECRET, createConfirmationUrl } from "../../utils";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Response } from "../../_types/Response";
import { loginSchema, registerSchema } from "../../validation";
import { sendMail } from "../../services/sendMail";

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("checkUsername", {
      type: "ExistenceResponse",
      args: {
        username: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          const user = await context.prisma.user.findUnique({
            where: { username: args.username },
          });

          if (!user) {
            return {
              code: Response.SUCCESS,
              message: "Username checked successfully !",
              data: { exist: false },
            };
          }
          return {
            code: Response.SUCCESS,
            message: "Username checked successfully !",
            data: { exist: true },
          };
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }
      },
    });

    t.field("checkEmail", {
      type: "ExistenceResponse",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          const user = await context.prisma.user.findUnique({
            where: { email: args.email },
          });

          if (!user) {
            return {
              code: Response.SUCCESS,
              message: "Email checked successfully !",
              data: { exist: false },
            };
          }
          return {
            code: Response.SUCCESS,
            message: "Email checked successfully !",
            data: { exist: true },
          };
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }
      },
    });

    t.field("signup", {
      type: "AuthResponse",
      args: {
        username: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await registerSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const hashPassword = await hash(args.password, 10);
        try {
          const user = await context.prisma.user.create({
            include: {
              _count: {
                select: {
                  following: true,
                  followers: true,
                },
              },
            },

            data: {
              username: args.username,
              email: args.email,
              password: hashPassword,
              profile: {
                create: {},
              },
            },
          });

          await sendMail(
            args.email,
            await createConfirmationUrl(user.email, "/auth/login")
          );

          return {
            code: Response.SUCCESS,
            message:
              "🌈 Great ! We send you an email, verify your account, and login !",
          };
        } catch (err: any) {
          if (err.code === "P2002") {
            return {
              code: Response.FAILURE,
              message: `This ${err.meta.target[0]} is already taken`,
            };
          }
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }
      },
    });

    t.field("login", {
      type: "AuthResponse",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await loginSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        const user = await context.prisma.user.findUnique({
          where: {
            email: args.email,
          },
          include: {
            _count: {
              select: {
                following: true,
                followers: true,
              },
            },
          },
        });
        if (!user) {
          return {
            code: Response.FAILURE,
            message: "Email address or password is incorrect. Please retry..",
          };
        }
        const validPassword = await compare(args.password, user.password);
        if (!validPassword) {
          return {
            code: Response.FAILURE,
            message: "Email address or password is incorrect. Please retry..",
          };
        }

        if (!user.verifiedAt) {
          return {
            code: Response.FAILURE,
            message: "Account is not verified ! Please confirm your email.",
          };
        }

        return {
          code: Response.SUCCESS,
          message: "User login successfully !",
          data: user,
          token: sign({ userId: user.id }, APP_SECRET),
        };
      },
    });

    t.field("verifiedUser", {
      type: "VerificationTokenResponse",
      args: {
        token: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const verificationToken =
          await context.prisma.verificationToken.findUnique({
            where: {
              token: args.token,
            },
          });

        if (!verificationToken) {
          return {
            code: Response.FAILURE,
            message: `Token not found !`,
          };
        }

        if (verificationToken.expiredAt <= new Date()) {
          return {
            code: Response.FAILURE,
            message: `Token expired !`,
          };
        }

        await context.prisma.user.update({
          where: {
            email: verificationToken.email,
          },
          data: { verifiedAt: new Date() },
        });

        return {
          code: Response.SUCCESS,
          message: `User verified successfully !`,
          data: verificationToken,
        };
      },
    });

    t.field("forgotPassword", {
      type: "VerificationTokenResponse",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const verificationToken =
          await context.prisma.verificationToken.findUnique({
            where: {
              email: args.email,
            },
          });

        if (!verificationToken) {
          return {
            code: Response.FAILURE,
            message: `Sorry this account does not exist !`,
          };
        }

        await sendMail(
          args.email,
          await createConfirmationUrl(
            verificationToken.email,
            "/auth/reset-password"
          )
        );

        return {
          code: Response.SUCCESS,
          message: `🌈 Well done ! We send you an email to reset your password ! `,
          data: verificationToken,
        };
      },
    });

    t.field("resetPassword", {
      type: "UserResponse",
      args: {
        password: nonNull(stringArg()),
        token: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const verificationToken =
          await context.prisma.verificationToken.findUnique({
            where: {
              token: args.token,
            },
          });

        if (!verificationToken) {
          return {
            code: Response.FAILURE,
            message: `Sorry you can't reset password of an non-existent account !`,
          };
        }

        const hashPassword = await hash(args.password, 10);

        const user = await context.prisma.user.update({
          where: {
            email: verificationToken.email,
          },
          data: {
            password: hashPassword,
          },
        });

        return {
          code: Response.SUCCESS,
          message: `Password change successfully !`,
          data: user,
        };
      },
    });
  },
});
