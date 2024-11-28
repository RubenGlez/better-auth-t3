import { cache } from "react";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import type { AppRouter } from "@acme/trpc";
import { createCaller, createTRPCContext } from "@acme/trpc";

import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    req: {
      // @ts-expect-error: The types don't match
      headers: heads,
    },
  });
});

const getQueryClient = cache(createQueryClient);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  caller,
  getQueryClient,
);
