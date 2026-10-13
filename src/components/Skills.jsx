import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { BookOpen, Check, Database, Layers, Monitor, Server, Bot, Wrench } from 'lucide-react'
import { skillGroups } from '../data/portfolio'

// Circle icon per group, matched by title. Unknown titles fall back to Layers.
const groupIcons = {
  Frontend: Monitor,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  'AI and integrations': Bot,
}

// Decorative floating circles around the centre (the core MERN stack).
const floaters = [
  { label: 'React', pos: 'left-[12%] top-[16%]', delay: 0 },
  { label: 'Node.js', pos: 'left-[78%] top-[12%]', delay: 0.6 },
  { label: 'MongoDB', pos: 'left-[86%] top-[58%]', delay: 1.2 },
  { label: 'Tailwind', pos: 'left-[16%] top-[74%]', delay: 1.8 },
  { label: 'Express', pos: 'left-[58%] top-[90%]', delay: 2.4 },
]

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const itemVariants = { hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }

/*
  Layout (mobile first):
  - Phones:  heading -> category switcher -> skills list -> decorative visual.
             The list sits right under the switcher, so tapping an icon shows the change without scrolling.
  - Tablet:  heading -> [switcher + visual side by side] -> skills list.
  - Desktop: visual on the left, heading + skills list on the right.
  The left wrapper uses `contents` on phones so its two children join the page grid and can be reordered.
*/
export default function Skills() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const group = skillGroups[active]
  const ActiveIcon = groupIcons[group.title] ?? Layers

  return (
    // MotionConfig: respects the device's "reduce motion" setting (spin, float and slide animations stop)
    <MotionConfig reducedMotion="user">
      <section id="skills" className="relative overflow-hidden bg-navy py-16 text-white sm:py-20 lg:py-24">
        {/* soft light behind the visual */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,rgba(56,189,248,0.14),transparent_55%)]"
        />

        <div className="relative mx-auto grid w-full max-w-6xl items-start gap-y-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0 lg:px-8">
          {/* HEADING */}
          <div className="order-1 min-w-0 md:order-none lg:col-start-2 lg:row-start-1">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-3xl font-bold tracking-tight min-[400px]:text-4xl sm:text-5xl"
            >
              My <span className="text-cyan">Skills</span>
            </motion.h2>
            <p className="mt-3 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-300 sm:mt-4 sm:text-base">
              The tools I use to build responsive, user-friendly web applications. Pick a category to see what
              I use in my projects and what I am still learning.
            </p>
          </div>

          {/* LEFT: category switcher + glowing visual */}
          <div className="contents md:flex md:flex-row md:items-center md:justify-center md:gap-10 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pt-6">
            {/* Switcher: horizontal row on phones/tablets, vertical column from md up */}
            
<div className="order-2 flex flex-col items-center gap-3 md:order-none">
  <div
    role="group"
    aria-label="Skill categories"
    className="flex max-w-full flex-wrap justify-center gap-2 rounded-[2rem] border border-cyan/25 bg-slate-900/70 p-2 shadow-[0_0_30px_rgba(56,189,248,0.12)] sm:gap-3 sm:p-2.5 md:flex-col md:flex-nowrap"
  >
    {skillGroups.map((g, i) => {
      const Icon = groupIcons[g.title] ?? Layers
      const on = i === active

      return (
        <button
          key={g.title}
          type="button"
          onClick={() => {
            setActive(i)
            setTouched(true)
          }}
          aria-pressed={on}
          aria-label={g.title}
          className={`group relative grid size-11 cursor-pointer place-items-center rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
            on
              ? 'bg-cyan text-navy shadow-[0_0_18px_rgba(56,189,248,0.55)]'
              : 'text-slate-400 hover:bg-white/10 hover:text-cyan'
          }`}
        >
          {i === 1 && !on && !touched && (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping rounded-full bg-cyan/30 motion-reduce:animate-none"
            />
          )}

          <Icon size={19} aria-hidden="true" className="relative" />

          {/* Custom Tooltip */}
          <span
            aria-hidden="true"
            className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-1 rounded-lg border border-cyan/30 bg-slate-950 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan opacity-0 shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:bottom-auto md:left-full md:top-1/2 md:mb-0 md:ml-3 md:-translate-x-1 md:-translate-y-1/2 md:group-hover:translate-x-0 md:group-hover:translate-y-1/2 md:group-focus-visible:translate-x-0 md:group-focus-visible:translate-y-1/2"
          >
            {g.title}
          </span>
        </button>
      )
    })}
  </div>

  <p className="max-w-xs text-center text-xs text-slate-400 md:max-w-[8rem]">
    <span className="font-medium text-slate-200 md:hidden">
      {skillGroups[active]?.title}.{" "}
    </span>
    Tap an icon to switch category
  </p>
</div>


            {/* Decorative visual: smaller on phones, shown after the list so it never pushes content down */}
            <div
              className="relative order-4 mx-auto aspect-square w-56 min-[400px]:w-64 sm:w-72 md:order-none md:mx-0 md:w-72 lg:w-80"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-full border border-cyan/20" />
              <motion.div
                className="absolute inset-[10%] rounded-full border border-dashed border-cyan/35"
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[28%] grid place-items-center rounded-full bg-gradient-to-br from-slate-800 to-navy ring-2 ring-cyan/60 shadow-[0_0_45px_rgba(56,189,248,0.35)]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={group.title}
                    initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="text-cyan"
                  >
                    <ActiveIcon className="size-8 sm:size-11" strokeWidth={1.6} />
                  </motion.span>
                </AnimatePresence>
              </div>

              {floaters.map((f) => (
                <motion.span
                  key={f.label}
                  className={`absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/30 bg-slate-900/90 text-[10px] font-semibold text-slate-200 shadow-[0_0_20px_rgba(56,189,248,0.2)] sm:size-16 sm:text-xs ${f.pos}`}
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
                >
                  {f.label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* SKILLS of the selected category */}
          <div className="order-3 min-w-0 md:order-none lg:col-start-2 lg:row-start-2">
            <h3 className="flex items-center gap-3 font-display text-lg font-semibold lg:mt-8">
              {group.title}
              <span className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" aria-hidden="true" />
            </h3>

            <AnimatePresence mode="wait">
              <motion.ul
                key={group.title}
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3"
              >
                {group.items.map((s) => {
                  const learning = s.status === 'learning'
                  return (
                    <motion.li
                      key={s.name}
                      variants={itemVariants}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-2 pl-2 pr-4 transition-colors hover:border-cyan/50 sm:rounded-full sm:pr-5"
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-full ${
                          learning ? 'bg-slate-700 text-slate-300' : 'bg-cyan/15 text-cyan'
                        }`}
                      >
                        {learning ? <BookOpen size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
                      </span>
                      <span className="min-w-0">
                        {/* wraps instead of truncating, so long names stay readable on small screens */}
                        <span className="block break-words text-sm font-medium leading-tight">{s.name}</span>
                        <span className="block text-xs text-slate-400">
                          {learning ? 'Currently learning' : 'Used in projects'}
                        </span>
                      </span>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}