import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session { user: { name?: string | null; email?: string | null; image?: string | null; githubId?: string } }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? (process.env.NODE_ENV === "development" ? "local-development-secret" : undefined),
  // Vercel terminates TLS and forwards the original host to the Next.js server.
  // Explicitly trusting that forwarded host prevents Auth.js from returning its
  // generic Configuration error in production deployments.
  trustHost: true,
  providers: process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
    ? [GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      })]
    : [],
  callbacks: {
    signIn({ profile }) {
      const allowedId = process.env.ADMIN_GITHUB_USER_ID;
      return Boolean(allowedId && profile?.id && String(profile.id) === allowedId);
    },
    jwt({ token, profile }) {
      if (profile?.id) token.githubId = String(profile.id);
      return token;
    },
    session({ session, token }) {
      session.user.githubId = token.githubId as string | undefined;
      return session;
    },
  },
});

export const isGitHubAuthConfigured = Boolean(
  process.env.AUTH_GITHUB_ID
  && process.env.AUTH_GITHUB_SECRET
  && process.env.ADMIN_GITHUB_USER_ID,
);
