import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, CircleX, CircleCheck, Send } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import PressButton from '@/components/ui/PressButton'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { apiFetch, proposalAction } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const STATUS_LABEL = {
  sent:      'Menunggu',
  draft:     'Draft',
  accepted:  'Disetujui',
  rejected:  'Ditolak',
  withdrawn: 'Ditarik',
}

const STATUS_STYLES = {
  sent:      'bg-[#fff4d6] text-[#c47739]',
  draft:     'bg-[#f4f3ec] text-[#5f5a53]',
  accepted:  'bg-[#e8f0eb] text-[#205336]',
  rejected:  'bg-[#fde8e3] text-[#934f42]',
  withdrawn: 'bg-[#f4f3ec] text-[#5f5a53]',
}

const formatRupiah = (amount) =>
  amount ? `Rp ${Number(amount).toLocaleString('id-ID')}` : '—'

const formatBytes = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const InvestorProposalDetailPage = () => {
  const { proposalId } = useParams()
  const navigate = useNavigate()
  const [proposal, setProposal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [actioning, setActioning] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)

  const handleSend = async () => {
    setSendError(null)
    setSending(true)
    try {
      const updated = await proposalAction(proposalId, 'send')
      setProposal(updated)
    } catch (err) {
      setSendError(err.message ?? 'Gagal mengirim proposal. Coba lagi.')
    } finally {
      setSending(false)
    }
  }

  const handleAction = async (action) => {
    setActioning(action)
    setActionError(null)
    try {
      const updated = await proposalAction(proposal.proposal_id, action)
      setProposal(updated)
    } catch (err) {
      setActionError(err.message ?? 'Gagal. Coba lagi.')
    } finally {
      setActioning(null)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    apiFetch(`${BASE_API}/proposals/${proposalId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.status?.isSuccess && json.data) {
          setProposal(json.data)
        } else {
          throw new Error(json?.message ?? 'Gagal memuat detail proposal')
        }
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false))
  }, [proposalId])

  if (loading) {
    return (
      <div className="px-8 py-12 text-center text-[0.88rem] text-[#8d877f]">
        Memuat detail proposal...
      </div>
    )
  }

  if (fetchError || !proposal) {
    return (
      <div className="px-8 py-12 text-center text-[0.88rem] text-red-600">
        {fetchError ?? 'Proposal tidak ditemukan.'}
      </div>
    )
  }

  const isSent = proposal.sender_role === 'investor'
  const counterparty = proposal.counterparty ?? {}
  const sentDate = proposal.sent_at
    ? new Date(proposal.sent_at).toLocaleDateString('id-ID', { dateStyle: 'long' })
    : '—'
  const statusLabel = STATUS_LABEL[proposal.status] ?? proposal.status
  const statusStyle = STATUS_STYLES[proposal.status] ?? 'bg-[#f4f3ec] text-[#5f5a53]'

  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate('/investor/proposal')}
        className="mb-6 inline-flex items-center gap-2 text-[0.86rem] font-semibold text-[#5f5a53] transition hover:text-[#111111]"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Proposal
      </button>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        {/* Main */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                  {isSent ? 'Proposal Terkirim' : 'Permintaan Masuk'}
                </div>
                <h1 className="mt-2 text-[1.6rem] font-semibold leading-tight tracking-[-0.04em] text-[#111111]">
                  {proposal.title}
                </h1>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[0.75rem] font-semibold ${statusStyle}`}>
                ● {statusLabel}
              </span>
            </div>

            <div className="mb-5 flex flex-wrap gap-4 text-[0.82rem] text-[#8d877f]">
              <span>{isSent ? 'Ke' : 'Dari'}: <span className="font-semibold text-[#111111]">{counterparty.name}</span></span>
              {counterparty.subtitle && <span>{counterparty.subtitle}</span>}
              <span>Dikirim: {sentDate}</span>
              <span>ID: {proposal.proposal_id.slice(0, 8).toUpperCase()}</span>
            </div>

            <div className="rounded-xl bg-[#f4f3ec] p-4 text-[0.92rem] leading-7 text-[#5f5a53]">
              {proposal.message}
            </div>
          </div>

          {/* Attachments */}
          {proposal.attachments?.length > 0 && (
            <div className="rounded-2xl bg-white p-6">
              <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                Lampiran
              </div>
              <div className="space-y-3">
                {proposal.attachments.map((att) => (
                  <div key={att.attachment_id} className="flex items-center gap-3 rounded-xl bg-[#f4f3ec] px-4 py-3">
                    <div className="rounded bg-white px-1.5 py-0.5 text-[0.6rem] font-bold text-[#5f5a53]">
                      {att.mime_type === 'application/pdf' ? 'PDF' : 'FILE'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[0.88rem] font-semibold text-[#111111]">{att.original_name}</div>
                      <div className="text-[0.75rem] text-[#8d877f]">{formatBytes(att.file_size)}</div>
                    </div>
                    <a href={att.file_path} target="_blank" rel="noopener noreferrer">
                      <PressButton className="flex! items-center! gap-1.5! px-3! py-1.5! text-[0.78rem]!" variant="primary">
                        <Download className="h-3.5 w-3.5" />
                        Unduh
                      </PressButton>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Nilai */}
          <div className="rounded-2xl bg-white p-6">
            <div className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
              Detail Finansial
            </div>
            <div className="text-[2rem] font-semibold italic text-[#111111]">
              {formatRupiah(proposal.amount)}
            </div>
            <div className="mt-2 space-y-1 text-[0.82rem] text-[#5f5a53]">
              {proposal.tenor_months && <div>Tenor: <span className="font-semibold text-[#111111]">{proposal.tenor_months} bulan</span></div>}
              {proposal.scheme && <div>Skema: <span className="font-semibold text-[#111111]">{proposal.scheme}</span></div>}
              <div>Tipe: <span className="font-semibold text-[#111111]">{proposal.proposal_type}</span></div>
            </div>
          </div>

          {/* Counterparty */}
          <div className="rounded-2xl bg-white p-6">
            <div className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
              {isSent ? 'Penerima' : 'Pengirim'}
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#28557c] text-sm font-bold text-white">
                {(counterparty.name ?? '?').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-[#111111]">{counterparty.name ?? '—'}</div>
                {counterparty.subtitle && <div className="text-[0.82rem] text-[#8d877f]">{counterparty.subtitle}</div>}
              </div>
            </div>
          </div>

          {/* Draft CTA */}
          {proposal.status === 'draft' && (
            <div className="rounded-2xl bg-[#eaf6ee] border border-[#e5e4e0] p-5">
              <div className="text-[0.82rem] font-semibold text-[#205336] mb-2">Proposal masih Draft</div>
              <p className="text-[0.78rem] text-[#5f5a53] leading-relaxed mb-4">
                Klik "Kirim Proposal" untuk mengirimkan ke UMKM. Setelah dikirim, proposal tidak bisa diedit.
              </p>
              {sendError && <p className="mb-2 text-[0.75rem] text-red-600">{sendError}</p>}
              <PressButton
                variant="primary"
                className="w-full !flex !items-center !justify-center !gap-2"
                disabled={sending}
                onClick={() => setConfirmModal({
                  action: 'send',
                  title: 'Kirim Proposal?',
                  description: 'Proposal akan dikirim ke UMKM. Setelah dikirim, proposal tidak bisa diedit.',
                  confirmLabel: 'Ya, Kirim',
                  confirmVariant: 'primary',
                  successMessage: 'Proposal berhasil dikirim.',
                })}
              >
                <Send className="h-4 w-4" />
                {sending ? 'Mengirim...' : 'Kirim Proposal'}
              </PressButton>
            </div>
          )}

          {/* Actions — only for incoming proposals */}
          {!isSent && proposal.status === 'sent' && (
            <div className="space-y-2">
              {actionError && (
                <p className="text-[0.78rem] text-red-600">{actionError}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                <PressButton
                  className="w-full! justify-center! flex! items-center! gap-1.5!"
                  variant="danger"
                  disabled={!!actioning}
                  onClick={() => setConfirmModal({
                    action: 'reject',
                    title: 'Tolak Proposal?',
                    description: 'Proposal akan ditolak dan UMKM akan mendapat notifikasi.',
                    confirmLabel: 'Ya, Tolak',
                    confirmVariant: 'danger',
                    successMessage: 'Proposal berhasil ditolak.',
                  })}
                >
                  <CircleX className="h-4 w-4" />
                  Tolak
                </PressButton>
                <PressButton
                  className="w-full! justify-center! flex! items-center! gap-1.5!"
                  variant="primary"
                  disabled={!!actioning}
                  onClick={() => setConfirmModal({
                    action: 'accept',
                    title: 'Setujui Proposal?',
                    description: 'Proposal akan disetujui dan UMKM akan mendapat notifikasi.',
                    confirmLabel: 'Ya, Setujui',
                    confirmVariant: 'primary',
                    successMessage: 'Proposal berhasil disetujui.',
                  })}
                >
                  <CircleCheck className="h-4 w-4" />
                  Setuju
                </PressButton>
              </div>
            </div>
          )}
          {proposal.status === 'accepted' && (
            <PressButton variant="outline" disabled className="w-full! justify-center! flex! items-center! gap-1.5!">
              <CircleCheck className="h-4 w-4" />
              Diterima
            </PressButton>
          )}
          {proposal.status === 'rejected' && (
            <PressButton variant="outline" disabled className="w-full! justify-center! flex! items-center! gap-1.5!">
              <CircleX className="h-4 w-4" />
              Ditolak
            </PressButton>
          )}
        </div>
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
            onConfirm={() => {
              if (confirmModal.action === 'send') handleSend()
              else handleAction(confirmModal.action)
            }}
            onClose={() => setConfirmModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default InvestorProposalDetailPage
