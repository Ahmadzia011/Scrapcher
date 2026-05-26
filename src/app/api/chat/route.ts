import { getResponse } from "@/src/lib/rag/rag";
import Supabase from "@/src/lib/supabase";
import crypto from "crypto";

// 1. Handle the browser's preflight OPTIONS request
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin") || "*";
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
  const originHeader = request.headers.get("origin");
  const refererHeader = request.headers.get("referer");
  let origin = originHeader;

  if (!origin && refererHeader) {
    try {
      origin = new URL(refererHeader).origin;
    } catch (e) {
      // Ignored
    }
  }

  if (!origin) {
    return new Response(JSON.stringify({ error: "Origin or Referer header is required." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Enforce domain check against documents in Supabase
  const supabase = Supabase();
  const { data, error } = await supabase
    .from("documents")
    .select("id")
    .eq("metadata->>origin", origin)
    .limit(1);

  if (error || !data || data.length === 0) {
    return new Response(JSON.stringify({ error: "Unauthorized domain configuration." }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  }

  try {
    const body = await request.json();
    const query = body.query;

    // Dynamically compute the chatbotId from the verified browser origin
    const chatbotId = crypto.createHash("sha256").update(origin).digest("hex");

    const responseData = await getResponse(chatbotId, query);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON or server error" }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        }
      },
    );
  }
}