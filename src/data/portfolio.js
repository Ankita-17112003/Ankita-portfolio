// ─────────────────────────────────────────────────────────────
// Single source of truth. Edit this file; components just render it.
// Anything set to null is hidden or shown as "unavailable" in the UI.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Ankita Batwal',
   photo: '/me.png',
  firstName: 'Ankita',
  brand: 'ANKITA.DEV',
  title: 'MERN Stack Developer',
  roles: ['MERN Stack Developer', 'Full Stack Developer', 'AI Integration Enthusiast'],
  location: 'Pune, Maharashtra, India',
  heroText:
    'I build responsive, user-friendly web applications with React, Node.js, Express and MongoDB, and I am exploring how AI can be integrated into them in practical ways.',
  about: [
    'I am a web developer focused on building responsive, easy-to-use applications with React, JavaScript, Node.js, Express.js and MongoDB.',
    'I am also exploring AI integration, including a locally running Ollama model connected to a React and Express app.',
    'My goal is to keep growing as a developer, build practical software, and help businesses establish and improve their online presence.',
  ],
  aboutHighlights: [
    { label: 'Focus', value: 'MERN Stack web applications' },
    { label: 'Exploring', value: 'Practical AI integration' },
    { label: 'Based in', value: 'Pune, India' },
  ],
}

export const contact = {
  email: 'batwalankita9975@gmail.com', // TODO: replace
  whatsapp: 'https://wa.me/919975239911',               
}

export const socials = {
  github: 'https://github.com/Ankita-17112003',          // TODO: replace
  linkedin: 'https://www.linkedin.com/in/ankita-batwal-552a5b230', // TODO: replace
}

// Put the PDF in /public and set enabled: true. The button stays hidden until then,
// so visitors never hit a broken download.
export const resume = {
  enabled: true,
  url: '/Ankita_Batwal_Resume.pdf',
  fileName: 'Ankita_Batwal_Resume.pdf',
}

// Only sections that exist are listed. Contact is added in Phase 3.
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

// status: 'used' = used in a project, 'learning' = currently learning
export const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML', status: 'used' },
      { name: 'CSS', status: 'used' },
      { name: 'JavaScript (ES6+)', status: 'used' },
      { name: 'React', status: 'used' },
      { name: 'Tailwind CSS', status: 'used' },
      { name: 'Responsive design', status: 'used' },
      { name: 'Next.js', status: 'learning' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', status: 'used' },
      { name: 'Express.js', status: 'used' },
      { name: 'REST APIs', status: 'used' },
      { name: 'JWT authentication', status: 'used' },
      { name: 'Nodemailer', status: 'used' },
            { name: 'Python', status: 'learning' },

    ],
  },
  { title: 'Database', items: [{ name: 'MongoDB', status: 'used' }] },
  {
    title: 'Tools',
    items: [
      { name: 'Git', status: 'used' },
      { name: 'GitHub', status: 'used' },
      { name: 'Postman', status: 'used' },
      { name: 'Axios', status: 'used' },
      { name: 'Cloudinary', status: 'used' },
      { name: 'Vercel', status: 'used' },
    ],
  },
  {
    title: 'AI and integrations',
    items: [
      { name: 'Ollama (local LLMs)', status: 'used' },
      { name: 'AI APIs', status: 'used' },
    ],
  },
]

export const projectFilters = ['All', 'MERN', 'React', 'AI']

export const projects = [
  {
    id: 'chandak-associates',
    title: 'Chandak & Associates Website',
    summary:
      'A full-stack business website for an interior design studio in Pune, with a project gallery and an admin panel to manage content.',
    problem:
      'The studio needed a professional online presence and a way to update its own projects, services and testimonials without a developer.',
    tags: ['MERN', 'React'],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Nodemailer'],
    features: [
      'Project gallery with category-based browsing and Load More',
      'Admin panel with JWT authentication',
      'Image uploads through Cloudinary, plus YouTube video links',
      'Contact form delivered by email through Nodemailer',
      'Services menu with a two-level hover interaction',
    ],
    image: '/projects/chandak.webp',     // e.g. '/projects/chandak.webp' (file in /public/projects)
    liveUrl:' https://www.chandakinterior.in',   // TODO: add the real URL
    sourceUrl: null, // TODO: add the GitHub URL (leave null if the repo is private)
  },
  {
    id: 'ai-text-assistant',
    title: 'AI Text Assistant',
    summary:
      'A chat-style React app that sends prompts through an Express backend to a locally running Ollama model.',
    problem:
      'Shows how a web app can use a local language model, so text generation works without a paid cloud API.',
    tags: ['AI', 'React', 'MERN'],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Ollama'],
    features: ['AI text generation', 'Chat history', 'Light and dark theme'],
    image: '/projects/chat-dashboard.webp',     // e.g. '/projects/chandak.webp' (file in /public/projects)
    liveUrl: null, // Needs a local Ollama server, so a public demo may not be possible.
    sourceUrl: 'https://github.com/Ankita-17112003/AI-Text-Assistance',
  },
  
]

