import { Check } from 'lucide-react'

export const PassportPreviewCard = () => {
  return (
    <div className="relative w-[20rem] rotate-[4deg] rounded-[1.6rem] border border-[#d6bc9a] bg-[#fffaf2] p-5 text-[#26231d] shadow-[0_40px_80px_rgba(9,18,12,0.3)]">
      <div className="absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,243,232,0.98))]" />
      <div className="absolute inset-0 rounded-[1.6rem] opacity-40 [background-image:linear-gradient(90deg,rgba(120,120,120,0.06)_1px,transparent_1px)] [background-size:14px_100%]" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-[#8b8a83]">
              GreenTrust Passport
            </div>
            <div className="mt-0.5 text-[0.62rem] uppercase tracking-[0.3em] text-[#9e9a90]">
              Republik Indonesia · MVP
            </div>
          </div>
          <div className="h-16 w-16 rounded-full border border-dashed border-[#e5cfb6]" />
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-[7px] border-[#c4793a] bg-white">
            <span className="text-4xl font-semibold tracking-[-0.06em]">92</span>
            <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.28em] text-[#7d786e]">GRS / 100</span>
          </div>

          <div>
            <div className="text-[1.7rem] leading-none tracking-[-0.05em] text-[#2e2a25]">Kopi Bumi Toraja</div>
            <div className="mt-1.5 text-[0.88rem] text-[#736d64]">Marlon Tappi</div>
            <div className="mt-2 inline-flex rounded-full border border-[#f0c79f] bg-[#f9e7d3] px-2.5 py-0.5 text-[0.78rem] font-semibold text-[#c06d2d]">
              ★ Unggul
            </div>
          </div>
        </div>

        <div className="my-5 border-t border-dashed border-[#ddd3c5]" />

        <div className="flex items-end gap-4">
          <div className="grid h-16 w-16 grid-cols-5 gap-[3px] rounded-md bg-[#111] p-1">
            {Array.from({ length: 25 }).map((_, index) => (
              <span
                key={index}
                className={`rounded-[1px] ${index % 2 === 0 || index % 7 === 0 ? 'bg-white' : 'bg-black'}`}
              />
            ))}
          </div>

          <div className="space-y-1">
            <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8c877d]">
              greentrust.id/passport/
            </div>
            <div className="text-[1.1rem] font-semibold tracking-[-0.04em]">kopi-arabika-toraja</div>
            <div className="font-mono text-[0.72rem] text-[#5b8c52]">tx: 0x7f3b...a91c · 14 Apr 2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const StepListPreview = ({ steps }) => {
  return (
    <div className="w-full max-w-[46rem]">
      <div className="space-y-3">
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
            <div className={`flex items-center gap-3 rounded-[16px] border px-4 py-4 ${toneClass}`} key={step.number}>
              {badge}
              <div>
                <div className="mb-1 text-[0.9rem] font-semibold text-white/90">{step.title}</div>
                <div className="text-[0.82rem] text-emerald-100/70">{step.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
