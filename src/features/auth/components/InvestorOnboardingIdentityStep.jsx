import { useRef, useState } from 'react'
import { Lock, Upload } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import { apiFetch } from '@/lib/utils'

const N8N_URL = import.meta.env.VITE_N8N_URL

const identityFields = [
  { key: 'firstName', label: 'Nama depan', mode: 'auto', span: 'half' },
  { key: 'lastName', label: 'Nama belakang', mode: 'auto', span: 'half' },
  { key: 'nikMasked', label: 'NIK (16 digit)', mode: 'auto', span: 'full', encrypted: true },
  { key: 'birthPlace', label: 'Tempat lahir', mode: 'auto', span: 'half' },
  { key: 'birthDate', label: 'Tgl lahir', mode: 'auto', span: 'half' },
  { key: 'phone', label: 'No. HP aktif', mode: 'manual', span: 'half' },
  { key: 'notificationEmail', label: 'Email notifikasi', mode: 'manual', span: 'half' },
]

const toIsoDate = (raw = '') => {
  if (!raw) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
  const dmyMatch = raw.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/)
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2]}-${dmyMatch[1]}`
  const d = new Date(raw)
  if (!isNaN(d)) return d.toISOString().slice(0, 10)
  return ''
}

const splitFullName = (fullName = '') => {
  const normalized = fullName.trim().replace(/\s+/g, ' ')
  if (!normalized) return { firstName: '', lastName: '' }
  const [firstName, ...rest] = normalized.split(' ')
  return { firstName, lastName: rest.join(' ') }
}

const KtpCorners = () => (
  <>
    <span className="absolute left-4 top-4 h-6 w-6 rounded-tl border-l-2 border-t-2 border-[#205336]" />
    <span className="absolute right-4 top-4 h-6 w-6 rounded-tr border-r-2 border-t-2 border-[#205336]" />
    <span className="absolute bottom-4 left-4 h-6 w-6 rounded-bl border-b-2 border-l-2 border-[#205336]" />
    <span className="absolute bottom-4 right-4 h-6 w-6 rounded-br border-b-2 border-r-2 border-[#205336]" />
  </>
)

const InvestorOnboardingIdentityStep = ({ values, onChange, onBack, onNext, onKtpFileChange, submitting = false }) => {
  const fileRef = useRef(null)
  const cameraRef = useRef(null)
  const [ktpFile, setKtpFile] = useState(null)
  const [ktpPreviewUrl, setKtpPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const hasKtp = Boolean(values.ktpFileMeta)
  const isValid =
    hasKtp && identityFields.every((f) => String(values[f.key] ?? '').trim().length > 0)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (ktpPreviewUrl) URL.revokeObjectURL(ktpPreviewUrl)
    setKtpFile(file)
    setKtpPreviewUrl(URL.createObjectURL(file))
    setUploadDone(false)
    setUploadError(null)
    onChange('ktpFileMeta', {
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      confidence: null,
    })
    onKtpFileChange?.(file)
  }

  const handleVerify = async () => {
    if (!ktpFile) return
    setUploading(true)
    setUploadError(null)
    setUploadDone(false)
    try {
      const formData = new FormData()
      formData.append('ktp', ktpFile)
      const res = await apiFetch(`${N8N_URL}/upload-ktp`, { method: 'POST', body: formData })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const payload = await res.json()
      // Auto-fill fields from OCR
      const { firstName, lastName } = splitFullName(payload?.nama)
      if (firstName) onChange('firstName', firstName)
      if (lastName) onChange('lastName', lastName)
      if (payload?.nik) onChange('nikMasked', payload.nik)
      if (payload?.tempat_lahir) onChange('birthPlace', payload.tempat_lahir)
      if (payload?.tanggal_lahir) onChange('birthDate', toIsoDate(payload.tanggal_lahir))
      onChange('ktpFileMeta', {
        fileName: ktpFile.name,
        fileSize: `${(ktpFile.size / 1024 / 1024).toFixed(1)} MB`,
        confidence: payload?.confidence ? `${payload.confidence}%` : null,
      })
      setUploadDone(true)
    } catch (err) {
      setUploadError(err.message ?? 'Gagal mengunggah KTP. Coba lagi.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div className="grid h-full min-h-0 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col">
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
              <span className="text-[0.82rem] text-[#9a9289]">Langkah 1 dari 3</span>
            </div>

            <h1 className="text-[2.1rem] italic text-[#181816]">Verifikasi identitas Anda.</h1>
            <p className="mt-2.5 max-w-152 text-[0.9rem] text-[#5f5a53]">
              Identitas Anda dipakai untuk membangun kepercayaan dengan UMKM. File KTP terenkripsi
              dan tidak ditampilkan ke pihak lain.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {/* KTP upload area */}
            <input accept="image/*,.pdf" className="hidden" onChange={handleFileChange} ref={fileRef} type="file" />
            <input accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} ref={cameraRef} type="file" />

            {!ktpPreviewUrl ? (
              <div className="relative w-full overflow-hidden rounded-2xl aspect-[85.6/54]">
                {/* KTP skeleton */}
                <div className="flex h-full flex-col bg-[#f0ece4]">
                  <div className="flex items-center gap-2 bg-[#be2a2a]/25 px-3 py-2">
                    <div className="h-4 w-4 rounded-full bg-[#be2a2a]/30" />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="h-1.5 w-28 rounded-sm bg-[#be2a2a]/30" />
                      <div className="h-1 w-20 rounded-sm bg-[#be2a2a]/20" />
                    </div>
                  </div>
                  <div className="flex flex-1 gap-3 p-3">
                    <div className="flex w-[23%] shrink-0 flex-col gap-2">
                      <div className="flex-1 rounded-lg bg-[#ddd7cd]" />
                      <div className="h-3 rounded bg-[#ddd7cd]" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      {[28, 20, 24, 32, 20].map((w, i) => (
                        <div className="space-y-0.5" key={i}>
                          <div className="h-1 rounded-sm bg-[#c8c1b7]" style={{ width: `${w * 4}px` }} />
                          <div className="h-2 w-3/4 rounded bg-[#ddd7cd]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* upload overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/70">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <Upload className="h-4 w-4 text-[#1d211b]" />
                  </div>
                  <div className="text-center">
                    <div className="text-[0.88rem] font-semibold text-[#1d211b]">Unggah foto KTP</div>
                    <div className="mt-0.5 text-[0.75rem] text-[#7d786f]">JPG, PNG atau PDF · maks. 5 MB</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PressButton variant="primary" onClick={() => fileRef.current?.click()}>Pilih file</PressButton>
                   
                  </div>
                </div>
                <KtpCorners />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="group relative w-full overflow-hidden rounded-2xl aspect-[85.6/54] cursor-pointer" onClick={() => fileRef.current?.click()}>
                  {ktpFile?.type === 'application/pdf' ? (
                    <iframe src={ktpPreviewUrl} title="Preview KTP PDF" className="h-full w-full rounded-2xl border border-[#e8e4de]" />
                  ) : (
                    <img alt="Foto KTP" className="h-full w-full object-cover" src={ktpPreviewUrl} />
                  )}
                  <KtpCorners />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
                    <div className="scale-75 rounded-full bg-white/90 p-3 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      <Upload className="h-5 w-5 text-[#1d211b]" />
                    </div>
                  </div>
                </div>
                <span className="text-[0.75rem] text-[#7c766d]">
                  {values.ktpFileMeta?.fileName} · {values.ktpFileMeta?.fileSize}
                  {values.ktpFileMeta?.confidence ? ` · OCR conf. ${values.ktpFileMeta.confidence}` : null}
                </span>
              </div>
            )}

            {/* Verify button */}
            {ktpFile && !uploadDone && (
              <div>
                {!uploading && !uploadError && (
                  <button
                    type="button"
                    onClick={handleVerify}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#111411] px-5 text-[0.88rem] font-semibold text-white shadow-[0_18px_35px_rgba(17,20,17,0.16)] transition hover:-translate-y-0.5 hover:bg-[#181d18]"
                  >
                    Verifikasi KTP
                  </button>
                )}
                {uploading && (
                  <div className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#111411] px-5 text-[0.88rem] font-semibold text-white opacity-70">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Mengunggah ke OCR...
                  </div>
                )}
                {uploadError && (
                  <div className="space-y-2">
                    <p className="text-[0.75rem] text-red-600">{uploadError}</p>
                    <button type="button" onClick={handleVerify} disabled={uploading} className="inline-flex h-9 items-center rounded-xl border border-red-200 bg-red-50 px-4 text-[0.82rem] font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60">
                      Coba upload lagi
                    </button>
                  </div>
                )}
              </div>
            )}

            {uploadDone && (
              <div className="flex items-center gap-2 rounded-xl border border-[#d6e5d6] bg-[#dcebdc] px-4 py-2.5 text-[0.82rem] font-semibold text-[#3f6046]">
                <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                KTP berhasil diunggah — AI sedang memproses
              </div>
            )}

            <div className="rounded-2xl bg-[#eae5db] px-4 py-3 text-[0.82rem] text-[#5f5a53]">
              <span className="font-semibold text-[#1d211b]">Mengapa kami verifikasi:</span> UMKM
              perlu yakin bahwa investor yang menghubungi mereka adalah orang nyata dari institusi
              yang jelas. KTP tidak akan pernah tampil ke siapapun.
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col pb-20">
          <div className="mb-4">
            <span className="text-[0.82rem] font-medium text-[#8c877d]">
              Periksa & koreksi kembali data anda
            </span>
          </div>

          <div className="min-h-0 flex-1">
            <div className="grid gap-2.5 md:grid-cols-2">
              {identityFields.map((field) => (
                <div className={field.span === 'full' ? 'md:col-span-2' : ''} key={field.key}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <label className="text-[0.7rem] font-medium text-[#8d877f]">
                      {field.label}
                    </label>
                    <div className="flex items-center gap-2 text-[0.68rem] font-medium">
                      <span
                        className={field.mode === 'auto' ? 'text-[#7da06f]' : 'text-[#c57b46]'}
                      >
                        {field.mode === 'auto' ? 'auto' : 'isi manual'}
                      </span>
                      {field.encrypted ? (
                        <span className="inline-flex items-center gap-1 text-[#8e8a83]">
                          <Lock className="h-3 w-3" />
                          terenkripsi
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <input
                    className="h-10 w-full rounded-xl bg-[#ece8df] px-3.5 text-[0.9rem] text-[#1c1c1c] outline-none transition-colors focus:bg-[#e4dfd5] focus:ring-2 focus:ring-[#205336]/20"
                    onChange={(event) => onChange(field.key, event.target.value)}
                    type="text"
                    value={values[field.key]}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center pt-4">
            <div className="inline-flex items-center gap-2 text-[0.78rem] text-[#7d786f]">
              <Lock className="h-3.5 w-3.5" />
              KTP private · NIK AES-256 · tidak tampil ke UMKM
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-6 right-8 z-50 sm:right-12 lg:right-16">
        <PressButton disabled={!isValid || submitting} variant="primary" onClick={onNext}>
          {submitting ? 'Menyimpan...' : 'Konfirmasi & lanjut →'}
        </PressButton>
      </div>
    </>
  )
}

export default InvestorOnboardingIdentityStep
