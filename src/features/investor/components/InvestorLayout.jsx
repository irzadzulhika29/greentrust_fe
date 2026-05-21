import { NavLink, Outlet } from 'react-router-dom'
import { FileText, User, Globe, Heart, ShieldCheck, Leaf } from 'lucide-react'

const menuItems = [
  { label: 'Jelajah UMKM', href: '/direktori', icon: Globe },
  { label: 'UMKM Disimpan', href: '/investor/disimpan', icon: Heart, badge: 9 },
  { label: 'Proposal', href: '/investor/proposal', icon: FileText, badge: 4 },
  { label: 'Profil Publik', href: '/investor/profil', icon: User },
]

const mockUser = {
  initials: 'AP',
  name: 'Arnold Prasetyo',
  role: 'Principal',
  institution: 'EHV',
  themeFrom: '#28557c',
}

export default function InvestorLayout() {
  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-[#e5e4e0] bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#e5e4e0]">
          <div className="relative flex items-center justify-center text-[#205336]">
            <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
            <Leaf className="w-3 h-3 absolute fill-[#205336]" style={{ top: '6px', left: '6px' }} />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#111111]">GreenTrust</span>
          <span className="text-base text-[#5f5a53]">Passport</span>
        </div>

        {/* Badge */}
        <div className="px-5 py-3 border-b border-[#e5e4e0]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f0eb] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#205336]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#205336]" />
            Investor
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="flex flex-col gap-0.5">
            {menuItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#e8f0eb] text-[#205336]'
                        : 'text-[#5f5a53] hover:bg-[#f4f3ec] hover:text-[#111111]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#205336] px-1.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info */}
        <div className="border-t border-[#e5e4e0] px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-white"
              style={{ backgroundColor: mockUser.themeFrom }}
            >
              {mockUser.initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[#111111]">{mockUser.name}</div>
              <div className="text-xs text-[#5f5a53]">{mockUser.role} · {mockUser.institution}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
