import { Check } from 'lucide-react'

export const PassportPreviewCard = () => {
  return (
    <div className="relative w-[21.5rem] -rotate-3 rounded-[1.5rem] border border-[#d6bc9a] bg-[#fffaf2] px-4 py-[1.1rem] text-[#26231d] shadow-[0_40px_80px_rgba(9,18,12,0.3)]">
      <div className="absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,243,232,0.98))]" />
      <div className="absolute inset-0 rounded-[1.6rem] opacity-40 [background-image:linear-gradient(90deg,rgba(120,120,120,0.06)_1px,transparent_1px)] [background-size:14px_100%]" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[0.52rem] font-semibold uppercase tracking-[0.28em] text-[#8b8a83]">
              GreenTrust Passport
            </div>
            <div className="mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#9e9a90]">
              Republik Indonesia · MVP
            </div>
          </div>
          <div className="h-14 w-14 rounded-full border border-dashed border-[#e5cfb6]" />
        </div>

        <div className="mt-[1.1rem] grid grid-cols-[5.3rem_1fr] items-center gap-4">
          <div className="flex h-[5.3rem] w-[5.3rem] flex-col items-center justify-center rounded-full border-[6px] border-[#c4793a] bg-white">
            <span className="text-[2rem] font-semibold leading-none tracking-[-0.05em]">92</span>
            <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-[#7d786e]">GRS / 100</span>
          </div>

          <div className="min-w-0">
            <div className="text-[1.05rem] font-semibold leading-tight tracking-[-0.03em] text-[#2e2a25]">Kopi Bumi Toraja</div>
            <div className="mt-1 text-[0.75rem] text-[#736d64]">Marlon Tappi</div>
            <div className="mt-2 inline-flex rounded-full border border-[#f0c79f] bg-[#f9e7d3] px-2.5 py-0.5 text-[0.68rem] font-semibold text-[#c06d2d]">
              ★ Unggul
            </div>
          </div>
        </div>

        <div className="my-[1.1rem] border-t border-dashed border-[#ddd3c5]" />

        <div className="grid grid-cols-[4.4rem_1fr] items-end gap-4">
          <div className="grid h-[4.4rem] w-[4.4rem] grid-cols-5 gap-[3px] rounded-md bg-[#111] p-1">
            {Array.from({ length: 25 }).map((_, index) => (
              <span
                key={index}
                className={`rounded-[1px] ${index % 2 === 0 || index % 7 === 0 ? 'bg-white' : 'bg-black'}`}
              />
            ))}
          </div>

          <div className="space-y-1.5">
            <div className="text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[#8c877d]">
              greentrust.id/passport/
            </div>
            <div className="text-[0.95rem] font-semibold tracking-[-0.03em] text-[#2e2a25]">kopi-arabika-toraja</div>
            <div className="flex items-center justify-between gap-3 text-[0.62rem] text-[#6a8b63]">
              <span className="font-mono">tx: 0x7f3b...a91c</span>
              <span>14 Apr 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const StepListPreview = ({ steps, compact = false }) => {
  return (
    <div className={`w-full ${compact ? 'max-w-none' : 'max-w-[46rem]'}`}>
      <div className={compact ? 'space-y-2.5' : 'space-y-3'}>
        {steps.map((step) => {
          const toneClass =
            step.tone === 'active'
              ? 'bg-[#1A3D2A] border-[#234F36]'
              : step.tone === 'current'
                ? 'bg-[#163524] border-[#1E432E]'
                : 'bg-[#132D1F] border-[#1A3D2A]'

          const badge = step.tone === 'active'
            ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A1D0AA] text-[#112F20]">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )
            : step.tone === 'current'
              ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#112F20]">
                    {step.number}
                  </div>
                )
              : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#234F36] bg-[#1A3D2A] text-[10px] font-bold text-emerald-300/80">
                    {step.number}
                  </div>
                )

          return (
            <div
              className={`flex items-center ${compact ? 'gap-2.5 rounded-[14px] px-3.5 py-3' : 'gap-3 rounded-[16px] px-4 py-4'} border ${toneClass}`}
              key={step.number}
            >
              {badge}
              <div>
                <div className={`${compact ? 'mb-0.5 text-[0.82rem]' : 'mb-1 text-[0.9rem]'} font-semibold text-white/90`}>
                  {step.title}
                </div>
                <div className={`${compact ? 'text-[0.72rem]' : 'text-[0.82rem]'} text-emerald-100/70`}>
                  {step.desc}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
