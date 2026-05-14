"use server";

import { Embeder } from "./embedder";
import SupaBase from "./supaBase";



export async function storer(urlInput: any) {

  console.log("Calling Python scraper for:", urlInput);

  // --- STEP 1: Ask the Python server to scrape the website ---
  // We send a POST request to /scrape with the URL we want to crawl.
  // The Python server uses crawl4ai (with a real browser) to handle
  // JavaScript-rendered sites that our simple fetch() scraper missed.
  let content: string[];
  let origin: string;

  try {
    const response = await fetch(`${process.env.PYTHON_SERVER}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Send the URL and page limit as JSON body
      body: JSON.stringify({ url: urlInput, max_pages: 20 }),
    });

 if (!response.ok) {
  const err = await response.text();
  console.error(`Python server error status: ${response.status}`);
  console.error("Python server error body:", err || "(Empty Response)");
  return "error";
}

    // The Python server returns: { origin: "https://...", pages: [{ url, markdown }] }
    const data = await response.json();

    console.log(data)

    // Extract the base domain (used as the key in our database)
    origin = data.origin;

    // Extract only the markdown strings from each page object.
    // The embedder expects a flat array of strings, not objects.
    content = data.pages.map((page: { url: string; markdown: string }) => page.markdown);

    console.log(`Scraper returned ${content.length} pages for ${origin}`);
    
  } catch (e: any) {
    console.error("Could not reach Python server:", e.message);
    return "error";
  }

  // --- STEP 2: Embed and store the scraped content in the database ---
  // This part is unchanged — the Embedder takes the markdown content
  // and stores it as vector embeddings in Supabase for AI retrieval.
  try {
    const results = await Embeder(content, origin);
    if (results) {
      return "error";
    }
  } catch (e: any) {
    return "error";
  }

  console.log("Embedded successfully.");
}

export async function isUrlScraped(urlInput: string) {
  const supabase = SupaBase();

  let normalizedUrl = urlInput;
  try {
    normalizedUrl = new URL(urlInput).origin;
  } catch (e) { }

  const found_data = await supabase
    .from("documents")
    .select("metadata")
    .eq("metadata->>source_url", normalizedUrl);

  return (found_data.data?.length);
}
