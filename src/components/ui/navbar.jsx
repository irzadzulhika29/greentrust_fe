import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ShieldCheck, Leaf } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import { getAuthPayload } from '@/lib/utils'

// Pages that have a hero section — navbar starts transparent on these
// Value is the hero height as a fraction of viewport height
// Prefix entries (ending with *) match any path starting with that prefix
const HERO_PAGES = {
  '/': 0.8,
  '/direktori': 0.5,
  '/investor': 0.5,
  '/investor/': 0.5,
  '/passport/': 0.5,
}

const getHeroFraction = (pathname) => {
  // exact match first
  if (HERO_PAGES[pathname] !== undefined) return HERO_PAGES[pathname]
  // prefix match
  const prefixMatch = Object.keys(HERO_PAGES).find(
    (key) => key.endsWith('/') && pathname.startsWith(key)
  )
  return prefixMatch !== undefined ? HERO_PAGES[prefixMatch] : undefined
}

const menuItems = [
  { name: 'Beranda', href: '/', isRoute: true },
  { name: 'UMKM', href: '/direktori', isRoute: true },
  { name: 'Investor', href: '/investor', isRoute: true },
  { name: 'Cara Kerja', href: '#cara-kerja', isRoute: false },
]

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const heroFraction = getHeroFraction(location.pathname)
  const hasHero = heroFraction !== undefined
  const [scrolled, setScrolled] = React.useState(!hasHero)

  const authPayload = getAuthPayload()
  const isLoggedIn = !!authPayload
  const dashboardHref = authPayload?.RoleName === 'investor' ? '/investor/dashboard' : '/umkm'

  React.useEffect(() => {
    if (!hasHero) return
    const heroHeight = window.innerHeight * heroFraction
    const onScroll = () => setScrolled(window.scrollY > heroHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasHero, heroFraction])

  const navBg = scrolled
    ? 'bg-[#205336] border-[#205336]'
    : 'bg-white/10 backdrop-blur-md border-white/20'

  return (
    <header className="fixed left-0 top-0 w-full z-9999 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className={`mx-auto max-w-7xl border rounded-xl px-8 transition-colors duration-300 ${navBg}`}>
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-4 lg:gap-0">

          {/* Logo + mobile hamburger row */}
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link to="/" aria-label="Beranda" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
                <Leaf
                  className="w-3 h-3 absolute fill-white"
                  style={{ top: '6px', left: '6px' }}
                />
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">
                GreenTrust
              </span>
              <span className="text-lg text-white/70">Passport</span>
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden text-white"
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Desktop center nav links */}
          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <ul className="flex gap-8 text-sm">
              {menuItems.map((item) => {
                const isActive = item.isRoute && (
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href)
                )
                return (
                  <li key={item.name}>
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        className={`block duration-150 font-medium pb-1 border-b-2 transition-colors ${
                          isActive
                            ? 'text-white border-white'
                            : 'text-white/80 hover:text-white border-transparent'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-white/80 hover:text-white block duration-150 font-medium pb-1 border-b-2 border-transparent"
                      >
                        {item.name}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Desktop right actions + mobile dropdown */}
          <div
            className={[
              'w-full flex-wrap items-center justify-end rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-lg',
              'lg:m-0 lg:flex lg:w-fit lg:gap-3 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none',
              menuOpen ? 'flex' : 'hidden lg:flex',
            ].join(' ')}
          >
            {/* Mobile-only nav links */}
            <div className="w-full lg:hidden mb-6">
              <ul className="space-y-5 text-base">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    {item.isRoute ? (
                      <Link
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-white/80 hover:text-white block duration-150 font-medium"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-white/80 hover:text-white block duration-150 font-medium"
                      >
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth buttons */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:w-fit">
              {isLoggedIn ? (
                <PressButton
                  variant="ghost"
                  onClick={() => navigate(dashboardHref)}
                  className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
                >
                  Dashboard
                </PressButton>
              ) : (
                <PressButton
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
                >
                  Masuk atau Daftar
                </PressButton>
              )}
            </div>
          </div>

        </div>
      </nav>
    </header>
  )
}

export default Navbar
