import React from 'react'
import { Search, LayoutGrid, List, ChevronDown, RotateCcw, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import Iridescence from '@/components/ui/Iridescence'
import { UmkmCard } from '@/components/ui/card-umkm'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const SORT_OPTIONS = [
  { value: 'grs_desc', label: 'GRS tertinggi' },
  { value: 'grs_asc', label: 'GRS terendah' },
  { value: 'name_asc', label: 'Nama A–Z' },
]

function FilterCheckbox({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group py-0.5">
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors duration-150 ${
            checked ? 'bg-[#205336] border-[#205336]' : 'bg-white border-[#e5e4e0] group-hover:border-[#205336]'
          }`}
          onClick={onChange}
        >
          {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-sm text-[#111111]">{label}</span>
      </div>
      {count !== undefined && <span className="text-xs text-[#5f5a53]">{count}</span>}
    </label>
  )
}

const UmkmDirectoryPage = () => {
  const [search, setSearch] = React.useState('')
  const [selectedSectors, setSelectedSectors] = React.useState([])
  const [selectedTiers, setSelectedTiers] = React.useState([])
  const [selectedProvinces, setSelectedProvinces] = React.useState([])
  const [sort, setSort] = React.useState('grs_desc')
  const [viewMode, setViewMode] = React.useState('grid')
  const [items, setItems] = React.useState([])
  const [meta, setMeta] = React.useState(null)
  const [filters, setFilters] = React.useState({ sectors: [], provinces: [], tiers: [] })
  const [loading, setLoading] = React.useState(true)
  const debounceRef = React.useRef(null)

  const fetchData = React.useCallback(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedSectors.length) params.set('sector_ids', selectedSectors.join(','))
    if (selectedTiers.length) params.set('tiers', selectedTiers.join(','))
    if (selectedProvinces.length) params.set('provinces', selectedProvinces.join(','))
    if (sort) params.set('sort', sort)

    apiFetch(`${BASE_API}/umkms?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) {
          setItems(json.data.items ?? [])
          setMeta(json.data.meta ?? null)
          setFilters(json.data.filters ?? { sectors: [], provinces: [], tiers: [] })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [search, selectedSectors, selectedTiers, selectedProvinces, sort])

  React.useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(fetchData, search ? 300 : 0)
    return () => clearTimeout(debounceRef.current)
  }, [fetchData, search])

  const toggleItem = (list, setList, item) => {
    setList((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item])
  }

  const resetFilters = () => {
    setSearch('')
    setSelectedSectors([])
    setSelectedTiers([])
    setSelectedProvinces([])
  }

  const activeFilterCount = selectedSectors.length + selectedTiers.length + selectedProvinces.length + (search ? 1 : 0)

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      {/* Hero */}
      <div className="relative" style={{ height: '50vh' }}>
        <div className="absolute inset-0">
          <Iridescence color={[0.12549019607843137, 0.3254901960784314, 0.21176470588235294]} mouseReact={false} amplitude={0.1} speed={1.0} />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white mb-3">
                Jelajah UMKM hijau terverifikasi.
              </h1>
              <p className="text-sm text-white/70 max-w-md leading-relaxed">
                Semua UMKM di halaman ini sudah lolos ambang GRS 70 dan bukti dokumennya tercatat di blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body: sidebar + grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 w-48 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5f5a53]" />
              <input
                type="text"
                placeholder="Cari nama, kota..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-[#e5e4e0] rounded-lg bg-white placeholder-[#5f5a53]/60 focus:outline-none focus:ring-2 focus:ring-[#205336]/30 focus:border-[#205336]"
              />
            </div>

            {/* Sektor from API */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53] mb-3">Sektor</div>
              <div className="flex flex-col gap-1.5">
                {filters.sectors.map((s) => (
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

            {/* Tier GRS from API */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53] mb-3">Tier GRS</div>
              <div className="flex flex-col gap-1.5">
                {filters.tiers.map((t) => (
                  <FilterCheckbox
                    key={t.tier}
                    label={`${t.label} (${t.min_score}–${t.max_score})`}
                    count={t.count}
                    checked={selectedTiers.includes(t.tier)}
                    onChange={() => toggleItem(selectedTiers, setSelectedTiers, t.tier)}
                  />
                ))}
              </div>
            </div>

            {/* Provinsi from API */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53] mb-3">Provinsi</div>
              <div className="flex flex-col gap-1.5">
                {filters.provinces.map((p) => (
                  <FilterCheckbox
                    key={p.name}
                    label={p.name}
                    count={p.count}
                    checked={selectedProvinces.includes(p.name)}
                    onChange={() => toggleItem(selectedProvinces, setSelectedProvinces, p.name)}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold border border-[#e5e4e0] rounded-lg text-[#111111] hover:bg-[#f4f3ec] transition-colors duration-150"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filter
            </button>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 gap-4">
              <p className="text-sm text-[#5f5a53]">
                Menampilkan{' '}
                <span className="font-semibold text-[#111111]">
                  {loading ? '...' : `${meta?.showing ?? items.length} dari ${meta?.total ?? items.length} UMKM`}
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-[#205336]"> · {activeFilterCount} filter aktif</span>
                )}
              </p>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-[#e5e4e0] rounded-lg bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#205336]/30 focus:border-[#205336] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>Urutkan: {o.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5f5a53] pointer-events-none" />
                </div>

                <div className="flex items-center border border-[#e5e4e0] rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${viewMode === 'grid' ? 'bg-[#111111] text-white' : 'bg-white text-[#5f5a53] hover:bg-[#f4f3ec]'}`}>
                    <LayoutGrid className="w-3.5 h-3.5" /> Grid
                  </button>
                  <button onClick={() => setViewMode('list')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${viewMode === 'list' ? 'bg-[#111111] text-white' : 'bg-white text-[#5f5a53] hover:bg-[#f4f3ec]'}`}>
                    <List className="w-3.5 h-3.5" /> List
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="py-24 text-center text-sm text-[#5f5a53]">Memuat UMKM...</div>
            ) : items.length === 0 ? (
              <div className="py-24 text-center text-sm text-[#5f5a53]">Tidak ada UMKM yang cocok dengan filter ini.</div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((umkm) => (
                  <UmkmCard
                    key={umkm.profile_id}
                    name={umkm.business_name}
                    category={umkm.sector_name}
                    city={umkm.city}
                    grs={umkm.grs_score}
                    tier={umkm.tier_label}
                    desc={umkm.description}
                    imageUrl={umkm.photo_url}
                    href={`/passport/${umkm.profile_id}`}
                    className="h-full"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((umkm) => (
                  <Link
                    key={umkm.profile_id}
                    to={`/passport/${umkm.profile_id}`}
                    className="flex items-center gap-4 rounded-2xl border border-[#e5e4e0] bg-white p-4 transition-shadow duration-200 hover:shadow-md"
                  >
                    <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-cover bg-center bg-[#ece8df]" style={{ backgroundImage: umkm.photo_url ? `url(${umkm.photo_url})` : undefined }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-[#111111]">{umkm.business_name}</span>
                        {umkm.tier_label && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${umkm.tier === 'unggul' ? 'bg-[#fff4d6] text-[#c47739]' : 'bg-[#e8f0eb] text-[#205336]'}`}>
                            {umkm.tier_label}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#5f5a53]">{umkm.sector_name} · {umkm.city}</div>
                      <div className="text-xs text-[#5f5a53] mt-1 truncate">{umkm.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-semibold text-[#FDA800] leading-none">{umkm.grs_score}</div>
                      <div className="text-[10px] font-semibold text-[#5f5a53] uppercase">GRS</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UmkmDirectoryPage
