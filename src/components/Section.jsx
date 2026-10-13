import { motion } from 'motion/react'

// alt = slightly tinted background so neighbouring sections read as separate bands.
export default function Section({ id, title, intro, alt = false, children }) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-20 lg:py-24 ${alt ? 'bg-surface dark:bg-slate-900' : 'bg-white dark:bg-navy'}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-muted dark:text-slate-400">{intro}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
