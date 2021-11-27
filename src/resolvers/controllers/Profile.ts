import { arg, extendType, intArg, stringArg } from "nexus";
import { Context } from "../../context";
import { Response } from "../../_types/Response";
import { profileSchema } from "../../validation";
import cloudinary from "../../services/cloudinary";

export const ProfileInfoMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProfileInfo", {
      type: "ProfileResponse",
      args: {
        id: intArg(),
        bio: stringArg(),
        website: stringArg(),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await profileSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        try {
          const updateProfile = await context.prisma.profile.update({
            where: { id: Number(args.id) },
            data: {
              id: args.id,
              bio: args.bio,
              website: args.website,
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Profile updated successfully !",
            data: updateProfile,
          };
        } catch (err: any) {
          console.log(err);
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }
      },
    });
  },
});

export const ProfileAvatarMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProfileAvatar", {
      type: "ProfileResponse",
      args: {
        id: intArg(),
        avatar: arg({ type: "Upload" }),
      },
      resolve: async (parent, args, context: Context) => {
        try {
          await profileSchema.validate(args);
        } catch (err: any) {
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }

        try {
          const { createReadStream } = await args.avatar;

          const result = await new Promise((resolve, reject) => {
            createReadStream().pipe(
              cloudinary.uploader.upload_stream(
                {
                  folder: "avatars",
                  allowed_formats: ["jpeg", "png"],
                  public_id: `avatar-${Number(args.id)}`,
                },
                (error: any, result: any) => {
                  if (error) {
                    reject(error);
                  }

                  resolve(result);
                }
              )
            );
          });

          const updateProfile = await context.prisma.profile.update({
            where: { id: Number(args.id) },
            data: {
              id: args.id,
              // @ts-ignore
              avatar: result?.secure_url,
            },
          });

          return {
            code: Response.SUCCESS,
            message: "Profile Avatar updated successfully !",
            data: updateProfile,
          };
        } catch (err: any) {
          console.log(err);
          return {
            code: Response.FAILURE,
            message: err.message,
          };
        }
      },
    });
  },
});
