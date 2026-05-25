"use server";

import crypto from 'crypto';
import Scrapper from '../components/scrapper';
import { Embeder } from '../components/embedder';
import Supabase from '@/src/lib/supabase';



export async function hashString(url: string) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

export async function Storer(urlInput: any) {

  let content: string[];
  let origin: string;

  try {
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

    const fallback = await Scrapper(urlInput);
    if (!fallback?.content || !fallback?.origin) {
      console.error("Fallback scraper failed or returned no content.");
      return "error";
    }

    content = fallback.content;
    origin = fallback.origin;
    console.log(`Local scraper returned ${content.length} pages for ${origin}`);
  }

  const chatbot_id = await hashString(origin)

  // --- STEP 2: Embed and store the scraped content in the database ---
  // This part is unchanged — the Embedder takes the markdown content
  // and stores it as vector embeddings in Supabase for AI retrieval.

  try {
    await Embeder(content, urlInput, chatbot_id);
    console.log("Embedded successfully.");
    return chatbot_id
  } catch (e: any) {
    return "error";
  }
}

export async function isUrlScraped(urlInput: string | URL) {
  const supabase = Supabase();

  let normalizedUrl = urlInput;
  try {
    normalizedUrl = new URL(urlInput).origin;
  } catch (e) { }

  const found_data = await supabase
    .from("documents")
    .select("metadata")
    .eq("metadata->>source_url", normalizedUrl)

  return found_data.data?.length || 0;
}
