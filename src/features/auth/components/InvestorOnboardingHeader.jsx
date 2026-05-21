import { motion } from 'framer-motion'
import primaryLogo from '@/assets/logo/primary-def.webp'

const STEPS = [
  { number: 1, label: 'Identitas Diri' },
  { number: 2, label: 'Riwayat Pekerjaan' },
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

          <nav className="hidden items-center gap-2 lg:flex">
            {STEPS.map((item, index) => {
              const state = item.number === step ? 'active' : item.number < step ? 'done' : 'idle'

              return (
                <div className="flex items-center gap-2" key={item.label}>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        backgroundColor:
                          state === 'active' ? '#101310' : state === 'done' ? '#205336' : '#ede8df',
                        color: state === 'idle' ? '#8f8a81' : '#ffffff',
                      }}
                      className="grid h-6 w-6 place-items-center rounded-full text-[0.72rem] font-semibold"
                      transition={{ duration: 0.35 }}
                    >
                      {item.number}
                    </motion.div>
                    <motion.span
                      animate={{
                        color: state === 'idle' ? '#979188' : '#20241f',
                        opacity: state === 'idle' ? 0.6 : 1,
                      }}
                      className="text-[0.88rem] font-semibold"
                      transition={{ duration: 0.35 }}
                    >
                      {item.label}
                    </motion.span>
                  </div>

                  {index < STEPS.length - 1 ? (
                    <div className="relative mx-1 h-px w-12 bg-[#ddd7cc]">
                      <motion.div
                        animate={{ width: step > item.number ? '100%' : '0%' }}
                        className="absolute inset-y-0 left-0 bg-[#205336]"
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      />
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-[0.82rem] font-medium text-[#9a9289]">Investor</span>
          <button
            className="text-[0.88rem] font-medium text-[#726d64] transition-colors duration-200 hover:text-[#1d211b]"
            onClick={onExit}
            type="button"
          >
            Keluar →
          </button>
        </div>
      </div>
    </header>
  )
}

export default InvestorOnboardingHeader
