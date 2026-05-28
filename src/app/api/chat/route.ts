import { getResponse } from "@/src/lib/rag/responseGenerator";
import Supabase from "@/src/lib/supabase";
import crypto from "crypto";

// Helper: Compute chatbotId from origin (SHA256 hash)
function computeChatbotId(origin: string): string {
  return crypto.createHash("sha256").update(origin).digest("hex");
}

// 1. Handle the browser's preflight OPTIONS request
export async function OPTIONS(request: Request) {
  const origin: string = request.headers.get("origin") || "*";
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Handle POST requests
export async function POST(request: Request) {
  const supabase = Supabase();

  // Step 1: Extract origin from request headers
  const originHeader = request.headers.get("origin");
  const refererHeader = request.headers.get("referer");
  let origin: string | null = originHeader;

  if (!origin && refererHeader) {
    try {
      origin = new URL(refererHeader).origin;
    } catch (e) {
      origin = null;
    }
  }

  if (!origin) {
    return new Response(
      JSON.stringify({ error: "Origin or Referer header is required." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  try {
    // Step 3: Parse request body
    const body = await request.json();
    const query = body.query;
    const history = body.history || [];
    const clientChatbotId = body.chatbotId;

    // Step 4: Validate query parameter
    if (!query || typeof query !== "string" || query.trim() === "") {
      return new Response(
        JSON.stringify({
          error: "A valid 'query' string is required in the body.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        },
      );
    }

    if (query.length > 1000) {
      // Prevent abuse
      return new Response(JSON.stringify({ error: "Query too long." }), {
        status: 400,
      });
    }

    // Step 5: Verify domain has documents in database
    const { data: domainDocuments, error: domainError } = await supabase
      .from("documents")
      .select("id")
      .filter("metadata->>origin", "eq", origin)
      .limit(1);

    if (domainError || !domainDocuments || domainDocuments.length === 0) {
      return new Response(
        JSON.stringify({ error: "Unauthorized domain configuration." }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        },
      );
    }

    // Step 6: Verify chatbotId hash matches origin (CRITICAL SECURITY CHECK)
    const expectedChatbotId = computeChatbotId(origin);

    if (!clientChatbotId) {
      return new Response(JSON.stringify({ error: "chatbotId is required." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      });
    }

    if (clientChatbotId !== expectedChatbotId) {
      return new Response(
        JSON.stringify({ error: "Invalid chatbotId for this domain." }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        },
      );
    }

    // Step 8: Call RAG pipeline with verified chatbotId
    const responseData = await getResponse(clientChatbotId, query, history);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Invalid JSON or server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin || "*",
        },
      },
    );
  }
}
