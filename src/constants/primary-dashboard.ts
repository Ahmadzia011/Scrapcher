
export const scriptUrl = "https://scrapcher.vercel.app/api/widget";

export type Status = 'idle' | 'Scraping' | 'Done' | 'Error'

// ── Widget customisation (stable, rarely changes) ──

export interface WidgetConfig {
  name: string;
  accentColor: string;
  backgroundColor: string;
  panelColor: string;
  textColor: string;
  scriptSnippet: string
}

export const defaultWidgetConfig: WidgetConfig = {
  name: "Assistant",
  accentColor: "#f59e0b",
  backgroundColor: "#f8fafc",
  panelColor: "#ffffff",
  textColor: "#0f172a",
  scriptSnippet: `<script 
      src="" 
      data-chatbot_id=""
      data-name=""
      data-accent=""
      data-background=""
      data-panel=""
      data-text=""
      async>
      </script>`
};