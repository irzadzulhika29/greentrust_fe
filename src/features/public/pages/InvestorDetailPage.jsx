import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, Send, Bookmark, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import PressButton from '@/components/ui/PressButton'
import Iridescence from '@/components/ui/Iridescence'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API
const THEME_COLORS = ['#28557c', '#205336', '#7b4f2e', '#4a3d7a', '#1a5f5f']

const InvestorDetailPage = () => {
  const { profileId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    apiFetch(`${BASE_API}/investors/${profileId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.status?.isSuccess && json.data) setData(json.data)
        else throw new Error(json?.message ?? 'Investor tidak ditemukan')
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false))
  }, [profileId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8fb]">
        <Navbar />
        <div className="py-24 text-center text-sm text-[#5f5a53]">Memuat profil investor...</div>
      </div>
    )
  }

  if (fetchError || !data) {
    return (
      <div className="min-h-screen bg-[#f6f8fb]">
        <Navbar />
        <div className="py-24 text-center text-sm text-red-600">{fetchError ?? 'Investor tidak ditemukan.'}</div>
      </div>
    )
  }

  const profile = data.profile ?? {}
  const ip = data.investment_profile ?? {}
  const stats = data.stats ?? {}
  const positions = data.positions ?? []
  const portfolio = data.portfolio ?? []
  const activities = data.recent_activities ?? []
  const color = THEME_COLORS[0]

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#111111]">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full" style={{ height: '50vh' }}>
        <div className="absolute inset-0">
          <Iridescence color={[0.12549019607843137, 0.3254901960784314, 0.21176470588235294]} mouseReact={false} amplitude={0.1} speed={1.0} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <Link to="/investor" className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-150">
            <ArrowLeft className="h-3 w-3" />
            Kembali ke Direktori Investor
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-end gap-5">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white shadow-md border-2 border-white/20" style={{ backgroundColor: color }}>
                  {profile.initials}
                </div>
                <div>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">{profile.full_name}</h1>
                  <div className="mt-1 text-sm text-white/70">{profile.title} · {profile.institution_name}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/60">
                    {profile.base_location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {profile.base_location}
                      </span>
                    )}
                    <span>· {stats.portfolio_count ?? 0} portofolio</span>
                    <span>· {stats.approval_rate_label ?? `${stats.approval_rate ?? 0}%`} approval</span>
                  </div>
                </div>
              </div>
            </div>

            {profile.public_bio && (
              <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-2xl">{profile.public_bio}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {ip.focus_sectors?.map((s) => (
                  <span key={s.sector_id} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                    {s.sector_name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <PressButton variant="secondary" className="!flex !items-center !gap-2 !px-5">
                  <Send className="h-4 w-4" />
                  Kirim Proposal
                </PressButton>
                <PressButton variant="ghost" className="!flex !items-center !gap-2 !px-5 !bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                  <Bookmark className="h-4 w-4" />
                  Simpan
                </PressButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left */}
          <div className="flex flex-col gap-6">
            {/* Pengalaman */}
            <div className="rounded-2xl border border-[#e5e4e0] bg-white p-6 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#111111]">Pengalaman</h2>
                <span className="text-xs text-[#5f5a53]">{positions.length} posisi</span>
              </div>
              <div className="flex flex-col gap-5">
                {positions.map((pos) => (
                  <div key={pos.position_id} className="flex gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-white" style={{ backgroundColor: color }}>
                      {pos.initials ?? pos.institution_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1 border-b border-[#e5e4e0] pb-5 last:border-0 last:pb-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold text-[#111111]">{pos.title}</div>
                          <div className="text-sm text-[#5f5a53]">{pos.institution_name} · {pos.employment_type?.replace('_', '-')}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#5f5a53]">{pos.duration_label}</div>
                          <div className="text-xs text-[#5f5a53]">{pos.location}</div>
                        </div>
                      </div>
                      {pos.skills?.length > 0 && (
                        <div className="mt-1.5 text-xs text-[#111111]">
                          <span className="font-semibold">Skill:</span> {pos.skills.map((s) => s.name).join(', ')}
                        </div>
                      )}
                      {pos.description && (
                        <p className="mt-2 text-xs text-[#5f5a53] leading-relaxed">{pos.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Riwayat Investasi */}
            {portfolio.length > 0 && (
              <div className="rounded-2xl border border-[#e5e4e0] bg-white p-6 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
                <h2 className="mb-5 text-2xl font-semibold text-[#111111]">Riwayat Investasi</h2>
                <div className="flex flex-col">
                  {portfolio.map((inv) => (
                    <div key={inv.profile_id} className="flex items-center gap-4 border-t border-[#e5e4e0] py-4 first:border-0 first:pt-0">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-[#e5e4e0] grid place-items-center text-xs font-bold text-[#5f5a53]">
                        {inv.business_name.slice(0, 1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#111111]">{inv.business_name}</div>
                        <div className="text-sm text-[#5f5a53]">{inv.city} · {inv.funded_year}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm text-[#111111]">{inv.duration_label}</div>
                        <div className="text-xs text-[#5f5a53]">{inv.proposal_type_label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53]">{ip.investor_type}</div>
              <div className="mt-3 flex flex-col gap-3 divide-y divide-[#e5e4e0]">
                {ip.ticket_range && (
                  <div className="pt-3 first:pt-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">Rentang Tiket</div>
                    <div className="mt-1 text-base font-semibold text-[#111111]">{ip.ticket_range}</div>
                  </div>
                )}
                <div className="pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">Portofolio Aktif</div>
                  <div className="mt-1 text-base font-semibold text-[#111111]">{stats.portfolio_count ?? 0}</div>
                </div>
                <div className="pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">Approval Rate</div>
                  <div className="mt-1 text-base font-semibold text-[#111111]">{stats.approval_rate_label ?? `${stats.approval_rate ?? 0}%`}</div>
                </div>
                <div className="pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">Verifikasi</div>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#205336]">
                    <CheckCircle2 className="h-4 w-4" />
                    {profile.is_verified ? 'Identitas terverifikasi' : 'Belum terverifikasi'}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5e4e0] bg-[#eaf6ee] p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#205336]">Kirim Proposal</div>
              <p className="mt-2 text-sm text-[#5f5a53] leading-relaxed">
                Passport Anda sudah aktif. Anda bisa mengajukan proposal pendanaan / pengadaan langsung ke {profile.full_name?.split(' ')[0]}.
              </p>
              <PressButton variant="primary" className="mt-4 w-full !flex !items-center !justify-center">
                Buat Proposal Baru
              </PressButton>
            </div>

            {activities.length > 0 && (
              <div className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53]">Aktivitas Terbaru</div>
                <div className="flex flex-col gap-3">
                  {activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#205336]" />
                      <div>
                        <div className="text-sm text-[#111111]">{act.title}</div>
                        <div className="text-xs text-[#5f5a53]">{act.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorDetailPage
