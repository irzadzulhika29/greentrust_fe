import { Download, SendHorizonal, Inbox, CircleX, CircleCheck } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import { STATUS_STYLES, TYPE_STYLES } from '@/features/investor/constants/proposalConstants'

const ProposalCard = ({ p, onReject }) => {
  const isSent = p.direction === 'sent'
  const DirectionIcon = isSent ? SendHorizonal : Inbox

  return (
    <div className="rounded-2xl bg-white">
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-[0.82rem] text-[#5f5a53]">
            <DirectionIcon className="h-3.5 w-3.5 text-[#205336]" />
            <span>{isSent ? 'Anda kirim ke' : 'Diterima dari'}</span>
            <span className="font-semibold text-[#111111]">{isSent ? p.to : p.from}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${TYPE_STYLES[p.type] ?? 'bg-[#f4f3ec] text-[#5f5a53]'}`}
            >
              {p.type}
            </span>
          </div>
          <div className="mt-0.5 text-[0.68rem] text-[#8d877f]">
            {p.ref} · {p.date} · {p.time}
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[0.72rem] font-semibold ${STATUS_STYLES[p.status] ?? 'bg-[#f4f3ec] text-[#5f5a53]'}`}
        >
          ● {p.status}
        </span>
      </div>

      {/* Card body */}
      <div className="grid gap-5 px-5 pb-5 pt-3 lg:grid-cols-[minmax(0,1fr)_282px]">
        <div>
          <h3 className="mb-1.5 text-[1rem] font-semibold text-[#111111]">{p.title}</h3>
          <p className="mb-3.5 max-w-lg text-[0.82rem] leading-[1.55] text-[#5f5a53] line-clamp-2">
            {p.body}
          </p>
          <div className="flex w-fit items-center gap-3 rounded-xl bg-[#f4f3ec] px-3.5 py-2.5">
            <div className="rounded bg-white px-1.5 py-0.5 text-[0.6rem] font-bold text-[#5f5a53]">
              PDF
            </div>
            <div>
              <div className="text-[0.8rem] font-semibold text-[#111111]">{p.file.name}</div>
              <div className="text-[0.7rem] text-[#5f5a53]">{p.file.size}</div>
            </div>
            <PressButton
              className="ml-1 flex! items-center! gap-1.5! px-3! py-1.5! text-[0.75rem]!"
              variant="primary"
            >
              <Download className="h-3 w-3" />
              Unduh
            </PressButton>
          </div>
        </div>

        {/* Nilai + actions */}
        <div className="flex flex-col gap-2.5">
          <div className="rounded-xl bg-[#f4f3ec] p-3.5">
            <div className="mb-1.5 text-[0.62rem] font-medium text-[#8d877f]">NILAI</div>
            <div className="text-[1.35rem] font-semibold italic text-[#111111]">{p.nilai}</div>
            <div className="mt-1 text-[0.72rem] text-[#5f5a53]">
              {p.tenor} &nbsp; {p.terms}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {isSent ? (
              <>
                <PressButton className="w-full! justify-center!" variant="ghost">Edit</PressButton>
                <PressButton className="w-full! justify-center!" variant="ghost">Tarik kembali</PressButton>
              </>
            ) : (
              <>
                <PressButton
                  className="w-full! justify-center! flex! items-center! gap-1.5!"
                  variant="danger"
                  onClick={() => onReject(p)}
                >
                  <CircleX className="h-3.5 w-3.5" />
                  Tolak
                </PressButton>
                <PressButton
                  className="w-full! justify-center! flex! items-center! gap-1.5!"
                  variant="primary"
                >
                  <CircleCheck className="h-3.5 w-3.5" />
                  Setuju
                </PressButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalCard
