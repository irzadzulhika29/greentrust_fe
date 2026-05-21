import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShieldCheck, Leaf } from 'lucide-react'

const menuItems = [
  { name: 'Jelajah UMKM', href: '#direktori' },
  { name: 'Cara Kerja', href: '#cara-kerja' },
  { name: 'Untuk Investor', href: '#investor' },
  { name: 'Tentang', href: '#tentang' },
]

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed left-0 top-0 w-full z-20 px-2">
      <nav
        className={[
          'mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 !max-w-4xl rounded-2xl border border-[var(--border)] backdrop-blur-lg !px-5'
            : '',
        ].join(' ')}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0">

          {/* Logo + mobile hamburger row */}
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link to="/" aria-label="Beranda" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center text-emerald-800">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
                <Leaf
                  className="w-3 h-3 absolute fill-emerald-800"
                  style={{ top: '6px', left: '6px' }}
                />
              </div>
              <span className="font-semibold text-lg tracking-tight text-[var(--text-h)]">
                GreenTrust
              </span>
              <span className="text-lg text-[var(--text)]">Passport</span>
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden text-[var(--text-h)]"
            >
              {menuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>

          {/* Desktop center nav links */}
          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <ul className="flex gap-8 text-sm">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[var(--text)] hover:text-[var(--text-h)] block duration-150 font-medium"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop right actions + mobile dropdown */}
          <div
            className={[
              'w-full flex-wrap items-center justify-end rounded-2xl border border-[var(--border)] bg-white p-6 shadow-lg',
              'lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none',
              menuOpen ? 'flex' : 'hidden lg:flex',
            ].join(' ')}
          >
            {/* Mobile-only nav links */}
            <div className="w-full lg:hidden mb-6">
              <ul className="space-y-5 text-base">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[var(--text)] hover:text-[var(--text-h)] block duration-150 font-medium"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth buttons */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:w-fit">
              {/* Login — always visible, hidden on scroll (desktop) */}
              <Link
                to="/login"
                className={[
                  'inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-h)] hover:bg-zinc-50 transition-colors',
                  isScrolled ? 'lg:hidden' : '',
                ].join(' ')}
              >
                Masuk
              </Link>

              {/* Register — always visible, hidden on scroll (desktop) */}
              <Link
                to="/register"
                className={[
                  'inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#111] hover:bg-black text-white text-sm font-medium transition-colors',
                  isScrolled ? 'lg:hidden' : '',
                ].join(' ')}
              >
                Daftarkan Bisnis
              </Link>

              {/* Get Started — only visible on desktop when scrolled */}
              <Link
                to="/register"
                className={[
                  'items-center justify-center px-4 py-2 rounded-lg bg-[#111] hover:bg-black text-white text-sm font-medium transition-colors',
                  isScrolled ? 'hidden lg:inline-flex' : 'hidden',
                ].join(' ')}
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>

        </div>
      </nav>
    </header>
  )
}

export default Navbar
