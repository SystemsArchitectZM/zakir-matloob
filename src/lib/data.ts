export const site = {
  name: "Zakir Matloob",
  wordmark: "Zakir",
  studio: "Code Architect",
  role: "Software Engineer · AI Engineer · SAP Consultant",
  shortRole: "Enterprise Solutions Engineer & AI Engineer",
  location: "Lahore · Islamabad, Pakistan",
  email: "zakirmatloob149@gmail.com",
  year: 2026,
  headline:
    "I engineer user-centered digital systems that are simple, smart, and impactful.",
  description:
    "Zakir Matloob is a software engineer building production web platforms, AI systems, and enterprise SAP-adjacent workflows for organizations that need reliability with taste.",
  url: "https://zakirmatloob.com",
  portrait: "/images/zakir-portrait.jpg",
  socials: {
    github: "https://github.com/ZakirCodeArchitect",
    linkedin: "https://www.linkedin.com/in/zakir-matloob",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work", count: "06" },
  { href: "/journal", label: "Journal", count: "02" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = {
  main: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Case Study" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ],
  inner: [
    { href: "/journal/rag-in-the-enterprise", label: "Journal details" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/changelog", label: "Change log" },
  ],
  utility: [
    { href: "/license", label: "License" },
    { href: "/style-guide", label: "Style Guide" },
  ],
};

export const skills = [
  { name: "Next.js", icon: "nextdotjs" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Python", icon: "python" },
  { name: "LangChain", icon: "langchain" },
  { name: "SAP", icon: "sap" },
  { name: "Docker", icon: "docker" },
  { name: "GitHub Actions", icon: "githubactions" },
  { name: "Stripe", icon: "stripe" },
  { name: "Vercel", icon: "vercel" },
  { name: "NestJS", icon: "nestjs" },
  { name: "Git", icon: "git" },
] as const;

export const productLocations = [
  {
    id: "pakistan",
    country: "Pakistan",
    lat: 33.6844,
    lng: 73.0479,
    label: "HA EngagePro · Legal RAG · FFC",
  },
  {
    id: "malta",
    country: "Malta",
    lat: 35.8997,
    lng: 14.5147,
    label: "Explore Malta Rentals",
  },
  {
    id: "uae",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    label: "Global ed-tech programs",
  },
  {
    id: "usa",
    country: "United States",
    lat: 39.8283,
    lng: -98.5795,
    label: "IdeaFlow AI · DevelopersDoc",
  },
] as const;

export const stats = [
  {
    value: "2+",
    label: "Years shipping production systems",
    detail:
      "Full-stack ownership across Next.js, Node, PostgreSQL, and enterprise workflow platforms.",
  },
  {
    value: "12+",
    label: "Platforms designed and delivered",
    detail:
      "From audit engagement software to RAG legal search and multilingual booking systems.",
  },
  {
    value: "3",
    label: "Practice areas, one standard",
    detail:
      "Web engineering, applied AI, and SAP-adjacent enterprise consultancy held to the same bar.",
  },
];

export const whyPartner = [
  {
    title: "Production-Grade Reliability",
    body: "Clean, thoroughly tested, enterprise-ready source code with observability, RBAC, and MFA baked in from day one.",
    kind: "stack" as const,
  },
  {
    title: "Performance First Mindset",
    body: "Core Web Vitals, ultra-fast render paths, and aggressive asset optimization on every critical user journey.",
    kind: "wave" as const,
  },
  {
    title: "Scalable Cloud Architecture",
    body: "Secure APIs, containerized deployments, and data pipelines designed to grow with load — not collapse under it.",
    kind: "cloud" as const,
  },
  {
    title: "Business-Driven Decisions",
    body: "Cross-functional alignment, clear technical communication, and product strategy that ships outcomes — not theatre.",
    kind: "globe" as const,
  },
];

export const experience = [
  {
    company: "Fauji Fertilizer Company",
    role: "Information Technology Officer",
    dates: "Jul 2026 — Present",
    location: "Lahore",
    bullets: [
      "Own internal systems work at a listed manufacturing enterprise, spanning workflow, reporting, and SAP-adjacent operations.",
      "Mentor incoming engineers on SAP S/4HANA process literacy so software decisions stay tied to how the business actually runs.",
    ],
  },
  {
    company: "Haraik Global Associates",
    role: "Full-Stack Software Engineer",
    dates: "Jan 2026 — Present",
    location: "Islamabad",
    bullets: [
      "Lead end-to-end delivery of audit-ready internal management systems: RBAC, MFA, document workflows, and operational dashboards.",
      "Introduce RAG, vector search, and LLM assistance into firm workflows without sacrificing auditability.",
    ],
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    dates: "2024 — Present",
    location: "Remote",
    bullets: [
      "Build and ship client products end-to-end — Next.js, React, Node.js, and PostgreSQL — from architecture through deployment.",
      "Deliver production work across booking platforms, AI tooling, and documentation systems for startups and operators who need reliable delivery without a full in-house team.",
    ],
  },
  {
    company: "Metavision IT",
    role: "Software Engineer",
    dates: "Dec 2025 — Present",
    location: "Islamabad",
    bullets: [
      "Design and ship production web applications with Next.js, React, Node.js, and PostgreSQL across frontend, backend, and infrastructure.",
    ],
  },
  {
    company: "Metavision IT",
    role: "Junior Software Developer",
    dates: "May 2025 — Dec 2025",
    location: "Islamabad",
    bullets: [
      "Took ownership of React surfaces, API logic, and data-consistency bugs while learning how production teams actually ship.",
    ],
  },
  {
    company: "My Tutor Source",
    role: "Computer Science Tutor",
    dates: "Jul 2024 — Mar 2025",
    location: "Remote · UAE students",
    bullets: [
      "Taught Cambridge O Level and A Level computer science to international students — structure, problem-solving, and exam craft.",
    ],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  tags: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  image: string;
  featured?: boolean;
  category: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ha-engagepro",
    title: "HA EngagePro",
    kicker: "Enterprise workflow OS",
    year: "2025—26",
    tags: ["Next.js", "RBAC", "Audit workflows"],
    summary:
      "A state-driven engagement platform for an audit and advisory firm — approvals, permissions, and client visibility in one system.",
    challenge:
      "Haraik needed a single operating layer for internal staff and clients. Email threads, scattered files, and informal approvals could not survive an audit.",
    approach:
      "I designed a Next.js platform around explicit state machines: roles, MFA, document trails, consultation tracking, and automated communications. Every transition is attributable.",
    outcome:
      "Partners and clients now share a live view of progress. The firm can orchestrate multi-role work without losing the paper trail that professional services demand.",
    stack: ["Next.js", "PostgreSQL", "RBAC", "MFA", "CI/CD"],
    image: "/images/case-engagepro.png",
    featured: true,
    category: "Web Design",
  },
  {
    slug: "malta-rentals",
    title: "Explore Malta Rentals",
    kicker: "Multilingual booking platform",
    year: "2026",
    tags: ["Next.js", "NestJS", "Payments"],
    summary:
      "A hybrid booking system for Malta mobility — custom UI, channel-manager sync, dynamic pricing, and Stripe checkout.",
    challenge:
      "A growing rental operator needed to sell in EN/ES/DE without overbooking across third-party channels.",
    approach:
      "I architected a Next.js storefront with a NestJS + PostgreSQL core: seasonal rates, add-ons, role-based admin, and inventory sync designed to sit beside Xola rather than fight it.",
    outcome:
      "Operators get a branded booking path and a single source of availability. Guests get a fast, multilingual checkout that feels local, not bolted on.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "i18n"],
    image: "/images/case-malta.png",
    category: "Product Engineering",
  },
  {
    slug: "legal-intelligence",
    title: "Agentic Legal Research",
    kicker: "Citation-backed RAG",
    year: "2025",
    tags: ["RAG", "LLMs", "Legal tech"],
    summary:
      "An agentic question-answering system over Pakistan higher-court judgments — conversational research with citations, not vibes.",
    challenge:
      "Case law research is slow, keyword-brittle, and easy to hallucinate if you drop a raw LLM on a PDF pile.",
    approach:
      "I built a retrieval pipeline over judicial datasets, then wrapped it in an agentic loop that answers in seconds and must show its sources. Precision over poetry.",
    outcome:
      "Legal questions become a conversation grounded in the record. The system is a working proof that enterprise RAG only matters if citations survive scrutiny.",
    stack: ["Python", "Vector search", "RAG", "LangChain", "LLMs"],
    image: "/images/case-legal.png",
    category: "AI Systems",
  },
  {
    slug: "ideaflow-ai",
    title: "IdeaFlow AI",
    kicker: "Niche-aware SaaS",
    year: "2025",
    tags: ["Next.js", "Gemini", "SaaS"],
    summary:
      "A full-stack SaaS that generates niche-specific AI responses with auth, history, and a production Vercel deploy.",
    challenge:
      "Generic prompt boxes waste users. People needed a workspace that remembered context and spoke their domain.",
    approach:
      "Next.js 14, PostgreSQL, Clerk auth, prompt history, and Gemini for generation — designed as a real product, not a weekend demo.",
    outcome:
      "A responsive AI workspace with session memory and a clean path from idea to stored output.",
    stack: ["Next.js", "PostgreSQL", "Clerk", "Gemini", "Vercel"],
    image: "/images/case-ideaflow.png",
    category: "AI Product",
  },
  {
    slug: "sonic-lipsync",
    title: "Sonic Lipsync AI",
    kicker: "Generative video",
    year: "2025",
    tags: ["Hugging Face", "Gradio", "Video"],
    summary:
      "A cloud Gradio app that lip-syncs video from audio using the Sonic model — no local GPU theatre required.",
    challenge:
      "Running modern lipsync models locally is a non-starter for most collaborators.",
    approach:
      "I packaged Sonic behind a Colab-hosted Gradio interface with Hugging Face weights so anyone can generate from a browser.",
    outcome:
      "A practical generative-video tool that others can actually run. The public repo remains one of my most-starred experiments.",
    stack: ["Python", "Gradio", "Hugging Face", "Colab"],
    image: "/images/case-sonic.png",
    category: "Applied AI",
  },
  {
    slug: "developersdoc",
    title: "DevelopersDoc",
    kicker: "Docs that stay honest",
    year: "2025",
    tags: ["AI", "Docs", "DX"],
    summary:
      "A developer platform for creating and syncing documentation with code, built to reduce drift between what ships and what is written.",
    challenge:
      "Documentation dies the moment the code moves. Teams inherit fiction.",
    approach:
      "I designed a workflow where docs live next to the system they describe, with AI assistance for catching drift rather than generating more of it.",
    outcome:
      "A working thesis: documentation is an engineering surface, not a marketing afterthought.",
    stack: ["Next.js", "AI assistance", "Git-synced content"],
    image: "/images/journal-lattice.png",
    category: "Developer Tools",
  },
];

export const journal = [
  {
    slug: "rag-in-the-enterprise",
    title:
      "Designing beyond aesthetics: how retrieval strategy shapes useful AI",
    excerpt:
      "Most RAG failures are ingestion failures. A field note from building citation-backed legal search and firm-internal assistants.",
    date: "12 Aug 2026",
    read: "8 min",
    image: "/images/journal-lattice.png",
    tags: ["AI", "RAG", "Enterprise"],
    body: [
      "The first time I watched a language model invent a court citation, I stopped treating retrieval as a plumbing detail. The answer was fluent. It was also wrong in a way that would have embarrassed a junior associate and, in the wrong context, created liability.",
      "Enterprise AI is not a prompt. It is a system of records, permissions, and failure modes. When I built an agentic research layer over Pakistan higher-court judgments, the interesting work was not the chat UI. It was chunking, metadata, and the discipline of refusing to speak without a source.",
      "The same pattern showed up inside professional-services workflows. An audit firm does not want a clever intern in a box. It wants a system that can draft, search, and route — then leave a trail. Retrieval-augmented generation is useful there only if the corpus is trustworthy and the model is not allowed to bluff.",
      "I now start every AI conversation with three questions. What is the source of truth? Who is allowed to see it? What happens when the model is uncertain? If those answers are vague, the interface can be beautiful and the product is still a liability.",
      "Taste still matters. Latency, empty states, and the way citations are presented decide whether people trust the tool enough to use it twice. But taste without retrieval strategy is decoration. The 2026 standard is both: systems that look considered, and answers that can survive an audit.",
    ],
  },
  {
    slug: "sap-meets-software",
    title: "SAP is a business language. Software should learn to speak it.",
    excerpt:
      "Notes from FFC on why enterprise engineering fails when it treats ERP as a black box instead of a map of how work actually moves.",
    date: "28 Jul 2026",
    read: "7 min",
    image: "/images/journal-hardware.png",
    tags: ["SAP", "Enterprise", "Product"],
    body: [
      "I did not arrive at SAP because I wanted a new logo on a résumé. I arrived because the companies that keep a country running already live inside it. At Fauji Fertilizer Company, the interesting conversations are not about frameworks. They are about order-to-cash, materials, and the quiet contracts between departments.",
      "The intern I mentored on S/4HANA put it cleanly: the value of SAP is understanding the business behind the system. That is also the value of a software engineer who can sit in those rooms. You cannot automate a process you refuse to learn.",
      "A lot of internal tools fail because they invent a second reality. A dashboard that does not map to how MM hands off to SD is not innovation. It is another reconciliation job. My bias now is to treat ERP as the grammar and to write software as a fluent sentence inside it — APIs, workflows, and AI assistants that respect the nouns the business already uses.",
      "This is unfashionable work. It is also where reliability is decided. The next decade of AI in manufacturing and professional services will not be won by the team with the flashiest demo. It will be won by the team that can put a model next to a ledger without breaking either.",
      "That is the consultancy I want to practice: translation. Business process into software. Software into something a plant, a partner, or a farmer can actually use.",
    ],
  },
];

export const videoTestimonials = [
  {
    name: "Farooq Sheikh",
    title: "Co-Founder, HarAik",
    quote:
      "Zakir turned a messy internal process into a product that partners actually open every morning. The attention to state, security, and pacing is rare.",
    image: "/images/testimonial-farooq-color.png",
  },
  {
    name: "Arsalan Azhar",
    title: "Engagement Partner, HarAik Global Associates",
    quote:
      "Zakir did not hand us a prototype. He handed us an operating system we could defend in an audit.",
    image: "/images/testimonial-arsalan-color.png",
  },
  {
    name: "Sania Tahir",
    title: "Project Manager, HarAik Global Associates",
    quote:
      "He treats performance and permissions as product features, not as chores for later.",
    image: "/images/testimonial-sania-color.png",
  },
];

export const writtenTestimonials = [
  {
    name: "Daren",
    role: "Explore Malta Rentals",
    quote:
      "Zakir turned a messy internal process into a product that partners actually open every morning. The attention to state, security, and pacing is rare.",
    image: "/images/illus-daniel.png",
  },
  {
    name: "Omar Haddad",
    role: "Product Lead, Taleemabad",
    quote:
      "He is the engineer you want in the room when AI meets a real workflow. No theatre, just systems that hold.",
    image: "/images/illus-omar.png",
  },
];

export const services = [
  {
    title: "Web platforms",
    body: "Production Next.js and Node systems — dashboards, booking, auth, and the unglamorous work that keeps them honest.",
  },
  {
    title: "Applied AI",
    body: "RAG, agents, and LLM features that sit on real data with citations, permissions, and an exit ramp when the model is unsure.",
  },
  {
    title: "SAP consultancy",
    body: "Translation between S/4HANA process reality and the software, integrations, and AI you actually want to run beside it.",
  },
];

export const education = {
  school: "Quaid-i-Azam University, Islamabad",
  degree: "BS Computer Science",
  years: "2021 — 2025",
};

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Python",
  "LangChain",
  "RAG",
  "SAP S/4HANA",
  "Docker",
  "CI/CD",
  "Stripe",
];
