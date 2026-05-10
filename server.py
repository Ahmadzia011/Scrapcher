# FastAPI is a modern Python web framework for building APIs quickly.
# It automatically handles JSON serialization, validation, and error responses.
from fastapi import FastAPI, HTTPException

# BaseModel is used to define the shape of the request body.
# When Next.js sends JSON to this server, FastAPI will parse it using this model.
from pydantic import BaseModel

# We import our existing crawler function from highlevelscrapper.py.
# This way, the server is just a thin layer on top of the scraper logic.
from highlevelscrapper import simple_crawl

# asyncio lets us run async functions (like our crawl4ai scraper) inside a sync context.
import asyncio

# --- App Initialization ---
# This creates the FastAPI application instance.
# All routes (API endpoints) will be registered on this object.
app = FastAPI()


# --- Request Body Schema ---
# This defines what JSON data this server EXPECTS to receive from Next.js.
# When Next.js calls POST /scrape, it must send: { "url": "...", "max_pages": 20 }
class ScrapeRequest(BaseModel):
    url: str              # The website URL to start crawling from
    max_pages: int = 20   # How many pages to crawl max (default: 20 if not sent)


# --- The Scrape Endpoint ---
# This is the only route in our server. It listens for POST requests at /scrape.
# POST is used because we are "sending" data (the URL) to trigger an action.
@app.post("/scrape")
async def scrape(request: ScrapeRequest):
    """
    Receives a URL from Next.js, runs the crawl4ai scraper,
    and returns the scraped content as a JSON list.
    """

    # Basic validation: Make sure the URL the caller sent is not empty.
    if not request.url:
        # HTTPException sends a proper error response back to Next.js (400 Bad Request)
        raise HTTPException(status_code=400, detail="URL is required")

    print(f"[Server] Received scrape request for: {request.url}")

    try:
        # Call our existing crawl4ai crawler function.
        # This opens a real browser, scrapes all internal pages, and returns a list.
        results = await simple_crawl(request.url, max_pages=request.max_pages)

        print(f"[Server] Done. Returning {len(results)} pages.")

        # Return a JSON response to Next.js containing:
        # - origin: the base domain of the scraped site (used as DB key)
        # - pages: a list of { url, markdown } objects
        from urllib.parse import urlparse
        parsed = urlparse(request.url)
        origin = f"{parsed.scheme}://{parsed.netloc}"

        return {
            "origin": origin,  # e.g. "https://prodigi-studios-five.vercel.app"
            "pages": results    # e.g. [{ "url": "...", "markdown": "..." }, ...]
        }

    except Exception as e:
        # If anything goes wrong during crawling, send a 500 error back to Next.js.
        print(f"[Server] Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# --- Health Check Endpoint (optional but very useful) ---
# Next.js can call GET /health to check if this server is running before scraping.

