"use client";

import { useState } from "react";
import { storeData } from "../app/actions/storeData.actions";
import {
  WidgetConfig,
  defaultWidgetConfig,
  scriptUrl,
  Status
} from '../constants/primary-dashboard.constants'
import { Check } from "lucide-react";

export function PrimaryDashboard() {
  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [snippetCopy, setSnippetCopy] = useState<Boolean>(false);
  const [widget, setWidget] = useState<WidgetConfig>(defaultWidgetConfig);

  function buildScript() {
    return `
    <script 
      src="${scriptUrl}" 
      data-name="${widget.name}"
      data-accent="${widget.accentColor}"
      data-background="${widget.backgroundColor}"
      data-panel="${widget.panelColor}"
      data-text="${widget.textColor}"
      async>
       </script>`;
  }

  async function copySnippet() {
    await navigator.clipboard.writeText(widget.scriptSnippet);
    setSnippetCopy(true);
    setTimeout(() => setSnippetCopy(false), 2000);
  }
  async function doScraping() {
    if (!url.trim()) return;
    setNewUrl(url);
    setUrl("");
    try {
      new URL(url);
    } catch {
      setStatus("Error");
      return;
    }

    try {
      // if ((await isUrlScraped(newUrl) > 0)){
      //   setResultStatus('Site is already scrapped')
      //   return
      // }
      setStatus("Scraping");
      const scrapResult = await storeData(url); //using the old url because useState would update after completion of function
      if (scrapResult === "error") return setStatus("Error");
      setStatus("Done");
      setWidget({ ...widget, scriptSnippet: buildScript() });
    } catch (e) {
      console.debug("Error:", e);
    }
  }
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <section className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-10">
          {status == "idle" ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-slate-900">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-500">
                      Primary user dashboard
                    </p>
                    <h1 className="text-3xl font-bold text-slate-900">
                      Generate a hosted chatbot widget for your website
                    </h1>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  Paste any website URL and we will scrape its pages, embed the
                  content in Supabase, and give you a CDN-hosted widget link to
                  embed in your code.
                </p>

                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <label className="relative block w-full">
                    <span className="text-sm font-semibold text-slate-700">
                      Website URL
                    </span>
                    <input
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        console.log(e.target.value);
                      }}
                      placeholder="https://example.com"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:bg-white"
                    />
                  </label>
                  <button
                    onClick={doScraping}
                    disabled={status != "idle"}
                    className="inline-flex items-center self-end justify-center gap-2 rounded-3xl bg-amber-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Analyze
                  </button>
                </div>

                <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Widget name
                    </span>
                    <input
                      value={widget.name}
                      onChange={(e) =>
                        setWidget({ ...widget, name: e.target.value })
                      }
                      placeholder="Scrapcher Assistant"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    />
                  </label>

                  <div className="flex items-center justify-around pt-2">
                    <label className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 ring-2 ring-transparent transition group-hover:ring-amber-200 shadow-sm">
                        <input
                          value={widget.accentColor}
                          onChange={(e) =>
                            setWidget({
                              ...widget,
                              accentColor: e.target.value,
                            })
                          }
                          type="color"
                          className="h-14 w-14 -translate-x-2 -translate-y-2 cursor-pointer bg-transparent"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        Accent
                      </span>
                    </label>

                    <label className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 ring-2 ring-transparent transition group-hover:ring-amber-200 shadow-sm">
                        <input
                          value={widget.backgroundColor}
                          onChange={(e) =>
                            setWidget({
                              ...widget,
                              backgroundColor: e.target.value,
                            })
                          }
                          type="color"
                          className="h-14 w-14 -translate-x-2 -translate-y-2 cursor-pointer bg-transparent"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        Background
                      </span>
                    </label>

                    <label className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 ring-2 ring-transparent transition group-hover:ring-amber-200 shadow-sm">
                        <input
                          value={widget.panelColor}
                          onChange={(e) =>
                            setWidget({ ...widget, panelColor: e.target.value })
                          }
                          type="color"
                          className="h-14 w-14 -translate-x-2 -translate-y-2 cursor-pointer bg-transparent"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        Panel
                      </span>
                    </label>

                    <label className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 ring-2 ring-transparent transition group-hover:ring-amber-200 shadow-sm">
                        <input
                          value={widget.textColor}
                          onChange={(e) =>
                            setWidget({ ...widget, textColor: e.target.value })
                          }
                          type="color"
                          className="h-14 w-14 -translate-x-2 -translate-y-2 cursor-pointer bg-transparent"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        Text
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : status == "Scraping" ? (
            <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-lg shadow-emerald-200/50">
              <div className="flex items-center gap-3 px-2 py-4 text-sm text-emerald-700">
                <svg
                  className="h-5 w-5 animate-spin text-emerald-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Scraping in progress…</span>
              </div>
            </div>
          ) : status == "Error" ? (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 shadow-lg shadow-red-200/50">
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <svg
                  className="h-10 w-10 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <p className="text-sm font-semibold text-red-700">
                  Something went wrong
                </p>
                <p className="text-xs text-red-500">
                  Please check the URL and try again.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Widget link
                    </p>
                    <p className="text-xs text-slate-400">
                      Copy this URL or use the embed snippet below.
                    </p>
                  </div>
                  <button
                    onClick={copySnippet}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border transition hover:cursor-pointer ${
                      snippetCopy
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {snippetCopy ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-slate-700">
                    Embed snippet
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-3xl bg-slate-900 p-4 text-sm text-emerald-200">
                    <code>
                      {widget.scriptSnippet ??
                        "Your script tag will appear here once scraping completes."}
                    </code>
                  </pre>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span>Widget source</span>
                  </div>
                  <p className="mt-2 break-all">{newUrl}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
