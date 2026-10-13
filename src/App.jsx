import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Freelance from './pages/Freelance'
import useTheme from './hooks/useTheme'
import useActiveSection from './hooks/useActiveSection'
import { navLinks } from './data/portfolio'

// On every page change: jump to the #section if the URL has one, otherwise to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 64) })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// The normal portfolio page. The active-section tracker only runs here,
// because the freelance page does not have these sections.
function Home({ dark, onToggleTheme }) {
  const ids = useMemo(() => navLinks.map((l) => l.id), [])
  const active = useActiveSection(ids)

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-cyan focus:px-3 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <Navbar active={active} dark={dark} onToggleTheme={onToggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { dark, toggle } = useTheme()

    // Counts every click on the resume (any link to a .pdf file): Hero, navbar and contact buttons.
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.('a[href$=".pdf"]')
      if (!link) return
      window.gtag?.('event', 'resume_download', { link_url: link.href })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home dark={dark} onToggleTheme={toggle} />} />
        <Route path="/freelance" element={<Freelance dark={dark} onToggleTheme={toggle} />} />
        {/* any unknown address goes back to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}