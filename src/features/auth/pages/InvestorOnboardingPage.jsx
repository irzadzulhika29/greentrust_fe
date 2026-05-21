import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InvestorOnboardingCareerStep from '@/features/auth/components/InvestorOnboardingCareerStep'
import InvestorOnboardingCompleteStep from '@/features/auth/components/InvestorOnboardingCompleteStep'
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
  sectorFocus: '12 UMKM',
  approvalRate: '62%',
}

const InvestorOnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
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

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#1d211b]">
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
                onNext={() => setStep(3)}
                onToggleSkill={handleSkillToggle}
                values={careerForm}
              />
            ) : null}

            {step === 3 ? (
              <InvestorOnboardingCompleteStep
                careerValues={careerForm}
                identityValues={identityForm}
                onBack={() => setStep(2)}
                onContinue={() => navigate('/investor/dashboard')}
              />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default InvestorOnboardingPage
