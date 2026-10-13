import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { GithubIcon } from './icons'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [onClose])

  const { title, summary, problem, features, stack, liveUrl, sourceUrl } = project

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-end bg-navy/70 p-0 sm:place-items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8 dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="project-modal-title" className="text-2xl font-bold">{title}</h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="grid size-11 shrink-0 place-items-center rounded-lg hover:bg-slate-500/10"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-3 text-slate-600 dark:text-slate-400">{summary}</p>

        <h4 className="mt-6 font-display font-semibold">The problem it solves</h4>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{problem}</p>

        <h4 className="mt-6 font-display font-semibold">Key features</h4>
        {features.length ? (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-400">
            {features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        ) : (
          <p className="mt-1 text-slate-500">Feature list will be added once confirmed.</p>
        )}

        <h4 className="mt-6 font-display font-semibold">Built with</h4>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <li key={s} className="rounded bg-surface px-2 py-1 text-xs font-medium dark:bg-slate-800">{s}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-cyan px-5 text-sm font-semibold text-navy hover:bg-sky-300">
              View live demo <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="text-sm text-muted dark:text-slate-500">Demo unavailable</span>
          )}
          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-semibold hover:border-cyan dark:border-slate-600">
              <GithubIcon className="size-4" /> View source code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
