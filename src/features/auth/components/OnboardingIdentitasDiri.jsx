import { useRef, useState } from 'react'
import { Lock, Upload } from 'lucide-react'
import { apiFetch } from '@/lib/utils'

const initialFields = {
  firstName: '',
  lastName: '',
  nik: '',
  birthPlace: '',
  birthDate: '',
  address: '',
  province: '',
  city: '',
  phone: '',
  email: '',
}

const fieldMeta = [
  { name: 'firstName', label: 'Nama Depan', auto: true, half: true },
  { name: 'lastName', label: 'Nama Belakang', auto: true, half: true },
  { name: 'nik', label: 'NIK (16 Digit)', auto: true, full: true, encrypted: true },
  { name: 'birthPlace', label: 'Tempat Lahir', auto: true, half: true },
  { name: 'birthDate', label: 'Tgl Lahir', auto: true, half: true, type: 'date' },
  { name: 'address', label: 'Alamat', auto: true, full: true },
  { name: 'province', label: 'Provinsi', auto: true, half: true },
  { name: 'city', label: 'Kota / Kab.', auto: true, half: true },
  { name: 'phone', label: 'No. HP Aktif', manual: true, half: true, placeholder: '08xx xxxx xxxx' },
  { name: 'email', label: 'Email Notifikasi', manual: true, half: true, placeholder: 'nama@usaha.id' },
]

const splitFullName = (fullName = '') => {
  const normalized = fullName.trim().replace(/\s+/g, ' ')
  if (!normalized) return { firstName: '', lastName: '' }
  const [firstName, ...rest] = normalized.split(' ')
  return { firstName, lastName: rest.join(' ') }
}

