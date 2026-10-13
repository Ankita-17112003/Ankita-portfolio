import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projectFilters, projects } from '../data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const INITIAL_COUNT = 6 // itne cards pehle dikhenge, baaki "Show more" se

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState(null)
  const reduce = useReducedMotion()

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )
  const shown = showAll ? visible : visible.slice(0, INITIAL_COUNT)

  const changeFilter = (f) => {
    setFilter(f)
    setShowAll(false)
  }

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(56,189,248,0.14),transparent_55%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Header: left title, right filters */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
              My <span className="text-cyan">Projects</span>
            </motion.h2>
            
          </div>

          {/* Skills ke category switcher jaisa pill group */}
          <LayoutGroup id="project-filters">
            <div
              role="group"
              aria-label="Filter projects"
              className="flex max-w-full gap-1 self-start overflow-x-auto rounded-full border border-cyan/25 bg-slate-900/70 p-2 shadow-[0_0_30px_rgba(56,189,248,0.12)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:self-auto"
            >
              {projectFilters.map((f) => {
                const active = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => changeFilter(f)}
                    aria-pressed={active}
                    className="relative min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-cyan shadow-[0_0_18px_rgba(56,189,248,0.55)]"
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        active ? 'text-navy' : 'text-slate-400 hover:text-cyan'
                      }`}
                    >
                      {f}
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Skills ke category title jaisa divider */}
        <h3 className="mt-12 flex items-center gap-3 font-display text-lg font-semibold">
          {filter === 'All' ? 'All projects' : filter}
          <span className="text-sm font-normal text-slate-400">{visible.length}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" aria-hidden="true" />
        </h3>

        <p className="sr-only" role="status">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
        </p>

        <div className="mt-6 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout={reduce ? false : 'position'}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: reduce ? 0 : Math.min(i * 0.05, 0.25),
                  layout: { type: 'spring', stiffness: 260, damping: 30 },
                }}
                className="h-full"
              >
                <ProjectCard project={p} onOpen={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center">
            <p className="font-display text-lg font-semibold">No projects tagged “{filter}” yet.</p>
            <p className="mt-1 text-sm text-slate-400">Try another technology, or browse everything.</p>
            <button
              type="button"
              onClick={() => changeFilter('All')}
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-cyan px-6 text-sm font-semibold text-navy transition-shadow hover:shadow-[0_0_18px_rgba(56,189,248,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Show all projects
            </button>
          </div>
        )}

        {visible.length > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-cyan/40 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:border-cyan hover:bg-cyan hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              {showAll ? 'Show fewer projects' : 'Show more projects'}
              <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}