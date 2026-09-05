"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUp, Check, Copy, Plus } from "lucide-react";

import MainButton from "@/src/components/ui/Button";
import DemoChatModal from "@/src/components/ui/dashboard/DemoChatModal";
import { isUrlScraped, storeData } from "@/src/app/actions/storeData.actions";
import {
  accentPresets,
  defaultWidgetConfig,
  scriptUrl,
  Status,
  WidgetConfig,
} from "@/src/constants/primary-dashboard.constants";

export function PrimaryDashboard() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [snippetCopy, setSnippetCopy] = useState(false);
  const [chatbotId, setChatbotId] = useState<string | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [widget, setWidget] = useState<WidgetConfig>(defaultWidgetConfig);

  const isCustomColor = !accentPresets.some(
    (preset) => preset.value.toLowerCase() === widget.accentColor.toLowerCase()
  );

  function escapeHtmlAttribute(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildScript(chatbotId: string) {
    return `
      <script 
        src="${escapeHtmlAttribute(scriptUrl)}" 
        data-chatbot-id="${escapeHtmlAttribute(chatbotId)}"
        data-name="${escapeHtmlAttribute(widget.name)}"
        data-accent="${escapeHtmlAttribute(widget.accentColor)}"
        data-background="${escapeHtmlAttribute(widget.backgroundColor)}"
        data-panel="${escapeHtmlAttribute(widget.panelColor)}"
        data-text="${escapeHtmlAttribute(widget.textColor)}"
        async>
      </script>`;
  }

  async function copySnippet() {
    await navigator.clipboard.writeText(widget.scriptSnippet);
    setSnippetCopy(true);
    setTimeout(() => setSnippetCopy(false), 2000);
  }

  async function doScraping(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setNewUrl(url);
    setUrl("");
    setChatbotId(null);

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
        setChatbotId(existingOrigin);
        setWidget({ ...widget, scriptSnippet: buildScript(existingOrigin) });
        return;
      }

      const scrapResult = await storeData(url);

      if (scrapResult === "error") {
        setStatus("Error");
        return;
      }

      setStatus("Done");
      setChatbotId(scrapResult);
      setWidget({ ...widget, scriptSnippet: buildScript(scrapResult) });
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error");
    }
  }

  const previewMessage = (
    children: React.ReactNode,
    className = "w-fit max-w-xs"
  ) => (
    <div
      className={`${className} rounded-2xl px-4 py-3 text-xs leading-relaxed`}
      style={{
        backgroundColor: widget.panelColor,
        color: widget.textColor,
      }}
    >
      {children}
    </div>
  );

  const colorControls = (
    <div className="mt-3 flex flex-wrap gap-2">
      {accentPresets.map((color) => (
        <button
          key={color.value}
          type="button"
          title={color.name}
          onClick={() => setWidget({ ...widget, accentColor: color.value })}
          className={`grid h-9 w-9 place-items-center rounded-full border bg-white transition ${
            widget.accentColor === color.value
              ? "border-(--secondary-color)"
              : "border-(--border-color)"
          }`}
        >
          <span
            className="h-4 w-4 rounded-full border border-(--border-color)"
            style={{ backgroundColor: color.value }}
          />
        </button>
      ))}

      <label
        title="Custom"
        className={`grid h-9 w-9 cursor-pointer place-items-center rounded-full border bg-white transition ${
          isCustomColor
            ? "border-(--secondary-color)"
            : "border-(--border-color)"
        }`}
      >
        <span
          className="h-4 w-4 rounded-full border border-(--border-color)"
          style={{ backgroundColor: widget.accentColor }}
        />
        <input
          type="color"
          value={widget.accentColor}
          onChange={(e) =>
            setWidget({ ...widget, accentColor: e.target.value })
          }
          className="sr-only"
        />
      </label>
    </div>
  );

  const livePreview = (
    <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-white">
      <div className="flex items-center gap-3 border-b border-(--border-color) px-4 py-3">
        <div
          className="grid h-8 w-8 place-items-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: widget.accentColor }}
        >
          S
        </div>

        <div>
          <p className="text-xs font-medium">{widget.name || "Assistant"}</p>
          <p className="text-xs text-(--tertiary-color)">Website assistant</p>
        </div>
      </div>

      <div
        className="flex min-h-60 flex-col justify-end gap-3 p-4"
        style={{ backgroundColor: widget.backgroundColor }}
      >
        {previewMessage("Hello, how can I help you?")}

        <div
          className="ml-auto max-w-xs rounded-2xl px-4 py-3 text-xs leading-relaxed text-white"
          style={{ backgroundColor: widget.accentColor }}
        >
          How can I learn from this website?
        </div>

        {previewMessage(
          "I can answer using the content Scrapcher finds on your site."
        )}
      </div>
    </div>
  );

  return (
    <main className="h-screen bg-linear-to-br from-[#eef7ff] via-[#f7fbff] to-[#dcebff] pt-50 text-(--secondary-color)">
      <section className=" mx-auto flex w-full max-w-7xl items-center justify-center px-4 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(120,174,255,0.22),transparent_42%)]" />

        <div className="relative flex min-h-[min(42rem,calc(100vh-9rem))] w-full flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/45 shadow-xl shadow-[#78aeff]/10 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-4 md:px-7">
            <div className="flex items-center gap-3">
              <Image src="/AI_bot.svg" alt="" width={32} height={32} />
              <p className="text-sm font-semibold tracking-wide">SCRAPCHER</p>
            </div>

            <p className="text-xs text-(--tertiary-color)">
              {status === "idle" ? "New chatbot" : status}
            </p>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-28 text-center md:px-8">
            {status === "idle" && (
              <>
                {!url.trim() && (
                  <>
                    <Image
                      src="/AI_bot.svg"
                      alt=""
                      width={144}
                      height={144}
                      className="mb-5 h-24 w-24 md:mb-6 md:h-36 md:w-36"
                    />

                    <p className="max-w-xs text-2xl font-semibold tracking-tight md:max-w-none md:text-3xl">
                      How can I help your website today?
                    </p>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-(--tertiary-color)">
                      Add a URL to create a chatbot from your site content.
                    </p>
                  </>
                )}

                {url.trim() && (
                  <div className="w-full max-w-sm overflow-auto rounded-3xl border border-white/80 bg-white/90 p-3 text-left shadow-xl shadow-[#78aeff]/15 backdrop-blur-md md:max-w-md md:p-4">
                    {livePreview}

                    <div className="mt-4 border-t border-(--border-color) pt-4">
                      <p className="ml-3 mt-2 text-xs font-medium uppercase text-(--tertiary-color)">
                        Preview settings
                      </p>

                      <input
                        value={widget.name}
                        onChange={(e) =>
                          setWidget({ ...widget, name: e.target.value })
                        }
                        placeholder="Assistant"
                        className="mt-2 h-10 w-full rounded-full border border-(--border-color) bg-white px-4 text-sm outline-none transition placeholder:text-(--tertiary-color) focus:border-(--secondary-color)"
                      />

                      {colorControls}
                    </div>
                  </div>
                )}
              </>
            )}

            {status === "Scraping" && (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/70">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-(--border-color) border-t-(--secondary-color)" />
                </div>

               <p className="mt-5 text-balance text-lg font-medium text-black/80">
                  Working on it... <br />
                  <span className="text-base font-normal text-black/50">
                    This might take a few moments, so feel free to sit tight!
                  </span>
                </p>
              </div>
            )}

            {status === "Error" && (
              <div className="text-center">
                <p className="text-lg font-medium">Something went wrong.</p>
                 <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6"
                >
                  <MainButton content="Try again" isDark={true} />
                </button>
              </div>
            )}

            {status === "Done" && (
              <div className="w-full max-w-2xl rounded-3xl border border-white/80 bg-white/85 p-5 text-left shadow-xl shadow-[#78aeff]/15 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex w-fit items-center cursor-pointer gap-2 text-xs text-(--tertiary-color) transition hover:text-(--secondary-color)"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
                
                <div className="flex justify-between mt-6 border-t border-(--border-color) pt-5">
                 <div>
                  <p className="text-xs font-medium uppercase text-(--tertiary-color) mt-2">
                    Website
                  </p>
                  <p className="mt-2 break-all text-sm overflow-hidden w-sm">{newUrl}</p>
                  </div>
                  
                 <button
                  type="button"
                  onClick={() => setIsDemoOpen(true)}
                  className="mt-4 w-fit"
                >
                  <MainButton content="Try Demo" isDark={true} />
                </button>
                </div>

                <div className="mt-10">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-(--secondary-color) text-(--primary-color)">
                        <Check size={12} />
                      </span>
                      Embed code
                    </div>

                    <button
                      type="button"
                      onClick={copySnippet}
                      className="flex items-center gap-1 text-xs font-medium"
                    >
                      {snippetCopy ? <Check size={14} /> : <Copy size={14} />}
                      {snippetCopy ? "Copied" : "Copy code"}
                    </button>
                  </div>

                  <pre className="max-h-56 overflow-auto scrollbar-none rounded-2xl border border-(--border-color) bg-(--primary-color)  font-mono text-xs leading-relaxed text-(--tertiary-color)">
                    {widget.scriptSnippet}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {status === "idle" && (
            <form
              onSubmit={doScraping}
              className="absolute inset-x-4 bottom-4 mx-auto max-w-3xl md:inset-x-8 md:bottom-7"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/85 p-2 text-left shadow-lg shadow-[#78aeff]/10 backdrop-blur md:gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--primary-color) md:h-10 md:w-10">
                  <Plus size={18} />
                </span>

                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste website URL..."
                  className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-(--tertiary-color) md:h-10"
                />

                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--secondary-color) text-(--primary-color) transition disabled:opacity-40 md:h-10 md:w-10"
                  aria-label="Analyze website"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {chatbotId && (
        <DemoChatModal
          widget={widget}
          chatbotId={chatbotId}
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
        />
      )}
    </main>
  );
}
