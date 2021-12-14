import { objectType } from "nexus";

function createResponse(
  name: string,
  type: string,
  list = false,
  paginate = false
) {
  //====
  const Edge = objectType({
    name: "Edge",
    definition(t) {
      t.string("cursor");
      t.field("node", {
        // @ts-ignore
        type,
      });
    },
  });

  const PageInfo = objectType({
    name: "PageInfo",
    definition(t) {
      t.string("endCursor");
      t.boolean("hasNextPage");
    },
  });

  //===

  return objectType({
    name,
    definition(t) {
      // STATUS
      t.int("code");
      t.string("message");

      // AUTH
      if (name == "AuthResponse") t.nullable.string("token");

      // DATA PAGINATION
      if (paginate) {
        t.field("pageInfo", { type: PageInfo });
        t.list.field("edges", {
          type: Edge,
        });
      } else {
        // OR SIMPLE DATA
        if (list) {
          // @ts-ignore
          t.list.nullable.field("data", { type });
        } else {
          // @ts-ignore
          t.nullable.field("data", { type });
        }
      }
    },
  });
}

export const AuthResponse = createResponse("AuthResponse", "User");
// prettier-ignore
export const VerificationTokenResponse = createResponse("VerificationTokenResponse", "VerificationToken");
// prettier-ignore
export const ExistenceResponse = createResponse("ExistenceResponse", "ExistencePayload");
export const UserResponse = createResponse("UserResponse", "User");
export const UsersResponse = createResponse("UsersResponse", "User", true);
export const ProjectResponse = createResponse("ProjectResponse", "Project");
// prettier-ignore
export const ProjectsResponse = createResponse("ProjectsResponse", "Project", true, true);
// prettier-ignore
export const ProjectsByUsernameResponse = createResponse("ProjectsByUsernameResponse", "Project", true);
// prettier-ignore
export const SearchResponse = createResponse("SearchResponse", "SearchResult");
// prettier-ignore
export const ProfileInfoResponse = createResponse("ProfileInfoResponse", "ProfileInfo");
// prettier-ignore
export const ProfileAvatarResponse = createResponse("ProfileAvatarResponse", "ProfileAvatar");
export const LikeResponse = createResponse("LikeResponse", "Like");
export const CommentResponse = createResponse("CommentResponse", "Comment");
