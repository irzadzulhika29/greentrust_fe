import PressButton from '@/components/ui/PressButton'

const LoginForm = ({
  defaultEmail,
  defaultPassword = '',
  onSubmit,
  forgotLabel = 'Lupa?',
  submitLabel = 'Masuk',
  submitting = false,
  error = null,
}) => {
  return (
    <form className="mt-5 space-y-3.5" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-[0.7rem] font-medium text-[#7a746b]" htmlFor="email">
          Email
        </label>
        <input
          className="h-10.5 w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10"
          defaultValue={defaultEmail}
          id="email"
          name="email"
          type="email"
          required
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-[0.7rem] font-medium text-[#7a746b]" htmlFor="password">
            Password
          </label>
          <button className="text-[0.74rem] font-medium text-[#6d675f] transition-colors duration-200 hover:text-[#205336]" type="button">
            {forgotLabel}
          </button>
        </div>
        <input
          className="h-10.5 w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10"
          defaultValue={defaultPassword}
          id="password"
          name="password"
          type="password"
          required
        />
      </div>

      <label className="flex items-center gap-2.5 pt-0.5 text-[0.78rem] text-[#5f5a53]">
        <input
          className="h-3.5 w-3.5 rounded border-[#b9c7b5] text-[#2f6b47] focus:ring-[#2f6b47]"
          defaultChecked
          name="remember"
          type="checkbox"
        />
        <span>Ingat saya di perangkat ini</span>
      </label>

      {error && (
        <p className="text-[0.78rem] text-red-600">{error}</p>
      )}

      <PressButton type="submit" variant="primary" className="h-10.5 w-full text-[0.9rem]" disabled={submitting}>
        {submitting ? 'Memproses...' : submitLabel}
      </PressButton>
    </form>
  )
}

export default LoginForm
