import primaryLogo from '@/assets/logo/primary-def.webp'

const STEPS = [
  { number: 1, label: 'Identitas Diri' },
  { number: 2, label: 'Riwayat Pekerjaan' },
  { number: 3, label: 'Selesai' },
]

const InvestorOnboardingHeader = ({ step, onExit }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbf8f2]">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img alt="GreenTrust logo" className="h-8 w-8 object-contain" src={primaryLogo} />
            <div>
              <div className="text-[1.02rem] font-semibold leading-none text-[#205336]">
                GreenTrust <span className="text-[#4a4a46]">Passport</span>
              </div>
              <div className="mt-1 text-[0.56rem] font-semibold leading-none text-[#7d786f]">
                Republik Indonesia · MVP
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f0eb] px-3 py-1 text-[0.7rem] font-semibold text-[#205336]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#205336]" />
              Investor
            </span>

            <nav className="flex items-center gap-3">
              {STEPS.map((item, index) => {
                const state =
                  item.number === step ? 'active' : item.number < step ? 'done' : 'idle'

                return (
                  <div className="flex items-center gap-3" key={item.label}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`grid h-7 w-7 place-items-center rounded-full text-[0.78rem] font-semibold ${
                          state === 'active'
                            ? 'bg-[#101310] text-white'
                            : state === 'done'
                            ? 'bg-[#205336] text-white'
                            : 'bg-[#f3eee5] text-[#8f8a81]'
                        }`}
                      >
                        {item.number}
                      </div>
                      <span
                        className={`text-[0.9rem] font-semibold ${
                          state === 'idle' ? 'text-[#979188]' : 'text-[#20241f]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {index < STEPS.length - 1 ? <div className="h-px w-10 bg-[#ddd7cc]" /> : null}
                  </div>
                )
              })}
            </nav>
          </div>
        </div>

        <button
          className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-[#726d64] transition-colors duration-200 hover:text-[#1d211b]"
          onClick={onExit}
          type="button"
        >
          Keluar
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  )
}

export default InvestorOnboardingHeader
