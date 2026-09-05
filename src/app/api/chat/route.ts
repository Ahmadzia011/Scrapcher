import { getResponse } from "@/src/components/rag/responseGenerator";



// 1. Handle the browser's preflight OPTIONS request
export async function OPTIONS(request: Request) {
  const origin: string = request.headers.get("origin") || "*";
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin",
    },
  });
}

// Handle POST requests
// Origin/chatbotId verification happens in proxy.ts before this runs —
// the chatbotId here is already trusted.
export async function POST(request: Request) {
  const origin = request.headers.get("origin") || "*";
  const chatbotId = request.headers.get("x-chatbot-id");

  if (!chatbotId) {
    return new Response(
      JSON.stringify({ error: "Chatbot configuration is missing." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
          "Vary": "Origin",
        },
      },
    );
  }

  try {
    const body = await request.json();
    const query = body.query;
    const history = body.history || [];

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
            "Vary": "Origin",
            },
        },
      );
    }

    if (query.length > 1000) {
      // Prevent abuse
      return new Response(JSON.stringify({ error: "Query too long." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
          "Vary": "Origin",
        },
      });
    }

    const responseData = await getResponse(chatbotId, query, history);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
        "Vary": "Origin",
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
          "Access-Control-Allow-Origin": origin,
          "Vary": "Origin",
        },
      },
    );
  }
}
