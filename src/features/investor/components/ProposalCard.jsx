import { useState } from 'react'
import { Download, SendHorizonal, Inbox, CircleX, CircleCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PressButton from '@/components/ui/PressButton'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { STATUS_STYLES, TYPE_STYLES } from '@/features/investor/constants/proposalConstants'
import { proposalAction } from '@/lib/utils'

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

const ProposalCard = ({ p, onStatusChange }) => {
  const isSent = p.direction === 'sent' || p.sender_role === 'investor'
  const counterparty = p.counterparty ?? {}
  const DirectionIcon = isSent ? SendHorizonal : Inbox
  const firstAttachment = p.attachments?.[0]
  const sentDate = p.sent_at
    ? new Date(p.sent_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'
  const sentTime = p.sent_at
    ? new Date(p.sent_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    : ''
  const statusLabel = STATUS_LABEL[p.status] ?? p.status
  const statusStyle = STATUS_STYLES[statusLabel] ?? 'bg-[#f4f3ec] text-[#5f5a53]'
  const typeStyle = TYPE_STYLES[p.proposal_type] ?? 'bg-[#f4f3ec] text-[#5f5a53]'

  const [actioning, setActioning] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)

  const handleAction = async (action) => {
    setActioning(action)
    setActionError(null)
    try {
      const updated = await proposalAction(p.proposal_id, action)
      onStatusChange?.(updated)
    } catch (err) {
      setActionError(err.message ?? 'Gagal. Coba lagi.')
    } finally {
      setActioning(null)
    }
  }

  return (
    <div className="rounded-2xl bg-white">
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-[0.82rem] text-[#5f5a53]">
            <DirectionIcon className="h-3.5 w-3.5 text-[#205336]" />
            <span>{isSent ? 'Anda kirim ke' : 'Diterima dari'}</span>
            <span className="font-semibold text-[#111111]">{counterparty.name ?? '—'}</span>
            <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${typeStyle}`}>
              {p.proposal_type}
            </span>
          </div>
          <div className="mt-0.5 text-[0.68rem] text-[#8d877f]">
            {p.proposal_id.slice(0, 8).toUpperCase()} · {sentDate} · {sentTime}
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-[0.72rem] font-semibold ${statusStyle}`}>
          ● {statusLabel}
        </span>
      </div>

      {/* Card body */}
      <div className="grid gap-5 px-5 pb-5 pt-3 lg:grid-cols-[minmax(0,1fr)_282px]">
        <div>
          <h3 className="mb-1.5 text-[1rem] font-semibold text-[#111111]">
            <Link to={`/investor/proposal/${p.proposal_id}`} className="hover:text-[#205336] transition-colors">
              {p.title}
            </Link>
          </h3>
          <p className="mb-3.5 max-w-lg text-[0.82rem] leading-[1.55] text-[#5f5a53] line-clamp-2">
            {p.message}
          </p>
          {firstAttachment && (
            <div className="flex w-fit items-center gap-3 rounded-xl bg-[#f4f3ec] px-3.5 py-2.5">
              <div className="rounded bg-white px-1.5 py-0.5 text-[0.6rem] font-bold text-[#5f5a53]">
                {firstAttachment.mime_type === 'application/pdf' ? 'PDF' : 'FILE'}
              </div>
              <div>
                <div className="text-[0.8rem] font-semibold text-[#111111]">{firstAttachment.original_name}</div>
                <div className="text-[0.7rem] text-[#5f5a53]">{formatBytes(firstAttachment.file_size)}</div>
              </div>
              <a href={firstAttachment.file_path} target="_blank" rel="noopener noreferrer">
                <PressButton className="ml-1 flex! items-center! gap-1.5! px-3! py-1.5! text-[0.75rem]!" variant="primary">
                  <Download className="h-3 w-3" />
                  Unduh
                </PressButton>
              </a>
            </div>
          )}
        </div>

        {/* Nilai + actions */}
        <div className="flex flex-col gap-2.5">
          <div className="rounded-xl bg-[#f4f3ec] p-3.5">
            <div className="mb-1.5 text-[0.62rem] font-medium text-[#8d877f]">NILAI</div>
            <div className="text-[1.35rem] font-semibold italic text-[#111111]">{formatRupiah(p.amount)}</div>
            <div className="mt-1 text-[0.72rem] text-[#5f5a53]">
              {p.tenor_months ? `${p.tenor_months} bln tenor` : ''}
              {p.scheme ? ` · ${p.scheme}` : ''}
            </div>
          </div>
          <Link
            to={`/investor/proposal/${p.proposal_id}`}
            className="inline-flex h-9 w-full items-center justify-center rounded-xl border border-[#e5e4e0] bg-white text-[0.82rem] font-semibold text-[#5f5a53] transition hover:border-[#205336] hover:text-[#205336]"
          >
            Lihat Detail
          </Link>
          <div className="grid grid-cols-2 gap-2">
            {isSent ? (
              <>
                <PressButton className="w-full! justify-center!" variant="ghost">Edit</PressButton>
                <PressButton className="w-full! justify-center!" variant="ghost">Tarik kembali</PressButton>
              </>
            ) : (
              <>
                {actionError && (
                  <p className="col-span-2 text-[0.72rem] text-red-600">{actionError}</p>
                )}
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
                  <CircleX className="h-3.5 w-3.5" />
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
                  <CircleCheck className="h-3.5 w-3.5" />
                  Setuju
                </PressButton>
              </>
            )}
          </div>
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
            onConfirm={() => handleAction(confirmModal.action)}
            onClose={() => setConfirmModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProposalCard
