import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();
  const allowedId = process.env.ADMIN_GITHUB_USER_ID;
  if (!session?.user?.githubId || !allowedId || session.user.githubId !== allowedId) {
    throw new Error("Unauthorized");
  }
  return session;
}
