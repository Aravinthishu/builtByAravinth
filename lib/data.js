// EDIT EVERYTHING HERE. The page reads only from this file.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const D = {
  brand: "Built by Aravinth",
  name: "Aravinthan",
  email: "aravintharavinth7746@gmail.com",
  whatsapp: "9952183926", // country code + number, no + or spaces
  headline: ["I build web apps", "and products that", "people love to use."],
  intro:
    "Freelance full stack developer. I design, build and ship websites, SaaS products and AI features, from the first sketch to the live server.",
  roles: ["Web developer", "Product builder", "SaaS engineer", "AI integrator"],
  facts: [
    { k: "Based in", v: "Chennai, working with clients across India" },
    { k: "Typical project", v: "2 to 6 weeks at a fixed price" },
    { k: "Reply time", v: "Within one working day" },
    { k: "After launch", v: "30 days of free bug fixes" },
  ],
  about:
    "I'm a full stack developer who cares about how things feel as much as how they work. I take a project from idea to deployment: clear scope, clean code, fast pages and a smooth handover. You talk to me, not an agency.",
  images: {
    about: u("photo-1498050108023-c5249f4df085"),
    contact: u("photo-1522071820081-009f0129c71c"),
  },
  services: [
    { t: "Websites that sell", d: "Fast, animated, mobile-first sites for brands, studios and local businesses." },
    { t: "Web applications", d: "Dashboards, booking systems, CRMs and internal tools with secure login and roles." },
    { t: "SaaS products", d: "Multi-tenant apps with subscriptions, payments, emails and an admin panel." },
    { t: "AI features", d: "Chatbots trained on your documents, smart search and workflow automation." },
  ],
  projects: [
    {
      title: "Demo Project One",
      kind: "Website",
      year: "2026",
      blurb: "Replace this text with the problem, what you built and the result the client got.",
      stack: ["Next.js", "GSAP", "Tailwind"],
      img: u("photo-1460925895917-afdab827c52f"),
      link: "https://example.com" // put the live project URL here,
    },
    {
      title: "Demo Project Two",
      kind: "Web application",
      year: "2026",
      blurb: "Replace this text with your second case study: the goal, your role and the outcome.",
      stack: ["Django", "React", "MySQL"],
      img: u("photo-1551288049-bebda4e38f71"),
      link: "https://example.com" // put the live project URL here,
    },
  ],
  skills: ["Python", "Django", "FastAPI", "React", "Next.js", "MySQL", "Redis", "Docker", "REST APIs", "RAG and LLMs", "GSAP", "CI/CD"],
  process: [
    { when: "Day 1", t: "Talk", d: "A free call to understand your goal, budget and deadline." },
    { when: "Days 2 to 3", t: "Plan", d: "Fixed scope, timeline and price in writing. 50% advance to start." },
    { when: "Weeks 1 to 4", t: "Build", d: "A live demo link every week, so you always see real progress." },
    { when: "Final week", t: "Launch", d: "Deployment, handover, training and 30 days of support." },
  ],
  toolGroups: [
    {
      cat: "Frontend", line: "Interfaces that load fast and feel smooth.", items: [
        { n: "React", u: "Interactive apps and dashboards" }, { n: "Next.js", u: "SEO-ready sites and web apps" },
        { n: "GSAP", u: "Scroll and page animations" }, { n: "Tailwind", u: "Clean, consistent styling" },
        { n: "Figma", u: "UI/UX design, wireframes, and web prototypes" },
      ]
    },
    {
      cat: "Backend", line: "Secure APIs that handle real traffic.", items: [
        { n: "Django", u: "Full products with admin panels" }, { n: "FastAPI", u: "Fast, modern APIs" },
        { n: "REST APIs", u: "Clean contracts for web and mobile" }, { n: "Celery", u: "Background jobs and emails" }]
    },
    {
      cat: "Data", line: "Storage that stays quick as you grow.", items: [
        { n: "MySQL", u: "Orders, users and transactions" }, { n: "Redis", u: "Caching and queues" },
        { n: "ChromaDB", u: "Search by meaning, not keywords" }]
    },
    {
      cat: "AI", line: "Practical AI that saves your team time.", items: [
        { n: "RAG", u: "Chatbots trained on your documents" }, { n: "LLM APIs", u: "Summaries, replies, automation" },
        { n: "Embeddings", u: "Smart search across your content" }]
    },

    {
      cat: "Launch",
      line: "Deployed, monitored and easy to update.",
      items: [
        { n: "Docker", u: "Consistent environments and deployment" },
        { n: "GitHub Actions", u: "Automated testing and deployment" },
        { n: "Nginx", u: "Production web serving and reverse proxy" },
        { n: "Vercel", u: "Frontend hosting and deployments" },
        { n: "Hostinger", u: "Web hosting and server management" },
        { n: "Domain Management", u: "Domain registration, DNS, and SSL setup" },
        { n: "DigitalOcean", u: "Cloud servers and backend deployment" },
      ],
    }

  ],
  testimonials: [
    {
      hl: "Delivered within our tight 3-day deadline, exactly as promised.",
      q: "I had a great experience working with Aravindhan on my company website, Aakash Power Engineering. He delivered the website within our tight 3-day deadline, exactly as promised, and also helped us with domain linking and hosting setup.\n\nWhat I really appreciate about his work is his patience and flexibility. He is always open to new ideas, creative suggestions, and revisions, no matter how small they may be. He never hesitates to make adjustments to ensure the final result meets our expectations.\n\nHis commitment to timely delivery, willingness to listen, and customer-friendly approach made the entire process smooth and hassle-free.\n\nI would definitely recommend Aravindhan to anyone looking to build a website. If you want someone reliable, creative, and easy to work with, he’s a great choice!",
      by: "Aakash",
      role: "Aakash Power Engineering",
    },
    {
      hl: "Add the one-line highlight from your second client here.",
      q: "Add your second client testimonial here.",
      by: "Client name",
      role: "Company",
    },
  ],
};
