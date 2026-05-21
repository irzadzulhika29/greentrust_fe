import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import OnboardingIdentitasDiri from '@/features/auth/components/OnboardingIdentitasDiri'
import OnboardingIdentitasBisnis from '@/features/auth/components/OnboardingIdentitasBisnis'

const STEPS = [
  { number: 1, label: 'Identitas Diri' },
  { number: 2, label: 'Identitas Bisnis' },
  { number: 3, label: 'Selesai' },
]

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [identitasDiri, setIdentitasDiri] = useState(null)

  const handleDiriNext = (fields) => {
    setIdentitasDiri(fields)
    setStep(2)
  }

  const handleBisnisNext = (fields) => {
    // TODO: submit identitasDiri + fields ke backend
    console.log('[Onboarding] identitas diri:', identitasDiri)
    console.log('[Onboarding] identitas bisnis:', fields)
    navigate('/umkm')
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f6f2ea] text-[#1d211b]">
      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="border-b border-[#ddd6ca] bg-[#fbf8f2]">
          <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2b6840]/20 bg-white shadow-[0_10px_30px_rgba(24,40,24,0.08)]">
                <ShieldCheck className="h-5 w-5 text-[#1f6a43]" strokeWidth={2.1} />
              </div>
              <div className="text-[1.6rem] font-semibold tracking-[-0.045em] text-[#1f6a43]">
                GreenTrust <span className="text-[#353535]">Passport</span>
              </div>
            </div>

            {/* Step indicator */}
            <nav className="hidden items-center gap-3 lg:flex">
              {STEPS.map((s, index) => (
                <div className="flex items-center gap-3" key={s.label}>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                      s.number === step
                        ? 'border-[#101310] bg-[#101310] text-white'
                        : s.number < step
                        ? 'border-[#2b6840] bg-[#2b6840] text-white'
                        : 'border-[#d8d3ca] bg-[#f9f5ee] text-[#8f8a81]'
                    }`}
                  >
                    {s.number < step ? (
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : s.number}
                  </div>
                  <span className={`text-[1rem] font-semibold ${s.number <= step ? 'text-[#20241f]' : 'text-[#979188]'}`}>
                    {s.label}
                  </span>
                  {index < STEPS.length - 1 && <div className="mx-1 h-px w-14 bg-[#ddd7cc]" />}
                </div>
              ))}
            </nav>

            <button
              className="inline-flex items-center gap-2 text-[0.98rem] font-semibold text-[#726d64] transition hover:text-[#1d211b]"
              onClick={() => navigate('/login')}
              type="button"
            >
              Keluar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col px-6 py-4 sm:px-8 lg:px-12">
          <div className="min-h-0 flex-1 rounded-[28px] border border-[#e1dacd] bg-[#f7f3ec] p-4 shadow-[0_24px_60px_rgba(31,32,23,0.05)] lg:p-6">
            <div className="flex h-full min-h-0 flex-col">
              {step === 1 && (
                <OnboardingIdentitasDiri
                  onNext={handleDiriNext}
                  onBack={() => navigate('/register')}
                />
              )}
              {step === 2 && (
                <OnboardingIdentitasBisnis
                  onNext={handleBisnisNext}
                  onBack={() => setStep(1)}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default OnboardingPage
