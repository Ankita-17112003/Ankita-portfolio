import { MotionConfig, motion } from "motion/react";
import {  ArrowRight, Briefcase, Layers, MapPin, Sparkles,Target  } from "lucide-react";
import Section from "./Section";
import { profile } from "../data/portfolio";
import { Link } from 'react-router-dom'

// Icons for the highlight pills, matched by label. Unknown labels fall back to Layers.
const highlightIcons = {
  Focus: Layers,
  Exploring: Sparkles,
  "Based in": MapPin,
};

const storyParts = [
  { label: 'What I am exploring', icon: Sparkles },
  {
    label: 'Freelance work',
    icon: Briefcase,
    link: { to: '/freelance', text: 'See my freelance services' },
  },
  { label: 'Where I am heading', icon: Target },
]

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2);

function PhotoFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      // Phones: photo shown first, centered, compact. Tablet+: sits in the right column.
      className="relative order-first mx-auto w-56 min-[400px]:w-64 sm:w-72 md:order-none md:w-full md:max-w-sm"
    >
      {/* offset cyan outline behind the photo (smaller offset on phones so it never touches the screen edge) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-cyan/70 sm:translate-x-4 sm:translate-y-4"
      />

      {/* the photo (4:5 portrait). Falls back to initials until profile.photo is set. */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy shadow-xl dark:bg-slate-800">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <span className="font-display text-6xl font-bold tracking-wide text-cyan sm:text-7xl">
              {initials}
            </span>
          </div>
        )}
        {/* soft fade at the bottom so the badge below stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy/50 to-transparent"
        />
      </div>

      {/* circular accents that tie the photo to the rest of the site */}
      <div
        aria-hidden="true"
        className="absolute -left-3 bottom-8 grid size-16 place-items-center rounded-full bg-cyan text-center font-display text-[10px] font-bold leading-tight text-navy shadow-lg ring-4 ring-white sm:-left-4 sm:bottom-10 sm:size-20 sm:text-xs dark:ring-navy"
      >
        MERN
        <br />
        Stack
      </div>
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-3 size-6 rounded-full bg-navy ring-4 ring-white sm:-right-2 sm:size-7 dark:bg-cyan dark:ring-navy"
      />
    </motion.div>
  );
}

export default function About() {
  return (
    // MotionConfig: respects the device's "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <Section id="about" title="About me">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-12 lg:gap-20">
          <div className="min-w-0">
           <div className="max-w-prose">
  {/* Bada intro */}
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-cyan">
      Who I am
    </p>
    <p className="mt-3 text-pretty text-lg font-medium leading-snug tracking-tight sm:text-2xl lg:text-[1.7rem]">
      {profile.about[0]}
    </p>
  </motion.div>

  {/* Baaki hisse: label + icon, ek patli line se jude hue */}
 {/* Baaki paragraph: seedhe text, koi icon ya label nahi */}
<div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-slate-600 sm:text-base dark:text-slate-300">
  {profile.about.slice(1).map((p, i) => (
    <motion.p
      key={p}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
      className="text-pretty"
    >
      {p}
    </motion.p>
  ))}
</div>

<Link
  to="/freelance"
  className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky-800 hover:text-sky-900 dark:text-cyan dark:hover:text-sky-300"
>
  See my freelance work
  <ArrowRight
    size={16}
    aria-hidden="true"
    className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
  />
</Link>
</div>

            <dl className="mt-5 space-y-3 sm:mt-8">
              {profile.aboutHighlights.map((h) => {
                const Icon = highlightIcons[h.label] ?? Layers;
                return (
                  // Rounded rectangle on phones so long values can wrap cleanly; full pill from sm up
                  <div
                    key={h.label}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 py-2 pl-2 pr-4 sm:gap-4 sm:rounded-full sm:pr-6 dark:border-slate-800"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-cyan dark:bg-slate-800">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs text-muted dark:text-slate-400">
                        {h.label}
                      </dt>
                      <dd className="break-words text-sm font-medium sm:text-base">
                        {h.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <PhotoFrame />
        </div>
      </Section>
    </MotionConfig>
  );
}
