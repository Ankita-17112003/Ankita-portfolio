import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, onOpen }) {
  
  const { title, description, tags = [], image, alt ,liveUrl } = project
  // Image ka path galat ho ya file na mile, toh toota hua icon dikhane ke bajaye sundar placeholder dikhao
  const [failed, setFailed] = useState(false)
  const showImage = image && !failed
  const initials = title
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Open details for ${title}`}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-cyan/40 bg-slate-900/70 text-left shadow-lg shadow-black/25 outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] focus-visible:ring-2 focus-visible:ring-cyan active:scale-[0.99] active:border-cyan motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 lg:border-white/10 lg:bg-white/5 lg:shadow-none"
    >
      {/* Browser-jaisa frame: screenshot ko ek asli website ki tarah dikhata hai */}
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/10 bg-slate-900 px-3" aria-hidden="true">
        <span className="size-2 rounded-full bg-slate-600" />
        <span className="size-2 rounded-full bg-slate-600" />
        <span className="size-2 rounded-full bg-slate-600" />
      </div>

      
{/* Poori screenshot dikhti hai, kuch kat'ta nahi */}
{/* Box ki height image khud tay karti hai, toh upar-neeche koi khaali jagah nahi */}
<div className="relative w-full overflow-hidden bg-slate-950">
  {showImage ? (
    <>
      <img
        src={image}
        alt={alt || `${title} screenshot`}
        loading="lazy"
        decoding="async"
        width={1440}
        height={900}
        onError={() => setFailed(true)}
        className="block h-auto w-full"
      />
      {/* patli andar ki line: image ke kinare saaf dikhte hain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
    </>
  ) : (
    <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-slate-800 to-navy" aria-hidden="true">
      <span className="font-display text-5xl font-bold tracking-wide text-cyan/80">{initials}</span>
    </div>
  )}

  {liveUrl && (
    <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-lg shadow-black/30 ring-1 ring-white/30">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-white" />
      </span>
      Live
    </span>
  )}
</div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300 sm:line-clamp-2">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-cyan">
              {t}
            </li>
          ))}
        </ul>

        {/* mt-auto: footer hamesha card ke neeche align */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 sm:mt-auto sm:pt-5">
          <span className="text-sm font-semibold">View details</span>
          <span className="grid size-10 place-items-center rounded-full bg-cyan/15 text-cyan transition-colors duration-300 group-hover:bg-cyan group-hover:text-navy group-active:bg-cyan group-active:text-navy">
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </span>
        </div>
      </div>
    </button>
  )
}