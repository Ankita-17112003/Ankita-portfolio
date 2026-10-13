import { motion } from 'motion/react'
import Section from './Section'
import { process } from '../data/portfolio'

// Vertical on mobile, horizontal on lg+. The numbers are real: the steps are a sequence.
export default function Process() {
  return (
    <Section id="process" title="How I work" intro="A simple process, so you always know what happens next." alt>
      <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
        {process.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex gap-4 lg:block"
          >
            {/* connector line: vertical on mobile, horizontal on desktop */}
            {i < process.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-10 h-[calc(100%+2rem-2.5rem)] w-px bg-slate-300 dark:bg-slate-700 lg:left-12 lg:top-5 lg:h-px lg:w-[calc(100%-3rem+1.5rem)]"
              />
            )}
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-navy font-display font-semibold text-cyan">
              {i + 1}
            </span>
            <div className="lg:mt-5">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{step.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
