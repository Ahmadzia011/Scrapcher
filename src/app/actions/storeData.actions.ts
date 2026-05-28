"use server";

import crypto from 'crypto';
import scrapper from '../../lib/rag/scraper';
import { embedData } from '@/src/lib/rag/embedder';
import Supabase from '@/src/lib/supabase';



export async function hashString(url: string) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

export async function storeData(urlInput: any) {

  let content: string[];
  let origin: string;

  try {
    console.log("Python scraper called..")
    const response = await fetch(`${process.env.PYTHON_SERVER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Send the URL and page limit as JSON body
      body: JSON.stringify({ url: urlInput, max_pages: 20 }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`Python server error status: ${response.status}`);
      console.error("Python server error body:", err || "(Empty Response)");
      throw new Error("Python scraper returned non-ok status");
    }

    // The Python server returns: { origin: "https://...", pages: [{ url, markdown }] }
    const data = await response.json();

    if (!data?.origin || !Array.isArray(data.pages)) {
      console.error("Python scraper returned invalid payload:", data);
      throw new Error("Invalid Python scraper response");
    }

    // Extract the base domain (used as the key in our database)
    origin = data.origin;

    // Extract only the markdown strings from each page object.
    // The embedder expects a flat array of strings, not objects.
    content = data.pages.map((page: { url: string; markdown: string }) => page.markdown);

    console.log(`Scraper returned ${content.length} pages for ${origin}`);
  } catch (e: any) {
    console.error("Python scraper failed, falling back to local scraper:", e.message);

    const fallback = await scrapper(urlInput);
    if (!fallback?.content || !fallback?.origin) {
      console.error("Fallback scraper failed or returned no content.");
      return "error";
    }

    content = fallback.content;
    origin = fallback.origin;
    console.log(`Local scraper returned ${content.length} pages for ${origin}`);
  }
	

  const chatbotId = await hashString(origin)

  // --- STEP 2: Embed and store the scraped content in the database ---
  // This part is unchanged — the Embedder takes the markdown content
  // and stores it as vector embeddings in Supabase for AI retrieval.
  try {
    await embedData(content, origin, chatbotId);
    console.log("Embedded successfully.");
    return chatbotId
  } catch (e: any) {
    return "error";
  }
}

export async function isUrlScraped(urlInput: string | URL) {
  const supabase = Supabase();

  let normalizedUrl:any = urlInput!;

  try {
    normalizedUrl = new URL(urlInput).origin;
  } catch (e) { }

  const foundData = await supabase
    .from("documents")
    .select("metadata")
    .eq("metadata->>origin", normalizedUrl)

    const chatbot_id = await hashString(normalizedUrl)
  // Return the origin if data exists, null otherwise
  return foundData.data && foundData.data.length > 0 ? chatbot_id : null;
}
