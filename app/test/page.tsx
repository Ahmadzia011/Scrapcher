// "use server";

// import { JSDOM } from "jsdom";
// import { Readability } from "@mozilla/readability";
// import TurndownService from "turndown";

// /**
//  * CONFIGURATION: Extensions we want to IGNORE.
//  * We only want to crawl HTML pages, not images, PDFs, etc.
//  */
// const SKIPPED_EXTENSIONS = [
//   ".pdf", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".ico", ".webp",
//   ".mp4", ".mp3", ".zip", ".rar", ".7z", ".gz", ".tar", ".json",
//   ".xml", ".csv", ".woff", ".woff2", ".ttf", ".eot",
// ];

// /**
//  * DATA STRUCTURE: What we want to keep from each page.
//  */


// /**
//  * UTILITY: Cleans up a URL.
//  * 1. Removes fragments like #section1
//  * 2. Removes trailing slashes (so https://site.com/about/ is same as https://site.com/about)
//  */
// function normalizeUrl(rawUrl: string) {
//   try {
//     const url = new URL(rawUrl);
//     url.hash = ""; // Remove the # part
//     if (url.pathname !== "/" && url.pathname.endsWith("/")) {
//       url.pathname = url.pathname.replace(/\/+$/, "");
//     }
//     return url.toString();
//   } catch {
//     return rawUrl;
//   }
// }

// /**
//  * THE CRAWLER & SCRAPER
//  * This function visits a website, finds all internal links, and extracts content.
//  */
// async function crawlAndScrape(startUrl: string, maxPages = 10) {
//   const origin = new URL(startUrl).origin; // The base website (e.g., https://example.com)
//   const visited = new Set<string>();       // Keeps track of URLs we already processed
//   const queue: string[] = [normalizeUrl(startUrl)]; // URLs waiting to be visited
//   const results = [];       // Store the final scraped data
//   const errors: { url: string; reason: string }[] = [];

//   // Initialize Turndown (converts HTML to Markdown)
//   const turndownService = new TurndownService({
//     headingStyle: 'atx',
//     codeBlockStyle: 'fenced'
//   });

//   // Continue as long as there are URLs in the queue and we haven't hit our limit
//   while (queue.length > 0 && visited.size < maxPages) {
//     const currentUrl = queue.shift()!; // Get the next URL from the front of the queue

//     // Skip if we've already been here
//     if (visited.has(currentUrl)) continue;
//     visited.add(currentUrl);

//     console.log(`Scraping: ${currentUrl}`);

//     try {
//       // 1. FETCH THE PAGE
//       const response = await fetch(currentUrl, {
//         cache: "no-store",
//       });

//       if (!response.ok) {
//         errors.push({ url: currentUrl, reason: `HTTP Error ${response.status}` });
//         continue;
//       }

//       // 2. CHECK CONTENT TYPE (Ensure it's HTML)
//       const contentType = response.headers.get("content-type") || "";
//       if (!contentType.includes("text/html")) continue;

//       const html = await response.text();

//       // 3. PARSE HTML using JSDOM
//       const dom = new JSDOM(html, { url: currentUrl });
//       const document = dom.window.document;

//       // 4. SCRAPE CONTENT using Readability
//       // Readability finds the "main" content and ignores sidebars/ads.
//       const reader = new Readability(document);
//       const article: any = reader.parse();

//       if (article) {
//         // Convert the "main" HTML content to Markdown
//         // This preserves headings, lists, and links which helps AI understand structure.
//         const markdown = turndownService.turndown(article.content);

//         results.push(markdown);
//       }

//       // 5. FIND NEW LINKS (Crawl part)
//       const anchors = Array.from(document.querySelectorAll("a"));
//       for (const anchor of anchors) {
//         const href = anchor.href;
//         if (!href) continue;

//         try {
//           const resolved = new URL(href, currentUrl); //it merges the relative paths with base url.

//           //At this point we have standalone urls, found inside the current url fetched data.

//           // Only follow links that:
//           // - Stay on the same website (same origin)
//           // - Are not files like .png or .pdf
//           // - Haven't been visited or queued yet
//           const isInternal = resolved.origin === origin;
//           const isPage = !SKIPPED_EXTENSIONS.some(ext => resolved.pathname.toLowerCase().endsWith(ext));
//           const normalized = normalizeUrl(resolved.toString());

//           if (isInternal && isPage && !visited.has(normalized) && !queue.includes(normalized)) {
//             queue.push(normalized);
//           }
//         } catch {
//           // Ignore invalid URLs
//         }
//       }
//     } catch (error: any) {
//       errors.push({ url: currentUrl, reason: error.message || "Unknown error" });
//     }
//   }
//   return { results, errors };
// }

// /**
//  * PAGE COMPONENT
//  * Renders the results of the crawl.
//  */
// export default async function TestPage() {

//   // CONFIG: Change this URL to test different sites.
//   const startUrl = "https://github.com/enterprise";
//   const { results, errors } = await crawlAndScrape(startUrl, 10);

//   return (
//     <div className="max-w-4xl mx-auto p-8 font-sans">
//       <header className="mb-10 border-b pb-6">
//         <h1 className="text-4xl font-extrabold text-blue-600 mb-2">Web Scraper & Crawler</h1>
//         <p className="text-gray-600">
//           Crawling: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{startUrl}</span>
//         </p>
//       </header>

//       {/* SCRAPED CONTENT SECTION */}
//       <section className="space-y-8">
//         <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">Scraped Pages ({results.length})</h2>
//         {results.map((page, index) => (
//           <article key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
//             <div className="text-gray-700 text-sm line-clamp-6 leading-relaxed bg-gray-50 p-3 rounded font-mono overflow-auto max-h-40">
//               {page}
//             </div>
//           </article>
//         ))}
//       </section>

//       {/* ERRORS SECTION */}
//       {errors.length > 0 && (
//         <section className="mt-12">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Errors Encountered</h2>
//           <ul className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
//             {errors.map((err, i) => (
//               <li key={i} className="text-sm text-red-700">
//                 <strong>{err.url}</strong>: {err.reason}
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}
//     </div>
//   );
// }
