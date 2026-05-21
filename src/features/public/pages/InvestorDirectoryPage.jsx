import React from 'react'
import { Search, ChevronDown, RotateCcw, Check } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import Iridescence from '@/components/ui/Iridescence'
import {
  investorDirectoryData,
  investorSectorFocus,
  investorTicketRanges,
  investorTypes,
} from '@/features/public/data/investorDirectoryData'

const SORT_OPTIONS = [
  { value: 'approval-desc', label: 'Success rate tertinggi' },
  { value: 'portfolio-desc', label: 'Portofolio terbanyak' },
  { value: 'name-asc', label: 'Nama A–Z' },
]

const parseApproval = (value) => Number.parseInt(value.replace('%', ''), 10)
const parsePortfolio = (value) => Number.parseInt(value.replace(/\D/g, ''), 10)

function FilterCheckbox({ label, count, checked, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center justify-between gap-2 py-0.5">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-4 w-4 items-center justify-center rounded border transition-colors duration-150 ${
            checked ? 'border-[#205336] bg-[#205336]' : 'border-[#e5e4e0] bg-white group-hover:border-[#205336]'
          }`}
          onClick={onChange}
        >
          {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-sm text-[#111111]">{label}</span>
      </div>
      {count !== undefined ? <span className="text-xs text-[#5f5a53]">{count}</span> : null}
    </label>
  )
}

const typeBadgeTone = {
  VC: 'bg-white text-[#336699]',
  Buyer: 'bg-white text-[#c57f44]',
  Lender: 'bg-white text-[#3f7b58]',
  Grant: 'bg-white text-[#7b65a9]',
}

const InvestorDirectoryPage = () => {
  const [search, setSearch] = React.useState('')
  const [selectedTypes, setSelectedTypes] = React.useState(['VC', 'Lender'])
  const [selectedSectors, setSelectedSectors] = React.useState([])
  const [selectedTickets, setSelectedTickets] = React.useState([])
  const [sort, setSort] = React.useState('approval-desc')

  const toggleItem = (list, setList, item) => {
    setList((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))
  }

  const resetFilters = () => {
    setSearch('')
    setSelectedTypes([])
    setSelectedSectors([])
    setSelectedTickets([])
  }

  const filtered = investorDirectoryData
    .filter((investor) => {
      if (
        search &&
        !investor.name.toLowerCase().includes(search.toLowerCase()) &&
        !investor.institution.toLowerCase().includes(search.toLowerCase())
      ) {
        return false
      }
      if (selectedTypes.length && !selectedTypes.includes(investor.type)) return false
      if (
        selectedSectors.length &&
        !selectedSectors.some((sector) => investor.sectors.includes(sector.replace(' & Batik', '')))
      ) {
        return false
      }
      if (
        selectedTickets.length &&
        !selectedTickets.some((range) => investor.ticket.includes(range.replace('Rp ', '').replace(' – ', '–')))
      ) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sort === 'approval-desc') return parseApproval(b.approval) - parseApproval(a.approval)
      if (sort === 'portfolio-desc') return parsePortfolio(b.portfolio) - parsePortfolio(a.portfolio)
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <header className="relative" style={{ height: '50vh' }}>
        <div className="absolute inset-0">
          <Iridescence
            color={[0.12549019607843137, 0.3254901960784314, 0.21176470588235294]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mt-3 max-w-4xl text-[3.6rem] leading-none tracking-[-0.08em] text-white">
                Temui investor & buyer yang sedang mencari Anda.
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] font-normal leading-8 text-white/75">
                Klik kartu untuk lihat riwayat pekerjaan, fokus investasi, dan tiket pendanaan. Setelah
                passport Anda terbit, Anda bisa mengirim proposal langsung dari sini.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-start gap-8">
          <aside className="hidden w-52 shrink-0 border-r border-[#e5e4e0] pr-6 lg:flex lg:flex-col lg:gap-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5f5a53]" />
              <input
                type="text"
                placeholder="Cari nama, institusi..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-[#e5e4e0] bg-[#fbfaf7] py-2 pl-8 pr-3 text-sm placeholder-[#5f5a53]/60 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
              />
            </div>

            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                Tipe Investor
              </div>
              <div className="flex flex-col gap-2">
                {investorTypes.map((type) => (
                  <FilterCheckbox
                    key={type.value}
                    label={type.label}
                    count={type.count}
                    checked={selectedTypes.includes(type.value)}
                    onChange={() => toggleItem(selectedTypes, setSelectedTypes, type.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                Fokus Sektor
              </div>
              <div className="flex flex-col gap-2">
                {investorSectorFocus.map((sector) => (
                  <FilterCheckbox
                    key={sector}
                    label={sector}
                    checked={selectedSectors.includes(sector)}
                    onChange={() => toggleItem(selectedSectors, setSelectedSectors, sector)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                Tiket Pendanaan
              </div>
              <div className="flex flex-col gap-2">
                {investorTicketRanges.map((range) => (
                  <FilterCheckbox
                    key={range}
                    label={range}
                    checked={selectedTickets.includes(range)}
                    onChange={() => toggleItem(selectedTickets, setSelectedTickets, range)}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e4e0] bg-white py-2 text-sm font-semibold text-[#111111] transition-colors duration-150 hover:bg-[#f4f3ec]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset filter
            </button>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-[#5f5a53]">
                Menampilkan <span className="font-semibold text-[#111111]">{filtered.length} dari 84 investor</span>
              </p>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="cursor-pointer appearance-none rounded-lg border border-[#e5e4e0] bg-white py-1.5 pl-3 pr-8 text-sm text-[#111111] focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      Urutkan: {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5f5a53]" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center text-sm text-[#5f5a53]">
                Tidak ada investor yang cocok dengan filter ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {filtered.map((investor) => (
                  <article
                    key={investor.id}
                    className="overflow-hidden rounded-2xl border border-[#e5e4e0] bg-white shadow-[0_10px_24px_rgba(17,17,17,0.04)]"
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 text-white"
                      style={{
                        background: `linear-gradient(90deg, ${investor.themeFrom} 0%, ${investor.themeTo} 100%)`,
                      }}
                    >
                      <div className="text-[0.8rem] font-bold uppercase tracking-[0.22em]">{investor.type}</div>
                      <div className={`rounded-full px-3 py-1 text-[0.72rem] font-bold ${typeBadgeTone[investor.type]}`}>
                        {investor.type}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-[1.8rem] font-bold text-white"
                          style={{ backgroundColor: investor.themeFrom }}
                        >
                          {investor.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[1.35rem] font-bold leading-tight text-[#20201c]">
                            {investor.name}
                          </div>
                          <div className="mt-1 text-[0.96rem] font-normal text-[#5f5a53]">
                            {investor.role} • {investor.institution}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {investor.sectors.map((sector) => (
                          <span
                            key={sector}
                            className="rounded-full border border-[#e5e4e0] bg-[#fbfaf7] px-2.5 py-1 text-[0.74rem] font-semibold text-[#5f5a53]"
                          >
                            {sector}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 border-b border-dashed border-[#e5e4e0] pb-4 text-[0.95rem] font-normal leading-7 text-[#5f5a53]">
                        {investor.desc}
                      </p>

                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]">
                            Tiket
                          </div>
                          <div className="mt-1 text-[1rem] font-bold text-[#20201c]">{investor.ticket}</div>
                        </div>
                        <div>
                          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]">
                            Portofolio
                          </div>
                          <div className="mt-1 text-[1rem] font-bold text-[#20201c]">{investor.portfolio}</div>
                        </div>
                        <div>
                          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]">
                            Approval
                          </div>
                          <div className="mt-1 text-[1rem] font-bold text-[#20201c]">{investor.approval}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default InvestorDirectoryPage
