import { ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react'
import GrsGauge from '@/features/investor/components/GrsGauge'
import TierBadge from '@/features/investor/components/TierBadge'
import { UMKM_LIST, ACTIVITIES, DASHBOARD_STATS } from '@/features/investor/constants/dashboardConstants'

const InvestorDashboardPage = () => {
  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      <div className="mb-6">
        <h1 className="text-[2rem] font-semibold text-[#111111]">Dashboard Investor</h1>
        <p className="mt-5 text-[0.88rem] text-[#5f5a53]">
          Selamat siang, Arnold. Ada 12 UMKM baru mencapai tier{' '}
          <span className="font-semibold text-[#c47739]">Unggul</span> minggu ini.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-3 gap-4">
        {DASHBOARD_STATS.map((stat) => (
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
                <span className="text-[2.6rem] font-semibold italic leading-none text-[#111111]">82</span>
                <span className="text-[0.95rem] font-medium text-[#8d877f]">/ 100</span>
              </div>
              <div className="mt-2.5 text-[0.78rem] text-[#5f5a53]">
                Mayoritas tier <span className="font-semibold text-[#111111]">Siap & Unggul</span>
              </div>
            </div>
            <div className="shrink-0">
              <GrsGauge value={82} />
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

          {UMKM_LIST.map((umkm, i) => (
            <div
              key={umkm.name}
              className={`grid grid-cols-[1fr_160px_110px_100px] items-center gap-3 py-3.5 ${
                i < UMKM_LIST.length - 1 ? 'border-b border-[#ece8df]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#ece8df] text-[0.72rem] font-semibold text-[#5f5a53]">
                  {umkm.initials}
                </div>
                <div>
                  <div className="text-[0.88rem] font-semibold text-[#111111]">{umkm.name}</div>
                  <div className="text-[0.75rem] text-[#5f5a53]">{umkm.sector} · {umkm.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[0.95rem] font-semibold text-[#111111]">{umkm.grs}</span>
                <TierBadge tier={umkm.tier} />
              </div>
              <div className="text-[0.82rem] text-[#5f5a53]">{umkm.docs} on-chain</div>
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
          <div className="space-y-5">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${act.color}18` }}
                >
                  {act.type === 'check' ? (
                    <CheckCircle2 className="h-3.5 w-3.5" style={{ color: act.color }} />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" style={{ color: act.color }} />
                  )}
                </div>
                <div>
                  <div className="text-[0.85rem] font-semibold text-[#111111]">{act.title}</div>
                  <div className="mt-0.5 text-[0.76rem] text-[#5f5a53]">{act.desc}</div>
                  <div className="mt-1 text-[0.62rem] font-semibold text-[#8d877f]">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorDashboardPage
