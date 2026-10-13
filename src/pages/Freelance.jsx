import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Building2,
  Check,
  Code2,
  Copy,
  LayoutDashboard,
  Layers,
  Mail,
  MessageCircle,
  Moon,
  Quote,
  Smartphone,
  Sparkles,
  Sun,
  Heart,
  ChevronDown,
  Send,
} from "lucide-react";
import { GithubIcon } from "../components/icons";
import {
  contact,
  freelanceProjects,
  process as workProcess,
  profile,
  services,
} from "../data/portfolio";

// ── Edit the copy for this page here ─────────────────────────────
const copy = {
  heading: "Freelance web development",
  //    heading: "Let's build a website your customers will love",
  highlight: ["love"],
  intro:
    "I build responsive websites and MERN Stack applications for small businesses and startups, from the first conversation to a live, working site.",
  servicesTitle: "What I can build for you",
  servicesIntro:
    "Pick the closest match. If your project sits between two, tell me and we will shape it together.",
  processTitle: "How we work together",
  projectsTitle: "Client work",
  projectsIntro:
    "Websites and applications I have built for clients, end to end.",
  ctaTitle: "Let's build something you will be proud of.",
  ctaText:
    "Whether it is a first website for your business or a feature your app is missing, tell me what you have in mind. I will come back with questions and a clear plan.",
  availability: "Available for new projects", // keep only if this is true; delete the line to hide the badge
  ctaPoints: [
    "A clear plan before any code is written",
    "Tested on phones, tablets and laptops",
    "You get the code, access and a walkthrough",
  ],
};

// Heading words appear one by one; the paragraph and buttons start after the last word has landed.
const WORD_DELAY = 0.16;
const HEADING_START = 0.25;
const headingWords = copy.heading.split(" ").length;
const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: HEADING_START + headingWords * WORD_DELAY + 0.1,
    },
  },
};
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Cards rise into place as they scroll into view. Cards in the same row start a beat apart.
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: (i % 3) * 0.1 },
  }),
};
const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

// Shows "example.com" from a full link; returns '' if the link is missing or invalid.
function hostOf(url) {
  try {
    return new URL(url.trim()).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// How the client feels at each step (matched by step number). Missing steps show no pill.
const stepFeelings = [
  "You feel heard",
  "You feel clear",
  "You feel excited",
  "You feel confident",
  "You feel proud",
];

// Each step rises in after the line has reached it, so the line seems to "lead" the steps.
const processStep = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.15 + i * 0.3 },
  }),
};
// services in the data file store icon names as strings; map them to real icons here
const iconMap = {
  Building2,
  Smartphone,
  Code2,
  Layers,
  LayoutDashboard,
  Sparkles,
};

const feelings = {
  "business-websites":
    "Feel proud to share your link, and confident customers will trust you.",
  responsive:
    "Stop worrying about how your site looks on someone else’s phone.",
  "static-websites":
    "Get a simple, fast website online without any complicated setup.",
  "mern-apps": "Turn “I wish my app could do this” into something real.",
  dashboards: "Manage your own content without waiting on a developer.",
  "ai-integration":
    "Add smart features that feel genuinely helpful, not gimmicky.",
};

// How each service should make the client feel: one short word, shown as a small tag.
const emotionTags = {
  "business-websites": "Confidence",
  responsive: "Peace of mind",
  "static-websites": "Simplicity",
  "mern-apps": "Excitement",
  dashboards: "Freedom",
  "ai-integration": "Wonder",
};

// true on tablets and laptops (640px and wider), false on phones
// true on tablets and laptops (640px and wider), false on phones
function useIsWide() {
  const query = "(min-width: 640px)";
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return wide;
}

// Same card design as before. On phones it shows only the service name until it is tapped.
function ServiceCard({ s, i, open, onToggle }) {
  const isWide = useIsWide();
  const expanded = isWide || open;
  const Icon = iconMap[s.icon] ?? Layers;
  const feeling = feelings[s.id];
  const panelId = `service-${s.id}`;
  const Head = isWide ? "div" : "button";

  return (
    <motion.li
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex min-w-0 flex-col rounded-3xl border border-slate-200 p-5 transition-colors hover:border-sky-700/40 sm:p-6 dark:border-slate-800 dark:hover:border-cyan/50"
    >
      {expanded && (
        <span className="grid size-12 place-items-center rounded-full bg-navy text-cyan ring-4 ring-cyan/15 transition-shadow duration-300 group-hover:ring-cyan/40 dark:bg-slate-800">
          <Icon size={21} aria-hidden="true" />
        </span>
      )}

      <h3
        className={`${expanded ? "mt-5" : ""} text-lg font-semibold leading-snug`}
      >
        <Head
          {...(!isWide && {
            type: "button",
            onClick: onToggle,
            "aria-expanded": open,
            "aria-controls": panelId,
          })}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <span>{s.title}</span>
          {!isWide && (
            <ChevronDown
              size={20}
              aria-hidden="true"
              className={`shrink-0 text-slate-500 transition-transform duration-300 dark:text-slate-400 ${open ? "rotate-180" : ""}`}
            />
          )}
        </Head>
      </h3>

      {expanded && (
        <div id={panelId} className="flex flex-1 flex-col">
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {s.problem}
          </p>

          {feeling && (
            <p className="mt-4 flex gap-2.5 rounded-2xl bg-sky-50 p-3.5 text-sm leading-relaxed text-slate-700 dark:bg-cyan/10 dark:text-slate-200">
              <Heart
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-sky-700 transition-transform duration-300 group-hover:scale-125 motion-reduce:transform-none dark:text-cyan"
              />
              <span>{feeling}</span>
            </p>
          )}

          <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5 text-sm dark:border-slate-800">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-2.5">
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-sky-700 dark:text-cyan"
                  aria-hidden="true"
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <a
            href="#fl-contact"
            className="mt-6 inline-flex min-h-11 items-center gap-2 pt-1 text-sm font-semibold text-sky-800 hover:text-sky-900 sm:mt-auto dark:text-cyan dark:hover:text-sky-300"
          >
            Let’s talk about this
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </a>
        </div>
      )}
    </motion.li>
  );
}
const hireHref =
  contact.whatsapp ||
  `mailto:${contact.email}?subject=Freelance%20project%20enquiry`;
const hireExternal = Boolean(contact.whatsapp);

const btnPrimary =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 text-sm font-semibold text-navy hover:bg-sky-300 sm:w-auto";
const btnGhost =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-semibold text-white hover:border-cyan hover:text-cyan sm:w-auto";

// Shows a heading word by word, like typing. Screen readers get the full sentence at once,
// and people who prefer reduced motion get plain text.
function TypedHeading({ text, highlight = [] }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const isHi = (w) =>
    highlight.includes(w.toLowerCase().replace(/[^a-z]/g, ""));

  if (reduce) {
    return words.map((w, i) => (
      <Fragment key={`${w}-${i}`}>
        {i > 0 && " "}
        <span className={isHi(w) ? "text-cyan italic" : undefined}>{w}</span>
      </Fragment>
    ));
  }

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            {i > 0 && " "}
            <motion.span
              className={`inline-block ${isHi(w) ? "text-cyan italic" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: HEADING_START + i * WORD_DELAY,
              }}
            >
              {w}
            </motion.span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

function SectionHead({ title, intro }) {
  return (
    <header className="mb-8 max-w-2xl sm:mb-12">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-muted dark:text-slate-400">{intro}</p>}
    </header>
  );
}

// The footer has a few links, the email and a copyright notice. The email can be copied with one tap.
const footerCircle =
  "grid size-11 place-items-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan hover:bg-cyan hover:text-navy motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const footerLinks = [
  { href: "#fl-services", label: "Services" },
  { href: "#fl-process", label: "How we work" },
  { href: "#fl-projects", label: "Client work" },
  { href: "#fl-contact", label: "Contact" },
];

// Shows the email and copies it with one tap (useful when the phone has no mail app set up)
function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available: stay quiet, the email is still visible on screen */
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 py-1.5 pl-4 pr-1.5">
      <span className="min-w-0 break-all text-sm text-slate-300">{email}</span>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-cyan hover:bg-white/10"
      >
        {copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

export default function Freelance({ dark, onToggleTheme }) {
  const [openId, setOpenId] = useState(null);
  useEffect(() => {
    const prev = document.title;
    document.title = `Freelance web developer | ${profile.name}`;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="bg-white text-navy dark:bg-navy dark:text-slate-100">
      {/* Simple header: only a way back, the theme switch and a hire button. No portfolio sections here. */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-navy/90">
        <nav
          aria-label="Freelance page"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-5 sm:px-8"
        >
          <Link
            to="/"
            className="shrink-0 font-display text-lg font-bold tracking-wide"
          >
            {profile.brand.replace(".DEV", "")}
            <span className="text-cyan">.DEV</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              aria-label="Back to portfolio"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg text-sm font-medium hover:bg-slate-500/10 sm:px-3"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span className="hidden sm:inline">Back to portfolio</span>
            </Link>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                dark ? "Switch to light theme" : "Switch to dark theme"
              }
              className="grid size-11 place-items-center rounded-lg hover:bg-slate-500/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={hireHref}
              {...(hireExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="hidden min-h-11 items-center rounded-lg bg-cyan px-4 text-sm font-semibold text-navy hover:bg-sky-300 sm:inline-flex"
            >
              Hire me
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <MotionConfig reducedMotion="user">
          <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24 lg:py-19">
            {/* background: grid, glow and soft circles */}
            <div className="hero-grid absolute inset-0" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-cyan/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full border border-cyan/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-8 size-64 rounded-full border border-cyan/15"
            />

            <motion.div
              className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              variants={heroContainer}
              initial="hidden"
              animate="show"
            >
              {/* LEFT: the invitation */}
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cyan">
                  <Heart size={13} aria-hidden="true" /> FREELANCE WEB DEVELOPER
                </p>

                <h1 className="mt-5 max-w-3xl text-balance font-hero text-4xl font-bold leading-[1.1] tracking-tight min-[400px]:text-5xl lg:text-6xl">
                  <TypedHeading
                    text={copy.heading}
                    highlight={copy.highlight}
                  />
                </h1>

                <motion.p
                  variants={heroItem}
                  className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-slate-300 sm:mt-6 sm:text-lg"
                >
                  {copy.intro}
                </motion.p>

                <motion.p
                  variants={heroItem}
                  className="mt-4 flex max-w-xl items-start gap-2.5 text-sm leading-relaxed text-slate-300 sm:text-base"
                >
                  <Heart
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-cyan"
                  />
                  <span>
                    Have an idea but not sure where to begin? That is exactly
                    where we start.
                  </span>
                </motion.p>

                <motion.div
                  variants={heroItem}
                  className="mt-8 grid gap-3 sm:flex sm:flex-wrap"
                >
                  <a
                    href={`mailto:${contact.email}?subject=Freelance%20project%20enquiry`}
                    className={btnPrimary}
                  >
                    <Mail size={16} aria-hidden="true" /> Message me about your
                    project
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <a href="#fl-services" className={btnGhost}>
                    See services
                  </a>
                  <a href="#fl-projects" className={btnGhost}>
                    See my work
                  </a>
                </motion.div>

                <motion.p
                  variants={heroItem}
                  className="mt-4 text-sm text-slate-400"
                >
                  No pressure, no commitment. Just a friendly first
                  conversation.
                </motion.p>
              </div>

              {/* RIGHT: a friendly chat preview that invites the first message */}
              <motion.div
                variants={heroItem}
                className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur sm:p-6 lg:max-w-none"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-cyan ring-2 ring-cyan/50">
                    {profile.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{profile.name}</p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400">
                      {copy.availability && (
                        <span className="relative flex size-2 shrink-0">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>
                      )}
                      {copy.availability || "Freelance web developer"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 py-5 text-sm" aria-hidden="true">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.4 }}
                    className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 leading-relaxed text-slate-100"
                  >
                    Hi! Tell me about your idea. I would love to hear it.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.3, duration: 0.4 }}
                    className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan px-4 py-2.5 font-medium leading-relaxed text-navy"
                  >
                    I need a website for my business.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.3 }}
                    className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3"
                  >
                    <span className="size-1.5 animate-bounce rounded-full bg-slate-300 motion-reduce:animate-none" />
                    <span className="size-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:150ms] motion-reduce:animate-none" />
                    <span className="size-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:300ms] motion-reduce:animate-none" />
                  </motion.div>
                </div>

                {/* looks like a message box, works as the call to action */}
                <a
                  href={hireHref}
                  {...(hireExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={
                    hireExternal
                      ? "Chat with me on WhatsApp"
                      : "Send me an email"
                  }
                  className="group flex min-h-14 items-center justify-between gap-3 rounded-full border border-cyan/60 bg-white/[0.07] py-1.5 pl-5 pr-1.5 text-sm text-slate-200 shadow-[0_0_28px_rgba(56,189,248,0.25)] transition-all hover:border-cyan hover:bg-white/10 hover:shadow-[0_0_36px_rgba(56,189,248,0.4)]"
                >
                  <span className="caret truncate">Type your message</span>
                  <span className="relative grid size-11 shrink-0 place-items-center">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 animate-ping rounded-full bg-cyan/60 motion-reduce:animate-none"
                    />
                    <span className="relative grid size-11 place-items-center rounded-full bg-cyan text-navy shadow-lg transition-transform group-hover:scale-110 motion-reduce:transform-none">
                      <Send size={18} aria-hidden="true" />
                    </span>
                  </span>
                </a>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-cyan">
                  <MessageCircle size={14} aria-hidden="true" />
                  {hireExternal
                    ? "Tap the button to chat with me on WhatsApp"
                    : "Tap the button to message me by email"}
                </p>
              </motion.div>
            </motion.div>
          </section>
        </MotionConfig>

        {/* SERVICES */}
        <MotionConfig reducedMotion="user">
          <section
            id="fl-services"
            className="scroll-mt-16 py-12 sm:py-20 lg:py-24"
          >
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
              <SectionHead
                title={copy.servicesTitle}
                intro={copy.servicesIntro}
              />
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {services.map((s, i) => (
                  <ServiceCard
                    key={s.id}
                    s={s}
                    i={i}
                    open={openId === s.id}
                    onToggle={() =>
                      setOpenId((cur) => (cur === s.id ? null : s.id))
                    }
                  />
                ))}
              </ul>

              {/* warm closing banner */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative mt-10 overflow-hidden rounded-3xl bg-navy p-6 text-center text-white sm:mt-12 sm:p-10 dark:bg-slate-900"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full border border-cyan/20"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -right-14 size-64 rounded-full border border-cyan/15"
                />
                <div className="relative mx-auto max-w-xl">
                  <h3 className="text-xl font-bold sm:text-3xl">
                    Not sure what you need yet?
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                    That is completely fine. Tell me what you are trying to
                    achieve, and we will find the right next step together.
                  </p>
                  <a
                    href="#fl-contact"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan px-8 text-sm font-semibold text-navy transition-colors hover:bg-sky-300 sm:w-auto"
                  >
                    Start a conversation{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </MotionConfig>

        {/* PROCESS: a real sequence, so numbering is meaningful here */}
        <MotionConfig reducedMotion="user">
          <section
            id="fl-process"
            className="bg-surface py-12 sm:py-20 lg:py-24 dark:bg-slate-900"
          >
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
              <SectionHead
                title={copy.processTitle}
                intro="Five simple steps, and you always know what happens next. No surprises, no confusion."
              />

              {/* Phone/tablet: vertical timeline. Laptop (lg): 5 steps in one row joined by a line. */}
              <ol className="relative grid max-w-2xl gap-6 lg:max-w-none lg:grid-cols-5 lg:gap-6">
                {workProcess.map((step, i) => {
                  const last = i === workProcess.length - 1;
                  const feeling = stepFeelings[i];
                  return (
                    <motion.li
                      key={step.title}
                      custom={i}
                      variants={processStep}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-40px" }}
                      className="group relative pl-14 lg:pl-0 lg:pt-14"
                    >
                      {/* connector to the next step: grey track, cyan line draws itself on scroll */}
                      {!last && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-6 left-5 top-10 w-px overflow-hidden bg-slate-300 dark:bg-slate-700 lg:bottom-auto lg:left-10 lg:top-5 lg:h-px lg:w-[calc(100%-1rem)]"
                        >
                          <motion.span
                            className="absolute inset-0 origin-top bg-cyan lg:hidden"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              delay: 0.35 + i * 0.3,
                            }}
                          />
                          <motion.span
                            className="absolute inset-0 hidden origin-left bg-cyan lg:block"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              delay: 0.35 + i * 0.3,
                            }}
                          />
                        </span>
                      )}

                      {/* numbered circle; the last one gets a soft pulse to say "you made it" */}
                      <span className="absolute left-0 top-0 grid size-10 place-items-center">
                        {last && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 animate-ping rounded-full bg-cyan/40 motion-reduce:animate-none"
                          />
                        )}
                        <span className="relative grid size-10 place-items-center rounded-full bg-navy font-display text-base font-bold text-cyan ring-4 ring-surface transition-shadow duration-300 group-hover:ring-cyan/30 dark:bg-slate-800 dark:ring-slate-900">
                          {i + 1}
                        </span>
                      </span>

                      {/* step card */}
                      <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 transition-colors group-hover:border-sky-700/40 sm:p-5 dark:border-slate-800 dark:bg-navy/50 dark:group-hover:border-cyan/50">
                        <h3 className="text-base font-semibold leading-snug">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600 lg:text-sm dark:text-slate-400">
                          {step.text}
                        </p>
                        {feeling && (
                          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 dark:bg-cyan/10 dark:text-cyan">
                            <Heart size={12} aria-hidden="true" /> {feeling}
                          </p>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ol>

              {/* gentle invitation after the last step */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-center sm:mt-12 sm:flex-row sm:justify-between sm:p-8 sm:text-left dark:border-slate-800 dark:bg-navy/50"
              >
                <div>
                  <p className="text-lg font-semibold sm:text-xl">
                    Step one is just a conversation.
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    No pressure, no commitment. Tell me what you have in mind.
                  </p>
                </div>
                <a
                  href="#fl-contact"
                  className="group/btn inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto dark:bg-cyan dark:text-navy dark:hover:bg-sky-300"
                >
                  Start step one
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover/btn:translate-x-1 motion-reduce:transform-none"
                  />
                </a>
              </motion.div>
            </div>
          </section>
        </MotionConfig>

        {/* PROJECTS: only the client work, no filters or portfolio extras */}
        <MotionConfig reducedMotion="user">
          <section
            id="fl-projects"
            className="scroll-mt-16 py-12 sm:py-20 lg:py-24"
          >
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
              <SectionHead
                title={copy.projectsTitle}
                intro={copy.projectsIntro}
              />

              {/* No projects yet: a friendly invitation instead of an empty gap */}
              {freelanceProjects.length === 0 && (
                <div className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-slate-300 p-6 sm:flex-row sm:items-center sm:p-8 dark:border-slate-700">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy text-cyan dark:bg-slate-800">
                    <Sparkles size={22} aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">
                      Your project could be the first one here.
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Tell me what you need and I will share relevant examples
                      and a plan.
                    </p>
                  </div>
                  <a
                    href={hireHref}
                    {...(hireExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto dark:bg-cyan dark:text-navy dark:hover:bg-sky-300"
                  >
                    <Mail size={16} aria-hidden="true" /> Tell me about it
                  </a>
                </div>
              )}

              {/* One project: wide card (preview left, text right). Otherwise a 1 / 2 / 3 column grid. */}
              <ul
                className={`grid gap-5 sm:gap-6 ${freelanceProjects.length === 1 ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}
              >
                {freelanceProjects.map((p, i) => {
                  const single = freelanceProjects.length === 1;
                  const host = hostOf(p.liveUrl || "");
                  const initials = p.title
                    .split(" ")
                    .filter(Boolean)
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  const media = p.image ? (
                    <img
                      src={p.image}
                      alt={`Screenshot of ${p.title}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 grid place-items-center bg-gradient-to-br from-navy to-slate-800 font-display text-6xl font-bold text-cyan/80"
                    >
                      {initials}
                    </span>
                  );

                  return (
                    <motion.li
                      key={p.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-60px" }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-shadow duration-300 hover:border-sky-700/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-cyan/50 dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] ${single ? "md:flex-row" : ""}`}
                    >
                      {/* PREVIEW: a small browser frame around the screenshot */}
                      <div
                        className={`flex flex-col bg-slate-100 dark:bg-slate-800 ${single ? "md:w-1/2" : ""}`}
                      >
                        <div
                          className="flex h-9 shrink-0 items-center gap-3 border-b border-slate-200 px-3.5 dark:border-slate-700"
                          aria-hidden="true"
                        >
                          <span className="flex gap-1.5">
                            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                          </span>
                          <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-0.5 text-center text-[11px] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                            {host || "Project preview"}
                          </span>
                        </div>

                        <div
                          className={`relative aspect-[16/10] overflow-hidden ${single ? "md:aspect-auto md:min-h-72 md:flex-1" : ""}`}
                        >
                          {p.liveUrl ? (
                            <a
                              href={p.liveUrl.trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Visit the ${p.title} website`}
                              className="group/media absolute inset-0 block"
                            >
                              {media}
                              <span className="absolute inset-0 grid place-items-center bg-navy/55 opacity-0 transition-opacity duration-300 group-hover/media:opacity-100 group-focus-visible/media:opacity-100">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-navy">
                                  See it live{" "}
                                  <ArrowUpRight size={16} aria-hidden="true" />
                                </span>
                              </span>
                            </a>
                          ) : (
                            media
                          )}

                          {p.client && (
                            <span className="pointer-events-none absolute left-3 top-3 max-w-[65%] truncate rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                              {p.client}
                            </span>
                          )}
                          {p.liveUrl && (
                            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white">
                              <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70 motion-reduce:animate-none" />
                                <span className="relative inline-flex size-2 rounded-full bg-white" />
                              </span>
                              Live
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                          {p.summary}
                        </p>

                        {/* Optional: what changed for the client */}
                        {p.result && (
                          <p className="mt-4 flex gap-2 rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-800 dark:text-emerald-300">
                            <Sparkles
                              size={16}
                              className="mt-0.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{p.result}</span>
                          </p>
                        )}

                        {/* Optional: client feedback */}
                        {p.testimonial?.text && (
                          <figure className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                            <Quote
                              size={18}
                              className="text-sky-700 dark:text-cyan"
                              aria-hidden="true"
                            />
                            <blockquote className="mt-2 text-sm italic leading-relaxed text-slate-700 dark:text-slate-300">
                              {p.testimonial.text}
                            </blockquote>
                            {p.testimonial.name && (
                              <figcaption className="mt-2 text-xs text-muted dark:text-slate-400">
                                {p.testimonial.name}
                              </figcaption>
                            )}
                          </figure>
                        )}

                        <ul
                          className="mt-4 flex flex-wrap gap-1.5"
                          aria-label="Technologies used"
                        >
                          {p.stack.slice(0, 6).map((t) => (
                            <li
                              key={t}
                              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>

                        {(p.liveUrl || p.sourceUrl) && (
                          <div className="mt-auto flex flex-wrap gap-2 pt-5 [&>*]:flex-1 sm:[&>*]:flex-none">
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl.trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-cyan dark:text-navy dark:hover:bg-sky-300"
                              >
                                Visit live site{" "}
                                <ArrowUpRight size={16} aria-hidden="true" />
                              </a>
                            )}
                            {p.sourceUrl && (
                              <a
                                href={p.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:border-sky-700 dark:border-slate-700 dark:hover:border-cyan"
                              >
                                <GithubIcon className="size-4" /> Source
                              </a>
                            )}
                          </div>
                        )}

                        {/* every card ends with a gentle nudge to get in touch */}
                        <a
                          href="#fl-contact"
                          className="group/cta mt-4 inline-flex min-h-11 items-center gap-2 border-t border-slate-200 pt-4 text-sm font-semibold text-sky-800 hover:text-sky-900 dark:border-slate-800 dark:text-cyan dark:hover:text-sky-300"
                        >
                          <Heart size={15} aria-hidden="true" />
                          Want something like this? Let’s talk
                          <ArrowRight
                            size={16}
                            aria-hidden="true"
                            className="transition-transform group-hover/cta:translate-x-1 motion-reduce:transform-none"
                          />
                        </a>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>

              {/* "Your project next": the call to action after the work */}
              {freelanceProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55 }}
                  className="relative mt-10 overflow-hidden rounded-3xl bg-navy p-6 text-white sm:mt-12 sm:p-10 dark:bg-slate-900"
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-cyan/20"
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -left-12 size-56 rounded-full bg-cyan/10 blur-2xl"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                    <div className="max-w-xl">
                      <p className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                        <Sparkles size={13} aria-hidden="true" /> YOUR PROJECT,
                        NEXT
                      </p>
                      <h3 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">
                        Your idea could be the next one on this page
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                        Behind every project here is someone with an idea, just
                        like you. Tell me yours, and let’s make it real.
                      </p>
                    </div>
                    <div className="w-full shrink-0 sm:w-auto">
                      <a
                        href="#fl-contact"
                        className="group/btn inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan px-7 text-sm font-semibold text-navy transition-colors hover:bg-sky-300 sm:w-auto"
                      >
                        Share your idea
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform group-hover/btn:translate-x-1 motion-reduce:transform-none"
                        />
                      </a>
                      <p className="mt-2.5 text-center text-xs text-slate-400">
                        No pressure. Just a friendly first chat.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </MotionConfig>

        {/* CALL TO ACTION */}
        <MotionConfig reducedMotion="user">
          <section
            id="fl-contact"
            className="scroll-mt-16 bg-surface py-12 sm:py-20 lg:py-24 dark:bg-slate-900"
          >
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl bg-navy px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16"
              >
                {/* soft glow and grid behind the content */}
                <div
                  className="hero-grid absolute inset-0 opacity-50"
                  aria-hidden="true"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cyan/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-sky-500/10 blur-3xl"
                />

                <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
                  {/* LEFT: the reassurance */}
                  <div className="min-w-0">
                    {copy.availability && (
                      <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>
                        {copy.availability}
                      </p>
                    )}
                    <h2 className="mt-4 max-w-xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
                      {copy.ctaTitle}
                    </h2>
                    <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-slate-300 sm:text-base">
                      {copy.ctaText}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {copy.ctaPoints.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 text-sm text-slate-200 sm:text-[15px]"
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                            <Check
                              size={12}
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RIGHT: easy ways to get in touch */}
                  <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
                    <p className="font-display text-lg font-semibold">
                      Start the conversation
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Choose whichever is easiest for you.
                    </p>

                    <div className="mt-5 space-y-3">
                      <a
                        href={`mailto:${contact.email}?subject=Freelance%20project%20enquiry`}
                        className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 text-sm font-semibold text-navy hover:bg-sky-300"
                      >
                        <Mail size={16} aria-hidden="true" /> Email me
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                        />
                      </a>
                      {contact.whatsapp && (
                        <a
                          href={contact.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-semibold hover:border-cyan hover:text-cyan"
                        >
                          <MessageCircle size={16} aria-hidden="true" /> Chat on
                          WhatsApp
                        </a>
                      )}
                      <CopyEmail email={contact.email} />
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-slate-400">
                      Sending a message does not commit you to anything. It is
                      just a first conversation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </MotionConfig>
      </main>

      <footer className="relative bg-slate-950 text-slate-300">
        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-[1.4fr_1fr_auto] md:gap-14">
          {/* brand + warm closing line */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label={`${profile.name}, back to portfolio`}
            >
              <span className="grid size-11 place-items-center rounded-full bg-navy font-display text-sm font-bold text-cyan ring-2 ring-cyan/50">
                {profile.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <span className="font-display text-lg font-bold tracking-wide text-white">
                {profile.brand.replace(".DEV", "")}
                <span className="text-cyan">.DEV</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Freelance web developer. Have an idea? I would love to hear it,
              and help turn it into something you are proud of.
            </p>
            <a
              href="#fl-contact"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan px-5 text-sm font-semibold text-navy transition-colors hover:bg-sky-300"
            >
              Start a project
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </a>
          </div>

          {/* on-page links */}
          <nav aria-label="On this page">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              On this page
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-8 items-center text-slate-400 transition-colors hover:text-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* get in touch + back to portfolio */}
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Say hello
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`mailto:${contact.email}?subject=Freelance%20project%20enquiry`}
                aria-label="Email me"
                className={footerCircle}
              >
                <Mail size={18} aria-hidden="true" />
              </a>
              {contact.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className={footerCircle}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                </a>
              )}
            </div>
            <Link
              to="/"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan hover:text-cyan"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
              />
              Back to portfolio
            </Link>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 text-sm text-slate-500 sm:px-8">
            <div>
              <p>
                © {new Date().getFullYear()} {profile.name}
              </p>
            </div>
            <a href="#" aria-label="Back to top" className={footerCircle}>
              <ArrowUp size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
