"use server";

import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

/**
 * CONFIGURATION: Extensions we want to IGNORE.
 * We only want to crawl HTML pages, not images, PDFs, etc.
 */
const SKIPPED_EXTENSIONS = [
  ".pdf", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".ico", ".webp",
  ".mp4", ".mp3", ".zip", ".rar", ".7z", ".gz", ".tar", ".json",
  ".xml", ".csv", ".woff", ".woff2", ".ttf", ".eot",
];

/**
 * DATA STRUCTURE: What we want to keep from each page.
 */


/**
 * UTILITY: Cleans up a URL.
 * 1. Removes fragments like #section1
 * 2. Removes trailing slashes (so https://site.com/about/ is same as https://site.com/about)
 */
function normalizeUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    url.hash = ""; // Remove the # part
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.replace(/\/+$/, "");
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * THE CRAWLER & SCRAPER
 * This function visits a website, finds all internal links, and extracts content.
 */
async function crawlAndScrape(startUrl: string, maxPages = 20) {

  const origin = new URL(startUrl).origin; // The base website (e.g., https://example.com)
  const visited = new Set<string>();       // Keeps track of URLs we already processed
  const queue: string[] = [normalizeUrl(startUrl)]; // URLs waiting to be visited
  const results = [];       // Store the final scraped data
  const errors: { url: string; reason: string }[] = [];

  // Initialize Turndown (converts HTML to Markdown)
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });

  // Continue as long as there are URLs in the queue and we haven't hit our limit
  while (queue.length > 0 && visited.size < maxPages) {
    const currentUrl = queue.shift()!; // Get the next URL from the front of the queue

    // Skip if we've already been here
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    console.log(`Scraping: ${currentUrl}`);

    try {
      // 1. FETCH THE PAGE
      const response = await fetch(currentUrl, {
        cache: "no-store",
      });

      if (!response.ok) {
        errors.push({ url: currentUrl, reason: `HTTP Error ${response.status}` });
        continue;
      }

      // 2. CHECK CONTENT TYPE (Ensure it's HTML)
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html")) continue;

      const html = await response.text();

      // 3. PARSE HTML using JSDOM
      const dom = new JSDOM(html, { url: currentUrl });
      const document = dom.window.document;

      // 4. SCRAPE CONTENT using Readability
      // Readability finds the "main" content and ignores sidebars/ads.
      const reader = new Readability(document);
      const article: any = reader.parse();

      if (article) {
        // Convert the "main" HTML content to Markdown
        // This preserves headings, lists, and links which helps AI understand structure.
        const markdown = turndownService.turndown(article.content);

        results.push(markdown);
      }

      // 5. FIND NEW LINKS (Crawl part)
      // Updated link finding section inside crawlAndScrape()
      const anchors = Array.from(document.querySelectorAll("a"));
      console.log(`Found ${anchors.length} total links on ${currentUrl}`);

      for (const anchor of anchors) {
        const href = anchor.href;
        if (!href) continue;

        try {
          const resolved = new URL(href, currentUrl);
          const normalized = normalizeUrl(resolved.toString());

          // Check why a link might be skipped:
          const isInternal = resolved.origin === origin;
          const isPage = !SKIPPED_EXTENSIONS.some(ext => resolved.pathname.toLowerCase().endsWith(ext));
          const isNew = !visited.has(normalized) && !queue.includes(normalized);

          if (isInternal && isPage && isNew) {
            queue.push(normalized);
          } else if (normalized.includes("our-team")) {
            // SPECIAL LOG: If we found "our-team" but skipped it, tell us why!
            console.log(`Found 'our-team' but skipped: Internal=${isInternal}, IsPage=${isPage}, IsNew=${isNew}`);
          }
        } catch (e) {
          // skip
        }
      }

    } catch (error: any) {
      errors.push({ url: currentUrl, reason: error.message || "Unknown error" });
    }
  }
  return { results, origin };
}

/**
 * PAGE COMPONENT
 * Renders the results of the crawl.
 */

export default async function Scrapper(url: any) {
  const { results, origin } = await crawlAndScrape(url)
  return {
    content: results,
    url: origin
  }
}
