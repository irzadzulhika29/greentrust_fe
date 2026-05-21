import { useEffect, useRef, useState } from 'react'
import PressButton from '@/components/ui/PressButton'
import InvestorProfilePreviewCard from '@/features/auth/components/InvestorProfilePreviewCard'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const WORK_TYPES = ['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Internship']
const SECTOR_OPTIONS = [
  'Agrikultur',
  'Tekstil & Batik',
  'Kerajinan',
  'Kuliner',
  'Ritel',
  'Jasa',
  'Lainnya',
]
const INVESTOR_TYPES = [
  'VC / Modal Ventura',
  'Private Equity',
  'Lender',
  'Angel Investor',
  'Family Office',
]

const inputClass =
  'h-10 w-full rounded-xl bg-[#ece8df] px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors focus:bg-[#e4dfd5] focus:ring-2 focus:ring-[#205336]/20'

const profilInputClass =
  'h-10 w-full rounded-xl bg-white/60 px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors focus:bg-white/90 focus:ring-2 focus:ring-[#205336]/20'

const labelClass = 'mb-1 block text-[0.7rem] font-medium text-[#8d877f]'

const InvestorOnboardingCareerStep = ({
  identityValues,
  values,
  onChange,
  onToggleSkill,
  onBack,
  onNext,
  submitting = false,
  submitError = null,
}) => {
  const sectorFocus = Array.isArray(values.sectorFocus) ? values.sectorFocus : []
  const [skillQuery, setSkillQuery] = useState('')
  const [skillSuggestions, setSkillSuggestions] = useState([])
  const [loadingSkills, setLoadingSkills] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (!skillQuery.trim()) {
      debounceRef.current = setTimeout(() => setSkillSuggestions([]), 0)
      return () => clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(async () => {
      setLoadingSkills(true)
      try {
        const res = await apiFetch(`${BASE_API}/onboarding/investor/skills?query=${encodeURIComponent(skillQuery)}`)
        const json = await res.json()
        if (json?.data) setSkillSuggestions(json.data)
      } catch {
        setSkillSuggestions([])
      } finally {
        setLoadingSkills(false)
      }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [skillQuery])

  const handleSectorToggle = (sector) => {
    if (sectorFocus.includes(sector)) {
      onChange('sectorFocus', sectorFocus.filter((s) => s !== sector))
    } else if (sectorFocus.length < 5) {
      onChange('sectorFocus', [...sectorFocus, sector])
    }
  }

  const handleSkillSelect = (skillName) => {
    if (!values.skillTags.includes(skillName)) {
      onToggleSkill(skillName)
    }
    setSkillQuery('')
    setSkillSuggestions([])
  }

  const progressItems = [
    Boolean(values.roleTitle?.trim()),
    Boolean(values.institutionName?.trim()),
    Boolean(values.investorType?.trim()),
    Boolean(values.startDate?.trim()),
    Boolean(values.achievementSummary?.trim()),
    Boolean(values.skillTags?.length),
    Boolean(sectorFocus.length),
    Boolean(values.ticketRange?.trim()),
  ]
  const progress = Math.round((progressItems.filter(Boolean).length / progressItems.length) * 100)
  const isValid = progressItems.every(Boolean)

  return (
    <>
      <div className="grid h-full min-h-0 gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="flex min-h-0 flex-col overflow-y-auto pb-24">
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-3">
              <button
                className="flex items-center gap-1.5 text-[0.82rem] font-medium text-[#7d786f] transition-colors hover:text-[#1d211b]"
                onClick={onBack}
                type="button"
              >
                ← Kembali
              </button>
              <span className="text-[#c5bfb5]">·</span>
              <span className="text-[0.82rem] text-[#9a9289]">Langkah 2 dari 3</span>
            </div>
            <h1 className="text-[2.1rem] italic text-[#181816]">
              Riwayat pekerjaan & institusi Anda.
            </h1>
            <p className="mt-2.5 text-[0.9rem] text-[#5f5a53]">
              Mirip seperti LinkedIn. Tambahkan posisi aktif yang paling relevan agar UMKM bisa
              melihat siapa Anda sebelum menerima proposal.
            </p>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Jabatan / Posisi</label>
              <input
                className={inputClass}
                onChange={(e) => onChange('roleTitle', e.target.value)}
                type="text"
                value={values.roleTitle}
              />
            </div>
            <div>
              <label className={labelClass}>Lokasi</label>
              <input
                className={inputClass}
                onChange={(e) => onChange('location', e.target.value)}
                type="text"
                value={values.location}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Institusi / Perusahaan</label>
              <input
                className={inputClass}
                onChange={(e) => onChange('institutionName', e.target.value)}
                type="text"
                value={values.institutionName}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Jenis pekerjaan</label>
              <div className="flex flex-wrap gap-2">
                {WORK_TYPES.map((type) => {
                  const active = values.workType === type
                  return (
                    <button
                      className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
                        active
                          ? 'bg-[#205336] text-white'
                          : 'bg-[#ece8df] text-[#6a645c] hover:bg-[#e4dfd5]'
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
              <label className={labelClass}>Mulai</label>
              <input
                className={inputClass}
                onChange={(e) => onChange('startDate', e.target.value)}
                type="date"
                value={values.startDate}
              />
            </div>
            <div>
              <label className={labelClass}>Selesai</label>
              <div className="space-y-2">
                <input
                  className={inputClass}
                  disabled={values.isCurrent}
                  onChange={(e) => onChange('endDate', e.target.value)}
                  type="date"
                  value={values.isCurrent ? '' : values.endDate}
                />
                <label className="inline-flex items-center gap-2 text-[0.82rem] text-[#5f5a53]">
                  <input
                    checked={values.isCurrent}
                    className="h-4 w-4 rounded accent-emerald-800"
                    onChange={(e) => onChange('isCurrent', e.target.checked)}
                    type="checkbox"
                  />
                  Sedang aktif
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Deskripsi pencapaian</label>
              <textarea
                className="min-h-[90px] w-full rounded-xl bg-[#ece8df] px-3.5 py-3 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors focus:bg-[#e4dfd5] focus:ring-2 focus:ring-[#205336]/20"
                onChange={(e) => onChange('achievementSummary', e.target.value)}
                value={values.achievementSummary}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Skill terkait</label>
              {/* Selected skills */}
              {values.skillTags.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {values.skillTags.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => onToggleSkill(skill)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#205336] px-3 py-1.5 text-[0.78rem] font-medium text-white transition-colors hover:bg-[#173f2b]"
                    >
                      {skill} ×
                    </button>
                  ))}
                </div>
              )}
              {/* Search input */}
              <div className="relative">
                <input
                  className={inputClass}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  placeholder="Cari skill... (contoh: Green Finance)"
                  type="text"
                  value={skillQuery}
                />
                {(loadingSkills || skillSuggestions.length > 0) && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-xl border border-[#ddd7cd] bg-white shadow-lg">
                    {loadingSkills ? (
                      <div className="px-4 py-3 text-[0.82rem] text-[#8d877f]">Mencari...</div>
                    ) : (
                      skillSuggestions.map((s) => (
                        <button
                          key={s.skill_id}
                          type="button"
                          onClick={() => handleSkillSelect(s.name)}
                          className="w-full px-4 py-2.5 text-left text-[0.88rem] text-[#1c1c1c] transition-colors hover:bg-[#f0ece4]"
                        >
                          {s.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#ece8df] p-4">
            <span className="text-[0.82rem] font-medium text-[#7d786f]">Profil investasi</span>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div>
                <label className={labelClass}>Tipe investor</label>
                <select
                  className={profilInputClass}
                  onChange={(e) => onChange('investorType', e.target.value)}
                  value={values.investorType}
                >
                  {INVESTOR_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Rentang tiket</label>
                <input
                  className={profilInputClass}
                  onChange={(e) => onChange('ticketRange', e.target.value)}
                  type="text"
                  value={values.ticketRange}
                />
              </div>

              <div className="col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <label className={labelClass}>Fokus sektor</label>
                  <span className="text-[0.68rem] text-[#9a9289]">
                    {sectorFocus.length}/5 dipilih
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SECTOR_OPTIONS.map((sector) => {
                    const active = sectorFocus.includes(sector)
                    const maxed = sectorFocus.length >= 5 && !active
                    return (
                      <button
                        className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
                          active
                            ? 'bg-[#205336] text-white'
                            : maxed
                              ? 'cursor-not-allowed bg-[#ddd7cd] text-[#9a9289]'
                              : 'bg-white/70 text-[#6a645c] hover:bg-white'
                        }`}
                        disabled={maxed}
                        key={sector}
                        onClick={() => handleSectorToggle(sector)}
                        type="button"
                      >
                        {sector}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col gap-4 overflow-y-auto pb-24 sticky top-0 self-start">
          <div>
            <div className="mt-3">
              <InvestorProfilePreviewCard careerValues={values} identityValues={identityValues} />
            </div>
          </div>

          <div className="rounded-2xl bg-[#e4f0e8] px-4 py-3 text-[0.82rem] text-[#4b6073]">
            <span className="font-semibold text-[#1d4f32]">Tips kredibilitas:</span> Minimal 2
            posisi yang jelas akan membantu UMKM menilai relevansi investor lebih cepat.
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#f6f2ea]/90 px-8 py-3 backdrop-blur-sm sm:px-12 lg:px-16">
        <div className="mx-auto flex max-w-350 items-center gap-5">
          <div className="flex flex-1 flex-col gap-1.5">
            {submitError && (
              <p className="text-[0.75rem] text-red-600">{submitError}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[0.75rem] font-medium text-[#7d786f]">Progres profil</span>
              <span className="text-[0.75rem] font-semibold text-[#1d211b]">{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ddd7cd]">
              <div
                className="h-full rounded-full bg-[#205336] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <PressButton disabled={!isValid || submitting} variant="primary" onClick={onNext}>
            {submitting ? 'Menyimpan...' : 'Simpan & lanjut →'}
          </PressButton>
        </div>
      </div>
    </>
  )
}

export default InvestorOnboardingCareerStep
