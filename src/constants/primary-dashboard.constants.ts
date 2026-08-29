

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
  accentColor: "#78AEFF",
  backgroundColor: "#f8fafc",
  panelColor: "#ffffff",
  textColor: "#0f172a",
  scriptSnippet: `<script 
      src="" 
      data-name=""
      data-accent=""
      data-background=""
      data-panel=""
      data-text=""
      async>
      </script>`
};

export const accentPresets = [
  {
    name: "Sky",
    value: "#4F7BFF",
  },
  {
    name: "Aqua",
    value: "#18A7B5",
  },
  {
    name: "Violet",
    value: "#7C5CFF",
  },
  {
    name: "Charcoal",
    value: "#181818",
  },
];  
