import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import AuthBrand from '@/features/auth/components/AuthBrand'
import AuthModeSwitch from '@/features/auth/components/AuthModeSwitch'
import { StepListPreview } from '@/features/auth/components/AuthPreviewCards'
import AuthShell from '@/features/auth/components/AuthShell'
import RegisterForm from '@/features/auth/components/RegisterForm'
import { apiFetch } from '@/lib/utils'

const investorSteps = [
  { number: '01', title: 'Verifikasi email', desc: 'Aktivasi akses investor dari kotak masuk Anda', tone: 'active' },
  { number: '02', title: 'Masuk ke direktori UMKM', desc: 'Mulai eksplorasi Green Passport yang tersedia', tone: 'current' },
  { number: '03', title: 'Buka breakdown dokumen', desc: 'Lihat indikator dan dokumen yang boleh diakses', tone: 'future' },
  { number: '04', title: 'Filter berdasarkan GRS', desc: 'Saring UMKM menurut tier dan fokus sektor', tone: 'future' },
]

const InvestorRegisterPage = () => {
  const navigate = useNavigate()
  const [showOtp, setShowOtp] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [otpError, setOtpError] = useState(null)
  const [otpVerifying, setOtpVerifying] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', confirm_password: '' })

  const handleFormChange = (field, value) => {
    setFormData((cur) => ({ ...cur, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirm_password) {
      setError('Password dan konfirmasi password tidak sama.')
      return
    }

    setSubmitting(true)
    try {
      const res = await apiFetch(`${import.meta.env.VITE_BASE_API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
          role: 'investor',
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.message ?? `Error ${res.status}`)
      }

      if (json?.data?.session_token) {
        localStorage.setItem('reg_session_token', json.data.session_token)
      }

      setShowOtp(true)
    } catch (err) {
      setError(err.message ?? 'Pendaftaran gagal. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleOtpComplete = async (code) => {
    setOtpError(null)
    setOtpVerifying(true)
    const token = localStorage.getItem('reg_session_token')

    try {
      const res = await apiFetch(`${import.meta.env.VITE_BASE_API}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': token ?? '',
        },
        body: JSON.stringify({ code }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.message ?? `Error ${res.status}`)
      }

      if (json?.data?.session_token) {
        localStorage.setItem('reg_session_token', json.data.session_token)
      }

      navigate('/investor/onboarding')
    } catch (err) {
      setOtpError(err.message ?? 'Kode OTP salah. Coba lagi.')
    } finally {
      setOtpVerifying(false)
    }
  }

  const leftPanel = (
    <>
      <div className="relative z-10">
        <AuthBrand />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col justify-center py-2 lg:mx-0">
        <div className="text-[0.75rem] font-semibold text-[#5b8c52]">Daftar gratis</div>
        <h1 className="mt-3 text-[2rem] leading-[1.03] tracking-[-0.04em] italic text-[#171717] sm:text-[2.45rem]">
          Buat akun investor Anda.
        </h1>
        <p className="mt-4 max-w-[31rem] text-[0.93rem] leading-6.5 text-[#5f5b55]">
          Pilih jalur investor untuk langsung masuk ke area eksplorasi Green Passport tanpa onboarding UMKM.
        </p>

        <AuthModeSwitch
          items={[
            { label: 'Pelaku UMKM', description: 'punya bisnis hijau', to: '/register', active: false },
            { label: 'Investor / Buyer', description: 'cari UMKM hijau', to: '/investor/register', active: true },
          ]}
          variant="detailed"
        />

        <RegisterForm
          confirmPassword={formData.confirm_password}
          email={formData.email}
          error={error}
          onFieldChange={handleFormChange}
          onOtpComplete={handleOtpComplete}
          onSubmit={handleSubmit}
          otpError={otpError}
          otpVerifying={otpVerifying}
          password={formData.password}
          showOtp={showOtp}
          submitLabel="Buat Akun Investor"
          submitting={submitting}
        />

        <div className="mt-4 text-center text-[0.82rem] text-[#656058]">
          Sudah punya akun?{' '}
          <Link
            className="inline-flex items-center gap-1 font-semibold text-[#2d6d46] transition-colors duration-200 hover:text-[#1d4f32]"
            to="/investor/login"
          >
            Masuk <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <AuthShell
      leftPanel={leftPanel}
      rightTitle={
        <>
          Setelah daftar, Anda akan melalui <span className="font-normal italic text-[#A1D0AA]">5 langkah</span> singkat.
        </>
      }
      rightCard={<StepListPreview compact steps={investorSteps} />}
      rightCardAbsoluteClassName="bottom-10 left-14 right-14 xl:left-16 xl:right-16"
      rightFooter={null}
    />
  )
}

export default InvestorRegisterPage
