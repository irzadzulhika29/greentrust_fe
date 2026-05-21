import InvestorProfilePreviewCard from '@/features/auth/components/InvestorProfilePreviewCard'

const summaryCardClassName =
  'rounded-[20px] border border-[#ddd6ca] bg-white p-4 shadow-[0_16px_32px_rgba(21,24,18,0.04)]'

const InvestorOnboardingCompleteStep = ({
  identityValues,
  careerValues,
  onBack,
  onContinue,
}) => {
  const fullName = [identityValues.firstName, identityValues.lastName].filter(Boolean).join(' ')

  return (
    <div className="grid h-full min-h-0 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <section className="flex min-h-0 flex-col">
        <div>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#749366]">
            Langkah 3 dari 3
          </div>
          <h1 className="mt-2 text-[2rem] italic leading-[0.98] tracking-[-0.045em] text-[#181816]">
            Profil investor Anda siap dipakai.
          </h1>
          <p className="mt-3 max-w-[36rem] text-[0.92rem] leading-6 text-[#5f5a53]">
            Identitas privat Anda sudah diverifikasi dan profil profesional Anda siap ditampilkan
            sebagai sinyal kepercayaan saat berinteraksi dengan UMKM.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <div className={summaryCardClassName}>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#8c877d]">
              Ringkasan identitas
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Nama
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">{fullName}</div>
              </div>
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Email notifikasi
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">
                  {identityValues.notificationEmail}
                </div>
              </div>
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  NIK
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">
                  {identityValues.nikMasked}
                </div>
              </div>
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Status
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#205336]">Terverifikasi</div>
              </div>
            </div>
          </div>

          <div className={summaryCardClassName}>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#8c877d]">
              Profil profesional
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Posisi
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">
                  {careerValues.roleTitle}
                </div>
              </div>
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Institusi
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">
                  {careerValues.institutionName}
                </div>
              </div>
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Tipe
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">
                  {careerValues.investorType}
                </div>
              </div>
              <div>
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
                  Tiket
                </div>
                <div className="mt-1 text-[0.95rem] font-semibold text-[#171717]">
                  {careerValues.ticketRange}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            className="inline-flex h-10 items-center rounded-xl border border-[#d8d3ca] bg-[#fbfaf7] px-5 text-[0.88rem] font-semibold text-[#4f4c46] transition-colors duration-200 hover:border-[#cfc6b8] hover:bg-white"
            onClick={onBack}
            type="button"
          >
            Kembali
          </button>
          <button
            className="inline-flex h-10 items-center rounded-xl bg-[#111411] px-5 text-[0.88rem] font-semibold text-white transition-colors duration-200 hover:bg-[#181d18]"
            onClick={onContinue}
            type="button"
          >
            Masuk ke Dashboard →
          </button>
        </div>
      </section>

      <section className="flex min-h-0 flex-col justify-center">
        <InvestorProfilePreviewCard careerValues={careerValues} identityValues={identityValues} />
      </section>
    </div>
  )
}

export default InvestorOnboardingCompleteStep
