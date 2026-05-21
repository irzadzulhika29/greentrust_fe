import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import AuthBrand from '@/features/auth/components/AuthBrand'
import AuthModeSwitch from '@/features/auth/components/AuthModeSwitch'
import { PassportPreviewCard } from '@/features/auth/components/AuthPreviewCards'
import AuthShell from '@/features/auth/components/AuthShell'
import LoginForm from '@/features/auth/components/LoginForm'
import { apiFetch, getAuthPayload } from '@/lib/utils'

const statItems = [
  { label: 'PASSPORT AKTIF', value: '128' },
  { label: 'HASH ON-CHAIN', value: '7,418' },
]

const LoginPage = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())

    setSubmitting(true)
    try {
      const res = await apiFetch(`${import.meta.env.VITE_BASE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.message ?? `Error ${res.status}`)
      }
      const token = json?.data?.token
      if (token) {
        localStorage.setItem('auth_token', token)
      }
      const payload = getAuthPayload()
      if (payload?.RoleName === 'investor') {
        navigate('/investor')
      } else {
        navigate('/umkm')
      }
    } catch (err) {
      setError(err.message ?? 'Login gagal. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  const leftPanel = (
    <>
      <div className="relative z-10">
        <AuthBrand />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col justify-center py-2 lg:mx-0">
        <div className="text-[0.75rem] font-semibold text-[#5b8c52]">Masuk akun</div>
        <h1 className="mt-3 text-[2rem] leading-[1.03] tracking-[-0.04em] italic text-[#171717] sm:text-[2.45rem]">
          Selamat datang kembali.
        </h1>
        <p className="mt-4 max-w-[31rem] text-[0.93rem] leading-6.5 text-[#5f5b55]">
          Lanjutkan dokumentasi hijau bisnis Anda, atau telusuri UMKM terverifikasi.
        </p>

        <AuthModeSwitch
          items={[
            { label: 'Pelaku UMKM', description: 'punya bisnis hijau', to: '/login', active: true },
            { label: 'Investor / Buyer', description: 'cari UMKM hijau', to: '/investor/login', active: false },
          ]}
          variant="detailed"
        />

        <LoginForm
          onSubmit={handleSignIn}
          submitting={submitting}
          error={error}
        />

        <div className="mt-4 text-center text-[0.82rem] text-[#656058]">
          Belum punya akun?{' '}
          <button
            className="font-semibold text-[#2d6d46] transition-colors duration-200 hover:text-[#1d4f32]"
            onClick={() => navigate('/register')}
            type="button"
          >
            Daftar sekarang →
          </button>
        </div>
      </div>
    </>
  )

  return (
    <AuthShell
      leftPanel={leftPanel}
      rightTitle={
        <>
          Praktik hijau bukan janji, melainkan{' '}
          <span className="font-normal text-[#9ec27f] italic">nota, foto, dan hash</span> yang bisa diperiksa.
        </>
      }
      rightCard={<PassportPreviewCard />}
      rightFooter={statItems.map((item) => (
        <div className="flex items-center gap-3" key={item.label}>
          <Leaf className="h-3 w-3 fill-current" />
          <span>
            {item.value} {item.label}
          </span>
        </div>
      ))}
    />
  )
}

export default LoginPage
