import { auth, currentUser } from "@clerk/nextjs/server";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email/send";

export interface SessionContext {
  userId: string;
  role: UserRole;
  isAuthenticated: boolean;
}

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const clerkConfigured =
  clerkKey.startsWith("pk_") && clerkKey !== "pk_test_replace_me" && clerkKey.length > 30;

const isDev = process.env.NODE_ENV === "development";
const devBypassEnabled = isDev && process.env.ENABLE_DEV_BYPASS === "true";

export async function getSessionContext(): Promise<SessionContext | null> {
  if (!clerkConfigured) {
    // Only create a dev user in local development with explicit bypass flag
    if (!devBypassEnabled) return null;
    // Dev bypass without database — return a synthetic admin session
    return { userId: "dev-bypass-user", role: "admin_internal" as UserRole, isAuthenticated: true };
  }
  const session = await auth();
  const clerkUserId = session.userId;

  if (!clerkUserId) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
  });

  if (!user) {
    const clerkUserData = await currentUser();
    const email =
      clerkUserData?.emailAddresses?.[0]?.emailAddress ?? `${clerkUserId}@clerk.local`;
    user = await prisma.user.create({
      data: { clerkId: clerkUserId, email, role: "free_user" },
    });
    sendWelcomeEmail(email).catch(() => {});
  }

  return {
    userId: user.id,
    role: user.role,
    isAuthenticated: true,
  };
}
