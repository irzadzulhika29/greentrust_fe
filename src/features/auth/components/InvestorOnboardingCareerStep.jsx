import InvestorProfilePreviewCard from '@/features/auth/components/InvestorProfilePreviewCard'

const WORK_TYPES = ['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Internship']
const SKILL_OPTIONS = [
  'Green Finance',
  'Due Diligence',
  'ESG Scoring',
  'Portfolio Mgmt',
  'Kerajinan',
  'Agrikultur',
]

const fieldClassName =
  'h-11 w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 text-[0.92rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10'

const labelClassName = 'mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#8d877f]'

const InvestorOnboardingCareerStep = ({
  identityValues,
  values,
  onChange,
  onToggleSkill,
  onBack,
  onNext,
}) => {
  return (
    <div className="grid h-full min-h-0 gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
      <section className="flex min-h-0 flex-col">
        <div className="mb-5">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#749366]">
            Langkah 2 dari 3
          </div>
          <h1 className="mt-2 text-[2rem] italic leading-[0.98] tracking-[-0.045em] text-[#181816]">
            Riwayat pekerjaan & institusi Anda.
          </h1>
          <p className="mt-3 max-w-[42rem] text-[0.92rem] leading-6 text-[#5f5a53]">
            Mirip seperti LinkedIn. Tambahkan posisi aktif yang paling relevan agar UMKM bisa melihat
            siapa Anda sebelum menerima proposal.
          </p>
        </div>

        <div className="min-h-0 flex-1 rounded-[24px] border border-[#ddd6ca] bg-white p-4 shadow-[0_16px_32px_rgba(21,24,18,0.04)]">
          <div className="flex items-center justify-between">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#7d90ab]">
              Tambah pengalaman baru
            </div>
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#8d877f]">
              * wajib diisi
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <label className={labelClassName}>Jabatan / Posisi</label>
              <input
                className={fieldClassName}
                onChange={(event) => onChange('roleTitle', event.target.value)}
                type="text"
                value={values.roleTitle}
              />
            </div>
            <div>
              <label className={labelClassName}>Tipe investor</label>
              <select
                className={fieldClassName}
                onChange={(event) => onChange('investorType', event.target.value)}
                value={values.investorType}
              >
                <option>VC / Modal Ventura</option>
                <option>Private Equity</option>
                <option>Lender</option>
              </select>
            </div>

            <div>
              <label className={labelClassName}>Institusi / Perusahaan</label>
              <input
                className={fieldClassName}
                onChange={(event) => onChange('institutionName', event.target.value)}
                type="text"
                value={values.institutionName}
              />
            </div>
            <div>
              <label className={labelClassName}>Lokasi</label>
              <input
                className={fieldClassName}
                onChange={(event) => onChange('location', event.target.value)}
                type="text"
                value={values.location}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClassName}>Jenis pekerjaan</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {WORK_TYPES.map((type) => {
                  const active = values.workType === type
                  return (
                    <button
                      className={`rounded-xl px-3 py-2 text-left text-[0.84rem] font-medium transition-colors duration-200 ${
                        active
                          ? 'bg-[#101310] text-white'
                          : 'bg-[#f8f4ee] text-[#57534e] hover:bg-[#f0ece4]'
                      }`}
                      key={type}
                      onClick={() => onChange('workType', type)}
                      type="button"
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className={labelClassName}>Mulai</label>
              <input
                className={fieldClassName}
                onChange={(event) => onChange('startDate', event.target.value)}
                type="text"
                value={values.startDate}
              />
            </div>
            <div>
              <label className={labelClassName}>Selesai</label>
              <div className="space-y-2">
                <input
                  className={fieldClassName}
                  disabled={values.isCurrent}
                  onChange={(event) => onChange('endDate', event.target.value)}
                  type="text"
                  value={values.isCurrent ? 'Sekarang' : values.endDate}
                />
                <label className="inline-flex items-center gap-2 text-[0.82rem] text-[#5f5a53]">
                  <input
                    checked={values.isCurrent}
                    className="h-4 w-4 rounded border-[#c8c0b4] accent-emerald-800"
                    onChange={(event) => onChange('isCurrent', event.target.checked)}
                    type="checkbox"
                  />
                  Sedang aktif
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClassName}>Deskripsi pencapaian</label>
              <textarea
                className="min-h-[110px] w-full rounded-xl border border-[#d8d3ca] bg-white px-3.5 py-3 text-[0.92rem] text-[#1c1c1c] outline-none transition-colors duration-200 focus:border-[#205336] focus:ring-4 focus:ring-[#205336]/10"
                onChange={(event) => onChange('achievementSummary', event.target.value)}
                value={values.achievementSummary}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClassName}>Skill terkait</label>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const active = values.skillTags.includes(skill)
                  return (
                    <button
                      className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors duration-200 ${
                        active
                          ? 'bg-[#e8f0eb] text-[#205336]'
                          : 'bg-[#f8f4ee] text-[#6a645c] hover:bg-[#efe9df]'
                      }`}
                      key={skill}
                      onClick={() => onToggleSkill(skill)}
                      type="button"
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className={labelClassName}>Rentang tiket</label>
              <input
                className={fieldClassName}
                onChange={(event) => onChange('ticketRange', event.target.value)}
                type="text"
                value={values.ticketRange}
              />
            </div>
            <div>
              <label className={labelClassName}>Fokus sektor / portofolio</label>
              <input
                className={fieldClassName}
                onChange={(event) => onChange('sectorFocus', event.target.value)}
                type="text"
                value={values.sectorFocus}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              className="inline-flex h-10 items-center rounded-xl border border-[#d8d3ca] bg-[#fbfaf7] px-5 text-[0.88rem] font-semibold text-[#4f4c46] transition-colors duration-200 hover:border-[#cfc6b8] hover:bg-white"
              onClick={onBack}
              type="button"
            >
              Batal
            </button>
            <button
              className="inline-flex h-10 items-center rounded-xl bg-[#111411] px-5 text-[0.88rem] font-semibold text-white transition-colors duration-200 hover:bg-[#181d18]"
              onClick={onNext}
              type="button"
            >
              Simpan pengalaman
            </button>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-col gap-4">
        <div>
          <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#8c877d]">
            Pratinjau kartu profil Anda
          </div>
          <InvestorProfilePreviewCard careerValues={values} identityValues={identityValues} />
        </div>

        <div className="rounded-[20px] border border-[#ddd6ca] bg-white p-4 shadow-[0_16px_32px_rgba(21,24,18,0.04)]">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#8c877d]">
            Timeline pengalaman (1 terdaftar)
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#efe9df] text-[0.72rem] font-semibold text-[#6f675d]">
                EH
              </div>
              <div>
                <div className="text-[0.88rem] font-semibold text-[#171717]">{values.roleTitle}</div>
                <div className="text-[0.8rem] text-[#5f5a53]">
                  {values.institutionName} · {values.startDate} — {values.isCurrent ? 'Present' : values.endDate}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#efe9df] text-[0.72rem] font-semibold text-[#6f675d]">
                BH
              </div>
              <div>
                <div className="text-[0.88rem] font-semibold text-[#171717]">Investment Analyst</div>
                <div className="text-[0.8rem] text-[#5f5a53]">BNI Hijau Desk · Feb 2020 — Mar 2023</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-[#e0ebf4] bg-[#f1f8ff] px-4 py-3 text-[0.82rem] leading-5 text-[#4f677d]">
          <span className="font-semibold text-[#2e5675]">Tips kredibilitas:</span> Minimal 2 posisi
          yang jelas akan membantu UMKM menilai relevansi investor lebih cepat.
        </div>
      </section>
    </div>
  )
}

export default InvestorOnboardingCareerStep
