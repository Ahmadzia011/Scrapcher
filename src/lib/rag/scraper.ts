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
async function crawlAndScrape(startUrl: string) {

  const maxPages = 20;
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

  // Continue as long as ther e are URLs in the queue and we haven't hit our limit
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
      const doc = dom.window.document;

      // 4. SCRAPE CONTENT using Readability  
      // Readability finds the "main" content and ignores sidebars/ads.
      const reader = new Readability(doc);
      const article: any = reader.parse();

      if (article) {
        // Convert the "main" HTML content to Markdown
        // This preserves headings, lists, and links which helps AI understand structure.
        const markdown = turndownService.turndown(article.content);
        if (!markdown || markdown.trim() === "") continue;
        results.push(markdown);
      }

      // 5. FIND NEW LINKS (Crawl part)
      // Gather anchors from the raw document and also from Readability's
      // extracted `article.content` (some links may only be in the main content).
      let anchors = Array.from(doc.querySelectorAll("a"));
      console.log(`Found ${anchors.length} raw <a> tags on ${currentUrl}`);

      if (article && article.content) {
        try {
          const contentDom = new JSDOM(article.content, { url: currentUrl });
          const contentAnchors = Array.from(contentDom.window.document.querySelectorAll("a"));
          console.log(`Found ${contentAnchors.length} links inside Readability article.content`);
          anchors = anchors.concat(contentAnchors);
        } catch (e) {
          // ignore
        }
      }

      // Normalize and dedupe anchor candidates by their raw href attribute
      const seen = new Set<string>();
      const candidates: HTMLAnchorElement[] = [];

      for (const anchor of anchors) {
        // Prefer the raw attribute value — `anchor.href` can be empty for some JS-driven links
        const rawHref = anchor.getAttribute("href") || anchor.getAttribute("data-href") || anchor.href || "";
        if (!rawHref) continue;

        // Skip fragments and javascript pseudo-links
        if (rawHref.startsWith("#") || rawHref.trim().toLowerCase().startsWith("javascript:")) continue;

        if (seen.has(rawHref)) continue;
        seen.add(rawHref);
        candidates.push(anchor);
      }

      console.log(`After filtering, ${candidates.length} anchor candidates on ${currentUrl}`);

      for (const anchor of candidates) {
        const hrefAttr = anchor.getAttribute("href") || anchor.getAttribute("data-href") || anchor.href || "";
        if (!hrefAttr) continue;

        try {
          const resolved = new URL(hrefAttr, currentUrl);
          const normalized = normalizeUrl(resolved.toString());

          const isInternal = resolved.origin === origin;
          const isPage = !SKIPPED_EXTENSIONS.some(ext => resolved.pathname.toLowerCase().endsWith(ext));
          const isNew = !visited.has(normalized) && !queue.includes(normalized);

          if (isInternal && isPage && isNew) {
            queue.push(normalized);
          } else if (normalized.includes("our-team")) {
            console.log(`Found 'our-team' but skipped: Internal=${isInternal}, IsPage=${isPage}, IsNew=${isNew}`);
          }
        } catch (e) {
          // skip invalid URLs
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
export default async function scrapeUrl(url: any) {
  try {
    const { results, origin } = await crawlAndScrape(url);
    return {
      content: results,
      origin
    };
  } catch (error) {
    console.error("Scraper Error:", error);
    return null;
  }
}