import { useState } from 'react'
import { Sidebar } from '@/components/ui/sidebar'

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar onCollapse={setCollapsed} />
      <main className={`flex-1 pt-14 md:pt-0 transition-[margin] duration-300 ease-in-out ${collapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {children}
      </main>
    </div>
  )
}

export default AppLayout