// Normalize various date formats to YYYY-MM-DD for <input type="date">
const toIsoDate = (raw = '') => {
  if (!raw) return ''
  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
  // DD-MM-YYYY or DD/MM/YYYY
  const dmyMatch = raw.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/)
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2]}-${dmyMatch[1]}`
  // Fallback: let Date parse it
  const d = new Date(raw)
  if (!isNaN(d)) return d.toISOString().slice(0, 10)
  return ''
}

const buildAddress = (alamat) => {
  if (!alamat || typeof alamat !== 'object') return ''
  const mainAddress = [
    alamat.jalan,
    alamat.rt && alamat.rw ? `RT ${alamat.rt} RW ${alamat.rw}` : '',
  ].filter(Boolean).join(', ')
  const area = [alamat.kel_desa, alamat.kecamatan].filter(Boolean).join(', ')
  return [mainAddress, area].filter(Boolean).join(' · ')
}

/**
 * Props:
 *   onNext(fields) — called when user confirms and wants to proceed
 *   onBack()       — called when user clicks Kembali
 */
const OnboardingIdentitasDiri = ({ onNext, onBack }) => {
  const [fields, setFields] = useState(initialFields)
  const [ktpFile, setKtpFile] = useState(null)
  const [ktpPreview, setKtpPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadDone, setUploadDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const fileInputRef = useRef(null)

  const handleConfirm = async () => {
    setSubmitError(null)
    setSubmitting(true)
    const token = localStorage.getItem('reg_session_token')
    try {
      const body = new FormData()
      if (ktpFile) body.append('ktp_file', ktpFile)
      body.append('first_name', fields.firstName)
      body.append('last_name', fields.lastName)
      body.append('nik', fields.nik)
      body.append('birth_place', fields.birthPlace)
      body.append('birth_date', fields.birthDate)
      body.append('address', fields.address)
      body.append('province', fields.province)
      body.append('city', fields.city)
      body.append('phone_number', fields.phone)
      body.append('email_contact', fields.email)
      body.append('is_confirmed', 'true')

      const res = await apiFetch(`${import.meta.env.VITE_BASE_API}/onboarding/identity`, {
        method: 'POST',
        headers: {
          'X-Session-Token': token ?? '',
        },
        body,
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.message ?? `Error ${res.status}`)
      }
      if (json?.data?.session_token) {
        localStorage.setItem('reg_session_token', json.data.session_token)
      }
      onNext({ ...fields, identityId: json?.data?.identity_id })
    } catch (err) {
      setSubmitError(err.message ?? 'Gagal menyimpan identitas. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (name, value) =>
    setFields((cur) => ({ ...cur, [name]: value }))

  const applyOcrResult = (result) => {
    const { firstName, lastName } = splitFullName(result?.nama)
    setFields((cur) => ({
      ...cur,
      firstName: firstName || cur.firstName,
      lastName: lastName || cur.lastName,
      nik: result?.nik || cur.nik,
      birthPlace: result?.tempat_lahir || cur.birthPlace,
      birthDate: toIsoDate(result?.tanggal_lahir) || cur.birthDate,
      address: buildAddress(result?.alamat) || cur.address,
      province: result?.provinsi || cur.province,
      city: result?.kota_kabupaten || cur.city,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setKtpFile(file)
    setKtpPreview(URL.createObjectURL(file))
    setUploadError(null)
    setUploadDone(false)
  }

  const handleVerify = async () => {
    if (!ktpFile) return
    setUploading(true)
    setUploadError(null)
    setUploadDone(false)
    const url = `${import.meta.env.VITE_N8N_URL}/upload-ktp`
    console.log('[KTP] POST →', url, ktpFile.name)
    try {
      const formData = new FormData()
      formData.append('ktp', ktpFile)
      const res = await apiFetch(url, { method: 'POST', body: formData })
      console.log('[KTP] status', res.status)
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const payload = await res.json()
      console.log('[KTP] payload', payload)
      applyOcrResult(payload)
      setUploadDone(true)
    } catch (err) {
      console.error('[KTP] error', err)
      setUploadError(err.message ?? 'Gagal mengunggah KTP. Coba lagi.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Left — heading + KTP upload */}
      <section className="flex min-h-0 flex-col">
        <div className="mb-4">
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#749366]">
            Langkah 1 dari 3
          </div>
          <h1
                    className="mt-2 text-lg leading-[0.95] tracking-[-0.06em] text-[#181816] lg:text-[2.2rem]"
                  >
            Verifikasi identitas dengan foto KTP.
          </h1>
          <p className="mt-1 text-xs leading-6 text-[#5f5a53]">
            Foto KTP Anda terenkripsi dan disimpan di bucket privat. AI mengisi otomatis nama, NIK, alamat, dan tanggal lahir{' '}
            Anda tinggal koreksi bila perlu.
          </p>
        </div>

        <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#8c877d]">
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
            {ktpFile?.type === 'application/pdf' ? (
              <iframe
                src={ktpPreview}
                title="Preview KTP PDF"
                className="w-full rounded-[16px] border border-[#e8e4de]"
                style={{ height: '160px' }}
              />
            ) : (
              <img
                src={ktpPreview}
                alt="Preview KTP"
                className="w-full rounded-[16px] object-cover"
                style={{ maxHeight: '160px', objectFit: 'cover' }}
              />
            )}
            <div className="mt-3 flex items-center justify-between gap-4">
              <div>
                <div className="truncate max-w-[180px] text-[0.88rem] font-semibold tracking-[-0.02em] text-[#20201c]">
                  {ktpFile?.name}
                </div>
                <div className="mt-0.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#9a958d]">
                  {ktpFile ? (ktpFile.size / 1024 / 1024).toFixed(1) + ' MB' : ''}
                  {ktpFile?.type === 'application/pdf' ? ' · PDF' : ''}
                </div>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex h-9 flex-shrink-0 items-center rounded-xl border border-[#ddd6ca] bg-[#fbfaf7] px-4 text-[0.82rem] font-semibold text-[#5c5a55] transition hover:border-[#cfc6b8] hover:bg-white"
              >
                Ganti foto
              </button>
            </div>
          </div>
        )}

        {/* Verify button */}
        {ktpFile && !uploadDone && (
          <div className="mt-3">
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
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={uploading}
                  className="inline-flex h-9 items-center rounded-xl border border-red-200 bg-red-50 px-4 text-[0.82rem] font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                >
                  Coba upload lagi
                </button>
              </div>
            )}
          </div>
        )}

        {uploadDone && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#d6e5d6] bg-[#dcebdc] px-4 py-2.5 text-[0.82rem] font-semibold text-[#3f6046]">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            KTP berhasil diunggah — AI sedang memproses
          </div>
        )}
      </section>

      {/* Right — OCR form */}
      <section className="flex min-h-0 flex-col">
        <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#8c877d]">
          Hasil OCR — Periksa &amp; Koreksi
        </div>

        <div className="min-h-0 flex-1 rounded-[26px] border border-[#ddd6ca] bg-white p-3 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
          <div className="h-full overflow-y-auto pr-1">
            <div className="grid gap-3 md:grid-cols-2">
              {fieldMeta.map((field) => (
                <div className={field.full ? 'md:col-span-2' : ''} key={field.name}>
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <label className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                      {field.label}
                    </label>
                    <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
                      <span className={field.auto ? 'text-[#7da06f]' : 'text-[#c57b46]'}>
                        {field.auto ? 'Auto' : 'Isi Manual'}
                      </span>
                      {field.encrypted && (
                        <span className="inline-flex items-center gap-1 text-[#8e8a83]">
                          <Lock className="h-3 w-3" />
                          terenkripsi
                        </span>
                      )}
                    </div>
                  </div>
                  <input
                    className="h-9 w-full rounded-xl border border-[#d8d3ca] bg-[#fcfbf8] px-3 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    type={field.type ?? 'text'}
                    value={fields[field.name]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col gap-3 border-t border-[#e1dacd] pt-4 lg:flex-row lg:items-center lg:justify-between">
          {submitError && (
            <p className="text-[0.75rem] text-red-600">{submitError}</p>
          )}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              disabled={submitting}
              className="inline-flex h-10 items-center rounded-xl border border-[#d8d3ca] bg-[#fbfaf7] px-5 text-[0.88rem] font-semibold text-[#4f4c46] transition hover:border-[#cfc6b8] hover:bg-white disabled:opacity-50"
            >
              Kembali
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={submitting || !ktpFile}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#111411] px-5 text-[0.88rem] font-semibold text-white shadow-[0_18px_35px_rgba(17,20,17,0.16)] transition hover:-translate-y-0.5 hover:bg-[#181d18] disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                'Konfirmasi & Lanjut'
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OnboardingIdentitasDiri
