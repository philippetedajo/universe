import { arg, extendType, intArg, stringArg } from "nexus";
import { Context } from "../../context";
import { Response } from "../../_types/Response";
import { profileSchema } from "../../validation";
import cloudinary from "../../services/cloudinary";

export const ProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProfile", {
      type: "ProfileResponse",
      args: {
        id: intArg(),
        bio: stringArg(),
        avatar: arg({ type: "Upload" }),
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
              bio: args.bio,
              // @ts-ignore
              avatar: result?.secure_url,
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
