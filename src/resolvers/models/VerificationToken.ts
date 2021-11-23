import { objectType } from "nexus";

export const VerificationToken = objectType({
  name: "VerificationToken",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("email");
    t.nonNull.string("token");
    t.nonNull.field("expiredAt", { type: "DateTime" });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
  },
});
