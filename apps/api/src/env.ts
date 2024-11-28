import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_PORT: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "API_PORT must be a number",
      }),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
