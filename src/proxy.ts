import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import Supabase from "@/src/lib/supabase";
import { computeChatbotId } from "@/src/lib/chatbotId";

// Paths served to third-party visitors (embed widget), gated by
// origin/chatbotId instead of a Scrapcher user session.
const API_ZONE_PATHS = new Set(["/api/chat", "/api/widget"]);

function extractOrigin(request: NextRequestWithAuth): string | null {
  const originHeader = request.headers.get("origin");
  if (originHeader) {
    try {
      return new URL(originHeader).origin;
    } catch {
      return null;
    }
  }

  const refererHeader = request.headers.get("referer");
  if (refererHeader) {
    try {
      return new URL(refererHeader).origin;
    } catch {
      return null;
    }
  }

  return null;
}

async function verifyApiZone(request: NextRequestWithAuth) {
  // Preflight must always succeed with CORS headers, regardless of domain status.
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  const origin = extractOrigin(request);

  if (!origin) {
    return NextResponse.json(
      { error: "Origin or Referer header is required." },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  const supabase = Supabase();
  const { data, error } = await supabase
    .from("documents")
    .select("id")
    .filter("metadata->>origin", "eq", origin)
    .limit(1);

  if (error || !data || data.length === 0) {
    return NextResponse.json(
      { error: "Unauthorized domain configuration." },
      { status: 403, headers: { "Access-Control-Allow-Origin": origin } }
    );
  }

  const chatbotId = computeChatbotId(origin);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-chatbot-id", chatbotId);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export default withAuth(
  async function proxy(request) {
    if (API_ZONE_PATHS.has(request.nextUrl.pathname)) {
      return verifyApiZone(request);
    }

    // /dashboard: the authorized callback below already required a session.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // API zone has its own origin/chatbotId authorization, handled above
        // instead of a user session.
        if (API_ZONE_PATHS.has(req.nextUrl.pathname)) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api/chat", "/api/widget"],
};
