import { useEffect, useState } from 'react'
import { ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react'
import GrsGauge from '@/features/investor/components/GrsGauge'
import TierBadge from '@/features/investor/components/TierBadge'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const InvestorDashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [umkmFallback, setUmkmFallback] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    apiFetch(`${BASE_API}/investor/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) {
          setData(json.data)
          if (!json.data.recommended_umkm?.length) {
            apiFetch(`${BASE_API}/umkms?tiers=unggul,siap&sort=grs_desc`)
              .then((r2) => r2.json())
              .then((json2) => {
                if (json2?.data?.items?.length) {
                  setUmkmFallback(json2.data.items.map((u) => ({
                    profile_id: u.profile_id,
                    business_name: u.business_name,
                    sector_name: u.sector_name,
                    city: u.city,
                    grs_score: u.grs_score,
                    tier: u.tier_label ?? u.tier,
                    on_chain_document_count: u.on_chain_document_count ?? 0,
                  })))
                }
              })
              .catch(() => {})
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const summary = data?.summary ?? {}
  const greeting = data?.greeting ?? {}
  const umkmList = data?.recommended_umkm?.length ? data.recommended_umkm : umkmFallback
  const activities = data?.recent_activities ?? []
  const investmentProfile = data?.investment_profile ?? {}

  const stats = [
    {
      label: 'UMKM dalam pantauan',
      value: loading ? '—' : summary.watched_umkm_count ?? 0,
      sub: 'Total UMKM terverifikasi di watchlist Anda.',
      badge: summary.watched_umkm_growth_this_week ? `+${summary.watched_umkm_growth_this_week} minggu ini` : '',
      badgeColor: 'text-[#205336]',
    },
    {
      label: 'Proposal aktif',
      value: loading ? '—' : summary.active_proposals_count ?? 0,
      sub: `${summary.accepted_proposals_count ?? 0} disetujui, ${summary.waiting_confirmation_count ?? 0} menunggu konfirmasi UMKM.`,
      badge: 'Dalam proses',
      badgeColor: 'text-[#5f5a53]',
    },
  ]

  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      <div className="mb-6">
        <h1 className="text-[2rem] font-semibold text-[#111111]">
          {greeting.subtitle ?? 'Dashboard Investor'}
        </h1>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5">
            <div className="mb-3 text-[0.68rem] font-medium uppercase tracking-wide text-[#8d877f]">
              {stat.label}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.6rem] font-semibold italic leading-none text-[#111111]">
                {stat.value}
              </span>
              <span className={`text-[0.78rem] font-medium ${stat.badgeColor}`}>{stat.badge}</span>
            </div>
            <div className="mt-2.5 text-[0.78rem] text-[#5f5a53]">{stat.sub}</div>
          </div>
        ))}

        {/* GRS card */}
        <div className="rounded-2xl bg-white p-5">
          <div className="mb-3 text-[0.68rem] font-medium uppercase tracking-wide text-[#8d877f]">
            Rata-rata GRS portofolio
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[2.6rem] font-semibold italic leading-none text-[#111111]">
                  {loading ? '—' : summary.average_portfolio_grs ?? 0}
                </span>
                <span className="text-[0.95rem] font-medium text-[#8d877f]">/ 100</span>
              </div>
              <div className="mt-2.5 text-[0.78rem] text-[#5f5a53]">
                Mayoritas tier{' '}
                <span className="font-semibold text-[#111111]">
                  {summary.portfolio_majority_tier ?? '—'}
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <GrsGauge value={summary.average_portfolio_grs ?? 0} />
            </div>
          </div>
        </div>
      </div>

      {/* Table + Activity */}
      <div className="grid grid-cols-[1fr_248px] gap-5">
        {/* UMKM table */}
        <div className="rounded-2xl bg-white p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[1.02rem] font-semibold text-[#111111]">Rekomendasi UMKM Hijau</h2>
              <p className="mt-0.5 text-[0.78rem] text-[#5f5a53]">
                Sesuai dengan rentang tiket dan preferensi sektor Anda.
                {investmentProfile.focus_sectors?.length > 0 && (
                  <span className="ml-1 font-medium text-[#205336]">
                    ({investmentProfile.focus_sectors.map((s) => s.sector_name).join(', ')})
                  </span>
                )}
              </p>
            </div>
            <button
              className="flex shrink-0 items-center gap-0.5 text-[0.82rem] font-medium text-[#205336] transition-colors hover:text-[#1d4f32]"
              type="button"
            >
              Eksplorasi <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-[1fr_160px_110px_100px] gap-3 border-b border-[#ece8df] pb-2.5">
            {['PROFIL BISNIS', 'GRS & TIER', 'DOKUMEN', 'AKSI'].map((col) => (
              <span key={col} className="text-[0.65rem] font-semibold text-[#8d877f]">{col}</span>
            ))}
          </div>

          {loading ? (
            <div className="py-8 text-center text-[0.82rem] text-[#8d877f]">Memuat UMKM...</div>
          ) : umkmList.length === 0 ? (
            <div className="py-8 text-center text-[0.82rem] text-[#8d877f]">Belum ada rekomendasi.</div>
          ) : umkmList.map((umkm, i) => (
            <div
              key={umkm.profile_id}
              className={`grid grid-cols-[1fr_160px_110px_100px] items-center gap-3 py-3.5 ${
                i < umkmList.length - 1 ? 'border-b border-[#ece8df]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#ece8df] text-[0.72rem] font-semibold text-[#5f5a53]">
                  {umkm.business_name.slice(0, 1)}
                </div>
                <div>
                  <div className="text-[0.88rem] font-semibold text-[#111111]">{umkm.business_name}</div>
                  <div className="text-[0.75rem] text-[#5f5a53]">{umkm.sector_name} · {umkm.city}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[0.95rem] font-semibold text-[#111111]">{umkm.grs_score}</span>
                <TierBadge tier={umkm.tier} />
              </div>
              <div className="text-[0.82rem] text-[#5f5a53]">{umkm.on_chain_document_count} on-chain</div>
              <button
                className="rounded-xl border border-[#ddd7cd] px-3 py-1.5 text-[0.75rem] font-medium text-[#5f5a53] transition-colors hover:border-[#205336] hover:text-[#205336]"
                type="button"
              >
                Lihat Profil
              </button>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="mb-4 text-[0.65rem] font-semibold text-[#8d877f]">AKTIVITAS TERKINI</h2>
          {loading ? (
            <div className="text-center text-[0.82rem] text-[#8d877f]">Memuat...</div>
          ) : activities.length === 0 ? (
            <div className="text-center text-[0.82rem] text-[#8d877f]">Belum ada aktivitas.</div>
          ) : (
            <div className="space-y-5">
              {activities.map((act, i) => {
                const isCheck = act.type?.includes('accepted')
                const color = isCheck ? '#205336' : '#c47739'
                const timeAgo = act.created_at
                  ? new Date(act.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })
                  : ''
                return (
                  <div key={i} className="flex gap-3">
                    <div
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${color}18` }}
                    >
                      {isCheck ? (
                        <CheckCircle2 className="h-3.5 w-3.5" style={{ color }} />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" style={{ color }} />
                      )}
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-semibold text-[#111111]">{act.title}</div>
                      <div className="mt-0.5 text-[0.76rem] text-[#5f5a53]">{act.description}</div>
                      <div className="mt-1 text-[0.62rem] font-semibold text-[#8d877f]">{timeAgo}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvestorDashboardPage
