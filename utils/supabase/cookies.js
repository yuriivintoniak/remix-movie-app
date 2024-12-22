import { createCookie } from "@remix-run/node";

export const cookie = createCookie("sb:session", {
  path: "/",
  httpOnly: true,
  maxAge: 120,
  sameSite: "lax",
  secrets: ["s3cret1"],
  secure: process.env.NODE_ENV === "production",
});
