import asyncio
from crawl4ai import AsyncWebCrawler
from urllib.parse import urlparse



async def simple_crawl(start_url: str, max_pages: int):
    """
    Crawler using crawl4ai with minimal logging.
    """
    parsed_uri = urlparse(start_url)
    origin = f"{parsed_uri.scheme}://{parsed_uri.netloc}"
    
    visited = set()
    to_visit = [start_url]
    results = []

    # verbose=False reduces internal crawl4ai logging
    async with AsyncWebCrawler(verbose=False) as crawler:
        while to_visit and len(visited) < max_pages:
            current_url = to_visit.pop(0)
            if current_url in visited:
                continue
            
            visited.add(current_url)
            print(f"Scraping: {current_url}") # Keep this minimal log

            result = await crawler.arun(url=current_url, bypass_cache=True)

            if result.success:
                results.append({
                    "url": current_url,
                    "markdown": result.markdown
                })

                internal_links = result.links.get("internal", [])
                for link in internal_links:
                    link_url = link.get("href")
                    if link_url and link_url.startswith(origin) and link_url not in visited and link_url not in to_visit:
                        to_visit.append(link_url)

    return results

async def main():
    scraped_data = await simple_crawl(target_url, max_pages=20)
    print(f"\nDone. Successfully scraped {len(scraped_data)} pages.")
    return scraped_data

if __name__ == "__main__":
    asyncio.run(main())
