import { withAuth } from "next-auth/middleware";

export default withAuth(function proxy(req) {
});

export const config = {
  matcher: ["/"]
};