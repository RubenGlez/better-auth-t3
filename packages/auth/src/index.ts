import type { Session } from "better-auth/types";
import type { NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organizationClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

import { db } from "@acme/db/client";

import { env } from "./env";

export { fromNodeHeaders, toNodeHandler } from "better-auth/node";

const baseURL = "http://localhost:4000";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [organization(), nextCookies()],
  trustedOrigins: ["http://localhost:3000"],
});

export function getSession(request: NextRequest) {
  return betterFetch<Session>(`${baseURL}/api/auth/get-session`, {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });
}

export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [organizationClient()],
});
