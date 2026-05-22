import React from 'react'
import { Search, ChevronDown, RotateCcw, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import Iridescence from '@/components/ui/Iridescence'
import PublicFooter from '@/components/ui/PublicFooter'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const SORT_OPTIONS = [
  { value: 'approval_rate_desc', label: 'Success rate tertinggi' },
  { value: 'portfolio_desc', label: 'Portofolio terbanyak' },
  { value: 'name_asc', label: 'Nama A–Z' },
]

const THEME_COLORS = ['#28557c', '#205336', '#7b4f2e', '#4a3d7a', '#1a5f5f']

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

const InvestorDirectoryPage = () => {
  const [search, setSearch] = React.useState('')
  const [selectedTypes, setSelectedTypes] = React.useState([])
  const [selectedSectors, setSelectedSectors] = React.useState([])
  const [selectedTickets, setSelectedTickets] = React.useState([])
  const [sort, setSort] = React.useState('approval_rate_desc')
  const [items, setItems] = React.useState([])
  const [meta, setMeta] = React.useState(null)
  const [filters, setFilters] = React.useState({ investor_types: [], focus_sectors: [], ticket_ranges: [] })
  const [loading, setLoading] = React.useState(true)
  const debounceRef = React.useRef(null)

  const fetchData = React.useCallback(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedTypes.length) params.set('investor_types', selectedTypes.join(','))
    if (selectedSectors.length) params.set('sector_ids', selectedSectors.join(','))
    if (selectedTickets.length) params.set('ticket_ranges', selectedTickets.join(','))
    if (sort) params.set('sort', sort)

    apiFetch(`${BASE_API}/investors?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) {
          setItems(json.data.items ?? [])
          setMeta(json.data.meta ?? null)
          setFilters(json.data.filters ?? { investor_types: [], focus_sectors: [], ticket_ranges: [] })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [search, selectedTypes, selectedSectors, selectedTickets, sort])

  React.useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(fetchData, search ? 300 : 0)
    return () => clearTimeout(debounceRef.current)
  }, [fetchData, search])

  const toggleItem = (list, setList, item) => {
    setList((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))
  }

  const resetFilters = () => {
    setSearch('')
    setSelectedTypes([])
    setSelectedSectors([])
    setSelectedTickets([])
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <header className="relative" style={{ height: '50vh' }}>
        <div className="absolute inset-0">
          <Iridescence color={[0.12549019607843137, 0.3254901960784314, 0.21176470588235294]} mouseReact={false} amplitude={0.1} speed={1.0} />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-12 pt-0 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mt-10 max-w-4xl text-[3.6rem] leading-none tracking-[-0.08em] text-white">
                Temui investor & buyer yang sedang mencari Anda.
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] font-normal leading-8 text-white/75">
                Klik kartu untuk lihat riwayat pekerjaan, fokus investasi, dan tiket pendanaan.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-start gap-8">
          <aside className="hidden w-52 shrink-0 border-r border-[#e5e4e0] pr-6 lg:flex lg:flex-col lg:gap-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5f5a53]" />
              <input
                type="text"
                placeholder="Cari nama, institusi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#e5e4e0] bg-[#fbfaf7] py-2 pl-8 pr-3 text-sm placeholder-[#5f5a53]/60 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
              />
            </div>

            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">Tipe Investor</div>
              <div className="flex flex-col gap-2">
                {filters.investor_types.map((t) => (
                  <FilterCheckbox
                    key={t.investor_type}
                    label={t.investor_type}
                    count={t.count}
                    checked={selectedTypes.includes(t.investor_type)}
                    onChange={() => toggleItem(selectedTypes, setSelectedTypes, t.investor_type)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">Fokus Sektor</div>
              <div className="flex flex-col gap-2">
                {filters.focus_sectors.map((s) => (
                  <FilterCheckbox
                    key={s.sector_id}
                    label={s.sector_name}
                    count={s.count}
                    checked={selectedSectors.includes(s.sector_id)}
                    onChange={() => toggleItem(selectedSectors, setSelectedSectors, s.sector_id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">Tiket Pendanaan</div>
              <div className="flex flex-col gap-2">
                {filters.ticket_ranges.map((r) => (
                  <FilterCheckbox
                    key={r.ticket_range}
                    label={r.ticket_range}
                    count={r.count}
                    checked={selectedTickets.includes(r.ticket_range)}
                    onChange={() => toggleItem(selectedTickets, setSelectedTickets, r.ticket_range)}
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
                Menampilkan{' '}
                <span className="font-semibold text-[#111111]">
                  {loading ? '...' : `${meta?.showing ?? items.length} dari ${meta?.total ?? items.length} investor`}
                </span>
              </p>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="cursor-pointer appearance-none rounded-lg border border-[#e5e4e0] bg-white py-1.5 pl-3 pr-8 text-sm text-[#111111] focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>Urutkan: {o.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5f5a53]" />
              </div>
            </div>

            {loading ? (
              <div className="py-24 text-center text-sm text-[#5f5a53]">Memuat investor...</div>
            ) : items.length === 0 ? (
              <div className="py-24 text-center text-sm text-[#5f5a53]">Tidak ada investor yang cocok dengan filter ini.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {items.map((investor, idx) => {
                  const color = THEME_COLORS[idx % THEME_COLORS.length]
                  return (
                    <Link
                      key={investor.profile_id}
                      to={`/investor/${investor.profile_id}`}
                      className="block overflow-hidden rounded-2xl border border-[#e5e4e0] bg-white shadow-[0_10px_24px_rgba(17,17,17,0.04)] transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(17,17,17,0.08)]"
                    >
                      <div className="h-2 w-full" style={{ backgroundColor: color }} />
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-[1.8rem] font-bold text-white"
                            style={{ backgroundColor: color }}
                          >
                            {investor.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[1.35rem] font-bold leading-tight text-[#20201c]">{investor.full_name}</div>
                            <div className="mt-1 text-[0.96rem] font-normal text-[#5f5a53]">
                              {investor.title} · {investor.institution_name}
                            </div>
                          </div>
                        </div>

                        {investor.focus_sectors?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {investor.focus_sectors.map((s) => (
                              <span key={s.sector_id} className="rounded-full border border-[#e5e4e0] bg-[#fbfaf7] px-2.5 py-1 text-[0.74rem] font-semibold text-[#5f5a53]">
                                {s.sector_name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]">Portofolio</div>
                            <div className="mt-1 text-[1rem] font-bold text-[#20201c]">{investor.portfolio_count}</div>
                          </div>
                          <div>
                            <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]">Approval</div>
                            <div className="mt-1 text-[1rem] font-bold text-[#20201c]">{investor.approval_rate}%</div>
                          </div>
                          {investor.ticket_range && (
                            <div>
                              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]">Tiket</div>
                              <div className="mt-1 text-[0.82rem] font-bold text-[#20201c]">{investor.ticket_range}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}

export default InvestorDirectoryPage
