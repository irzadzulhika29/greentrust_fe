import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import InvestorOnboardingCareerStep from '@/features/auth/components/InvestorOnboardingCareerStep'
import InvestorOnboardingHeader from '@/features/auth/components/InvestorOnboardingHeader'
import InvestorOnboardingIdentityStep from '@/features/auth/components/InvestorOnboardingIdentityStep'

const initialIdentityForm = {
  firstName: 'Arnold',
  lastName: 'Prasetyo',
  nikMasked: '3174 xx xxxx xx 1421',
  birthPlace: 'Jakarta',
  birthDate: '11/03/1988',
  phone: '0812 9988 7766',
  notificationEmail: 'arnold@ekuator.id',
  ktpFileMeta: {
    fileName: 'ktp-arnold.jpg',
    fileSize: '1.8 MB',
    confidence: '96%',
  },
}

const initialCareerForm = {
  roleTitle: 'Principal',
  institutionName: 'Ekuator Hijau Ventures',
  investorType: 'VC / Modal Ventura',
  workType: 'Full-time',
  location: 'Jakarta · Hybrid',
  startDate: 'Apr 2023',
  endDate: 'Sekarang',
  isCurrent: true,
  achievementSummary:
    'Mengelola portofolio 12 UMKM tekstil & agrikultur di Indonesia. Lead 4 deal pendanaan Seri-A dengan total tiket Rp 2.8 M. Fokus pada UMKM ekspor berorientasi ESG.',
  skillTags: ['Green Finance', 'Due Diligence', 'ESG Scoring', 'Portfolio Mgmt'],
  ticketRange: 'Rp 500jt — 5M',
  sectorFocus: ['Agrikultur', 'Tekstil & Batik'],
  approvalRate: '62%',
}

const CompleteOverlay = () => (
  <motion.div
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-[#f6f2ea]"
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      animate={{ scale: 1 }}
      className="flex h-20 w-20 items-center justify-center rounded-full bg-[#205336]"
      initial={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.15 }}
    >
      <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
        <motion.path
          animate={{ pathLength: 1 }}
          d="M8 20 L16 28 L32 12"
          initial={{ pathLength: 0 }}
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
    <motion.p
      animate={{ opacity: 1, y: 0 }}
      className="text-[0.9rem] text-[#7d786f]"
      initial={{ opacity: 0, y: 6 }}
      transition={{ delay: 0.8, duration: 0.3 }}
    >
      Profil disimpan, membuka dashboard...
    </motion.p>
  </motion.div>
)

const InvestorOnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showComplete, setShowComplete] = useState(false)
  const [identityForm, setIdentityForm] = useState(initialIdentityForm)
  const [careerForm, setCareerForm] = useState(initialCareerForm)

  const handleIdentityChange = (field, value) => {
    setIdentityForm((current) => ({ ...current, [field]: value }))
  }

  const handleCareerChange = (field, value) => {
    setCareerForm((current) => ({ ...current, [field]: value }))
  }

  const handleSkillToggle = (skill) => {
    setCareerForm((current) => ({
      ...current,
      skillTags: current.skillTags.includes(skill)
        ? current.skillTags.filter((item) => item !== skill)
        : [...current.skillTags, skill],
    }))
  }

  const handleComplete = () => {
    setShowComplete(true)
  }

  useEffect(() => {
    if (!showComplete) return
    const timer = setTimeout(() => navigate('/investor/dashboard'), 2000)
    return () => clearTimeout(timer)
  }, [showComplete, navigate])

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#1d211b]">
      <AnimatePresence>{showComplete ? <CompleteOverlay key="complete" /> : null}</AnimatePresence>

      <div className="flex min-h-screen flex-col">
        <InvestorOnboardingHeader step={step} onExit={() => navigate('/investor/login')} />

        <main className="mx-auto flex w-full max-w-350 flex-1 flex-col px-8 py-8 sm:px-12 lg:px-16">
          <div className="flex min-h-0 flex-1 flex-col">
            {step === 1 ? (
              <InvestorOnboardingIdentityStep
                onBack={() => navigate('/investor/register')}
                onChange={handleIdentityChange}
                onNext={() => setStep(2)}
                values={identityForm}
              />
            ) : null}

            {step === 2 ? (
              <InvestorOnboardingCareerStep
                identityValues={identityForm}
                onBack={() => setStep(1)}
                onChange={handleCareerChange}
                onNext={handleComplete}
                onToggleSkill={handleSkillToggle}
                values={careerForm}
              />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default InvestorOnboardingPage
