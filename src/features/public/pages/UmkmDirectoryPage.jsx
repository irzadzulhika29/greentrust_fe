import React from 'react'
import { Search, LayoutGrid, List, ChevronDown, RotateCcw, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import Iridescence from '@/components/ui/Iridescence'
import { UmkmCard } from '@/components/ui/card-umkm'
import { publicUmkmList } from '@/features/public/data/publicUmkmData'

const SECTORS = [
  { label: 'Tekstil & Batik', count: 23 },
  { label: 'Kerajinan', count: 31 },
  { label: 'Agrikultur', count: 28 },
  { label: 'Kuliner', count: 22 },
  { label: 'Ritel', count: 14 },
  { label: 'Jasa', count: 6 },
  { label: 'Lainnya', count: 4 },
]

const PROVINCES = ['DI Yogyakarta', 'Jawa Barat', 'Jawa Tengah', 'NTT', 'Sulsel']

const SORT_OPTIONS = [
  { value: 'grs-desc', label: 'GRS tertinggi' },
  { value: 'grs-asc', label: 'GRS terendah' },
  { value: 'name-asc', label: 'Nama A–Z' },
  { value: 'since-asc', label: 'Paling lama' },
]

// ---------------------------------------------------------------------------
// Checkbox filter item
// ---------------------------------------------------------------------------
function FilterCheckbox({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group py-0.5">
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors duration-150 ${
            checked
              ? 'bg-[#205336] border-[#205336]'
              : 'bg-white border-[#e5e4e0] group-hover:border-[#205336]'
          }`}
          onClick={onChange}
        >
          {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
        </div>
        <span className="text-sm text-[#111111]">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-[#5f5a53]">{count}</span>
      )}
    </label>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
const UmkmDirectoryPage = () => {
  const [search, setSearch] = React.useState('')
  const [selectedSectors, setSelectedSectors] = React.useState(['Tekstil & Batik', 'Agrikultur'])
  const [selectedTiers, setSelectedTiers] = React.useState([])
  const [selectedProvinces, setSelectedProvinces] = React.useState([])
  const [sort, setSort] = React.useState('grs-desc')
  const [viewMode, setViewMode] = React.useState('grid')

  const toggleItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    )
  }

  const resetFilters = () => {
    setSearch('')
    setSelectedSectors([])
    setSelectedTiers([])
    setSelectedProvinces([])
  }

  const activeFilterCount =
    selectedSectors.length + selectedTiers.length + selectedProvinces.length + (search ? 1 : 0)

  const filtered = publicUmkmList.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.city.toLowerCase().includes(search.toLowerCase())) return false
    if (selectedSectors.length && !selectedSectors.includes(u.category)) return false
    if (selectedTiers.length && !selectedTiers.includes(u.tier)) return false
    if (selectedProvinces.length && !selectedProvinces.includes(u.province)) return false
    return true
  }).sort((a, b) => {
    if (sort === 'grs-desc') return b.grs - a.grs
    if (sort === 'grs-asc') return a.grs - b.grs
    if (sort === 'name-asc') return a.name.localeCompare(b.name)
    if (sort === 'since-asc') return a.since - b.since
    return 0
  })

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      {/* Hero */}
      <div className="relative" style={{ height: '50vh' }}>
        {/* Iridescence background */}
        <div className="absolute inset-0">
          <Iridescence
            color={[0.12549019607843137, 0.3254901960784314, 0.21176470588235294]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="mt-20 text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white mb-3">
                Jelajah UMKM hijau terverifikasi.
              </h1>
              <p className="text-sm text-white/70 max-w-md leading-relaxed">
                Semua UMKM di halaman ini sudah lolos ambang GRS 70 dan bukti dokumennya tercatat
                di blockchain. Klik card untuk lihat profil lengkap dan hubungi via WhatsApp.
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
            {/* Search */}
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

            {/* Sektor */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53] mb-3">Sektor</div>
              <div className="flex flex-col gap-1.5">
                {SECTORS.map((s) => (
                  <FilterCheckbox
                    key={s.label}
                    label={s.label}
                    count={s.count}
                    checked={selectedSectors.includes(s.label)}
                    onChange={() => toggleItem(selectedSectors, setSelectedSectors, s.label)}
                  />
                ))}
              </div>
            </div>

            {/* Tier GRS */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53] mb-3">Tier GRS</div>
              <div className="flex flex-col gap-1.5">
                <FilterCheckbox
                  label="★ Unggul (85–100)"
                  checked={selectedTiers.includes('Unggul')}
                  onChange={() => toggleItem(selectedTiers, setSelectedTiers, 'Unggul')}
                />
                <FilterCheckbox
                  label="✓ Siap (70–84)"
                  checked={selectedTiers.includes('Siap')}
                  onChange={() => toggleItem(selectedTiers, setSelectedTiers, 'Siap')}
                />
              </div>
              <p className="mt-2 text-[10px] text-[#5f5a53] leading-relaxed">
                Filter tier eksklusif tersedia setelah login sebagai investor
              </p>
            </div>

            {/* Provinsi */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53] mb-3">Provinsi</div>
              <div className="flex flex-col gap-1.5">
                {PROVINCES.map((p) => (
                  <FilterCheckbox
                    key={p}
                    label={p}
                    checked={selectedProvinces.includes(p)}
                    onChange={() => toggleItem(selectedProvinces, setSelectedProvinces, p)}
                  />
                ))}
              </div>
            </div>

            {/* Reset */}
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
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-4">
              <p className="text-sm text-[#5f5a53]">
                Menampilkan{' '}
                <span className="font-semibold text-[#111111]">{filtered.length} dari {publicUmkmList.length} UMKM</span>
                {activeFilterCount > 0 && (
                  <span className="text-[#205336]"> · {activeFilterCount} filter aktif</span>
                )}
              </p>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Sort */}
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

                {/* View toggle */}
                <div className="flex items-center border border-[#e5e4e0] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                      viewMode === 'grid'
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-[#5f5a53] hover:bg-[#f4f3ec]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" /> Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                      viewMode === 'list'
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-[#5f5a53] hover:bg-[#f4f3ec]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" /> List
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="py-24 text-center text-sm text-[#5f5a53]">
                Tidak ada UMKM yang cocok dengan filter ini.
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((umkm) => (
                  <UmkmCard
                    key={umkm.id}
                    name={umkm.name}
                    category={umkm.category}
                    city={umkm.city}
                    grs={umkm.grs}
                    tier={umkm.tier}
                    since={umkm.since}
                    employees={umkm.employees}
                    desc={umkm.desc}
                    imageUrl={umkm.imageUrl}
                    themeColor={umkm.themeColor}
                    href={`/passport/${umkm.slug}`}
                    className="h-full"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((umkm) => (
                  <Link
                    key={umkm.id}
                    to={`/passport/${umkm.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-[#e5e4e0] bg-white p-4 transition-shadow duration-200 hover:shadow-md"
                  >
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${umkm.imageUrl})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-[#111111]">{umkm.name}</span>
                        {umkm.tier === 'Unggul' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#fff4d6] text-[#c47739]">Unggul</span>
                        )}
                        {umkm.tier === 'Siap' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e8f0eb] text-[#205336]">Siap</span>
                        )}
                      </div>
                      <div className="text-xs text-[#5f5a53]">{umkm.category} · {umkm.city}</div>
                      <div className="text-xs text-[#5f5a53] mt-1 truncate">{umkm.desc}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-semibold text-[#FDA800] leading-none">{umkm.grs}</div>
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
