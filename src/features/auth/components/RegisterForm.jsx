import { Basic as OtpInput } from '@/components/ui/otp-input'
import PressButton from '@/components/ui/PressButton'

const RegisterForm = ({
  email,
  password,
  confirmPassword,
  onFieldChange,
  onSubmit,
  submitting,
  error,
  showOtp,
  otpVerifying,
  otpError,
  onOtpComplete,
  submitLabel,
  disableValidation = false,
}) => {
  if (showOtp) {
    return (
      <div className="mt-6">
        <OtpInput inline onComplete={onOtpComplete} />
        {otpVerifying ? (
          <p className="mt-3 text-[0.78rem] text-[#8d877f]">Memverifikasi kode...</p>
        ) : null}
        {otpError ? (
          <p className="mt-3 text-[0.75rem] font-medium text-red-600">{otpError}</p>
        ) : null}
      </div>
    )
  }

  return (
    <form className="mt-5 space-y-3.5" noValidate={disableValidation} onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-[0.7rem] font-medium text-[#7a746b]">
          Email aktif
        </label>
        <input
          className="h-10.5 w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10"
          onChange={(e) => onFieldChange('email', e.target.value)}
          placeholder="nama@usaha.id"
          required={!disableValidation}
          type="email"
          value={email}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-[0.7rem] font-medium text-[#7a746b]">
            Password
          </label>
          <input
            className="h-10.5 w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10"
            onChange={(e) => onFieldChange('password', e.target.value)}
            placeholder="Min. 8 karakter"
            required={!disableValidation}
            type="password"
            value={password}
          />
        </div>
        <div>
          <label className="mb-1 block text-[0.7rem] font-medium text-[#7a746b]">
            Konfirmasi
          </label>
          <input
            className="h-10.5 w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10"
            onChange={(e) => onFieldChange('confirm_password', e.target.value)}
            placeholder="Ulangi password"
            required={!disableValidation}
            type="password"
            value={confirmPassword}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-0.5 text-[0.73rem] font-medium text-[#7a746b]">
        <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5b8c52]" />
        8+ karakter · huruf besar · angka · simbol
      </div>

      {error ? <p className="text-[0.75rem] font-medium text-red-600">{error}</p> : null}

      <label className="grid grid-cols-[auto_1fr] gap-3 pt-1 text-[0.8rem] leading-5.5 text-[#5f5a53]">
        <input
          className="mt-1 h-4 w-4 rounded border-[#b9c7b5] text-[#2f6b47] accent-emerald-800 focus:ring-[#2f6b47]"
          required={!disableValidation}
          type="checkbox"
        />
        <span>
          Saya menyetujui{' '}
          <a className="font-semibold text-[#2d6d46] hover:text-[#1d4f32]" href="#">
            Ketentuan Layanan
          </a>{' '}
          dan{' '}
          <a className="font-semibold text-[#2d6d46] hover:text-[#1d4f32]" href="#">
            Kebijakan Privasi
          </a>
          . NIK saya akan terenkripsi AES-256 dan tidak pernah tampil ke publik.
        </span>
      </label>

      <PressButton type="submit" variant="primary" disabled={submitting} className="h-10.5 w-full text-[0.9rem]">
        {submitting ? 'Mendaftarkan...' : submitLabel}
      </PressButton>
    </form>
  )
}

export default RegisterForm
