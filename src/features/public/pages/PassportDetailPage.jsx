import { useEffect, useState } from 'react'
import { Calendar, ExternalLink, MapPin, ScanLine, Store, Verified } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const CATEGORY_COLORS = {
  BB: { color: '#7a5521', tint: '#fbefd7' },
  PP: { color: '#236041', tint: '#dcebdc' },
  PL: { color: '#176174', tint: '#dff5f8' },
  EE: { color: '#6b4b12', tint: '#f7edce' },
  SK: { color: '#934f42', tint: '#fde8e3' },
  LK: { color: '#45457b', tint: '#e7e7fb' },
}

const getScoreBarTone = (score) => {
  if (score >= 85) return 'bg-[#23c48e]'
  if (score >= 70) return 'bg-[#4f8b5e]'
  return 'bg-[#f29d13]'
}

const PassportDetailPage = () => {
  const { profileId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    apiFetch(`${BASE_API}/umkms/${profileId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.status?.isSuccess && json.data) setData(json.data)
        else throw new Error(json?.message ?? 'UMKM tidak ditemukan')
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false))
  }, [profileId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8fb]">
        <Navbar />
        <div className="py-24 text-center text-sm text-[#5f5a53]">Memuat profil...</div>
      </div>
    )
  }

  if (fetchError || !data) {
    return (
      <div className="min-h-screen bg-[#f6f8fb]">
        <Navbar />
        <div className="py-24 text-center text-sm text-red-600">{fetchError ?? 'UMKM tidak ditemukan.'}</div>
      </div>
    )
  }

  const profile = data.profile ?? {}
  const passport = data.green_passport ?? {}
  const summary = data.summary ?? {}
  const categories = data.categories ?? []
  const grs = passport.grs_score ?? 0
  const txHash = passport.blockchain_tx_hash ?? ''
  const txShort = txHash ? `${txHash.slice(0, 10)}...${txHash.slice(-6)}` : '—'
  const issuedAt = passport.issued_at
    ? new Date(passport.issued_at).toLocaleDateString('id-ID', { dateStyle: 'long' })
    : '—'

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#111111]">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full" style={{ height: '50vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: profile.photo_url ? `url(${profile.photo_url})` : undefined }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,20,12,0.98) 0%, rgba(13,43,28,0.92) 35%, rgba(13,43,28,0.6) 55%, rgba(13,43,28,0.15) 75%, transparent 100%)' }}
        />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-2">
            {profile.sector_name ?? '—'}
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white mb-3">
            {profile.business_name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {profile.city}, {profile.province}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <section className="mt-6 grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
          {/* GRS card */}
          <article className="rounded-[20px] border border-[#d7dde5] bg-white p-6 shadow-[0_16px_30px_rgba(17,17,17,0.05)]">
            <div className="text-[1rem] font-bold text-[#20201c]">Green Readiness Score</div>
            <div className="mt-8 flex justify-center">
              <div className="relative grid h-[182px] w-[182px] place-items-center rounded-full">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 182 182" aria-hidden="true">
                  <circle cx="91" cy="91" r="76" fill="none" stroke="#e7edf0" strokeWidth="14" />
                  <circle
                    cx="91" cy="91" r="76" fill="none"
                    stroke="#23c48e" strokeLinecap="round" strokeWidth="14"
                    strokeDasharray={`${2 * Math.PI * 76}`}
                    strokeDashoffset={`${2 * Math.PI * 76 * (1 - grs / 100)}`}
                  />
                </svg>
                <div className="relative text-center">
                  <div className="text-[3.4rem] font-bold leading-none tracking-[-0.06em] text-[#23c48e]">{grs}</div>
                  <div className="mt-1 text-[1.05rem] font-bold text-[#20201c]">/ 100</div>
                </div>
              </div>
            </div>
            <div className="mt-7 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1bb572] px-4 py-2 text-[0.98rem] font-bold text-white">
                <Verified className="h-4 w-4" />
                {passport.tier_label ?? passport.tier ?? '—'}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-[#f5f8fa] p-3">
                <div className="text-[1.4rem] font-bold text-[#111111]">{summary.verified_document_count ?? 0}</div>
                <div className="text-[0.72rem] text-[#5f5a53]">Dokumen Terverifikasi</div>
              </div>
              <div className="rounded-xl bg-[#f5f8fa] p-3">
                <div className="text-[1.4rem] font-bold text-[#111111]">{summary.category_count ?? 0}</div>
                <div className="text-[0.72rem] text-[#5f5a53]">Kategori</div>
              </div>
            </div>
          </article>

          {/* Blockchain card */}
          <article className="rounded-[20px] border border-[#d7dde5] bg-white p-6 shadow-[0_16px_30px_rgba(17,17,17,0.05)]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_142px] lg:items-start">
              <div>
                <div className="flex items-center gap-3 text-[#205336]">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e7f5ef]">
                    <Verified className="h-5 w-5" />
                  </div>
                  <h2 className="text-[2rem] font-bold leading-none tracking-[-0.05em] text-[#20201c]">
                    Data Terverifikasi
                  </h2>
                </div>
                <p className="mt-5 max-w-[42rem] text-[1rem] font-normal leading-8 text-[#5f5a53]">
                  {profile.description}
                </p>

                {/* Identity info */}
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem] text-[#5f5a53]">
                  <span className="inline-flex items-center gap-1.5">
                    <Store className="h-3.5 w-3.5" />
                    {profile.sector_name}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {issuedAt}
                  </span>
                </div>
                <div className="mt-7 rounded-[18px] border border-[#e2e7ec] bg-[#fbfcfd] p-5">
                  <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div>
                      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[#8c96a2]">Status Jaringan</div>
                      <div className="mt-2 inline-flex items-center gap-2 text-[1rem] font-bold text-[#23c48e]">
                        <span className="h-2.5 w-2.5 rounded-full bg-current" />
                        {passport.network ?? 'On-Chain'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[#8c96a2]">Transaction Hash</div>
                      <div className="mt-2 flex items-center justify-between gap-4">
                        <div className="truncate text-[0.98rem] font-bold text-[#5f5a53]">{txShort}</div>
                        <ExternalLink className="h-4 w-4 shrink-0 text-[#5f5a53]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-[#e2e7ec] bg-[#f5f8fa] p-4 text-center">
                {passport.qr_code_url ? (
                  <img src={passport.qr_code_url} alt="QR Code" className="mx-auto h-[132px] w-[132px] rounded-lg object-contain" />
                ) : (
                  <div className="mx-auto grid h-[132px] w-[132px] place-items-center rounded-lg bg-[#153e2b] text-[0.82rem] font-bold uppercase tracking-[0.14em] text-white">
                    <ScanLine className="mb-2 h-7 w-7" />
                    QR
                  </div>
                )}
                <div className="mt-3 text-[0.92rem] font-normal text-[#5f5a53]">{passport.public_slug}</div>
              </div>
            </div>
            {profile.whatsapp_number && (
              <div className="mt-5 flex justify-end">
                <a
                  href={`https://wa.me/${profile.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2.5 text-[0.88rem] font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition hover:bg-[#20ba59]"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            )}
          </article>
        </section>

        {/* ESG Breakdown */}
        <section className="mt-6 rounded-[20px] border border-[#d7dde5] bg-white p-6 shadow-[0_16px_30px_rgba(17,17,17,0.05)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#e7f5ef] text-[#205336]">
              <Verified className="h-4 w-4" />
            </div>
            <h2 className="text-[1.8rem] font-bold leading-none tracking-[-0.05em] text-[#20201c]">
              ESG Performance Breakdown
            </h2>
          </div>
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
            {categories.map((cat) => {
              const meta = CATEGORY_COLORS[cat.code] ?? { color: '#205336', tint: '#e8f0eb' }
              const score = cat.score ?? 0
              const pct = cat.progress_percent ?? (cat.required_count > 0 ? Math.round((cat.fulfilled_count / cat.required_count) * 100) : 0)
              return (
                <div key={cat.code}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-lg text-[0.82rem] font-bold" style={{ backgroundColor: meta.tint, color: meta.color }}>
                        {cat.code}
                      </div>
                      <div className="text-[1rem] font-bold text-[#20201c]">{cat.name}</div>
                    </div>
                    <div className="text-[0.98rem] font-bold text-[#5f5a53]">{score}/{cat.weight}</div>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#e7edf0]">
                    <div className={`h-full rounded-full ${getScoreBarTone(pct)}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1 text-[0.75rem] text-[#8d877f]">{cat.fulfilled_count}/{cat.required_count} dokumen</div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default PassportDetailPage
