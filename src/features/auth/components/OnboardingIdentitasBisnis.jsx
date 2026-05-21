import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Camera, Lock, Upload } from 'lucide-react'

const initialFields = {
  businessName: '',
  businessCategory: '',
  businessProvince: '',
  businessCity: '',
  businessAddress: '',
  whatsappNumber: '',
  businessDescription: '',
  isServiceBusiness: false,
}

const requiredFields = [
  'businessName',
  'businessCategory',
  'businessDescription',
  'businessAddress',
  'businessProvince',
  'businessCity',
  'whatsappNumber',
]

const businessTypeOptions = [
  { value: false, label: 'Produk' },
  { value: true, label: 'Jasa' },
]

const inputClass =
  'h-11 w-full rounded-xl border border-[#d8d3ca] bg-[#fcfbf8] px-4 text-[0.92rem] font-medium text-[#25251f] outline-none transition placeholder:text-[#9b968e] focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10'

const labelClass =
  'mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]'

/**
 * Props:
 *   onNext(fields) - called when user confirms
 *   onBack()       - called when user clicks Kembali
 */
const OnboardingIdentitasBisnis = ({ onNext, onBack }) => {
  const [fields, setFields] = useState(initialFields)
  const [photoPreview, setPhotoPreview] = useState(null)
  const photoInputRef = useRef(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
  }

  const completion = useMemo(() => {
    const filled = requiredFields.filter((key) => fields[key]?.toString().trim()).length
    return Math.round((filled / requiredFields.length) * 100)
  }, [fields])

  const missingCount = requiredFields.length - requiredFields.filter((key) => fields[key]?.toString().trim()).length
  const descriptionLength = fields.businessDescription.trim().length
  const previewName = fields.businessName.trim() || 'Nama usaha'
  const previewCategory = fields.businessCategory.trim() || 'Kategori bisnis'
  const previewCity = fields.businessCity.trim() || 'Lokasi'
  const previewProvince = fields.businessProvince.trim() || ''
  const previewAddress = fields.businessAddress.trim() || ''
  const previewDescription =
    fields.businessDescription.trim() ||
    'Deskripsi singkat usaha akan tampil di kartu publik Green Passport.'

  const handleChange = (name, value) =>
    setFields((cur) => ({ ...cur, [name]: value }))

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      

      <div className="grid min-h-0 flex-1 gap-5 xl:grid-cols-2">
        <aside className="flex min-h-0 flex-col gap-4">
           <div className="mb-5 flex-none">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#749366]">
          Langkah 2 dari 3
        </div>
        <h1
          className=" text-[2rem] leading-[0.95] tracking-[-0.06em] text-[#181816] lg:text-[2.45rem]"
        >
          Profil bisnis Anda.
        </h1>
        <p className=" max-w-[760px] text-sm leading-6 text-[#5f5a53] lg:text-[0.98rem]">
          Informasi ini muncul di Green Passport publik. Nomor WA bisnis akan jadi tombol kontak utama di halaman detail Anda.
        </p>
      </div>
          <div className="h-full overflow-y-auto pr-1">
            <div className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#749366]">
              Tentang Usaha
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="businessName">
                  Nama Usaha
                </label>
                <input
                  id="businessName"
                  className={inputClass}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  placeholder="Batik Siti"
                  value={fields.businessName}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_232px]">
                <div>
                  <label className={labelClass} htmlFor="businessCategory">
                    Kategori Bisnis
                  </label>
                  <input
                    id="businessCategory"
                    className={inputClass}
                    onChange={(e) => handleChange('businessCategory', e.target.value)}
                    placeholder="Tekstil & Batik"
                    value={fields.businessCategory}
                  />
                </div>

                <div>
                  <div className={labelClass}>Jenis</div>
                  <div className="grid h-11 grid-cols-2 rounded-xl border border-[#d8d3ca] bg-[#f7f5f0] p-1">
                    {businessTypeOptions.map((type) => (
                      <button
                        key={type.label}
                        type="button"
                        onClick={() => handleChange('isServiceBusiness', type.value)}
                        className={`rounded-lg text-[0.86rem] font-semibold transition ${
                          fields.isServiceBusiness === type.value
                            ? 'bg-white text-[#20201c] shadow-[0_4px_14px_rgba(21,24,18,0.06)]'
                            : 'text-[#777268] hover:text-[#20201c]'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="businessDescription">
                  Deskripsi Singkat
                </label>
                <textarea
                  id="businessDescription"
                  rows={3}
                  maxLength={280}
                  className="w-full resize-none rounded-xl border border-[#d8d3ca] bg-[#fcfbf8] px-4 py-3 text-[0.92rem] font-medium leading-6 text-[#25251f] outline-none transition placeholder:text-[#9b968e] focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
                  onChange={(e) => handleChange('businessDescription', e.target.value)}
                  placeholder="Batik tulis pewarna alam indigo & soga. Tiga generasi penenun di Imogiri."
                  value={fields.businessDescription}
                />
                <div className="mt-2 text-[0.72rem] font-semibold tracking-[0.08em] text-[#8d877f]">
                  {descriptionLength} / 280 karakter
                </div>
              </div>

              {/* Foto Bisnis */}
              <div>
                <label className={labelClass}>Foto Bisnis</label>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                {!photoPreview ? (
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#d8d3ca] bg-[#fbfaf7] py-4 text-[0.82rem] font-semibold text-[#8d877f] transition hover:border-[#2b6840]/40 hover:bg-white"
                  >
                    <Upload className="h-4 w-4" />
                    Upload foto bisnis
                  </button>
                ) : (
                  <div className="relative overflow-hidden rounded-xl border border-[#ddd6ca]">
                    <img
                      src={photoPreview}
                      alt="Foto bisnis"
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-lg border border-[#ddd6ca] bg-white/90 px-2.5 py-1 text-[0.72rem] font-semibold text-[#5c5a55] backdrop-blur-sm transition hover:bg-white"
                    >
                      <Camera className="h-3 w-3" />
                      Ganti foto
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="my-6 h-px bg-[#e1dacd]" />

            <div className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#749366]">
              Lokasi
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="businessAddress">
                  Alamat Lengkap
                </label>
                <input
                  id="businessAddress"
                  className={inputClass}
                  onChange={(e) => handleChange('businessAddress', e.target.value)}
                  placeholder="Workshop Imogiri Barat KM7, Bantul"
                  value={fields.businessAddress}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="businessProvince">
                    Provinsi
                  </label>
                  <input
                    id="businessProvince"
                    className={inputClass}
                    onChange={(e) => handleChange('businessProvince', e.target.value)}
                    placeholder="DI Yogyakarta"
                    value={fields.businessProvince}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="businessCity">
                    Kota / Kab.
                  </label>
                  <input
                    id="businessCity"
                    className={inputClass}
                    onChange={(e) => handleChange('businessCity', e.target.value)}
                    placeholder="Bantul"
                    value={fields.businessCity}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]" htmlFor="whatsappNumber">
                    Nomor WhatsApp Bisnis
                  </label>
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8e8a83]">
                    <Lock className="h-3 w-3" />
                    Kontak Publik
                  </span>
                </div>
                <input
                  id="whatsappNumber"
                  className={inputClass}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="6281234567890"
                  value={fields.whatsappNumber}
                />
              </div>
            </div>
          </div>
        </aside>

        <section className="min-h-0 rounded-[18px] border border-[#ddd6ca] bg-white p-3 shadow-[0_16px_34px_rgba(21,24,18,0.04)] flex flex-col gap-3">
          <div className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#749366]">
            Pratinjau Kartu Publik
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[#ddd6ca] bg-white shadow-sm">
            <div className="flex h-56 items-end bg-[#ece7dc] p-3" style={photoPreview ? { backgroundImage: `url(${photoPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
              {!photoPreview && (
                <div className="inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#6f695f]">
                  <Camera className="h-3 w-3" />
                  Foto - {previewName}
                </div>
              )}
            </div>
            <div className="p-3">
              <h2 className="text-[0.88rem] font-bold leading-tight text-[#20201c]">{previewName}</h2>
              <div className="mt-0.5 text-[0.75rem] font-medium text-[#8b867e]">
                {previewCategory} · {previewCity}{previewProvince ? `, ${previewProvince}` : ''}
              </div>
              {previewAddress && (
                <div className="mt-1 text-[0.72rem] text-[#9a958d]">{previewAddress}</div>
              )}
              <p className="mt-2 text-[0.78rem] leading-5 text-[#5f5a53] line-clamp-3">{previewDescription}</p>
            </div>
          </div>

          <div className="rounded-[12px] border border-[#dce9dd] bg-[#dcebdc] px-3 py-2.5 text-[0.75rem] leading-5 text-[#32533a]">
            <span className="font-bold">Berikutnya:</span> Tambahkan 1-5 foto lokasi usaha + minimal 1 produk sebelum Evidence Vault terbuka.
          </div>

        </section>
      </div>

      <div className=" mt-5 flex flex-none flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-[0.88rem] font-medium text-[#8b867e]">
          Progress profil: <span className="font-bold text-[#20201c]">{completion} / 100</span>
          <span> - {missingCount} field tersisa</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-12 items-center rounded-xl border border-[#d8d3ca] bg-[#fbfaf7] px-6 text-[0.92rem] font-bold text-[#20201c] transition hover:border-[#cfc6b8] hover:bg-white"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={() => onNext(fields)}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#111411] px-6 text-[0.92rem] font-bold text-white shadow-[0_18px_35px_rgba(17,20,17,0.16)] transition hover:-translate-y-0.5 hover:bg-[#181d18]"
          >
            Lanjut ke Evidence Vault
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingIdentitasBisnis
