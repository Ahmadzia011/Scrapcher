// Origin/chatbotId verification happens in proxy.ts before this runs —
// the chatbotId here is already trusted.
export async function GET(request) {
  // The complete widget script represented as a raw text string payload
  const widgetScript = `
(function () {
  "use strict";

  // 1. Prevent Double-Injection
  const ROOT_CONTAINER_ID = "scrapcher-chatbot-widget-root";
  if (typeof document === "undefined" || document.getElementById(ROOT_CONTAINER_ID)) {
    return;
  }

  // 2. Resolve Script Attribute Configurations
  const scriptTag = document.currentScript;
  if (!scriptTag) {
    console.error("Scrapcher Widget: Script tag not detected correctly.");
  }

  const name = scriptTag?.dataset.name;
  const accent = scriptTag?.dataset.accent;
  const background = scriptTag?.dataset.background;
  const panel = scriptTag?.dataset.panel;
  const text = scriptTag?.dataset.text;

  // 3. Define Clean Reactive Native State
  const state = {
    isOpen: false,
    isThinking: false,
    messages: [
      {
        content: "Hey there! Ask me anything..",
        role: "assistant",
      },
    ],
  };

  // 4. Construct Web Component Isolated Host Root
  const hostElement = document.createElement("div");
  hostElement.id = ROOT_CONTAINER_ID;
  document.body.appendChild(hostElement);

  const shadowRoot = hostElement.attachShadow({ mode: "open" });

  // 5. CSS Architecture (Decoupled & Encapsulated Utility Layouts)
  const CSS_STYLES = " :host { --widget-accent: " + accent + "; --widget-background: " + background + "; --widget-panel: " + panel + "; --widget-text: " + text + "; } * { box-sizing: border-box; margin: 0; padding: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif; } .fixed-wrapper { position: fixed; bottom: 20px; right: 20px; z-index: 700000; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; } @media (min-width: 640px) { .fixed-wrapper { bottom: 24px; right: 24px; } } .launcher-btn { position: relative; display: flex; height: 64px; width: 64px; align-items: center; justify-content: center; border-radius: 16px; background-color: var(--widget-accent); color: #ffffff; border: none; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.2); cursor: pointer; transition: transform 0.2s, opacity 0.2s; } .launcher-btn:hover { transform: translateY(-2px); opacity: 0.9; } .launcher-badge { position: absolute; top: -4px; right: -4px; display: flex; height: 24px; min-width: 24px; align-items: center; justify-content: center; border-radius: 9999px; border: 2px solid #ffffff; background-color: #0f172a; padding: 0 4px; font-size: 10px; font-weight: 900; color: #ffffff; } .chat-window { display: flex; height: min(680px, calc(100vh - 40px)); width: calc(100vw - 40px); max-width: 390px; flex-direction: column; overflow: hidden; border-radius: 16px; border: 1px solid #e2e8f0; background-color: var(--widget-panel); color: var(--widget-text); box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.2); } @media (min-width: 640px) { .chat-window { height: 640px; } } .chat-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 1px solid #e2e8f0; background-color: var(--widget-panel); padding: 16px; } .brand-container { display: flex; min-width: 0; align-items: center; gap: 12px; } .brand-icon { color: var(--widget-accent); display: flex; align-items: center; } .brand-meta { min-width: 0; } .title-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; font-weight: 900; letter-spacing: -0.025em; } .subtitle-id { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; font-weight: 500; color: #94a3b8; margin-top: 1px; } .header-actions { display: flex; align-items: center; gap: 4px; } .btn-minimize { display: flex; height: 36px; width: 36px; align-items: center; justify-content: center; border-radius: 12px; color: #64748b; background: transparent; border: none; cursor: pointer; transition: background-color 0.2s, color 0.2s; } .btn-minimize:hover { background-color: #f1f5f9; color: #0f172a; } .sub-header-stripe { border-bottom: 1px solid #f1f5f9; background-color: #f8fafc; padding: 12px 16px; } .messages-container { flex: 1; overflow-y: auto; background-color: var(--widget-background); padding: 20px 16px; scrollbar-width: none; } .messages-container::-webkit-scrollbar { display: none; } .messages-list { display: flex; flex-direction: column; gap: 16px; } .message-row { display: flex; gap: 10px; } .message-row.user { justify-content: flex-end; } .message-row.assistant { justify-content: flex-start; } .avatar-bot { margin-top: 4px; display: flex; height: 32px; width: 32px; flex-shrink: 0; align-items: center; justify-content: center; border-radius: 12px; background-color: var(--widget-accent); color: #ffffff; } .avatar-user { margin-top: 4px; display: flex; height: 32px; width: 32px; flex-shrink: 0; align-items: center; justify-content: center; border-radius: 12px; background-color: #e2e8f0; color: #475569; } .message-bubble { max-width: 78%; border-radius: 16px; padding: 12px 16px; font-size: 14px; line-height: 24px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); } .message-bubble.user { border-bottom-right-radius: 4px; background-color: #0f172a; color: #ffffff; } .message-bubble.assistant { border-bottom-left-radius: 4px; border: 1px solid #e2e8f0; background-color: var(--widget-panel); color: #334155; } .thinking-bubble { display: flex; align-items: center; gap: 6px; border-radius: 16px; border-bottom-left-radius: 4px; border: 1px solid #e2e8f0; background-color: var(--widget-panel); padding: 16px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); } .dot { height: 8px; width: 8px; border-radius: 50%; background-color: #cbd5e1; animation: typingBounce 1s infinite ease-in-out; } .dot:nth-child(1) { animation-delay: -0.2s; } .dot:nth-child(2) { animation-delay: -0.1s; } @keyframes typingBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } } .chat-footer { border-top: 1px solid #e2e8f0; background-color: var(--widget-panel); padding: 16px; } .input-form { display: flex; align-items: center; gap: 8px; border-radius: 16px; border: 1px solid #e2e8f0; background-color: #f8fafc; padding: 8px; transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s; } .input-form-focus { border-color: var(--widget-accent); background-color: #ffffff; box-shadow: 0 0 0 4px #f1f5f9; } .chat-input { min-width: 0; flex: 1; background: transparent; padding: 8px 12px; font-size: 14px; font-weight: 500; color: #0f172a; border: none; outline: none; } .chat-input::placeholder { color: #94a3b8; } .btn-send { display: flex; height: 40px; width: 40px; flex-shrink: 0; align-items: center; justify-content: center; border-radius: 12px; background-color: var(--widget-accent); color: #ffffff; border: none; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1); cursor: pointer; transition: opacity 0.2s; } .btn-send:hover { opacity: 0.9; } .btn-send:disabled { cursor: not-allowed; background-color: #cbd5e1; box-shadow: none; } .powered-by { margin-top: 12px; text-align: center; font-size: 11px; font-weight: 500; color: #94a3b8; } .btn-mobile-close { display: flex; height: 48px; width: 48px; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #64748b; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1); cursor: pointer; transition: background-color 0.2s, color 0.2s; } @media (min-width: 640px) { .btn-mobile-close { display: none !important; } } .hidden { display: none !important; } ";

  // 6. Inline Lucide Node Raw Vector Assets Map
  const ICONS = {
    chevronDown: \`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>\`,
    bot: \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
              <defs>
                <!-- Background Gradient for Body -->
                <radialGradient id="bodyGrad" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="70%" stop-color="#f0f2f5"/>
                  <stop offset="100%" stop-color="#d9dee6"/>
                </radialGradient>

                <!-- Head Gradient -->
                <radialGradient id="headGrad" cx="50%" cy="30%" r="65%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="75%" stop-color="#edf0f5"/>
                  <stop offset="100%" stop-color="#d3d9e3"/>
                </radialGradient>

                <!-- Arm Gradients -->
                <linearGradient id="armLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="100%" stop-color="#d0d6e0"/>
                </linearGradient>

                <linearGradient id="armRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff"/>
                  <stop offset="100%" stop-color="#d0d6e0"/>
                </linearGradient>

                <!-- Ear Soft/Base Blue -->
                <linearGradient id="earBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#80ccff"/>
                  <stop offset="50%" stop-color="#3b9eff"/>
                  <stop offset="100%" stop-color="#1a82e6"/>
                </linearGradient>

                <!-- Ear Bright Cyan Accent -->
                <linearGradient id="cyanAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00e5ff"/>
                  <stop offset="100%" stop-color="#0088ff"/>
                </linearGradient>

                <!-- Eye Glow Gradient -->
                <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#cbf7ff"/>
                  <stop offset="60%" stop-color="#6ee7ff"/>
                  <stop offset="100%" stop-color="#38bdf8"/>
                </radialGradient>

                <!-- Cloud Icon Gradient -->
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#93e2ff"/>
                  <stop offset="100%" stop-color="#3b9eff"/>
                </linearGradient>

                <!-- Dark Visor Shadow/Gradient -->
                <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#4a4d4f"/>
                  <stop offset="100%" stop-color="#5a5d60"/>
                </linearGradient>

                <!-- Chest Badge Gradient -->
                <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#4a4a4a"/>
                  <stop offset="100%" stop-color="#5a5a5a"/>
                </linearGradient>

                <!-- Soft Shadows & Glows -->
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.08"/>
                </filter>

                <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#00e5ff" flood-opacity="0.5"/>
                </filter>
              </defs>

              <!-- BODY GROUP -->
              <g id="robot-body">
                <!-- Neck Connector -->
                <rect x="378" y="380" width="44" height="30" rx="5" fill="#c2c8d4"/>

                <!-- Left Arm -->
                <path d="M 335 410 C 310 415 285 460 280 520 C 275 580 295 595 310 590 C 325 585 338 520 345 450 Z" 
                      fill="url(#armLeftGrad)" filter="url(#shadow)"/>

                <!-- Right Arm -->
                <path d="M 465 410 C 490 415 515 460 520 520 C 525 580 505 595 490 590 C 475 585 462 520 455 450 Z" 
                      fill="url(#armRightGrad)" filter="url(#shadow)"/>

                <!-- Main Torso / Body -->
                <path d="M 320 410 
                        C 380 400 420 400 480 410 
                        C 520 415 530 500 520 540 
                        C 500 620 450 630 400 630 
                        C 350 630 300 620 280 540 
                        C 270 500 280 415 320 410 Z" 
                      fill="url(#bodyGrad)" filter="url(#shadow)"/>

                <!-- Chest Badge Plate -->
                <path d="M 345 410 L 455 410 C 465 410 470 420 470 430 L 460 470 C 450 485 425 488 400 488 C 375 488 350 485 340 470 L 330 430 C 330 420 335 410 345 410 Z" 
                      fill="url(#badgeGrad)"/>

                <!-- Cloud Symbol on Chest -->
                <path d="M 388 460 
                        A 12 12 0 0 1 402 448 
                        A 15 15 0 0 1 422 454 
                        A 10 10 0 0 1 422 468 
                        A 8 8 0 0 1 414 470 
                        L 388 470 
                        A 10 10 0 0 1 388 460 Z" 
                      fill="url(#cloudGrad)"/>
              </g>

              <!-- HEAD GROUP -->
              <g id="robot-head">
                <!-- Left Ear Structure -->
                <path d="M 270 215 C 270 215 295 235 290 280 L 275 280 C 275 250 260 230 260 230 Z" fill="url(#cyanAccent)"/>
                <rect x="250" y="270" width="22" height="60" rx="11" fill="url(#earBlueGrad)" filter="url(#shadow)"/>
                <rect x="258" y="278" width="14" height="44" rx="7" fill="#e8f4ff" opacity="0.3"/>

                <!-- Right Ear Structure -->
                <path d="M 530 215 C 530 215 505 235 510 280 L 525 280 C 525 250 540 230 540 230 Z" fill="url(#cyanAccent)"/>
                <rect x="528" y="270" width="22" height="60" rx="11" fill="url(#earBlueGrad)" filter="url(#shadow)"/>
                <rect x="528" y="278" width="14" height="44" rx="7" fill="#e8f4ff" opacity="0.3"/>

                <!-- Main Head Outer Shell -->
                <rect x="260" y="200" width="280" height="210" rx="105" fill="url(#headGrad)" filter="url(#shadow)"/>

                <!-- Forehead Dots -->
                <circle cx="376" cy="242" r="4" fill="#8a94a6"/>
                <circle cx="400" cy="240" r="4.5" fill="#8a94a6"/>
                <circle cx="424" cy="242" r="4" fill="#8a94a6"/>

                <!-- Dark Helmet Visor -->
                <rect x="295" y="252" width="210" height="116" rx="58" fill="url(#visorGrad)"/>
                <rect x="297" y="254" width="206" height="112" rx="56" fill="none" stroke="#3a3d40" stroke-width="3" opacity="0.7"/>

                <!-- Left Eye -->
                <circle cx="355" cy="310" r="30" fill="url(#eyeGrad)" filter="url(#innerGlow)"/>
                <ellipse cx="348" cy="302" rx="22" ry="18" fill="#ffffff" opacity="0.25"/>

                <!-- Right Eye -->
                <circle cx="445" cy="310" r="30" fill="url(#eyeGrad)" filter="url(#innerGlow)"/>
                <ellipse cx="438" cy="302" rx="22" ry="18" fill="#ffffff" opacity="0.25"/>
              </g>
            </svg>
            \`,
    user: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\`,
    send: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>\`,
    messageCircle: \`<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>\`,
    x: \`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>\`
  };

  // 7. Base Core Layout HTML Shell Insertion
  shadowRoot.innerHTML = \`
    <style>\${CSS_STYLES}</style>
    <div class="fixed-wrapper">
      <button type="button" class="launcher-btn" aria-label="Open chat widget">
        \${ICONS.messageCircle}
      </button>

      <section class="chat-window hidden">
        <header class="chat-header">
          <div class="brand-container">
            <div class="brand-icon">\${ICONS.bot}</div>
            <div class="brand-meta">
              <h2 class="title-text">\${name}</h2>
              <p class="subtitle-id">AI Assistant</p>
            </div>
          </div>
          <div class="header-actions">
            <button type="button" class="btn-minimize" aria-label="Minimize chat widget">
              \${ICONS.chevronDown}
            </button>
          </div>
        </header>

        <div class="sub-header-stripe"></div>
        <div class="messages-container">
          <div class="messages-list"></div>
        </div>

        <div class="chat-footer">
          <form class="input-form">
            <input type="text" class="chat-input" placeholder="Start a conversation" />
            <button type="submit" class="btn-send" aria-label="Send message" disabled>
              \${ICONS.send}
            </button>
          </form>
          <p class="powered-by">Powered by Scrapcher.AI</p>
        </div>
      </section>

      <button type="button" class="btn-mobile-close hidden" aria-label="Close chat widget">
        \${ICONS.x}
      </button>
    </div>
  \`;

  // 8. Query and Resolve DOM Node Target Handles inside Shadow Root
  const ui = {
    launcherBtn: shadowRoot.querySelector(".launcher-btn"),
    chatWindow: shadowRoot.querySelector(".chat-window"),
    minimizeBtn: shadowRoot.querySelector(".btn-minimize"),
    mobileCloseBtn: shadowRoot.querySelector(".btn-mobile-close"),
    messagesList: shadowRoot.querySelector(".messages-list"),
    messagesContainer: shadowRoot.querySelector(".messages-container"),
    inputForm: shadowRoot.querySelector(".input-form"),
    chatInput: shadowRoot.querySelector(".chat-input"),
    btnSend: shadowRoot.querySelector(".btn-send"),
  };

  // 9. Core Engine Component Render Logic & Mutations Functions
  function sanitizeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMessages() {
    let outputHTML = "";

    state.messages.forEach((msg) => {
      const isUser = msg.role === "user";
      outputHTML += \`
        <div class="message-row \${isUser ? "user" : "assistant"}">
          \${!isUser ? \`<div class="avatar-bot">\${ICONS.bot}</div>\` : ""}
          <div class="message-bubble \${isUser ? "user" : "assistant"}">
            <p>\${sanitizeHTML(msg.content)}</p>
          </div>
          \${isUser ? \`<div class="avatar-user">\${ICONS.user}</div>\` : ""}
        </div>
      \`;
    });

    if (state.isThinking) {
      outputHTML += \`
        <div class="message-row assistant">
          <div class="avatar-bot">\${ICONS.bot}</div>
          <div class="thinking-bubble">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      \`;
    }

    ui.messagesList.innerHTML = outputHTML;
    ui.messagesContainer.scrollTop = ui.messagesContainer.scrollHeight;
  }

  function updateInputControlsState() {
    const queryVal = ui.chatInput.value.trim();
    
    if (state.messages.length > 1) {
      ui.chatInput.placeholder = "Ask a question about this site";
    } else {
      ui.chatInput.placeholder = "Start a conversation";
    }

    if (!queryVal || state.isThinking) {
      ui.btnSend.setAttribute("disabled", "true");
    } else {
      ui.btnSend.removeAttribute("disabled");
    }
  }

  function setWidgetVisibility(openStatus) {
    state.isOpen = openStatus;
    if (openStatus) {
      ui.chatWindow.classList.remove("hidden");
      ui.mobileCloseBtn.classList.remove("hidden");
      ui.launcherBtn.classList.add("hidden");
      renderMessages();
      setTimeout(() => ui.chatInput.focus(), 50);
    } else {
      ui.chatWindow.classList.add("hidden");
      ui.mobileCloseBtn.classList.add("hidden");
      ui.launcherBtn.classList.remove("hidden");
    }
  }

  // 10. Chat Lifecycle & Network Transfer Submit Request Pipeline
  async function handleChatSubmission(event) {
    event.preventDefault();
    const currentQueryText = ui.chatInput.value.trim();
    if (!currentQueryText || state.isThinking) return;

    ui.chatInput.value = "";
    
    state.messages.push({
      content: currentQueryText,
      role: "user",
    });
    state.isThinking = true;

    renderMessages();
    updateInputControlsState();

    try {
      // Get the last 4 messages for context (excluding the current query which isn't in state.messages yet... wait, it WAS pushed)
      // Actually, currentQueryText was already pushed to state.messages at line 248!
      // So we want the messages before the last one.
      const historyToSend = state.messages.slice(-6, -1);

      const response = await fetch("https://scrapcher.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
          query: currentQueryText,
          history: historyToSend
        }),
      });

      const data = await response.json();
      state.isThinking = false;

      state.messages.push({
        content: data,
        role: "assistant",
      });

    } catch (error) {
      console.debug("Error:", error);
      state.isThinking = false;
    } finally {
      renderMessages();
      updateInputControlsState();
    }
  }

  // 11. Wire Scoped View Event Listeners 
  ui.launcherBtn.addEventListener("click", () => setWidgetVisibility(true));
  ui.minimizeBtn.addEventListener("click", () => setWidgetVisibility(false));
  ui.mobileCloseBtn.addEventListener("click", () => setWidgetVisibility(false));
  
  ui.chatInput.addEventListener("input", updateInputControlsState);
  ui.inputForm.addEventListener("submit", handleChatSubmission);

  ui.chatInput.addEventListener("focus", () => ui.inputForm.classList.add("input-form-focus"));
  ui.chatInput.addEventListener("blur", () => ui.inputForm.classList.remove("input-form-focus"));

  renderMessages();
})();
  `;

  // Return the raw text string with JavaScript response headers back to the browser
  return new Response(widgetScript, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=600",
    },
  });
}
