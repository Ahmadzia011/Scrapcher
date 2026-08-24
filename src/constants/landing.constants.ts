
export interface SectionHeaderProps {
  tag: string;
  headline: string;
  description: string;
  button_1?: string;
  button_2?: string;
  large: boolean
}

export const FEATURES = [
  {image : 'image.png', heading: 'Smart Rewrite', description: 'Improve clarity, structure, and tone instantly without rewriting from scratch.', },
  {image : 'image.png', heading: 'AI Writing', description: 'Start from a simple idea and turn it into structured, high-quality content in seconds.', },
  {image : 'image.png', heading: 'Tone Control', description: 'Keep your voice consistent across every channel — from emails to social posts.', },
  {image : 'image.png', heading: 'Ready Templates', description: 'Use proven formats for real-world use cases — from ads to product descriptions.', },
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: "Step 1",
    heading: "Enter your idea",
    description:
      "Describe what you want to create in a simple prompt - even a rough idea works.",
    tagline:
      "The simpler the input, the faster you get results"
  },
  {
    step: "Step 2",
    heading: "Generate content",
    description:
      "Verseo turns your input into structured, high-quality content in seconds.",
    tagline:
      "Watch your content take shape"
  },
  {
    step: "Step 3",
    heading: "Refine and publish",
    description: "Adjust tone, edit, and use your content anywhere - ready when you are.",
    tagline:
      "Refine your content before publishing"
  },
];

export const USE_CASES = [
    {
      id:'001',
      title : 'For marketers',
      description: 'Write product copy, pitches, and updates with more clarity and less effort.Turn rough ideas into structured messaging that clearly explains your product, value, and positioning. '

    },
    {
      id:'002',
      title : 'For teams',
      description: 'Write product copy, pitches, and updates with more clarity and less effort.Turn rough ideas into structured messaging that clearly explains your product, value, and positioning. '

    },
    {
      id:'003',
      title : 'For marketers',
      description: 'Write product copy, pitches, and updates with more clarity and less effort.Turn rough ideas into structured messaging that clearly explains your product, value, and positioning. '

    }
  ]


export const RESULTS_STATS = [
  {
    label: "Less time spent editing",
    value: "87%",
    description:
      "Refine and finalize content faster with AI-powered suggestions and rewrites.",
  },
  {
    label: "Brand Voice",
    value: "100%",
    description:
      "Keep messaging aligned across emails, social media, landing pages, and campaigns.",
  },
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals and freelancers",
    monthly: 12,
    featured: false,
    features: [
      "AI writing assistant",
      "Essential content templates",
      "Rewrite and improve text",
      "Standard support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators and professionals",
    monthly: 29,
    featured: true,
    features: [
      "Advanced AI generation",
      "Brand voice controls",
      "Full template library",
      "Priority content tools",
    ],
  },
  {
    id: "team",
    name: "Team",
    tagline: "For agencies and growing teams",
    monthly: 79,
    featured: false,
    features: [
      "Shared workspace",
      "Team collaboration tools",
      "Unlimited team projects",
      "Priority support",
    ],
  },
];


export const FAQS = [
  {
    question: "What is Verseo?",
    answer:
      "Verseo is an AI-powered writing assistant that helps you generate, rewrite, and improve content in seconds. From emails and social posts to product descriptions and marketing copy, it helps you create content faster with less effort.",
  },
  {
    question: "Who is Verseo designed for?",
    answer:
      "Verseo is built for founders, marketers, and teams who need to create high-quality content quickly, without sacrificing consistency or brand voice.",
  },
  {
    question: "Do I need any writing experience?",
    answer:
      "No writing experience is required. Verseo guides you through generating and refining content, so anyone can produce polished copy in minutes.",
  },
  {
    question: "Can I customize the generated content?",
    answer:
      "Yes, every piece of generated content can be edited, rewritten, and fine-tuned to match your tone and style.",
  },
  {
    question: "What types of content can I create?",
    answer:
      "You can create emails, social posts, product descriptions, marketing copy, and much more with Verseo.",
  },
  {
    question: "How fast can I generate content?",
    answer:
      "Most content is generated in seconds, letting you go from idea to finished copy almost instantly.",
  },
];

export const FOOTER_LINKS = {
  resources: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "404 page", href: "#" },
  ],
  navigation: [
    { label: "Product", href: "#" },
    { label: "Use Cases", href: "#" },
    { label: "Examples", href: "#" },
    { label: "Pricing", href: "#" },
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
      '"We tested several AI writing tools, but Verseo felt the most practical. It\'s fast, intuitive, and fits naturally into our workflow."',
    rating: "4,9",
    author: "Emma Rodriguez",
    role: "Content Strategist",
    image: "/client.avif",
  },
  {
    quote:
      '"Verseo cut our content creation time in half. What used to take hours now takes minutes, and the quality is consistently high."',
    rating: "5,0",
    author: "Sarah Chen",
    role: "Marketing Manager",
    image: "/client.avif",
  },
  {
    quote:
      '"The biggest win for us is consistency. Every email, post, and product update sounds like it comes from the same brand voice."',
    rating: "5,0",
    author: "David Miller",
    role: "Startup Founder",
    image: "/client.avif",
  },
];
