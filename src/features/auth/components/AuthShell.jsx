const AuthShell = ({
  leftPanel,
  rightEyebrow,
  rightTitle,
  rightCard,
  rightFooter,
  rightCardWrapperClassName = 'justify-end pr-6 xl:pr-12',
}) => {
  return (
    <div className="h-screen overflow-hidden bg-[#f6f2ea] text-[#1e241e]">
      <div className="grid h-screen lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="relative flex h-screen flex-col justify-between overflow-hidden border-b border-[#d6d1c7] px-6 py-4 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-5 xl:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,120,79,0.08),transparent_34%)]" />
          {leftPanel}
        </section>

        <section className="relative hidden overflow-hidden bg-[#143d28] lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,179,113,0.08),transparent_42%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(172,213,167,0.22)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#4f8a57]/12 blur-3xl" />

          <div className="relative z-10 flex h-screen w-full flex-col justify-between px-14 py-12 xl:px-16">
            <div className="max-w-[44rem]">
              {rightEyebrow ? (
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#9dbd90]">
                  {rightEyebrow}
                </div>
              ) : null}
              <h2 className={`${rightEyebrow ? 'mt-4' : ''} max-w-[14ch] text-[3.2rem] leading-[0.98] tracking-[-0.05em] text-[#f6f2ea] xl:text-[4rem]`}>
                {rightTitle}
              </h2>
            </div>

            <div className={`flex ${rightCardWrapperClassName}`}>
              {rightCard}
            </div>

            <div className="flex items-center justify-between text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#c6d8c4]">
              {rightFooter}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthShell
