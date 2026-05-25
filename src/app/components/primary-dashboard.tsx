"use client";

import { useState } from "react";
import { Storer, isUrlScraped } from "../actions/store-data.actions";

export function PrimaryDashboard() {
  const [isPending, setIsPending] = useState<Boolean>();
  const [url, setUrl] = useState<string>("");
  const [status, setStatus] = useState<string>("initial");
  const [resultStatus, setResultStatus] = useState<string>("Scraping..");
  const [scriptSnippet, setScriptSnippet] = useState<string>();
  const [widgetName, setWidgetName] = useState("Scrapcher Assistant");
  const [accentColor, setAccentColor] = useState("#f59e0b");
  const [backgroundColor, setBackgroundColor] = useState("#f8fafc");
  const [panelColor, setPanelColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#0f172a");


  function widgetScriptSnippet(chatbot_id: string) {
    const scriptUrl = "localhost/api/widget";

    return `<script 
      src="${scriptUrl}" 
      data-chatbot_id="${chatbot_id}"
      data-name="${widgetName}"
      data-accent="${accentColor}"
      data-background="${backgroundColor}"
      data-panel="${panelColor}"
      data-text="${textColor}"
      async>
      </script>`;
  }

  async function copySnippet(){
      await navigator.clipboard.writeText(scriptSnippet ?? '')

  }


  async function doScraping() {
    if (!url) return;
    const newUrl = url;
    setUrl('')
    try {
      new URL(url ?? "");
    } catch {
      setResultStatus("Enter a valid URL");
      return;
    }

    try {
        // if ((await isUrlScraped(newUrl) > 0)){
        //   setResultStatus('Site is already scrapped')
        //   return
        // }
        const scrapResult = await Storer(newUrl);
        setIsPending(false)
        setStatus("Done");
        setScriptSnippet(widgetScriptSnippet(scrapResult ?? ''));
    } catch (e) {
      console.debug("Error:", e);
    }
  }
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <section className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {status == "initial" ? (
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
                    // disabled={}
                    className="inline-flex items-center justify-center gap-2 rounded-3xl bg-amber-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Analyze
                  </button>
                </div>

                <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Widget name
                    </span>
                    <input
                      value={widgetName}
                      onChange={(e) => setWidgetName(e.target.value)}
                      placeholder="Scrapcher Assistant"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Accent color
                    </span>
                    <input
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      type="color"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-2 py-2"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Background
                    </span>
                    <input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      type="color"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-2 py-2"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Panel
                    </span>
                    <input
                      value={panelColor}
                      onChange={(e) => setPanelColor(e.target.value)}
                      type="color"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-2 py-2"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">
                      Text color
                    </span>
                    <input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      type="color"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-2 py-2"
                    />
                  </label>
                </div>

                {isPending && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
                    {resultStatus}
                  </div>
                )}
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
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 transition hover:cursor-pointer bg-slate-100"
                  >
                    Copy
                  </button>
                </div>

              

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-slate-700">
                    Embed snippet
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-3xl bg-slate-900 p-4 text-sm text-emerald-200">
                    <code>
                      {scriptSnippet ??
                        "Your script tag will appear here once scraping completes."}
                    </code>
                  </pre>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <span>Widget source</span>
                  </div>
                  <p className="mt-2 break-all">{url}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
