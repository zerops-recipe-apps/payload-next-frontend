import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-header__brand">
        <svg className="site-header__logo" viewBox="0 0 32 32" aria-hidden fill="none">
          <path
            d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        <span>Payload on Zerops</span>
      </Link>
      <p className="site-header__hint">Headless CMS demo</p>
    </header>
  )
}
