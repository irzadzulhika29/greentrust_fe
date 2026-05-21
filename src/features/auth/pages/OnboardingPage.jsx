import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, ShieldCheck, Upload } from 'lucide-react'

const progressSteps = [
  { number: 1, label: 'Identitas Diri', active: true },
  { number: 2, label: 'Identitas Bisnis', active: false },
  { number: 3, label: 'Selesai', active: false },
]

const initialFields = {
  firstName: 'Siti',
  lastName: 'Rahayu',
  nik: '3402 04 1204 86 2103',
  birthPlace: 'Bantul',
  birthDate: '12/04/1986',
  address: 'Jl. Imogiri Barat KM 7, RT 04 RW 02',
  province: 'DI Yogyakarta',
  city: 'Bantul',
  phone: '',
  email: '',
}

const fieldMeta = [
  { name: 'firstName', label: 'Nama Depan', auto: true, half: true },
  { name: 'lastName', label: 'Nama Belakang', auto: true, half: true },
  { name: 'nik', label: 'NIK (16 Digit)', auto: true, full: true, encrypted: true },
  { name: 'birthPlace', label: 'Tempat Lahir', auto: true, half: true },
  { name: 'birthDate', label: 'Tgl Lahir', auto: true, half: true },
  { name: 'address', label: 'Alamat', auto: true, full: true },
  { name: 'province', label: 'Provinsi', auto: true, half: true },
  { name: 'city', label: 'Kota / Kab.', auto: true, half: true },
  { name: 'phone', label: 'No. HP Aktif', manual: true, half: true, placeholder: '08xx xxxx xxxx' },
  { name: 'email', label: 'Email Notifikasi', manual: true, half: true, placeholder: 'nama@usaha.id' },
]

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [fields, setFields] = useState(initialFields)
  const [ktpFile, setKtpFile] = useState(null)
  const [ktpPreview, setKtpPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setKtpFile(file)
    setKtpPreview(URL.createObjectURL(file))
  }

  const completion = useMemo(() => {
    const total = fieldMeta.length
    const filled = fieldMeta.filter(({ name }) => fields[name]?.trim()).length
    return Math.round((filled / total) * 100)
  }, [fields])

  const handleChange = (name, value) => {
    setFields((current) => ({
      ...current,
      [name]: value,
    }))
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f6f2ea] text-[#1d211b]">
      <div className="flex h-full flex-col">
        <header className="border-b border-[#ddd6ca] bg-[#fbf8f2]">
          <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2b6840]/20 bg-white shadow-[0_10px_30px_rgba(24,40,24,0.08)]">
                <ShieldCheck className="h-4.5 w-4.5 text-[#1f6a43]" strokeWidth={2.1} />
              </div>
              <div className="text-[1.6rem] font-semibold tracking-[-0.045em] text-[#1f6a43]">
                GreenTrust <span className="text-[#353535]">Passport</span>
              </div>
            </div>

            <nav className="hidden items-center gap-3 lg:flex">
              {progressSteps.map((step, index) => (
                <div className="flex items-center gap-3" key={step.label}>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                      step.active
                        ? 'border-[#101310] bg-[#101310] text-white'
                        : 'border-[#d8d3ca] bg-[#f9f5ee] text-[#8f8a81]'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className={`text-[1rem] font-semibold ${step.active ? 'text-[#20241f]' : 'text-[#979188]'}`}>
                    {step.label}
                  </span>
                  {index < progressSteps.length - 1 && <div className="mx-1 h-px w-14 bg-[#ddd7cc]" />}
                </div>
              ))}
            </nav>

            <button
              className="inline-flex items-center gap-2 text-[0.98rem] font-semibold text-[#726d64] transition hover:text-[#1d211b]"
              onClick={() => navigate('/login')}
              type="button"
            >
              Keluar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col px-6 py-6 sm:px-8 lg:px-12">
          <div className="min-h-0 rounded-[28px] border border-[#e1dacd] bg-[#f7f3ec] p-6 shadow-[0_24px_60px_rgba(31,32,23,0.05)] lg:p-8">
            <div className="flex h-full min-h-0 flex-col">
              <div className="mb-6">
                <div className="text-[0.8rem] font-semibold uppercase tracking-[0.36em] text-[#749366]">
                  Langkah 1 dari 3
                </div>
                <h1
                  className="mt-3 text-xl leading-[0.95] tracking-[-0.06em] text-[#181816] lg:text-[4.25rem]"
                  style={{ fontFamily: 'Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif' }}
                >
                  Verifikasi identitas dengan foto KTP.
                </h1>
                <p className="max-w-[54rem] text-sm leading-8 text-[#5f5a53]">
                  Foto KTP Anda terenkripsi dan disimpan di bucket privat. AI mengisi otomatis nama, NIK, alamat, dan tanggal lahir
                  {' '}Anda tinggal koreksi bila perlu.
                </p>
              </div>

              <div className="grid min-h-0 flex-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                <section className="flex min-h-0 flex-col">
                  <div className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.34em] text-[#8c877d]">
                    Foto KTP
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {!ktpPreview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-3 rounded-[26px] border-2 border-dashed border-[#d8d3ca] bg-white px-6 py-12 text-center transition hover:border-[#2b6840]/40 hover:bg-[#f7f5f0]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ddd6ca] bg-[#f7f3ec]">
                        <Upload className="h-5 w-5 text-[#8c877d]" />
                      </div>
                      <div>
                        <div className="text-[0.95rem] font-semibold text-[#20201c]">Upload foto KTP</div>
                        <div className="mt-1 text-[0.78rem] text-[#9a958d]">JPG, PNG, atau PDF · maks 10 MB</div>
                      </div>
                    </button>
                  ) : (
                    <div className="rounded-[26px] border border-[#ddd6ca] bg-white p-4 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
                      <img
                        src={ktpPreview}
                        alt="Preview KTP"
                        className="w-full rounded-[16px] object-cover"
                        style={{ maxHeight: '160px', objectFit: 'cover' }}
                      />
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[#20201c] truncate max-w-[180px]">
                            {ktpFile?.name}
                          </div>
                          <div className="mt-0.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#9a958d]">
                            {ktpFile ? (ktpFile.size / 1024 / 1024).toFixed(1) + ' MB' : ''}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex h-9 items-center rounded-xl border border-[#ddd6ca] bg-[#fbfaf7] px-4 text-[0.82rem] font-semibold text-[#5c5a55] transition hover:border-[#cfc6b8] hover:bg-white flex-shrink-0"
                        >
                          Ganti foto
                        </button>
                      </div>
                    </div>
                  )}

                
                </section>

                <section className="flex min-h-0 flex-col">
                  <div className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.34em] text-[#8c877d]">
                    Hasil OCR — Periksa &amp; Koreksi
                  </div>

                  <div className="min-h-0 rounded-[26px] border border-[#ddd6ca] bg-white p-4 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
                    <div className="h-full overflow-y-auto pr-2">
                      <div className="grid gap-4 md:grid-cols-2">
                        {fieldMeta.map((field) => (
                          <div className={field.full ? 'md:col-span-2' : ''} key={field.name}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <label className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                                {field.label}
                              </label>
                              <div className="flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.22em]">
                                <span className={field.auto ? 'text-[#7da06f]' : 'text-[#c57b46]'}>
                                  {field.auto ? 'Auto' : 'Isi Manual'}
                                </span>
                                {field.encrypted && (
                                  <span className="inline-flex items-center gap-1 text-[#8e8a83]">
                                    <Lock className="h-3.5 w-3.5" />
                                    terenkripsi
                                  </span>
                                )}
                              </div>
                            </div>

                            <input
                              className="h-13 w-full rounded-2xl border border-[#d8d3ca] bg-[#fcfbf8] px-4 text-[1.02rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              placeholder={field.placeholder}
                              value={fields[field.name]}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <footer className="mt-6 flex flex-col gap-4 border-t border-[#e1dacd] pt-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="inline-flex items-center gap-2 text-[0.98rem] text-[#7a766e]">
                  <Lock className="h-4 w-4 text-[#8a857d]" />
                  File KTP PRIVATE · NIK terenkripsi AES-256 · tidak pernah tampil ke publik
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-full border border-[#ddd6ca] bg-[#fbf8f2] px-4 py-2 text-[0.9rem] font-semibold text-[#7c766d]">
                    Kelengkapan {completion}%
                  </div>
                  <button
                    className="inline-flex h-12 items-center rounded-2xl border border-[#d8d3ca] bg-[#fbfaf7] px-6 text-[1rem] font-semibold text-[#4f4c46] transition hover:border-[#cfc6b8] hover:bg-white"
                    type="button"
                  >
                    Kembali
                  </button>
                  <button
                    className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#111411] px-6 text-[1rem] font-semibold text-white shadow-[0_18px_35px_rgba(17,20,17,0.16)] transition hover:-translate-y-0.5 hover:bg-[#181d18]"
                    onClick={() => navigate('/umkm')}
                    type="button"
                  >
                    Konfirmasi &amp; Lanjut
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default OnboardingPage
