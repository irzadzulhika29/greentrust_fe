import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// ─── Sub-components ───────────────────────────────────────────────────────────

const InputWrapper = ({ children }) => (
  <div
    className="rounded-xl transition-colors"
    style={{
      border: '1px solid var(--border)',
      background: 'var(--code-bg)',
    }}
    onFocusCapture={(e) => {
      e.currentTarget.style.borderColor = 'var(--accent-border)'
      e.currentTarget.style.background = 'var(--accent-bg)'
    }}
    onBlurCapture={(e) => {
      e.currentTarget.style.borderColor = 'var(--border)'
      e.currentTarget.style.background = 'var(--code-bg)'
    }}
  >
    {children}
  </div>
)

const TestimonialCard = ({ testimonial, delay }) => (
  <div
    className={`animate-testimonial ${delay} flex items-start gap-3 rounded-2xl p-4 w-64 flex-shrink-0`}
    style={{
      background: 'rgba(255,255,255,0.75)',
      border: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <img
      src={testimonial.avatarSrc}
      className="h-10 w-10 object-cover rounded-full flex-shrink-0"
      alt={testimonial.name}
    />
    <div className="text-sm leading-snug min-w-0">
      <p className="font-semibold truncate" style={{ color: 'var(--text-h)' }}>
        {testimonial.name}
      </p>
      <p className="text-xs mb-1" style={{ color: 'var(--text)' }}>
        {testimonial.handle}
      </p>
      <p className="text-xs" style={{ color: 'var(--text)' }}>
        {testimonial.text}
      </p>
    </div>
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────

const SignInPage = ({
  title = 'Welcome back',
  description = 'Masuk ke akun GreenTrust Anda',
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onResetPassword,
  onCreateAccount,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row w-full overflow-hidden">

      {/* ── Left: form ── */}
      <section className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">

            {/* Logo / brand */}
            <div className="animate-element animate-delay-100 flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-bg)', border: '1px solid var(--border)' }}
              >
                <span style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700 }}>G</span>
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-h)' }}>
                GreenTrust
              </span>
            </div>

            <div>
              <h1
                className="animate-element animate-delay-200 text-3xl font-semibold leading-tight mb-2"
                style={{ color: 'var(--text-h)', letterSpacing: '-0.5px' }}
              >
                {title}
              </h1>
              <p
                className="animate-element animate-delay-300 text-sm"
                style={{ color: 'var(--text)' }}
              >
                {description}
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={onSignIn}>

              {/* Email */}
              <div className="animate-element animate-delay-400 flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  Email
                </label>
                <InputWrapper>
                  <input
                    name="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    required
                    className="w-full bg-transparent text-sm px-4 py-3 rounded-xl focus:outline-none"
                    style={{ color: 'var(--text-h)' }}
                  />
                </InputWrapper>
              </div>

              {/* Password */}
              <div className="animate-element animate-delay-500 flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  Password
                </label>
                <InputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      required
                      className="w-full bg-transparent text-sm px-4 py-3 pr-12 rounded-xl focus:outline-none"
                      style={{ color: 'var(--text-h)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center"
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                      {showPassword
                        ? <EyeOff className="w-4 h-4" style={{ color: 'var(--text)' }} />
                        : <Eye className="w-4 h-4" style={{ color: 'var(--text)' }} />
                      }
                    </button>
                  </div>
                </InputWrapper>
              </div>

              {/* Remember + forgot */}
              <div className="animate-element animate-delay-600 flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--text)' }}>
                  <input type="checkbox" name="rememberMe" className="rounded" />
                  <span>Ingat saya</span>
                </label>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onResetPassword?.() }}
                  className="text-sm transition-colors hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  Lupa password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="animate-element animate-delay-700 w-full py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: 'var(--accent)',
                  color: '#ffffff',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Masuk
              </button>
            </form>

            {/* Register link */}
            <p
              className="animate-element animate-delay-800 text-center text-sm"
              style={{ color: 'var(--text)' }}
            >
              Belum punya akun?{' '}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onCreateAccount?.() }}
                className="font-medium hover:underline transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                Daftar sekarang
              </a>
            </p>

          </div>
        </div>
      </section>

      {/* ── Right: hero image + testimonials ── */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          />
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-6 w-full justify-center">
              <TestimonialCard testimonial={testimonials[0]} delay="animate-delay-1000" />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard testimonial={testimonials[1]} delay="animate-delay-1200" />
                </div>
              )}
            </div>
          )}
        </section>
      )}

    </div>
  )
}

export { SignInPage }
