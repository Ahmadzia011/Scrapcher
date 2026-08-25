"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

import MainButton from "@/src/components/ui/Button";
import { storeData, isUrlScraped } from "../app/actions/storeData.actions";
import {
  WidgetConfig,
  defaultWidgetConfig,
  scriptUrl,
  Status,
  accentPresets,
} from "../constants/primary-dashboard.constants";


export function PrimaryDashboard() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [snippetCopy, setSnippetCopy] = useState(false);
  const [widget, setWidget] =
    useState<WidgetConfig>(defaultWidgetConfig);


  function buildScript(chatbot_id: string) {
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

    setTimeout(() => {
      setSnippetCopy(false);
    }, 2000);
  }

  async function doScraping(e?: React.FormEvent) {
    if (e) e.preventDefault();

    if (!url.trim()) return;

    setNewUrl(url);
    setUrl("");

    try {
      new URL(url);
    } catch {
      setStatus("Error");
      return;
    }
      setStatus("Scraping");
    try {
      const existingOrigin = await isUrlScraped(url);

      if (existingOrigin) {
        setStatus("Done");

        setWidget({
          ...widget,
          scriptSnippet: buildScript(existingOrigin),
        });

        return;
      }


      const scrapResult = await storeData(url);

      if (scrapResult === "error") {
        setStatus("Error");
        return;
      }

      setStatus("Done");

      setWidget({
        ...widget,
        scriptSnippet: buildScript(scrapResult),
      });
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error");
    }
  }

  function startOver() {
    router.push('/dashbaord')
      // setStatus("idle");
      // setUrl("");
      // setNewUrl("");
      // setSnippetCopy(false);
      // setWidget(defaultWidgetConfig);
  }

  const isCustomColor = !accentPresets.some(
    (preset) => preset.value.toLowerCase() === widget.accentColor.toLowerCase()
  );

  return (
    <main className="min-h-screen w-full flex justify-center items-center text-(--secondary-color) pt-20  bg-linear-to-b from-(--primary-color) from-0% via-[#DAE3ED] via-74% to-[#B7CAE0] to-100%">


        {/* =====================================================
            WORKSPACE
        ===================================================== */}
    
      <div className="w-full max-w-[1430PX] drop-shadow-xl">

        <div>
          {status === "idle" && (
            <div className="grid overflow-hidden rounded-md border border-(--border-color) bg-white md:grid-cols-[1.25fr_0.75fr]">

              {/* =================================================
                  LEFT — CONFIGURATION
              ================================================= */}

              <div className="border-b border-(--border-color) p-5 sm:p-7 md:border-b-0 md:border-r">

              <p className="text-[11px] text-(--tertiary-color)">
                [ SETUP ]
              </p>

                <h2 className="mt-3 text-2xl font-medium tracking-tight text-(--secondary-color) md:text-3xl">
                  Connect your website
                </h2>

                <p className="mb-7 mt-3 max-w-xl text-xs leading-relaxed text-(--tertiary-color)">
                  Enter the website you want Scrapcher to learn from. We'll
                  crawl its pages and prepare them for your chatbot.
                </p>

                {/* URL */}

                <form onSubmit={doScraping}>
                  <div className="mb-6">

                    <label className="mb-2 block text-xs font-medium text-(--secondary-color)">
                      Website URL
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row">

                      <input
                        id="website"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="h-12 w-full rounded border border-(--border-color) bg-(--primary-color) px-5 text-sm text-(--secondary-color) outline-none transition duration-200 placeholder:text-[#A5ADB8] focus:border-(--tertiary-color)/40"
                      />

                      <button
                        type="submit"
                        disabled={!url.trim()}
                        className="shrink-0"
                      >
                        <MainButton
                          content="Analyze"
                          isDark={true}
                        />
                      </button>

                    </div>
                  </div>
                </form>

                {/* =================================================
                    CONFIGURATION
                ================================================= */}

                <div className="rounded-[8px] border border-(--border-color) bg-(--primary-color) p-[22px]">

                  <div className="mb-[17px] text-sm font-medium text-(--secondary-color)">
                    Customize your assistant
                  </div>

                  {/* NAME */}

                  <div className="mb-[17px]">

                    <label
                      htmlFor="widget-name"
                      className="mb-2 block text-xs text-(--secondary-color)"
                    >
                      Assistant name
                    </label>

                    <input
                      id="widget-name"
                      value={widget.name}
                      onChange={(e) =>
                        setWidget({
                          ...widget,
                          name: e.target.value,
                        })
                      }
                      placeholder="Assistant"
                      className="h-[42px] w-full rounded-[6px] border border-[#DFE5EC] bg-white px-[13px] text-[11px] text-(--secondary-color) outline-none transition duration-200 placeholder:text-[#A5ADB8] focus:border-(--secondary-color) focus:ring-[3px] focus:ring-(--secondary-color)/[0.08]"
                    />

                  </div>

                  {/* COLOR */}

                  <div>

                    <span className="mb-2 block text-xs text-(--secondary-color)">
                      Accent color
                    </span>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">

                      {accentPresets.map((color) => {
                        const selected =
                          widget.accentColor === color.value;

                        return (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() =>
                              setWidget({
                                ...widget,
                                accentColor: color.value,
                              })
                            }
                            className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-[6px] border bg-white p-[10px] text-left transition duration-200 ${
                              selected
                                ? "border-(--secondary-color)"
                                : "border-[#E4E8ED]"
                            }`}
                          >
                            <span
                              className="h-[22px] w-[22px] shrink-0 rounded-full border border-black/10"
                              style={{
                                backgroundColor: color.value,
                              }}
                            />

                            <span className="flex min-w-0 flex-col gap-[2px]">
                              <span className="text-[9px] font-semibold text-(--secondary-color)">
                                {color.name}
                              </span>

                              <span className="text-[8px] text-[#9AA2AD]">
                                {color.value}
                              </span>
                            </span>
                          </button>
                          
                        );
                      })}
                      
                      <label
                        className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-[6px] border bg-white p-[10px] text-left transition duration-200 ${
                          isCustomColor
                            ? "border-(--secondary-color)"
                            : "border-[#E4E8ED]"
                        }`}
                      >
                        <span
                          className="h-[22px] w-[22px] shrink-0 rounded-full border border-black/10"
                          style={{
                            backgroundColor: widget.accentColor,
                          }}
                        />

                        <span className="flex min-w-0 flex-col gap-[2px]">
                          <span className="text-[9px] font-semibold text-(--secondary-color)">
                            Custom
                          </span>

                          <span className="text-[8px] text-[#9AA2AD]">
                            {widget.accentColor}
                          </span>
                        </span>

                        <input
                          type="color"
                          value={widget.accentColor}
                          onChange={(e) =>
                            setWidget({
                              ...widget,
                              accentColor: e.target.value,
                            })
                          }
                          className="sr-only"
                        />
                      </label>
                                              
                    </div>
                  </div>
                </div>

                {/* STATUS */}

                <div className="mt-[22px] flex items-center gap-[9px] rounded-[6px] border border-(--border-color) bg-white px-[13px] py-3">

                  <span className="h-[7px] w-[7px] rounded-full bg-[#CBD5E1]" />

                  <div className="flex flex-col gap-[2px]">

                    <span className="text-xs font-medium text-(--secondary-color)">
                      Waiting for a website
                    </span>

                    <span className="text-[9px] text-[#8A929D]">
                      Enter a URL above to start building.
                    </span>

                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT — LIVE PREVIEW
              ================================================= */}

              <LivePreview widget={widget} />

            </div>
          )}

          {/* =====================================================
              SCRAPING STATE
          ===================================================== */}

          {status === "Scraping" && (
            <div className="grid overflow-hidden rounded-md border border-(--border-color) bg-white md:grid-cols-[1.25fr_0.75fr]">

              <div className="flex min-h-125 items-center justify-center border-b border-(--border-color) p-8 md:border-b-0 md:border-r">

                <div className="text-center">

                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-(--border-color)">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-(--border-color) border-t-(--secondary-color)" />
                  </div>

                  <p className="mt-5 text-lg font-medium tracking-tight">
                    Building your chatbot
                  </p>

                  <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-(--tertiary-color)">
                    We are crawling your website and preparing its
                    knowledge base.
                  </p>

                </div>
              </div>

              <LivePreview widget={widget} />
            </div>
          )}

          {/* =====================================================
              ERROR
          ===================================================== */}

          {status === "Error" && (
            <div className="rounded-md border border-(--border-color) bg-white p-10 md:p-16">

              <div className="mx-auto max-w-md text-center">

                <p className="text-xs text-(--tertiary-color)">
                  [ error ]
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tighter">
                  Something went wrong.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-(--tertiary-color)">
                  We couldn't process that website. Check the URL and
                  try again.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-7"
                >
                  <MainButton
                    content="Try again"
                    isDark={true}
                  />
                </button>

              </div>
            </div>
          )}

          {/* =====================================================
              COMPLETE
          ===================================================== */}

          {status === "Done" && (
            <div className="grid overflow-hidden rounded-md border border-(--border-color) bg-white md:grid-cols-[1.25fr_0.75fr]">

              {/* LEFT */}

              <div className="p-5 sm:p-7">

                <div className="flex items-center gap-2">
                  <ArrowLeft size={10} />
                  <button className="text-xs cursor-pointer" onClick={()=>{
                    router.back()
                  }}>
                    Back 
                  </button> 
                </div>

                <h2 className="mt-5 text-2xl font-medium tracking-tight md:text-3xl">
                  Ready to deploy.
                </h2>

                <p className="mt-3 max-w-xl text-xs leading-relaxed text-(--tertiary-color)">
                  Your website has been successfully processed. Install the
                  widget or try your chatbot first.
                </p>

                {/* SOURCE */}

                <div className="mt-8 rounded-[8px] border border-(--border-color) bg-(--primary-color) p-4">

                  <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A929D]">
                    Website
                  </span>

                  <p className="mt-2 break-all text-[11px] text-(--secondary-color)">
                    {newUrl}
                  </p>

                </div>

                {/* GENERATED */}

                <div className="mt-[18px] rounded-[8px] border border-(--border-color) bg-(--primary-color) p-[18px]">

                  <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-[7px] text-[10px] font-semibold text-(--secondary-color)">

                      <span className="grid h-[17px] w-[17px] place-items-center rounded-full bg-(--secondary-color) text-white">
                        <Check size={10} />
                      </span>

                      Embed code
                    </div>

                    <button
                      type="button"
                      onClick={copySnippet}
                      className="flex cursor-pointer items-center gap-1 border-0 bg-transparent text-[9px] font-semibold text-(--secondary-color)"
                    >
                      {snippetCopy ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}

                      {snippetCopy ? "Copied" : "Copy code"}
                    </button>

                  </div>

                  <pre className="m-0 overflow-x-auto whitespace-pre-wrap rounded-[5px] border border-[#E1E6EC] bg-white p-3 font-mono text-xs leading-[1.6] text-[#647184]">
                    {widget.scriptSnippet}
                  </pre>

                </div>  
              </div>

              {/* RIGHT */}

              <LivePreview widget={widget} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}




/* ================================================================
   LIVE PREVIEW
================================================================ */

function LivePreview({
  widget,
}: {
  widget: WidgetConfig;
}) {
  return (
    <div className="flex min-h-[500px] flex-col bg-(--primary-color) p-5 sm:p-8">

      <div className="mb-6 flex items-center justify-between">

        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A929D]">
          Live preview
        </span>

        <span className="flex items-center gap-1.5 text-[8px] font-semibold text-[#159447]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22A35A]" />
          Preview
        </span>

      </div>

      <div className="flex flex-1 items-center justify-center">

        <div className="w-full max-w-[332px] overflow-hidden rounded-[10px] border border-[#E2E7ED] bg-white shadow-[0_15px_40px_rgba(10,37,64,0.08)]">

          {/* HEADER */}

          <div className="flex h-[52px] items-center gap-[9px] border-b border-[#EDF0F4] px-[15px]">

            <div
              className="grid h-[27px] w-[27px] place-items-center rounded-[7px] text-[9px] font-bold text-white"
              style={{
                backgroundColor: widget.accentColor,
              }}
            >
              S
            </div>

            <div>
              <div className="text-[10px] font-semibold text-[#0A2540] pt-2">
                {widget.name || "Assistant"}
              </div>

              <div className="text-[8px] text-[#8A929D]">
                Ask me anything about this website
              </div>
            </div>
          </div>

          {/* BODY */}

          <div
            className="flex h-[275px] flex-col justify-end gap-[10px] p-[18px_14px]"
            style={{
              backgroundColor: widget.backgroundColor,
            }}
          >

            <div
              className="w-fit max-w-[80%] rounded-[7px] px-[11px] py-[9px] text-[9px] leading-[1.5]"
              style={{
                backgroundColor: widget.panelColor,
                color: widget.textColor,
              }}
            >
              Hi! I'm your AI assistant. I can answer questions using
              information from this website.
            </div>

            <div
              className="ml-auto w-fit max-w-[80%] rounded-[7px] px-[11px] py-[9px] text-[9px] leading-[1.5] text-white"
              style={{
                backgroundColor: widget.accentColor,
              }}
            >
              What can you help me with?
            </div>

            <div
              className="w-fit max-w-[80%] rounded-[7px] px-[11px] py-[9px] text-[9px] leading-[1.5]"
              style={{
                backgroundColor: widget.panelColor,
                color: widget.textColor,
              }}
            >
              I can help you find information, explain your services, and
              answer questions about your content.
            </div>

          </div>

          {/* INPUT */}

          <div className="mx-3 mb-3 flex h-[38px] items-center justify-between rounded-[6px] border border-[#E1E6EC] px-[11px] text-[9px] text-[#A1A9B4]">

            <span>
              Ask a question...
            </span>

            <span
              className="grid h-[23px] w-[23px] place-items-center rounded-[5px] text-[9px] text-white"
              style={{
                backgroundColor: widget.accentColor,
              }}
            >
              ↑
            </span>

          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-[9px] text-[#9AA2AD]">
        This is approximately how your chatbot will appear on your website.
      </div>
    </div>
  );
}