import { Calendar, ExternalLink, MapPin, ScanLine, Store, Verified } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import { buildPublicBreakdown, findPublicUmkmBySlug } from '@/features/public/data/publicUmkmData'

const getScoreBarTone = (score) => {
  if (score >= 85) return 'bg-[#23c48e]'
  if (score >= 70) return 'bg-[#4f8b5e]'
  return 'bg-[#f29d13]'
}

const PassportDetailPage = () => {
  const { slug } = useParams()
  const umkm = findPublicUmkmBySlug(slug)

  if (!umkm) {
    return <Navigate to="/" replace />
  }

  const breakdown = buildPublicBreakdown(umkm)

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#111111]">
      <Navbar />

      {/* Hero — full width, 50vh, image background */}
      <div className="relative w-full" style={{ height: '50vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${umkm.imageUrl})` }}
        />
        {/* green overlay same as UmkmDirectoryPage */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(5,20,12,0.98) 0%, rgba(13,43,28,0.92) 35%, rgba(13,43,28,0.6) 55%, rgba(13,43,28,0.15) 75%, transparent 100%)',
          }}
        />
        {/* UMKM name + category inside hero, bottom-left */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-2">
            {umkm.category}
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white mb-3">
            {umkm.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {umkm.city}, Indonesia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {umkm.joinedLabel}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        {/* Identity row — logo + meta */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.98rem] font-normal text-[#5f5a53]">
            <span className="inline-flex items-center gap-2">
              <Store className="h-4 w-4" />
              {umkm.category}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {umkm.city}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {umkm.joinedLabel}
            </span>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
          <article className="rounded-[20px] border border-[#d7dde5] bg-white p-6 shadow-[0_16px_30px_rgba(17,17,17,0.05)]">
            <div className="text-[1rem] font-bold text-[#20201c]">Green Readiness Score</div>

            <div className="mt-8 flex justify-center">
              <div className="relative grid h-[182px] w-[182px] place-items-center rounded-full">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 182 182" aria-hidden="true">
                  <circle cx="91" cy="91" r="76" fill="none" stroke="#e7edf0" strokeWidth="14" />
                  <circle
                    cx="91"
                    cy="91"
                    r="76"
                    fill="none"
                    stroke="#23c48e"
                    strokeLinecap="round"
                    strokeWidth="14"
                    strokeDasharray={`${2 * Math.PI * 76}`}
                    strokeDashoffset={`${2 * Math.PI * 76 * (1 - umkm.grs / 100)}`}
                  />
                </svg>
                <div className="relative text-center">
                  <div className="text-[3.4rem] font-bold leading-none tracking-[-0.06em] text-[#23c48e]">
                    {umkm.grs}
                  </div>
                  <div className="mt-1 text-[1.05rem] font-bold text-[#20201c]">/ 100</div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1bb572] px-4 py-2 text-[0.98rem] font-bold text-white">
                <Verified className="h-4 w-4" />
                Tier 5 - {umkm.tier}
              </div>
            </div>
          </article>

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
                  Profil keberlanjutan UMKM ini telah diverifikasi dan dicatat secara permanen di jaringan
                  blockchain, memastikan transparansi dan integritas data (Anti-Greenwashing).
                </p>

                <div className="mt-7 rounded-[18px] border border-[#e2e7ec] bg-[#fbfcfd] p-5">
                  <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <div>
                      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[#8c96a2]">
                        Status Jaringan
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-[1rem] font-bold text-[#23c48e]">
                        <span className="h-2.5 w-2.5 rounded-full bg-current" />
                        On-Chain
                      </div>
                    </div>

                    <div>
                      <div className="text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[#8c96a2]">
                        Transaction Hash
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-4">
                        <div className="truncate text-[0.98rem] font-bold text-[#5f5a53]">{umkm.txHash}</div>
                        <ExternalLink className="h-4 w-4 shrink-0 text-[#5f5a53]" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-[0.96rem] font-bold text-[#205336] transition hover:text-[#173f2b]"
                >
                  Lihat di Block Explorer
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-[18px] border border-[#e2e7ec] bg-[#f5f8fa] p-4 text-center">
                <div className="mx-auto grid h-[132px] w-[132px] place-items-center rounded-lg bg-[#153e2b] text-[0.82rem] font-bold uppercase tracking-[0.14em] text-white">
                  <ScanLine className="mb-2 h-7 w-7" />
                  QR
                </div>
                <div className="mt-3 text-[0.92rem] font-normal text-[#5f5a53]">{umkm.qrLabel}</div>
              </div>
            </div>
          </article>
        </section>

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
            {breakdown.map((indicator) => (
              <div key={indicator.slug}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-3">
                    <div
                      className="grid h-8 w-8 place-items-center rounded-lg text-[0.82rem] font-bold"
                      style={{ backgroundColor: indicator.tint, color: indicator.color }}
                    >
                      {indicator.code}
                    </div>
                    <div className="text-[1rem] font-bold text-[#20201c]">{indicator.name}</div>
                  </div>
                  <div className="text-[0.98rem] font-bold text-[#5f5a53]">{indicator.score}/100</div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#e7edf0]">
                  <div
                    className={`h-full rounded-full ${getScoreBarTone(indicator.score)}`}
                    style={{ width: `${indicator.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default PassportDetailPage
