import { verify } from "jsonwebtoken";
import { Context } from "../context";

export const APP_SECRET = "9eheRPxcfXnZ42Tv5mGRxOBklgY7CW4s";

export interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const authHeader = context.req.get("Authorization");
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && Number(verifiedToken.userId);
  }
}
