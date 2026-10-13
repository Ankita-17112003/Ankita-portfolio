import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks, profile, resume } from '../data/portfolio'

// The full link row (6 links + Freelance + Resume) needs ~1024px, so the hamburger menu now
// covers everything below `lg` (phones AND tablets).
export default function Navbar({ active, dark, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the menu and returns focus to the menu button
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // If the screen grows to desktop size, close the mobile menu
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Stop the page behind the menu from scrolling while the menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Scrolls to a section ourselves instead of relying on the browser's #hash jump.
  // The body scroll-lock is released first, so the scroll can't be cancelled, and the
  // fixed navbar's height (h-16 = 64px) is subtracted so headings don't hide under it.
  const go = (e, id) => {
    e.preventDefault()
    document.body.style.overflow = ''
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) {
      console.warn(`Navbar: no element with id="${id}". Check that navLinks ids match your section ids.`)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - 64)
    window.scrollTo({ top: target(), behavior: reduce ? 'auto' : 'smooth' })
    // keep history.state: React Router stores its own data there
    history.replaceState(history.state, '', `#${id}`)

    // On phones the page above the target can grow while we scroll (lazy images load, layout reflows),
    // which leaves us short of the section. After the scroll settles, check and correct a few times.
    let tries = 0
    const fix = () => {
      if (Math.abs(target() - window.scrollY) > 3 && tries++ < 4) {
        window.scrollTo({ top: target(), behavior: 'auto' })
        setTimeout(fix, 300)
      }
    }
    setTimeout(fix, 700)
  }

  // Over the navy hero (top of page) the bar is navy with white text in both themes.
  const overHero = !scrolled && !open
  const bar = overHero
    ? 'bg-transparent border-transparent text-white'
    : 'bg-white/90 dark:bg-navy/90 backdrop-blur border-slate-200 dark:border-slate-800 text-navy dark:text-slate-100'

  const linkCls = (id) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active === id ? 'text-sky-700 dark:text-cyan' : 'opacity-80 hover:opacity-100'
    } ${overHero && active === id ? '!text-cyan' : ''}`

  return (
    // MotionConfig: respects the device's "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${bar}`}>
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <a href="#home" onClick={(e) => go(e, 'home')} className="shrink-0 font-display text-lg font-bold tracking-wide">
            {profile.brand.replace('.DEV', '')}
            <span className="text-cyan">.DEV</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  aria-current={active === l.id ? 'page' : undefined}
                  className={linkCls(l.id)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Opens the separate freelance page */}
            <Link
              to="/freelance"
              className="hidden min-h-11 items-center rounded-lg border border-slate-400/50 px-4 text-sm font-semibold hover:bg-slate-500/10 lg:inline-flex"
            >
              Freelance
            </Link>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid size-11 place-items-center rounded-lg hover:bg-slate-500/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {resume.enabled && (
              <a
                href={resume.url}
                download={resume.fileName}
                className="hidden min-h-11 items-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-navy hover:bg-sky-300 lg:inline-flex"
              >
                <Download size={16} /> Resume
              </a>
            )}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-lg hover:bg-slate-500/10 lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <>
              {/* Dim backdrop: tap anywhere outside the menu to close it.
                  It is `absolute` (not `fixed`) because the header's blur makes it the positioning parent. */}
              <motion.div
                key="backdrop"
                aria-hidden="true"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 top-full h-dvh bg-slate-950/50 lg:hidden"
              />
              <motion.div
                key="panel"
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                // max-h + scroll: the menu stays usable on short screens (e.g. phone in landscape)
                className="relative max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white text-navy lg:hidden dark:border-slate-800 dark:bg-navy dark:text-slate-100"
              >
                <ul className="flex flex-col px-4 py-3 sm:px-6">
                  {navLinks.map((l) => (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        onClick={(e) => go(e, l.id)}
                        aria-current={active === l.id ? 'page' : undefined}
                        className={`flex min-h-12 items-center rounded-md text-base font-medium ${
                          active === l.id ? 'text-sky-700 dark:text-cyan' : ''
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li className="pt-3">
                    <Link
                      to="/freelance"
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-400/50 px-4 text-sm font-semibold"
                    >
                      Freelance services
                    </Link>
                  </li>
                  {resume.enabled && (
                    <li className="pb-2 pt-2">
                      <a
                        href={resume.url}
                        download={resume.fileName}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-navy"
                      >
                        <Download size={16} /> Download resume
                      </a>
                    </li>
                  )}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  )
}