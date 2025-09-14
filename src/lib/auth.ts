import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "db/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "pg"
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});