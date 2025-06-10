"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";
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
    console.log(parsedInput);

    await db
      .insert(users)
      .values({
        ...parsedInput,
        id: session.user.id,
      })
      .onConflictDoUpdate({
        target: [users.id],
        set: {
          ...parsedInput,
        },
      });

    redirect("/dashboard");
  });
