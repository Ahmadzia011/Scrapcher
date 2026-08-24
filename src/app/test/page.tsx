"use client";

import MainButton from "@/src/components/ui/Button";
import Header from "@/src/components/ui/Header/Header";
import Navbar from "@/src/components/ui/Header/Navbar";
import { Plus, Icon, Check, Copy } from "lucide-react";
import { useState } from "react";

const colors = [
  {
    name: "Orange",
    value: "#FFAB40",
  },
  {
    name: "Navy",
    value: "#0A2540",
  },
  {
    name: "Violet",
    value: "#7C3AED",
  },
];

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [widgetName, setWidgetName] = useState("Assistant");
  const [accent, setAccent] = useState("#0066FF");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyzeWebsite = () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsGenerated(true);
    }, 1400);
  };

  const embedCode = `<script
  src="https://cdn.scrapcher.com/widget.js"
  data-chatbot="scr_8f92d1"
></script>`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {}
  };

  return (
     <>

      {/* =========================================================
          MAIN PAGE
      ========================================================= */}

    <section className="relative w-full min-h-screen pt-24 md:pt-[22vh] bg-linear-to-b from-(--primary-color) from-0% via-[#DAE3ED] via-74% to-[#B7CAE0] to-100%">
{/*       
     <img
          className="pointer-events-none absolute h-screen w-full object-cover opacity-55   mask-[linear-gradient(to_bottom,transparent_0%,black_60%,transparent_70%)]"
          src={"/cloud_bg.png"}
        ></img> */}
        
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[1.36]"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
            backgroundSize: "101px 88px",
          }}
        />



      <main className="relative max-w-345 mx-auto flex items-center ">



        {/* =========================================================
            WORKSPACE
        ========================================================= */}

        {/* Left box */}
        
          <div className="border-b border-(--border-color) p-5 sm:p-7.5 md:border-b-0 w-2/3">
          

            <h2 className="text-3xl font-medium text-(--secondary-color)">
              Connect your website
            </h2>

            <p className="mb-7 mt-3 text-xs text-(--tertiary-color)">
              Enter the website you want Scrapcher to learn from. We'll crawl
              its pages and prepare them for your chatbot.
            </p>

            {/* URL */}

            <div className="mb-5">
              <label
                className="mb-2 block text-sm font-normal text-(--secondary-color)"
              >
                Website URL
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="website"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="h-12 w-full rounded bg-(--primary-color) rounded border border-(--border-color) px-5 text-sm text-(--tertiary-color) outline-none transition duration-200 placeholder:text-[#A5ADB8] focus:border-(--tertiary-color)/40 "
                />

                <button
                  type="button"
                  onClick={analyzeWebsite}
                  disabled={!url.trim() || isAnalyzing}
                  className=""
                >
                  <MainButton content={isAnalyzing ? "Building..." : "Analyze"} isDark={true}/>
                  
                </button>
              </div>
            </div>

            {/* ===================================================
                CONFIGURATION
            =================================================== */}

            <div className="rounded-[8px] border border-[#E5E9EF] bg-(--primary-color) p-[22px]">
              <div className="mb-[17px] text-[11px] font-semibold text-[#0A2540]">
                Customize your assistant
              </div>

              {/* NAME */}

              <div className="mb-[17px]">
                <label
                  htmlFor="widget-name"
                  className="mb-2 block text-[10px] font-semibold text-[#0A2540]"
                >
                  Assistant name
                </label>

                <input
                  id="widget-name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="Assistant"
                  className="h-[42px] w-full rounded-[6px] border border-[#DFE5EC] bg-white px-[13px] text-[11px] text-[#0A2540] outline-none transition duration-200 placeholder:text-[#A5ADB8] focus:border-[#0066FF] focus:ring-[3px] focus:ring-[#0066FF]/[0.08]"
                />
              </div>

              {/* COLOR */}

              <div>
                <span className="mb-2 block text-[10px] font-semibold text-[#0A2540]">
                  Accent color
                </span>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {colors.map((color) => {
                    const selected = accent === color.value;

                    return (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setAccent(color.value)}
                        className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-[6px] border bg-white p-[10px] text-left transition duration-200 hover:-translate-y-px ${
                          selected
                            ? "border-[#0066FF]"
                            : "border-[#E4E8ED]"
                        }`}
                      >
                        <span
                          className="h-[22px] w-[22px] shrink-0 rounded-full border border-[#0A2540]/10"
                          style={{ backgroundColor: color.value }}
                        />

                        <span className="flex flex-col gap-[2px]">
                          <span className="text-[9px] font-semibold text-[#0A2540]">
                            {color.name}
                          </span>

                          <span className="text-[8px] text-[#9AA2AD]">
                            {color.value}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STATUS */}

            <div className="mt-[22px] flex items-center gap-[9px] rounded-[6px] border border-[#E5E9EF] bg-white px-[13px] py-3">
              <span
                className={`h-[7px] w-[7px] rounded-full ${
                  isGenerated ? "bg-[#22A35A]" : "bg-[#CBD5E1]"
                }`}
              />

              <div className="flex flex-col gap-[2px]">
                <span className="text-[9px] font-semibold text-[#0A2540]">
                  {isGenerated ? "Chatbot ready" : "Waiting for a website"}
                </span>

                <span className="text-[8px] text-[#8A929D]">
                  {isGenerated
                    ? "Your knowledge base has been prepared."
                    : "Enter a URL above to start building."}
                </span>
              </div>
            </div>

            {/* GENERATED */}

            {isGenerated && (
              <div className="mt-[18px] rounded-[8px] border border-[#DCE7F8] bg-[#F7FAFF] p-[18px]">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-[7px] text-[10px] font-semibold text-[#0A2540]">
                    <span className="grid h-[17px] w-[17px] place-items-center rounded-full bg-[#0066FF] text-white">
                      <Check size={10} />
                    </span>

                    Your widget is ready
                  </div>

                  <button
                    type="button"
                    onClick={copyCode}
                    className="flex cursor-pointer items-center gap-1 border-0 bg-transparent text-[9px] font-semibold text-[#0066FF]"
                  >
                    {copied ? (
                      <Check size={13} />
                    ) : (
                      <Copy size={13} />
                    )}

                    {copied ? "Copied" : "Copy code"}
                  </button>
                </div>

                <pre className="m-0 overflow-x-auto whitespace-pre-wrap wrap-break-words rounded-[5px] border border-[#E1E6EC] bg-white p-3 font-mono text-[8px] leading-[1.6] text-[#647184]">
                  {embedCode}
                </pre>
              </div>
            )}
          </div>

          {/* =====================================================
              PREVIEW
          ===================================================== */}

          <div className="flex min-h-120 flex-col bg-(--primary-color) rounded-md p-5 sm:min-h-130 sm:p-8">
            <div className="mb-6.25 flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8A929D]">
                Live preview
              </span>

              <span className="flex items-center gap-1.25 text-[8px] font-semibold text-[#159447]">
                <span className="h-1.25 w-1.25 rounded-full bg-[#22A35A]" />
                Preview
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center">
              {/* CHATBOT */}

              <div className="w-full max-w-83 overflow-hidden rounded-[10px] border border-[#E2E7ED] bg-white shadow-[0_15px_40px_rgba(10,37,64,0.08)]">
                {/* CHAT HEADER */}

                <div className="flex h-13 items-center gap-2.25 border-b border-[#EDF0F4] px-3.75">
                  <div
                    className="grid h-6.75 w-6.75 place-items-center rounded-[7px] text-[9px] font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    S
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold text-[#0A2540]">
                      {widgetName || "Assistant"}
                    </div>

                    <div className="mt-[2px] text-[8px] text-[#8A929D]">
                      Ask me anything about this website
                    </div>
                  </div>
                </div>

                {/* CHAT BODY */}

                <div className="flex h-[275px] flex-col justify-end gap-[10px] p-[18px_14px]">
                  <div className="w-fit max-w-[80%] rounded-[7px] bg-[#F4F6F8] px-[11px] py-[9px] text-[9px] leading-[1.5] text-[#445266]">
                    Hi! I'm your AI assistant. I can answer questions using
                    information from this website.
                  </div>

                  <div
                    className="ml-auto w-fit max-w-[80%] rounded-[7px] px-[11px] py-[9px] text-[9px] leading-[1.5] text-white"
                    style={{ backgroundColor: accent }}
                  >
                    What can you help me with?
                  </div>

                  <div className="w-fit max-w-[80%] rounded-[7px] bg-[#F4F6F8] px-[11px] py-[9px] text-[9px] leading-[1.5] text-[#445266]">
                    I can help you find information, explain your services,
                    and answer questions about your content.
                  </div>
                </div>

                {/* CHAT INPUT */}

                <div className="mx-3 mb-3 flex h-[38px] items-center justify-between rounded-[6px] border border-[#E1E6EC] px-[11px] text-[9px] text-[#A1A9B4]">
                  <span>Ask a question...</span>

                  <span
                    className="grid h-[23px] w-[23px] place-items-center rounded-[5px] text-[9px] text-white"
                    style={{ backgroundColor: accent }}
                  >
                    ↑
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center text-[9px] text-[#9AA2AD]">
              This is approximately how your chatbot will appear on your
              website.
            </div>
          </div>

    </main>
</section>
      </>
  );
}