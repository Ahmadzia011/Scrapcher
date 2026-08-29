// Origin/chatbotId verification happens in proxy.ts before this runs —
// the chatbotId here is already trusted.
export async function GET(request) {
  const computedChatbotId = request.headers.get('x-chatbot-id');

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

  const name = scriptTag?.dataset.name ";
  const accent = scriptTag?.dataset.accent";
  const background = scriptTag?.dataset.background";
  const panel = scriptTag?.dataset.panel";
  const text = scriptTag?.dataset.text";

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
    globe: \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>\`,
    chevronDown: \`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>\`,
    bot: \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>\`,
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
        <span class="launcher-badge">1</span>
      </button>

      <section class="chat-window hidden">
        <header class="chat-header">
          <div class="brand-container">
            <div class="brand-icon">\${ICONS.globe}</div>
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