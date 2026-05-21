import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PressButton from '@/components/ui/PressButton'
import ProposalCard from '@/features/investor/components/ProposalCard'
import TolakModal from '@/features/investor/components/TolakModal'
import { TABS } from '@/features/investor/constants/proposalConstants'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const InvestorProposalPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState('draft')
  const [rejectTarget, setRejectTarget] = React.useState(null)
  const [proposals, setProposals] = React.useState([])
  const [summary, setSummary] = React.useState(null)
  const [tabs, setTabs] = React.useState({})
  const [draftCount, setDraftCount] = React.useState(0)
  const [sentCount, setSentCount] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [fetchError, setFetchError] = React.useState(null)

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    const apiTab = activeTab === 'draft' ? 'sent' : activeTab === 'incoming' ? 'requests' : activeTab
    const url = `${BASE_API}/investor/proposals?tab=${apiTab}`

    apiFetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        setLoading(true)
        return r.json()
      })
      .then((json) => {
        if (json?.status?.isSuccess) {
          const items = json.data?.items ?? []
          const filtered = activeTab === 'draft'
            ? items.filter((p) => p.status === 'draft')
            : activeTab === 'sent'
            ? items.filter((p) => p.status !== 'draft')
            : items
          setProposals(filtered)
          setSummary(json.data?.summary ?? null)
          setTabs(json.data?.tabs ?? {})
          if (activeTab === 'draft' || activeTab === 'sent') {
            setDraftCount(items.filter((p) => p.status === 'draft').length)
            setSentCount(items.filter((p) => p.status !== 'draft').length)
          }
          setFetchError(null)
        } else {
          throw new Error(json?.message ?? 'Gagal memuat proposal')
        }
      })
      .catch((err) => {
        setFetchError(err.message)
        setProposals([])
      })
      .finally(() => setLoading(false))
  }, [activeTab])

  const STATS = summary ? [
    { label: 'Proposal Aktif', value: summary.active_proposals_count ?? 0, sub: 'sejak bergabung' },
    { label: 'Disetujui UMKM', value: summary.approved_umkm_count ?? 0, sub: `${summary.approval_rate ?? 0}% approval rate` },
    { label: 'Permintaan Masuk', value: summary.incoming_umkm_requests_count ?? 0, sub: 'butuh tinjauan', highlight: true },
    { label: 'Total Nilai Disetujui', value: summary.approved_total_value_label ?? '—', sub: summary.approved_total_period_label ?? '', large: true },
  ] : []

  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-5 text-[2rem] font-semibold text-[#111111]">Proposal & Penawaran</h1>
          <p className="mt-5 text-[0.88rem] text-[#5f5a53]">
            {loading ? 'Memuat data...' : `${summary?.active_proposals_count ?? 0} proposal aktif dikirim. ${summary?.incoming_umkm_requests_count ?? 0} proposal masuk dari UMKM butuh keputusan.`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <PressButton className="flex! items-center! gap-1.5!" variant="secondary" onClick={() => navigate('/investor/proposal/baru')}>
            <span className="text-base leading-none">+</span>
            Tawarkan ke UMKM
          </PressButton>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5">
            <div className="mb-3 text-[0.68rem] font-medium text-[#8d877f]">{stat.label}</div>
            <div className={`font-semibold italic leading-none ${stat.large ? 'text-[1.9rem]' : 'text-[2.2rem]'} ${stat.highlight ? 'text-[#c47739]' : 'text-[#111111]'}`}>
              {loading ? '—' : stat.value}
            </div>
            <div className="mt-2 text-[0.75rem] text-[#5f5a53]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-5 flex w-fit items-center gap-0.5 rounded-xl bg-[#ece8df] p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.key
          let count
          if (tab.key === 'draft') count = draftCount
          else if (tab.key === 'sent') count = sentCount
          else {
            const tabKey = tab.key === 'incoming' ? 'requests' : tab.key
            count = tabs[tabKey] ?? 0
          }
          return (
            <button
              key={tab.key}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-150 ${
                active ? 'bg-[#111111] text-white' : 'text-[#5f5a53] hover:text-[#111111]'
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              {count > 0 && (
                <span className={`flex min-w-4.5 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold ${
                  active ? 'bg-white text-[#111111]' : 'bg-[#ddd7cd] text-[#5f5a53]'
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Proposal list */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="rounded-2xl bg-white px-6 py-12 text-center text-[0.88rem] text-[#8d877f]">Memuat proposal...</div>
        ) : fetchError ? (
          <div className="rounded-2xl bg-white px-6 py-12 text-center text-[0.88rem] text-red-600">{fetchError}</div>
        ) : proposals.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-12 text-center text-[0.88rem] text-[#8d877f]">
            Tidak ada proposal di kategori ini.
          </div>
        ) : (
          proposals.map((p) => (
            <ProposalCard key={p.proposal_id} p={p} onReject={setRejectTarget} />
          ))
        )}
      </div>

      {/* Tolak modal */}
      <AnimatePresence>
        {rejectTarget && (
          <TolakModal
            key="tolak-modal"
            proposal={rejectTarget}
            onClose={() => setRejectTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default InvestorProposalPage
