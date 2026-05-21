import { SlidersHorizontal } from 'lucide-react'
import PortfolioCard from '@/features/investor/components/PortfolioCard'
import { PORTFOLIO_LIST } from '@/features/investor/constants/portfolioConstants'

const InvestorDisimpanPage = () => (
  <div className="px-8 py-8 sm:px-10 lg:px-12">
    {/* Header */}
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[2rem] font-semibold text-[#111111]">Portofolio Saya</h1>
        <p className="mt-5 text-[0.88rem] text-[#5f5a53]">
          Pantau kinerja keberlanjutan dan pengembalian dari UMKM yang Anda danai.
        </p>
      </div>
      <button
        className="flex shrink-0 items-center gap-2 rounded-xl border border-[#ddd7cd] bg-white px-4 py-2 text-[0.82rem] font-medium text-[#5f5a53] transition-colors hover:border-[#205336] hover:text-[#205336]"
        type="button"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filter
      </button>
    </div>

    {/* Portfolio grid */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PORTFOLIO_LIST.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  </div>
)

export default InvestorDisimpanPage
