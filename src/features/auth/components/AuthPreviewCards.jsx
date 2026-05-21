import { Check } from 'lucide-react'

export const PassportPreviewCard = () => {
  const fanCards = [
    {
      key: 'left',
      className:
        'left-0 top-[3.4rem] w-[19.25rem] -rotate-[16deg] opacity-78',
    },
    {
      key: 'center',
      className:
        'left-1/2 top-0 z-10 w-[23.5rem] -translate-x-1/2 rotate-[-2deg]',
    },
    {
      key: 'right',
      className:
        'right-0 top-[3.6rem] w-[19.25rem] rotate-[14deg] opacity-80',
    },
  ]

  return (
    <div className="relative h-[25rem] w-[30rem]">
      {fanCards.map((card) => (
        <div
          key={card.key}
          className={`absolute overflow-hidden rounded-[1.75rem] shadow-[0_34px_72px_rgba(9,18,12,0.28)] transition-transform duration-300 ${card.className}`}
        >
          <img
            src="/passport.svg"
            alt="Green Passport Preview"
            className="h-auto w-full"
            draggable={false}
          />
        </div>
      ))}
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
