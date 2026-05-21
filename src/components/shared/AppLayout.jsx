import { Sidebar } from '@/components/ui/sidebar'

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
