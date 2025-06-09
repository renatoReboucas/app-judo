"use server";
import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertUserSchema } from "./schema";

export const upsertUser = actionClient
  .inputSchema(upsertUserSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    await db;
  });
