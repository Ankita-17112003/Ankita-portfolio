import { ArrowUp } from 'lucide-react'
import { navLinks, profile, socials } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './icons'

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)

const circleBtn =
  'grid size-11 place-items-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan hover:bg-cyan hover:text-navy motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300">
      {/* thin cyan fade line on top */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_auto] md:gap-14">
        {/* brand */}
        <div>
          <a href="#home" className="inline-flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
            <span className="grid size-11 place-items-center rounded-full bg-navy font-display text-sm font-bold text-cyan ring-2 ring-cyan/50">
              {initials}
            </span>
            <span className="font-display text-lg font-bold tracking-wide text-white">
              {profile.brand.replace('.DEV', '')}
              <span className="text-cyan">.DEV</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {profile.title} based in Pune. Building responsive web applications and exploring practical AI integration.
          </p>
        </div>

        {/* links */}
        <nav aria-label="Footer">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick links</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-slate-400 transition-colors hover:text-cyan">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* social */}
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-white">Connect</p>
          <div className="mt-4 flex gap-3">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={circleBtn}>
              <GithubIcon className="size-5" />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={circleBtn}>
              <LinkedinIcon className="size-5" />
            </a>
            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <a href="#home" aria-label="Back to top" className={circleBtn}>
                <ArrowUp size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-slate-500 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
}