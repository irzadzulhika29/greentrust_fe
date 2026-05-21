import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import InvestorOnboardingCareerStep from '@/features/auth/components/InvestorOnboardingCareerStep'
import InvestorOnboardingHeader from '@/features/auth/components/InvestorOnboardingHeader'
import InvestorOnboardingIdentityStep from '@/features/auth/components/InvestorOnboardingIdentityStep'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

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
  const [ktpFile, setKtpFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

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

  const handleIdentityNext = async () => {
    setSubmitError(null)
    setSubmitting(true)
    const token = localStorage.getItem('reg_session_token') ?? ''
    try {
      const body = new FormData()
      if (ktpFile) body.append('ktp_file', ktpFile)
      body.append('first_name', identityForm.firstName)
      body.append('last_name', identityForm.lastName)
      body.append('nik', identityForm.nikMasked.replace(/\s/g, ''))
      body.append('birth_place', identityForm.birthPlace)
      body.append('birth_date', identityForm.birthDate)
      body.append('address', identityForm.address ?? '')
      body.append('province', identityForm.province ?? '')
      body.append('city', identityForm.city ?? '')
      body.append('phone_number', identityForm.phone)
      body.append('email_contact', identityForm.notificationEmail)
      body.append('is_confirmed', 'true')

      const res = await apiFetch(`${BASE_API}/onboarding/identity`, {
        method: 'POST',
        headers: { 'X-Session-Token': token },
        body,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message ?? `Error ${res.status}`)
      if (json?.data?.session_token) {
        localStorage.setItem('reg_session_token', json.data.session_token)
      }
      setStep(2)
    } catch (err) {
      setSubmitError(err.message ?? 'Gagal menyimpan identitas. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCareerNext = async () => {
    setSubmitError(null)
    setSubmitting(true)
    const token = localStorage.getItem('reg_session_token') ?? ''
    try {
      const res = await apiFetch(`${BASE_API}/onboarding/investor/positions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token,
        },
        body: JSON.stringify({
          title: careerForm.roleTitle,
          institution_name: careerForm.institutionName,
          employment_type: careerForm.workType?.toLowerCase().replace('-', '_') ?? 'full_time',
          location: careerForm.location,
          start_date: careerForm.startDate,
          end_date: careerForm.isCurrent ? '' : careerForm.endDate,
          is_current: careerForm.isCurrent,
          description: careerForm.achievementSummary,
          skills: careerForm.skillTags,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message ?? `Error ${res.status}`)
      if (json?.data?.session_token) {
        localStorage.setItem('reg_session_token', json.data.session_token)
      }
      handleComplete()
    } catch (err) {
      setSubmitError(err.message ?? 'Gagal menyimpan profil. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
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
              <>
                {submitError && (
                  <p className="mb-3 text-[0.82rem] text-red-600">{submitError}</p>
                )}
                <InvestorOnboardingIdentityStep
                  onBack={() => navigate('/investor/register')}
                  onChange={handleIdentityChange}
                  onKtpFileChange={setKtpFile}
                  onNext={handleIdentityNext}
                  submitting={submitting}
                  values={identityForm}
                />
              </>
            ) : null}

            {step === 2 ? (
              <InvestorOnboardingCareerStep
                identityValues={identityForm}
                onBack={() => setStep(1)}
                onChange={handleCareerChange}
                onNext={handleCareerNext}
                onToggleSkill={handleSkillToggle}
                submitError={submitError}
                submitting={submitting}
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
