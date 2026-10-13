import { MotionConfig, motion } from 'motion/react'
import { Briefcase, GraduationCap } from 'lucide-react'
import Section from './Section'
import { experience } from '../data/portfolio'

const icons = { work: Briefcase, education: GraduationCap }

export default function Experience() {
  return (
    // MotionConfig: respects the device's "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <Section id="experience" title="Experience and education" alt>
        <ol className="relative max-w-3xl border-l border-slate-300 dark:border-slate-700">
          {experience.map((e) => {
            const Icon = icons[e.type] ?? Briefcase
            return (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="relative pb-8 pl-7 last:pb-0 sm:pb-10 sm:pl-8"
              >
                <span className="absolute -left-4 top-0 grid size-8 place-items-center rounded-full bg-navy text-cyan ring-4 ring-surface dark:ring-slate-900">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <p className="text-[13px] text-muted sm:text-sm dark:text-slate-400">
                  {e.period}
                  {e.duration && ` (${e.duration})`}
                </p>
                <h3 className="mt-1 text-pretty break-words text-lg font-semibold leading-snug sm:text-xl">{e.role}</h3>
                <p className="break-words text-[15px] text-slate-600 sm:text-base dark:text-slate-400">{e.org}</p>
                {e.points.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {e.points.map((pt) => (
                      <li key={pt} className="break-words">
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            )
          })}
        </ol>
      </Section>
    </MotionConfig>
  )
}