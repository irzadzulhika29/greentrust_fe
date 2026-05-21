import React from 'react'
import { Download, FileText, X, Inbox, SendHorizonal, CheckCheck, XCircle, FileText as FileDraft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PressButton from '@/components/ui/PressButton'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { apiFetch, proposalAction } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const REJECT_REASONS = [
  'Tidak butuh saat ini',
  'Tiket terlalu besar',
  'Tiket terlalu kecil',
  'Tenor tidak cocok',
  'Sudah ada mitra',
  'Lainnya',
]

function RejectModal({ proposal, onClose, onSubmit }) {
  const [selectedReason, setSelectedReason] = React.useState('Tidak butuh saat ini')
  const [explanation, setExplanation] = React.useState('')
  const [allowContact, setAllowContact] = React.useState(true)
  const isValid = explanation.length >= 20

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-[0_24px_48px_rgba(17,17,17,0.16)] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fde8e3] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#934f42]">
            × Tolak Proposal
          </span>
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-lg text-[#5f5a53] hover:bg-[#f4f3ec] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-[#5f5a53] leading-relaxed mb-5">
          Alasan akan dikirim ke investor. Ini membantu mereka memahami konteks Anda dan menjaga hubungan profesional untuk peluang berikutnya.
        </p>

        {/* Proposal summary */}
        <div className="flex items-center gap-3 rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] px-4 py-3 mb-5">
          <div
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-white"
            style={{ backgroundColor: '#28557c' }}
          >
            {proposal.fromInitials}
          </div>
          <div className="text-xs text-[#5f5a53]">
            <span className="font-semibold text-[#111111]">{proposal.ref}</span>
            {' · '}dari {proposal.from}
            {' · '}{proposal.nilai}
          </div>
        </div>

        {/* Kategori alasan */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-3">Kategori Alasan</div>
          <div className="flex flex-wrap gap-2">
            {REJECT_REASONS.map((reason) => (
              <button
                key={reason}
                type="button"
                onClick={() => setSelectedReason(reason)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors duration-150 ${
                  selectedReason === reason
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#111111] border-[#e5e4e0] hover:border-[#111111]'
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Penjelasan */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
            Penjelasan ke Investor (min 20 karakter)
          </div>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-[#e5e4e0] bg-white px-4 py-3 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20 resize-none"
            placeholder="Tulis penjelasan singkat..."
          />
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-[#5f5a53]">{explanation.length} / min 20</span>
            {isValid && <span className="text-[#205336] font-semibold">✓ valid</span>}
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <div
            onClick={() => setAllowContact((v) => !v)}
            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
              allowContact ? 'bg-[#205336] border-[#205336]' : 'bg-white border-[#e5e4e0]'
            }`}
          >
            {allowContact && <span className="text-white text-[10px] font-bold">✓</span>}
          </div>
          <span className="text-sm text-[#5f5a53] leading-relaxed">
            Saya bersedia dihubungi kembali oleh investor ini untuk peluang lain di masa depan
          </span>
        </label>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <PressButton variant="ghost" onClick={onClose}>Batal</PressButton>
          <PressButton
            variant="danger"
            disabled={!isValid}
            onClick={() => { onSubmit({ reason: selectedReason, explanation, allowContact }); onClose() }}
            className="!flex !items-center !gap-2"
          >
            Kirim Penolakan
          </PressButton>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  { key: 'incoming', label: 'Masuk', icon: Inbox },
  { key: 'draft', label: 'Draft', icon: FileDraft },
  { key: 'sent', label: 'Terkirim', icon: SendHorizonal },
  { key: 'approved', label: 'Disetujui', icon: CheckCheck },
  { key: 'rejected', label: 'Ditolak', icon: XCircle },
  { key: 'all', label: 'Semua', icon: FileText },
]

const TYPE_STYLES = {
  funding:    'bg-[#eaf2fb] text-[#336699]',
  procurement:'bg-[#fff0e3] text-[#c57f44]',
  grant:      'bg-[#f1ebfb] text-[#7b65a9]',
  loan:       'bg-[#eaf6ee] text-[#205336]',
}

const STATUS_STYLES = {
  sent:      'bg-[#fff4d6] text-[#c47739]',
  draft:     'bg-[#f4f3ec] text-[#5f5a53]',
  accepted:  'bg-[#e8f0eb] text-[#205336]',
  rejected:  'bg-[#fde8e3] text-[#934f42]',
  withdrawn: 'bg-[#f4f3ec] text-[#5f5a53]',
}

const STATUS_LABEL = {
  sent:      'Menunggu',
  draft:     'Draft',
  accepted:  'Disetujui',
  rejected:  'Ditolak',
  withdrawn: 'Ditarik',
}

const formatRupiah = (amount) =>
  amount ? `Rp ${Number(amount).toLocaleString('id-ID')}` : '—'

const formatBytes = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const ProposalActions = ({ proposalId, onStatusChange }) => {
  const [actioning, setActioning] = React.useState(null)
  const [actionError, setActionError] = React.useState(null)
  const [confirmModal, setConfirmModal] = React.useState(null)

  const handleAction = async (action) => {
    setActioning(action)
    setActionError(null)
    try {
      const updated = await proposalAction(proposalId, action)
      onStatusChange?.(updated)
    } catch (err) {
      setActionError(err.message ?? 'Gagal. Coba lagi.')
    } finally {
      setActioning(null)
    }
  }

  return (
    <div className="space-y-1">
      {actionError && <p className="text-[0.72rem] text-red-600">{actionError}</p>}
      <div className="grid grid-cols-2 gap-2">
        <PressButton
          variant="danger"
          className="w-full !justify-center !text-xs"
          disabled={!!actioning}
          onClick={() => setConfirmModal({
            action: 'reject',
            title: 'Tolak Proposal?',
            description: 'Proposal akan ditolak dan investor akan mendapat notifikasi.',
            confirmLabel: 'Ya, Tolak',
            confirmVariant: 'danger',
            successMessage: 'Proposal berhasil ditolak.',
          })}
        >
          × Tolak
        </PressButton>
        <PressButton
          variant="primary"
          className="w-full !justify-center !text-xs"
          disabled={!!actioning}
          onClick={() => setConfirmModal({
            action: 'accept',
            title: 'Terima Proposal?',
            description: 'Proposal akan diterima dan investor akan mendapat notifikasi.',
            confirmLabel: 'Ya, Terima',
            confirmVariant: 'primary',
            successMessage: 'Proposal berhasil diterima.',
          })}
        >
          ✓ Setujui
        </PressButton>
      </div>
      <AnimatePresence>
        {confirmModal && (
          <ConfirmModal
            key="confirm"
            title={confirmModal.title}
            description={confirmModal.description}
            confirmLabel={confirmModal.confirmLabel}
            confirmVariant={confirmModal.confirmVariant}
            successMessage={confirmModal.successMessage}
            onConfirm={() => handleAction(confirmModal.action)}
            onClose={() => setConfirmModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const UmkmProposalPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState('draft')
  const [sort, setSort] = React.useState('newest')
  const [rejectModal, setRejectModal] = React.useState(null)
  const [proposals, setProposals] = React.useState([])
  const [summary, setSummary] = React.useState(null)
  const [tabs, setTabs] = React.useState({})
  const [draftCount, setDraftCount] = React.useState(0)
  const [sentCount, setSentCount] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [fetchError, setFetchError] = React.useState(null)

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    apiFetch(`${BASE_API}/umkm/proposals?tab=all&sort=newest`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.status?.isSuccess) {
          setSummary(json.data?.summary ?? null)
          setTabs(json.data?.tabs ?? {})
        }
      })
      .catch(() => {})
  }, [])

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    const apiTab = activeTab === 'draft' ? 'sent' : activeTab
    const url = `${BASE_API}/umkm/proposals?tab=${apiTab}&sort=${sort}`

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
  }, [activeTab, sort])

  return (
    <div className="px-8 py-8">
      {/* Reject Modal */}
      {rejectModal && (
        <RejectModal
          proposal={rejectModal}
          onClose={() => setRejectModal(null)}
          onSubmit={(data) => console.log('Tolak proposal', rejectModal.ref, data)}
        />
      )}
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#e5e4e0] pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#111111]">Proposal & Penawaran</h1>
          <p className="mt-1 text-sm text-[#5f5a53]">
            {loading ? 'Memuat data...' : `${summary?.incoming_offers_count ?? 0} proposal masuk butuh ditinjau. Anda juga bisa mengirim proposal pendanaan ke investor dari direktori.`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <PressButton variant="secondary" className="!flex !items-center !gap-2" onClick={() => navigate('/umkm/proposal/baru')}>
            <span>+</span>
            Ajukan Proposal Baru
          </PressButton>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Penawaran Masuk', value: loading ? '—' : summary?.incoming_offers_count ?? 0, sub: 'butuh tinjauan', highlight: true },
          { label: 'Proposal Terkirim', value: loading ? '—' : summary?.sent_proposals_count ?? 0, sub: `${summary?.sent_rejected_count ?? 0} ditolak, ${summary?.sent_approved_count ?? 0} disetujui` },
          { label: 'Total Nilai Pending', value: loading ? '—' : (summary?.pending_total_value ? `Rp ${Number(summary.pending_total_value).toLocaleString('id-ID')}` : 'Rp 0'), sub: 'jika semua approved', large: true },
          { label: 'Response Rate', value: loading ? '—' : (summary?.response_rate != null ? `${summary.response_rate}%` : '—'), sub: summary?.response_rate_label ?? '', green: true },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-3">{stat.label}</div>
            <div className={`font-semibold leading-none ${stat.large ? 'text-2xl' : 'text-4xl'} ${
              stat.highlight ? 'text-[#c47739]' : stat.green ? 'text-[#205336]' : 'text-[#111111]'
            }`}>
              {stat.value}
            </div>
            <div className="mt-2 text-xs text-[#5f5a53]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs + sort */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex w-fit items-center gap-0.5 rounded-xl bg-[#ece8df] p-1">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.key
            let count
            if (tab.key === 'draft') count = draftCount
            else if (tab.key === 'sent') count = sentCount
            else count = tabs[tab.key] ?? 0
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-150 ${
                  active ? 'bg-[#111111] text-white' : 'text-[#5f5a53] hover:text-[#111111]'
                }`}
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

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer appearance-none rounded-lg border border-[#e5e4e0] bg-white py-1.5 pl-3 pr-8 text-sm text-[#111111] focus:border-[#205336] focus:outline-none"
          >
            <option value="newest">Urutkan: Terbaru</option>
            <option value="oldest">Urutkan: Terlama</option>
            <option value="nilai">Urutkan: Nilai</option>
          </select>
        </div>
      </div>

      {/* Proposal list */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="py-12 text-center text-sm text-[#8d877f]">Memuat proposal...</div>
        ) : fetchError ? (
          <div className="py-12 text-center text-sm text-red-600">{fetchError}</div>
        ) : proposals.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#8d877f]">Tidak ada proposal di tab ini.</div>
        ) : proposals.map((p) => {
          const counterparty = p.counterparty ?? {}
          const initials = (counterparty.name ?? '?').slice(0, 2).toUpperCase()
          const sentDate = p.sent_at ? new Date(p.sent_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
          const sentTime = p.sent_at ? new Date(p.sent_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''
          const firstAttachment = p.attachments?.[0]

          return (
            <div key={p.proposal_id} className="rounded-2xl border border-[#e5e4e0] bg-white shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
              {/* Card header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-white bg-[#28557c]">
                    {initials}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5f5a53]">
                    <FileText className="h-4 w-4 text-[#205336]" />
                    <span>{p.sender_role === 'umkm' ? 'Dikirim ke' : 'Diterima dari'}</span>
                    <span className="font-semibold text-[#111111]">{counterparty.name ?? '—'}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${TYPE_STYLES[p.proposal_type] ?? 'bg-[#f4f3ec] text-[#5f5a53]'}`}>
                      {p.proposal_type}
                    </span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[p.status] ?? 'bg-[#f4f3ec] text-[#5f5a53]'}`}>
                  ● {p.status_label ?? STATUS_LABEL[p.status] ?? p.status}
                </span>
              </div>
              <div className="px-6 pb-1 text-[10px] text-[#8d877f]">
                {p.proposal_id.slice(0, 8).toUpperCase()} · {sentDate} · {sentTime}
              </div>

              {/* Card body */}
              <div className="grid gap-6 px-6 pb-6 pt-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <h3 className="text-xl font-semibold text-[#111111] mb-2">
                    <Link to={`/umkm/proposal/${p.proposal_id}`} className="hover:text-[#205336] transition-colors">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#5f5a53] leading-relaxed mb-4">{p.message}</p>
                  {firstAttachment && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] px-4 py-3 w-fit">
                      <div className="text-[10px] font-bold uppercase text-[#5f5a53] bg-white border border-[#e5e4e0] rounded px-1.5 py-0.5">
                        {firstAttachment.mime_type === 'application/pdf' ? 'PDF' : 'FILE'}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#111111]">{firstAttachment.original_name}</div>
                        <div className="text-xs text-[#5f5a53]">{formatBytes(firstAttachment.file_size)}</div>
                      </div>
                      <a href={firstAttachment.file_path} target="_blank" rel="noopener noreferrer">
                        <PressButton variant="primary" className="!flex !items-center !gap-1.5 !px-3 !py-1.5 !text-xs ml-2">
                          <Download className="h-3 w-3" />
                          Unduh
                        </PressButton>
                      </a>
                    </div>
                  )}
                </div>

                {/* Right: nilai + actions */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">Nilai</div>
                    <div className="text-2xl font-semibold text-[#111111]">{formatRupiah(p.amount)}</div>
                    <div className="mt-1 text-xs text-[#5f5a53]">
                      {p.tenor_months ? `${p.tenor_months} bln tenor` : ''}
                      {p.scheme ? ` · ${p.scheme}` : ''}
                    </div>
                  </div>
                  <Link
                    to={`/umkm/proposal/${p.proposal_id}`}
                    className="inline-flex h-9 w-full items-center justify-center rounded-xl border border-[#e5e4e0] bg-white text-[0.82rem] font-semibold text-[#5f5a53] transition hover:border-[#205336] hover:text-[#205336]"
                  >
                    Lihat Detail
                  </Link>
                  {p.status === 'sent' && p.receiver_role === 'umkm' && (
                    <ProposalActions proposalId={p.proposal_id} onStatusChange={(updated) => {
                      setProposals((prev) => prev.map((item) => item.proposal_id === updated.proposal_id ? updated : item))
                    }} />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UmkmProposalPage
