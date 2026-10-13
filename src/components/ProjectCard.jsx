import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, onOpen }) {
  const { title, description, tags = [], image, alt } = project

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Open details for ${title}`}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] focus-visible:ring-2 focus-visible:ring-cyan"
    >
      {/* Screenshot: fixed 16:10, sab cards ki image same size */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-800">
        {image ? (
          <img
            src={image}
            alt={alt || `${title} screenshot`}
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
            Preview coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-cyan">
              {t}
            </li>
          ))}
        </ul>

        {/* mt-auto: footer hamesha card ke neeche align */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm font-semibold">View details</span>
          <span className="grid size-9 place-items-center rounded-full bg-cyan/15 text-cyan transition-colors duration-300 group-hover:bg-cyan group-hover:text-navy">
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </button>
  )
}