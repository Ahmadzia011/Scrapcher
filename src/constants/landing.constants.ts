import { Globe, MessageSquare, Code2 } from "lucide-react";

export interface SectionHeaderProps {
  tag: string;
  headline: string;
  description?: string;
  button_1?: string;
  button_2?: string;
  large: boolean
}

export const FEATURES = [
  {
    icon: Globe,
    heading: "Smart Website Scraping",
    description:
      "Automatically crawl and understand your website to build a complete knowledge base for your AI assistant.",
    footer: "Supports documentation, blogs, and marketing pages.",
  },
  {
    icon: MessageSquare,
    heading: "AI Chat Preview",
    description:
      "Test your assistant inside Scrapcher before making it available to your visitors.",
    footer: "Improve confidence before deployment.",
  },
  {
    icon: Code2,
    heading: "One-Click Embedding",
    description:
      "Deploy your assistant anywhere with a lightweight embed script that works with any website.",
    footer: "Lightweight, customizable, and production ready.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "Step 1",
    heading: "Add your website",
    description:
      "Enter your URL and Scrapcher crawls your pages and prepares them for indexing.",
    tagline:
      "Point Scrapcher at your website"
  },
  {
    step: "Step 2",
    heading: "Scrape and train",
    description:
      "Your content is cleaned, chunked, and embedded into a knowledge base that powers your assistant.",
    tagline:
      "Turn pages into a knowledge base"
  },
  {
    step: "Step 3",
    heading: "Preview and embed",
    description: "Test every response inside the dashboard, then deploy with a single embed script.",
    tagline:
      "Ship your assistant with confidence"
  },
];

export const RESULTS_STATS = [
  {
    label: "Fewer repetitive tickets",
    value: "70%",
    description:
      "Visitors get accurate answers instantly, without waiting on your support team.",
  },
  {
    label: "Answer accuracy",
    value: "99%",
    description:
      "Every response is grounded in your website's actual content, not guesswork.",
  },
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For solo builders and small sites",
    monthly: 12,
    featured: false,
    features: [
      "1 AI assistant",
      "Up to 100 pages crawled",
      "Unlimited preview chats",
      "Standard support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing businesses",
    monthly: 29,
    featured: true,
    features: [
      "5 AI assistants",
      "Up to 1,000 pages crawled",
      "Custom branding",
      "Priority support",
    ],
  },
  {
    id: "team",
    name: "Team",
    tagline: "For agencies and larger teams",
    monthly: 79,
    featured: false,
    features: [
      "Unlimited AI assistants",
      "Unlimited pages crawled",
      "Shared team workspace",
      "Dedicated support",
    ],
  },
];


export const FAQS = [
  {
    question: "What is Scrapcher?",
    answer:
      "Scrapcher turns your website into an AI assistant. It crawls your site, builds a knowledge base from your content, and lets visitors ask questions and get accurate answers based on what's actually on your website.",
  },
  {
    question: "Who is Scrapcher designed for?",
    answer:
      "Scrapcher is built for businesses that want to give visitors instant answers, from SaaS products and documentation sites to agencies managing client websites.",
  },
  {
    question: "Do I need any technical experience?",
    answer:
      "No. Add your website URL and Scrapcher handles crawling, processing, and training automatically. Deploying the assistant only takes a single embed script.",
  },
  {
    question: "Can I customize my assistant?",
    answer:
      "Yes. You can preview and refine how your assistant responds, and customize its appearance before embedding it on your website.",
  },
  {
    question: "What content does Scrapcher use to answer questions?",
    answer:
      "Scrapcher only uses the content it crawls from your website, so every answer stays grounded in your actual pages.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most sites are crawled and ready to preview within minutes. From there, deploying the assistant takes one script tag.",
  },
];

export const FOOTER_LINKS = {
  resources: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "404 page", href: "#" },
  ],
  navigation: [
    { label: "Features", href: "#" },
    { label: "How It Works", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  social: [
    { label: "X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Linkedin", href: "#" },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      '"We pointed Scrapcher at our help center and had a working AI assistant answering support questions the same day."',
    rating: "4,9",
    author: "Emma Rodriguez",
    role: "Head of Customer Support",
    image: "/client.avif",
  },
  {
    quote:
      '"Scrapcher cut our support ticket volume in half. Visitors get instant answers pulled straight from our website."',
    rating: "5,0",
    author: "Sarah Chen",
    role: "Product Marketing Manager",
    image: "/client.avif",
  },
  {
    quote:
      '"Setup took minutes. We added our URL, previewed the responses, and embedded the assistant on our site the same afternoon."',
    rating: "5,0",
    author: "David Miller",
    role: "Startup Founder",
    image: "/client.avif",
  },
];
