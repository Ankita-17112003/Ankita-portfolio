const styles = {
  primary: 'bg-cyan text-navy hover:bg-sky-300',
  outline:
    'border border-slate-300 text-navy hover:border-cyan hover:text-sky-700 dark:border-slate-600 dark:text-slate-100 dark:hover:border-cyan dark:hover:text-cyan',
  onNavy: 'border border-white/25 text-white hover:border-cyan hover:text-cyan',
}

export default function Button({ href, variant = 'primary', children, className = '', ...rest }) {
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors ${styles[variant]} ${className}`
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  )
}
