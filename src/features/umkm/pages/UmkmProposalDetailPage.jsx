import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Send, CircleCheck, CircleX } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import { apiFetch, proposalAction } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

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

const UmkmProposalDetailPage = () => {
  const { proposalId } = useParams()
  const navigate = useNavigate()
  const [proposal, setProposal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const [actioning, setActioning] = useState(null)
  const [actionError, setActionError] = useState(null)

  const handleAction = async (action) => {
    setActioning(action)
    setActionError(null)
    try {
      const updated = await proposalAction(proposalId, action)
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
        if (json?.status?.isSuccess && json.data) setProposal(json.data)
        else throw new Error(json?.message ?? 'Proposal tidak ditemukan')
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false))
  }, [proposalId])

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

  if (loading) {
    return (
      <div className="px-8 py-12 text-center text-sm text-[#8d877f]">Memuat proposal...</div>
    )
  }

  if (fetchError || !proposal) {
    return (
      <div className="px-8 py-12 text-center text-sm text-red-600">{fetchError ?? 'Proposal tidak ditemukan.'}</div>
    )
  }

  const counterparty = proposal.counterparty ?? {}
  const sentDate = proposal.sent_at
    ? new Date(proposal.sent_at).toLocaleDateString('id-ID', { dateStyle: 'long' })
    : '—'
  const createdDate = proposal.created_at
    ? new Date(proposal.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })
    : '—'
  const statusLabel = proposal.status_label ?? proposal.status
  const statusStyle = STATUS_STYLES[proposal.status] ?? 'bg-[#f4f3ec] text-[#5f5a53]'
  const isDraft = proposal.status === 'draft'

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#e5e4e0] pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/umkm/proposal')}
            className="inline-flex items-center gap-2 text-[0.86rem] font-semibold text-[#5f5a53] transition hover:text-[#111111]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}>
            ● {statusLabel}
          </span>
        </div>
        {isDraft && (
          <div className="flex flex-col items-end gap-1">
            {sendError && <p className="text-[0.75rem] text-red-600">{sendError}</p>}
            <PressButton
              variant="primary"
              className="!flex !items-center !gap-2"
              disabled={sending}
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
              {sending ? 'Mengirim...' : 'Kirim Proposal'}
            </PressButton>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.9fr)]">
        {/* Main */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white border border-[#e5e4e0] p-6 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="mb-1 text-[0.68rem] font-semibold uppercase tracking-widest text-[#8d877f]">
              {proposal.proposal_code ?? proposal.proposal_id?.slice(0, 8).toUpperCase()}
            </div>
            <h1 className="text-[1.6rem] font-semibold leading-tight tracking-[-0.04em] text-[#111111] mb-4">
              {proposal.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-[0.82rem] text-[#8d877f] mb-5">
              <span>Dibuat: <span className="font-semibold text-[#111111]">{createdDate}</span></span>
              {proposal.sent_at && <span>Dikirim: <span className="font-semibold text-[#111111]">{sentDate}</span></span>}
              <span>Tipe: <span className="font-semibold text-[#111111]">{proposal.proposal_type_label ?? proposal.proposal_type}</span></span>
            </div>

            <div className="rounded-xl bg-[#f4f3ec] p-4 text-[0.92rem] leading-7 text-[#5f5a53]">
              {proposal.message || <span className="italic text-[#b0aaa2]">Tidak ada pesan.</span>}
            </div>
          </div>

          {/* Attachments */}
          {proposal.attachments?.length > 0 && (
            <div className="rounded-2xl bg-white border border-[#e5e4e0] p-6 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
              <div className="mb-4 text-[0.68rem] font-semibold uppercase tracking-widest text-[#8d877f]">Lampiran</div>
              <div className="space-y-3">
                {proposal.attachments.map((att) => (
                  <div key={att.attachment_id} className="flex items-center gap-3 rounded-xl bg-[#f4f3ec] px-4 py-3">
                    <div className="rounded bg-white px-1.5 py-0.5 text-[0.6rem] font-bold text-[#5f5a53] border border-[#e5e4e0]">
                      {att.mime_type === 'application/pdf' ? 'PDF' : 'FILE'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[0.88rem] font-semibold text-[#111111]">{att.original_name}</div>
                      <div className="text-[0.75rem] text-[#8d877f]">{formatBytes(att.file_size)}</div>
                    </div>
                    <a href={att.file_path} target="_blank" rel="noopener noreferrer">
                      <PressButton variant="primary" className="!flex !items-center !gap-1.5 !px-3 !py-1.5 !text-xs">
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
          {/* Finansial */}
          <div className="rounded-2xl bg-white border border-[#e5e4e0] p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-widest text-[#8d877f]">Detail Finansial</div>
            <div className="text-[2rem] font-semibold italic text-[#111111]">{formatRupiah(proposal.amount)}</div>
            <div className="mt-2 space-y-1 text-[0.82rem] text-[#5f5a53]">
              {proposal.tenor_months && <div>Tenor: <span className="font-semibold text-[#111111]">{proposal.tenor_months} bulan</span></div>}
              {proposal.scheme && <div>Skema: <span className="font-semibold text-[#111111]">{proposal.scheme}</span></div>}
            </div>
          </div>

          {/* Counterparty */}
          <div className="rounded-2xl bg-white border border-[#e5e4e0] p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-widest text-[#8d877f]">Tujuan</div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#28557c] text-sm font-bold text-white">
                {(counterparty.name ?? '?').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-[#111111]">{counterparty.name ?? '—'}</div>
                {counterparty.subtitle && <div className="text-[0.82rem] text-[#8d877f]">{counterparty.subtitle}</div>}
              </div>
            </div>
            {proposal.status === 'sent' && proposal.sender_role === 'umkm' && (
              <div className="mt-4">
                <PressButton variant="outline" disabled className="w-full !flex !items-center !justify-center !gap-2">
                  <Send className="h-4 w-4" />
                  Terkirim
                </PressButton>
              </div>
            )}
          </div>

          {/* Incoming proposal actions */}
          {proposal.status === 'sent' && proposal.receiver_role === 'umkm' && (
            <div className="rounded-2xl bg-white border border-[#e5e4e0] p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
              <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-widest text-[#8d877f]">Tindakan</div>
              {actionError && <p className="mb-2 text-[0.75rem] text-red-600">{actionError}</p>}
              <div className="grid grid-cols-2 gap-3">
                <PressButton
                  variant="danger"
                  className="w-full !flex !items-center !justify-center !gap-1.5"
                  disabled={!!actioning}
                  onClick={() => handleAction('reject')}
                >
                  <CircleX className="h-4 w-4" />
                  {actioning === 'reject' ? 'Menolak...' : 'Tolak'}
                </PressButton>
                <PressButton
                  variant="primary"
                  className="w-full !flex !items-center !justify-center !gap-1.5"
                  disabled={!!actioning}
                  onClick={() => handleAction('accept')}
                >
                  <CircleCheck className="h-4 w-4" />
                  {actioning === 'accept' ? 'Menyetujui...' : 'Terima'}
                </PressButton>
              </div>
            </div>
          )}
          {proposal.status === 'accepted' && (
            <PressButton variant="outline" disabled className="w-full !flex !items-center !justify-center !gap-2">
              <CircleCheck className="h-4 w-4" />
              Diterima
            </PressButton>
          )}
          {proposal.status === 'rejected' && (
            <PressButton variant="outline" disabled className="w-full !flex !items-center !justify-center !gap-2">
              <CircleX className="h-4 w-4" />
              Ditolak
            </PressButton>
          )}
          {isDraft && (
            <div className="rounded-2xl bg-[#eaf6ee] border border-[#e5e4e0] p-5">
              <div className="text-[0.82rem] font-semibold text-[#205336] mb-2">Proposal masih Draft</div>
              <p className="text-[0.78rem] text-[#5f5a53] leading-relaxed mb-4">
                Klik "Kirim Proposal" untuk mengirimkan ke investor. Setelah dikirim, proposal tidak bisa diedit.
              </p>
              {sendError && <p className="mb-2 text-[0.75rem] text-red-600">{sendError}</p>}
              <PressButton
                variant="primary"
                className="w-full !flex !items-center !justify-center !gap-2"
                disabled={sending}
                onClick={handleSend}
              >
                <Send className="h-4 w-4" />
                {sending ? 'Mengirim...' : 'Kirim Proposal'}
              </PressButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UmkmProposalDetailPage
