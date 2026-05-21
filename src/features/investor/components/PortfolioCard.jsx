import { TrendingUp } from 'lucide-react'
import { STATUS_STYLES } from '@/features/investor/constants/portfolioConstants'

const PortfolioCard = ({ item }) => (
  <div className="flex flex-col rounded-2xl bg-white p-5">
    {/* Top: avatar + status */}
    <div className="mb-4 flex items-start justify-between">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f0eb] text-[0.9rem] font-semibold text-[#205336]">
        {item.initials}
      </div>
      <span className={`text-[0.75rem] font-medium ${STATUS_STYLES[item.status]?.text ?? 'text-[#5f5a53]'}`}>
        {item.status}
      </span>
    </div>

    {/* Name + sector */}
    <div className="mb-4">
      <div className="text-[1rem] font-semibold text-[#111111]">{item.name}</div>
      <div className="mt-0.5 text-[0.78rem] text-[#5f5a53]">
        {item.sector} · {item.location}
      </div>
    </div>

    {/* Stats */}
    <div className="mb-4 grid grid-cols-2 gap-3">
      <div>
        <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[#8d877f]">
          Total Nilai
        </div>
        <div className="text-[0.9rem] font-semibold text-[#111111]">{item.nilai}</div>
      </div>
      <div>
        <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[#8d877f]">
          GRS Terkini
        </div>
        <div className="flex items-center gap-1 text-[0.9rem] font-semibold text-[#111111]">
          {item.grs}
          <TrendingUp className="h-3.5 w-3.5 text-[#205336]" />
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-auto flex items-center justify-between border-t border-[#f0ece4] pt-3.5">
      <span className="text-[0.75rem] text-[#8d877f]">Sejak {item.since}</span>
      <button
        className="flex items-center gap-1 text-[0.78rem] font-semibold text-[#205336] transition-colors hover:text-[#1d4f32]"
        type="button"
      >
        Lihat Detail →
      </button>
    </div>
  </div>
)

export default PortfolioCard
