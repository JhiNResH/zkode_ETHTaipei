import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] };

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      return !!token;
    },
  },
});
