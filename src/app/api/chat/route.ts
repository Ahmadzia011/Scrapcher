import { Brain } from "../../components/brain";



// 1. Handle the browser's preflight OPTIONS request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const chatbot_id = body.chatbot_id;
    const query = body.query;

    const responseData = await Brain(chatbot_id, query);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Allow any website to read this response
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON or server error" }),
      { status: 500 },
    );
  }
}