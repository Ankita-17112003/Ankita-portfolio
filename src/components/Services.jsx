import { motion } from 'motion/react'
import { Building2, Smartphone, Code2, Layers, LayoutDashboard, Sparkles, Check } from 'lucide-react'
import Section from './Section'
import { contact, services } from '../data/portfolio'

const icons = { Building2, Smartphone, Code2, Layers, LayoutDashboard, Sparkles }
const list = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const card = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function Services() {
  return (
    <Section
      id="services"
      title="Services"
      intro="What I can build for your business, and the problem each one solves."
    >
      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => {
          const Icon = icons[s.icon] ?? Code2
          return (
            <motion.article
              key={s.id}
              variants={card}
              className="flex flex-col rounded-xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-navy text-cyan">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.problem}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(s.title + ' inquiry')}`}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-semibold hover:border-cyan hover:text-sky-700 dark:border-slate-600 dark:hover:text-cyan sm:mt-auto"
              >
                Discuss your project
              </a>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}
