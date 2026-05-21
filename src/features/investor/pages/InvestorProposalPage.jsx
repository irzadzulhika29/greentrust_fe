import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import ProposalCard from '@/features/investor/components/ProposalCard'
import TolakModal from '@/features/investor/components/TolakModal'
import { TABS, PROPOSALS } from '@/features/investor/constants/proposalConstants'

const STATS = [
  { label: 'Proposal Aktif', value: '47', sub: 'sejak bergabung' },
  { label: 'Disetujui UMKM', value: '29', sub: '62% approval rate' },
  { label: 'Permintaan Masuk', value: '1', sub: 'butuh tinjauan', highlight: true },
  { label: 'Total Nilai Disetujui', value: 'Rp 28 M', sub: '12 bulan terakhir', large: true },
]

const InvestorProposalPage = () => {
  const [activeTab, setActiveTab] = React.useState('sent')
  const [rejectTarget, setRejectTarget] = React.useState(null)

  const filteredProposals = PROPOSALS.filter((p) => {
    if (activeTab === 'sent') return p.direction === 'sent'
    if (activeTab === 'incoming') return p.direction === 'incoming'
    if (activeTab === 'approved') return p.status === 'Disetujui'
    if (activeTab === 'rejected') return p.status === 'Ditolak'
    return true
  })

  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-semibold text-[#111111]">Proposal & Penawaran</h1>
          <p className="mt-5 text-[0.88rem] text-[#5f5a53]">
            4 proposal aktif dikirim. 1 proposal masuk dari UMKM butuh keputusan.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <PressButton className="flex! items-center! gap-2!" variant="ghost">
            <Download className="h-4 w-4" />
            Ekspor CSV
          </PressButton>
          <PressButton className="flex! items-center! gap-1.5!" variant="primary">
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
            <div
              className={`font-semibold italic leading-none ${stat.large ? 'text-[1.9rem]' : 'text-[2.2rem]'} ${stat.highlight ? 'text-[#c47739]' : 'text-[#111111]'}`}
            >
              {stat.value}
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
              {tab.count > 0 && (
                <span
                  className={`flex min-w-4.5 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold ${
                    active ? 'bg-white text-[#111111]' : 'bg-[#ddd7cd] text-[#5f5a53]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Proposal list */}
      <div className="flex flex-col gap-3">
        {filteredProposals.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-12 text-center text-[0.88rem] text-[#8d877f]">
            Tidak ada proposal di kategori ini.
          </div>
        ) : (
          filteredProposals.map((p) => (
            <ProposalCard key={p.id} p={p} onReject={setRejectTarget} />
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
