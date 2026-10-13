import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Download, Mail } from 'lucide-react'
import Button from './Button'
import { GithubIcon, LinkedinIcon } from './icons'
import { profile, resume, skillGroups, socials } from '../data/portfolio'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    // min-h (not a fixed h) so a long role can wrap on narrow phones without overlapping the text below
    <p
      className="mt-4 min-h-7 font-display text-base text-cyan sm:mt-5 sm:text-lg"
      aria-label={profile.roles.join(', ')}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          aria-hidden="true"
          className="caret inline-block max-w-full break-words"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </p>
  )
}

// The stack panel mirrors the data file, so it never drifts from the Skills section.
// Shown from tablet (md) up: below the text on tablets, beside it on desktop.
function StackPanel() {
  const used = skillGroups.slice(0, 5).map((g) => [g.title, g.items.filter((s) => s.status === 'used').slice(0, 4)])
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="hidden w-full min-w-0 max-w-xl rounded-xl border border-white/10 bg-slate-900/70 shadow-xl md:block lg:max-w-none"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-slate-600" />
        <span className="size-2.5 rounded-full bg-slate-600" />
        <span className="size-2.5 rounded-full bg-slate-600" />
        <span className="ml-3 truncate font-mono text-xs text-slate-400">stack.js</span>
      </div>
      {/* overflow-x-auto: long lines scroll inside the panel instead of being clipped or widening the page */}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-slate-300 lg:p-5 lg:text-[13px]">
        <span className="text-slate-500">{'// what I build with\n'}</span>
        {'const '}<span className="text-cyan">ankita</span>{' = {\n'}
        {used.map(([title, items]) => (
          <span key={title}>
            {'  '}<span className="text-sky-200">{title.split(' ')[0].toLowerCase()}</span>
            {': ['}
            {items.map((s, k) => (
              <span key={s.name}>
                <span className="text-emerald-300">'{s.name.split(' ')[0]}'</span>
                {k < items.length - 1 ? ', ' : ''}
              </span>
            ))}
            {'],\n'}
          </span>
        ))}
        {'}'}
      </pre>
    </motion.div>
  )
}

export default function Hero() {
  return (
    // MotionConfig turns off movement animations for people who set "reduce motion" in their OS
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative overflow-hidden bg-navy pb-14 pt-24 text-white sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40"
      >
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-[1.15fr_1fr] lg:px-8">
          <motion.div className="min-w-0" variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="text-base text-slate-300 sm:text-lg">
              Hi, I'm {profile.firstName} Batwal.
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-2 text-balance break-words text-4xl font-bold leading-[1.1] tracking-tight min-[400px]:text-5xl lg:text-6xl lg:leading-[1.05]"
            >
              {profile.title}
            </motion.h1>
            <motion.div variants={item}>
              <RotatingRole />
            </motion.div>
            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-slate-300 sm:mt-6 sm:text-base"
            >
              {profile.heroText}
            </motion.p>

            {/* Buttons stack full-width on phones, sit in a row from sm up */}
            <motion.div
              variants={item}
              className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap [&>*]:w-full [&>*]:justify-center sm:[&>*]:w-auto"
            >
              <Button href="#projects">View projects</Button>
              {resume.enabled && (
                <Button href={resume.url} download={resume.fileName} variant="onNavy">
                  <Download size={16} /> Download resume
                </Button>
              )}
              <Button href="#contact" variant="onNavy">
                <Mail size={16} /> Contact me
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid size-11 place-items-center rounded-lg border border-white/15 text-slate-300 hover:border-cyan hover:text-cyan focus-visible:border-cyan focus-visible:text-cyan"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid size-11 place-items-center rounded-lg border border-white/15 text-slate-300 hover:border-cyan hover:text-cyan focus-visible:border-cyan focus-visible:text-cyan"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <span className="text-sm text-slate-400">{profile.location}</span>
            </motion.div>
          </motion.div>

          <StackPanel />
        </div>
      </section>
    </MotionConfig>
  )
}