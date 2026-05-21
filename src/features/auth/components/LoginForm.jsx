const LoginForm = ({
  defaultEmail,
  defaultPassword = '',
  onSubmit,
  forgotLabel = 'Lupa?',
  submitLabel = 'Masuk',
  secondaryLabel = 'Masuk dengan Google',
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

      <button
        className="h-10.5 w-full rounded-xl bg-[#101310] text-[0.9rem] font-semibold text-white transition-colors duration-200 hover:bg-[#171c17]"
        type="submit"
      >
        {submitLabel}
      </button>

      <div className="flex items-center gap-3 pt-0.5">
        <div className="h-px flex-1 bg-[#ddd7cd]" />
        <span className="text-[0.7rem] font-medium text-[#8d877f]">Atau</span>
        <div className="h-px flex-1 bg-[#ddd7cd]" />
      </div>

      <button
        className="h-10.5 w-full rounded-xl border border-[#d8d3ca] bg-white text-[0.88rem] font-medium text-[#171717] transition-colors duration-200 hover:bg-[#f4f3ec]"
        type="button"
      >
        {secondaryLabel}
      </button>
    </form>
  )
}

export default LoginForm
