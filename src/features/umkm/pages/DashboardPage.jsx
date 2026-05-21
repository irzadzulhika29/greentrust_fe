import {
  ArrowRight,
  Check,
  Eye,
  Hash,
  MessageSquare,
  Send,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/utils'

// Color mapping per category code — not returned by API
const CATEGORY_COLORS = {
  BB: { color: '#7a5521', tint: '#fbefd7' },
  PP: { color: '#236041', tint: '#dcebdc' },
  PL: { color: '#176174', tint: '#dff5f8' },
  EE: { color: '#6b4b12', tint: '#f7edce' },
  SK: { color: '#934f42', tint: '#fde8e3' },
  LK: { color: '#45457b', tint: '#e7e7fb' },
}

const activities = [
  { icon: Check, title: 'AI klasifikasi 2 dokumen baru', meta: 'Bahan Baku - Energi - 12 menit lalu', tone: '#4f8b5e' },
  { icon: Hash, title: '2 hash terdaftar on-chain', meta: 'tx 0x9a12...ee04 - 2 jam lalu', tone: '#4f8b5e' },
  { icon: TrendingUp, title: 'GRS naik 87 -> 90 (estimasi)', meta: 'jika 1 dok Limbah selesai - besok', tone: '#c6763b' },
  { icon: Eye, title: 'Profil dilihat 14x hari ini', meta: 'dari Pulau Jawa', tone: '#7a5521' },
  { icon: MessageSquare, title: 'Pesan WA baru dari pengunjung', meta: 'Pak Joko, PT Cintya - 4 jam lalu', tone: '#2f9f67' },
]

const StatCard = ({ label, value, footer }) => (
  <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
    <div className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[#8d877f]">{label}</div>
    <div className="mt-20 text-[3.2rem] leading-none tracking-[-0.07em] text-[#181816]">{value}</div>
    <div className="mt-3 text-[0.9rem] font-bold text-[#4f8b5e]">{footer}</div>
  </section>
)

const UmkmDashboardPage = () => {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    apiFetch(`${import.meta.env.VITE_BASE_API}/evidence/summary`, {
      headers: { Authorization: `Bearer ${token ?? ''}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) setSummary(json.data)
        else throw new Error(json?.message ?? 'Gagal memuat data')
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const grsScore = summary?.grs_score ?? 0
  const passportStatus = summary?.passport_status ?? 'draft'
  const passportThreshold = summary?.passport_threshold ?? 70
  const categories = (summary?.categories ?? []).map((cat) => ({
    ...cat,
    current: cat.fulfilled_count,
    total: cat.required_count,
    ...(CATEGORY_COLORS[cat.code] ?? { color: '#555', tint: '#eee' }),
  }))

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      <header>
        <div className="px-6 py-3 lg:px-12">
          <h1 className="m-0 text-[2.35rem] leading-none tracking-[-0.06em] text-[#181816]">
            Dashboard.
          </h1>
          <p className="mt-3 text-[0.98rem] font-medium text-[#5f5a53]">
            {loading
              ? 'Memuat data...'
              : fetchError
              ? fetchError
              : `GRS Anda saat ini: ${grsScore} / 100`}
          </p>
        </div>
      </header>

      <main className="px-6 py-7 lg:px-12">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(250px,0.9fr)_minmax(250px,0.9fr)]">
          <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="gap-6 sm:items-center">
              <div className="flex">
                <div className="relative grid h-[154px] w-[154px] place-items-center rounded-full">
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 154 154" aria-hidden="true">
                    <circle cx="77" cy="77" r="66" fill="none" stroke="#efe9df" strokeWidth="14" />
                    <circle
                      cx="77" cy="77" r="66" fill="none"
                      stroke="#c47739"
                      strokeLinecap="round"
                      strokeWidth="14"
                      strokeDasharray={`${2 * Math.PI * 66}`}
                      strokeDashoffset={`${2 * Math.PI * 66 * (1 - grsScore / 100)}`}
                    />
                  </svg>
                  <div className="relative grid h-[116px] w-[116px] place-items-center rounded-full bg-white">
                    <div className="text-center">
                      <div className="text-[2.7rem] font-black leading-none tracking-[-0.06em] text-[#080807]">
                        {loading ? '—' : grsScore}
                      </div>
                      <div className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#8d877f]">
                        GRS / 100
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#8d877f]">
                    Green Readiness Score
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#fbefd7] px-4 py-2 text-[0.9rem] font-bold text-[#c47739]">
                    <span aria-hidden="true">★</span>
                    {passportStatus === 'active' ? 'Aktif' : passportStatus === 'draft' ? 'Draft' : passportStatus}
                  </div>
                  <p className="mt-4 max-w-[25rem] text-xs font-medium leading-6 text-[#5f5a53]">
                    {grsScore >= passportThreshold
                      ? 'Passport Anda aktif dan tampil di landing page.'
                      : `Butuh GRS ≥ ${passportThreshold} untuk menerbitkan Passport. Tambah dokumen untuk meningkatkan skor.`}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  to="/umkm/passport"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#101310] px-5 text-[0.92rem] font-bold text-white shadow-[0_12px_24px_rgba(17,20,17,0.14)] transition hover:bg-[#181d18]"
                >
                  Buka Green Passport
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 items-center rounded-xl border border-[#d8d3ca] bg-[#fbfaf7] px-5 text-[0.92rem] font-bold text-[#20201c] transition hover:bg-white"
                >
                  Bagikan
                </button>
              </div>
            </div>
          </section>

          <StatCard label="Dokumen On-Chain" value="18" footer="dari 20 total" />
          <StatCard label="Pengunjung 7 Hari" value="128" footer="+22% vs minggu lalu" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.95fr)]">
          <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#8d877f]">
                  Indikator Keberlanjutan
                </div>
                <h2 className="mt-2 text-[1.35rem] leading-tight tracking-[-0.04em] text-[#181816]">
                  Status 6 kategori
                </h2>
              </div>
              <Link
                to="/umkm/evidence"
                className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-[#236041] transition hover:text-[#173f2b]"
              >
                Buka Evidence Vault
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {loading ? (
                <div className="col-span-2 py-8 text-center text-[0.88rem] text-[#8d877f]">Memuat kategori...</div>
              ) : categories.map((category) => {
                const progress = category.total > 0 ? (category.current / category.total) * 100 : 0
                return (
                  <article
                    key={category.code}
                    className="grid grid-cols-[40px_minmax(0,1fr)_36px] items-center gap-4 rounded-xl border border-[#e5e0d8] bg-[#fbfaf7] p-4"
                  >
                    <div
                      className="grid h-10 w-10 place-items-center rounded-lg text-[0.86rem] font-black"
                      style={{ backgroundColor: category.tint, color: category.color }}
                    >
                      {category.code}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[0.9rem] font-bold text-[#20201c]">{category.name}</div>
                      <div className="mt-2 h-1.5 rounded-full bg-white">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${progress}%`, backgroundColor: category.color }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-[0.82rem] font-bold text-[#5f5a53]">
                      {category.current}/{category.total}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#8d877f]">
              Aktivitas Terkini
            </div>
            <div className="mt-5 divide-y divide-[#e5e0d8]">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0" key={activity.title}>
                    <div className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-[#ddd6ca] bg-[#fbfaf7]">
                      <Icon className="h-4 w-4" style={{ color: activity.tone }} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[0.92rem] font-bold text-[#20201c]">{activity.title}</div>
                      <div className="truncate text-[0.78rem] font-semibold text-[#8d877f]">{activity.meta}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[18px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)] xl:hidden">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#ddd6ca] bg-[#fbfaf7]">
              <Send className="h-4 w-4 text-[#236041]" />
            </div>
            <div>
              <div className="text-[0.92rem] font-bold text-[#20201c]">Proposal masuk</div>
              <div className="text-[0.78rem] font-semibold text-[#8d877f]">1 pesan baru menunggu balasan</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default UmkmDashboardPage
