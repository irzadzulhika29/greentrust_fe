import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Briefcase, User, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import primaryLogo from '@/assets/logo/primary-def.webp'
import PressButton from '@/components/ui/PressButton'

const NAV = [
  { label: 'Dashboard', href: '/investor/dashboard', icon: LayoutDashboard },
  { label: 'Proposal', href: '/investor/proposal', icon: FileText, badge: 4 },
  { label: 'Portofolio', href: '/investor/disimpan', icon: Briefcase },
  { label: 'Profil', href: '/investor/profil', icon: User },
]

export default function InvestorLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('reg_session_token')
    navigate('/investor/login')
  }

  return (
    <div className={`flex min-h-screen bg-[#f6f2ea] transition-all duration-300`}>
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-white transition-[width] duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        {/* Toggle */}
          <button
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#5f5a53] ring-1 ring-[#e5e0d8] transition-colors hover:text-[#111111]"
            onClick={() => setCollapsed((c) => !c)}
            type="button"
          >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Logo */}
        <div
          className={`flex items-center gap-3 py-5 ${collapsed ? 'justify-center px-4' : 'px-5'}`}
        >
          <img alt="GreenTrust" className="h-8 w-8 shrink-0 object-contain" src={primaryLogo} />
          {!collapsed ? (
            <div className="text-[0.95rem] font-semibold leading-none text-[#205336]">
              GreenTrust <span className="text-[#4a4a46]">Passport</span>
            </div>
          ) : null}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center rounded-xl px-3 py-2.5 text-[0.88rem] font-medium transition-colors duration-150 ${
                      collapsed ? 'justify-center' : 'justify-between'
                    } ${
                      isActive
                        ? 'bg-[#e8f0eb] text-[#205336]'
                        : 'text-[#5f5a53] hover:bg-[#f4f3ec] hover:text-[#111111]'
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                  to={item.href}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {!collapsed ? item.label : null}
                  </div>
                  {!collapsed && item.badge ? (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1d211b] px-1.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-[#ece8df] p-4">
          <PressButton
            variant="outline"
            className="w-full !flex !items-center !justify-center !gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </PressButton>
        </div>
      </aside>

      <main
        className={`min-w-0 flex-1 transition-[margin] duration-300 ease-in-out ${
          collapsed ? 'ml-16' : 'ml-56'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
