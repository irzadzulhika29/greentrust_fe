import React from 'react'
import { Download, FileText, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PressButton from '@/components/ui/PressButton'
import { apiFetch } from '@/lib/utils'

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

const TAB_PARAMS = {
  incoming: { box: 'inbox', status: 'sent' },
  sent:     { box: 'sent' },
  approved: { box: 'inbox', status: 'accepted' },
  rejected: { box: 'inbox', status: 'rejected' },
  all:      {},
}

const TABS = [
  { key: 'incoming', label: 'Masuk' },
  { key: 'sent', label: 'Terkirim' },
  { key: 'approved', label: 'Disetujui' },
  { key: 'rejected', label: 'Ditolak' },
  { key: 'all', label: 'Semua' },
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

const UmkmProposalPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState('incoming')
  const [sort, setSort] = React.useState('newest')
  const [rejectModal, setRejectModal] = React.useState(null)
  const [proposals, setProposals] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [fetchError, setFetchError] = React.useState(null)

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    const params = TAB_PARAMS[activeTab] ?? {}
    const query = new URLSearchParams(params).toString()
    const url = `${BASE_API}/proposals${query ? `?${query}` : ''}`

    apiFetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        if (json?.status?.isSuccess) {
          setProposals(json.data ?? [])
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
            3 proposal masuk butuh ditinjau. Anda juga bisa mengirim proposal pendanaan ke investor dari direktori.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <PressButton variant="ghost">Riwayat</PressButton>
          <PressButton variant="secondary" className="!flex !items-center !gap-2" onClick={() => navigate('/umkm/proposal/baru')}>
            <span>+</span>
            Ajukan Proposal Baru
          </PressButton>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Penawaran Masuk', value: '3', sub: 'butuh tinjauan', highlight: true },
          { label: 'Proposal Terkirim', value: '2', sub: '1 ditolak, 1 disetujui' },
          { label: 'Total Nilai Pending', value: 'Rp 1.05 M', sub: 'jika semua approved', large: true },
          { label: 'Response Rate', value: '94%', sub: 'rata-rata 2.4 hari', green: true },
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
        <div className="flex items-center gap-1 rounded-xl border border-[#e5e4e0] bg-white p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                activeTab === tab.key
                  ? 'bg-[#111111] text-white'
                  : 'text-[#5f5a53] hover:text-[#111111]'
              }`}
            >
              {tab.key === 'incoming' && '🧑‍💼 '}
              {tab.key === 'sent' && '📤 '}
              {tab.key === 'approved' && '✓ '}
              {tab.key === 'rejected' && '× '}
              {tab.label}
              {tab.count > 0 && (
                <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  activeTab === tab.key ? 'bg-white text-[#111111]' : 'bg-[#e5e4e0] text-[#5f5a53]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
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
                  ● {STATUS_LABEL[p.status] ?? p.status}
                </span>
              </div>
              <div className="px-6 pb-1 text-[10px] text-[#8d877f]">
                {p.proposal_id.slice(0, 8).toUpperCase()} · {sentDate} · {sentTime}
              </div>

              {/* Card body */}
              <div className="grid gap-6 px-6 pb-6 pt-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <h3 className="text-xl font-semibold text-[#111111] mb-2">{p.title}</h3>
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
                  {p.status === 'sent' && p.receiver_role === 'umkm' && (
                    <div className="grid grid-cols-2 gap-2">
                      <PressButton variant="danger" className="w-full !justify-center !text-xs" onClick={() => setRejectModal({ ...p, fromInitials: initials, from: counterparty.name, ref: p.proposal_id.slice(0, 8).toUpperCase(), nilai: formatRupiah(p.amount) })}>× Tolak</PressButton>
                      <PressButton variant="primary" className="w-full !justify-center !text-xs">✓ Setujui</PressButton>
                    </div>
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