// Timeline entries, newest first. Only add responsibilities you can stand behind in an interview.
export const experience = [
  {
    id: 'alomonx',
    type: 'work',
    role: 'Full Stack Developer Intern',
    org: 'Alomonx Technology',
    period: 'Jul 2026 – Sep 2026',
    duration: '2 months',
    points: [], // TODO: add 2-3 real responsibilities or outcomes from the internship
  },
  {
    id: 'be-computer',
    type: 'education',
    role: 'Bachelor of Engineering, Computer Engineering',
    org: 'SND College of Engineering and Research Center, Pune',
    period: '2021 – 2025',
    duration: '4 years',
    points: [],
  },
  // MERN training: add an entry here (institute, dates) if you want it on the timeline.
]

export const services = [
  {
    id: 'business-websites',
    icon: 'Building2',
    title: 'Business Website Development',
    problem: 'Your business needs a professional online presence that customers can trust.',
    deliverables: ['Multi-page responsive website', 'Contact form with email delivery', 'Deployed and ready to share'],
  },
  {
    id: 'responsive',
    icon: 'Smartphone',
    title: 'Responsive website development',
    problem: 'Your site looks broken or hard to use on phones and tablets.',
    deliverables: ['Mobile-first layouts', 'Tested across common screen sizes', 'Keyboard-friendly navigation'],
  },
   {
    id: 'static-websites',
    icon: 'Code2',
    title: 'Static website development',
    problem: 'You need a simple, fast website to share your business information, without the cost of a full application.',
    deliverables: [
      'Clean HTML, CSS and JavaScript pages',
      'Responsive layout for phones, tablets and laptops',
      'Deployed live on Vercel',
    ],
  },
  {
    id: 'mern-apps',
    icon: 'Layers',
    title: 'MERN Stack web applications',
    problem: 'You need an app with users, data and a backend, not just a static page.',
    deliverables: ['React frontend with Node and Express API', 'MongoDB data model', 'JWT-based authentication'],
  },
  {
    id: 'dashboards',
    icon: 'LayoutDashboard',
    title: 'Admin dashboards and CRUD apps',
    problem: 'You want to manage your own content or records without editing code.',
    deliverables: ['Protected admin area', 'Create, edit and delete workflows', 'Image uploads through Cloudinary'],
  },
  {
    id: 'ai-integration',
    icon: 'Sparkles',
    title: 'AI integration into web applications',
    problem: 'You want to add text generation or a chat feature to an existing product.',
    deliverables: ['Backend route that calls an AI model', 'Chat or generation interface', 'Keys kept on the server, never in the browser'],
  },
]

export const process = [
  { title: 'Understand requirements', text: 'We talk through your goals, users and content so the scope is clear before any code.' },
  { title: 'Plan the solution', text: 'I outline the pages, features and data, and agree on what is built first.' },
  { title: 'Design and develop', text: 'I build the interface and backend in small steps you can review along the way.' },
  { title: 'Test and refine', text: 'I check it on different devices, fix issues and adjust based on your feedback.' },
  { title: 'Deploy and hand over', text: 'The site goes live, and you get the code, access and a walkthrough.' },
]

export const freelanceProjects = [
  {
    id: 'client-project-1',
    client: 'Interior design studio, Pune',  // optional: client ka type ya jagah
    title: 'Interior Design Studio Website',
    summary: 'Developed a responsive full-stack interior design website to showcase projects, services, and client testimonials. Implemented an interactive project gallery, admin panel for content management, and backend API integration using the MERN stack.',
    stack: ['React', 'Node.js', 'MongoDB'],
    image: '/projects/chandak.webp',        // public/projects/ mein file rakho
    liveUrl: 'https://chandakinterior.in',          // ya null
    sourceUrl: null,                         // client ka code private hai toh null
  },
]