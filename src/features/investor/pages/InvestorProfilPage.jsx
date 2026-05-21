import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Camera, Plus, Briefcase, Trash2, Save } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import ConfirmModal from '@/components/ui/ConfirmModal'

const INITIAL_FORM = {
  nama: 'Arnold Prasetyo',
  perusahaan: 'Mandiri Capital Indonesia',
  jabatan: 'Principal',
  lokasi: 'Jakarta, Indonesia',
  tentang:
    'Investor berpengalaman di sektor UMKM hijau dan ekonomi sirkular. Fokus pada bisnis dengan dampak lingkungan terukur dan model bisnis yang berkelanjutan.',
  tiketMin: '50',
  tiketMax: '500',
  sektorFokus: ['Agrikultur', 'Energi Terbarukan', 'Kerajinan'],
}

const INITIAL_RIWAYAT = [
  {
    id: 1,
    jabatan: 'Principal',
    perusahaan: 'Mandiri Capital Indonesia',
    periode: '2021 – Sekarang',
  },
  {
    id: 2,
    jabatan: 'Investment Analyst',
    perusahaan: 'BRI Ventures',
    periode: '2018 – 2021',
  },
]

const SEKTOR_OPTIONS = [
  'Agrikultur',
  'Energi Terbarukan',
  'Kerajinan',
  'Tekstil',
  'Teknologi',
  'Perikanan',
  'Kehutanan',
  'Pangan',
]

const SectionLabel = ({ children }) => (
  <div className="mb-4 text-[0.65rem] font-semibold tracking-wide text-[#8d877f]">{children}</div>
)

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[0.78rem] font-medium text-[#5f5a53]">{label}</label>
    {children}
  </div>
)

const inputCls =
  'w-full rounded-xl border border-[#e5e4e0] bg-white px-3.5 py-2.5 text-[0.88rem] text-[#111111] outline-none placeholder:text-[#b0aaa2] focus:border-[#205336] focus:ring-1 focus:ring-[#205336] transition-colors'

const InvestorProfilPage = () => {
  const [form, setForm] = React.useState(INITIAL_FORM)
  const [riwayat, setRiwayat] = React.useState(INITIAL_RIWAYAT)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [avatarUrl, setAvatarUrl] = React.useState(null)
  const fileInputRef = React.useRef(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAvatarUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(INITIAL_FORM) ||
    JSON.stringify(riwayat) !== JSON.stringify(INITIAL_RIWAYAT)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const toggleSektor = (s) =>
    setForm((f) => ({
      ...f,
      sektorFokus: f.sektorFokus.includes(s)
        ? f.sektorFokus.filter((x) => x !== s)
        : [...f.sektorFokus, s],
    }))

  const addRiwayat = () =>
    setRiwayat((r) => [
      ...r,
      { id: Date.now(), jabatan: '', perusahaan: '', periode: '' },
    ])

  const removeRiwayat = (id) => setRiwayat((r) => r.filter((x) => x.id !== id))

  const setRiwayatField = (id, key) => (e) =>
    setRiwayat((r) =>
      r.map((x) => (x.id === id ? { ...x, [key]: e.target.value } : x)),
    )

  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-semibold text-[#111111]">Pengaturan Profil</h1>
          <p className="mt-5 text-[0.88rem] text-[#5f5a53]">
            Kelola tampilan profil publik Anda di direktori investor.
          </p>
        </div>
        <PressButton
          className="flex! items-center! gap-2! shrink-0"
          disabled={!isDirty}
          variant="primary"
          onClick={() => setConfirmOpen(true)}
        >
          <Save className="h-4 w-4" />
          Simpan Perubahan
        </PressButton>
      </div>

      <div className="flex flex-col gap-5">
        {/* Informasi Dasar */}
        <div className="rounded-2xl bg-white p-6">
          <SectionLabel>INFORMASI DASAR &amp; INSTITUSI</SectionLabel>

          {/* Avatar row */}
          <div className="mb-5 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              {avatarUrl ? (
                <img
                  alt="Foto profil"
                  className="h-16 w-16 rounded-full object-cover"
                  src={avatarUrl}
                />
              ) : (
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#1d211b] text-[1.35rem] font-semibold text-white">
                  AP
                </div>
              )}
            </div>
            <div>
              <input
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleAvatarChange}
                ref={fileInputRef}
                type="file"
              />
              <button
                className="flex items-center gap-1.5 rounded-lg border border-[#ddd7cd] px-3 py-1.5 text-[0.78rem] font-medium text-[#5f5a53] transition-colors hover:border-[#205336] hover:text-[#205336]"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <Camera className="h-3.5 w-3.5" />
                Ubah Foto
              </button>
              <p className="mt-1.5 text-[0.72rem] text-[#b0aaa2]">JPG atau PNG, maks 2 MB</p>
            </div>
          </div>

          {/* 2-col inputs */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Lengkap">
              <input
                className={inputCls}
                onChange={set('nama')}
                placeholder="Nama lengkap"
                value={form.nama}
              />
            </Field>
            <Field label="Perusahaan / Institusi">
              <input
                className={inputCls}
                onChange={set('perusahaan')}
                placeholder="Nama perusahaan"
                value={form.perusahaan}
              />
            </Field>
            <Field label="Jabatan">
              <input
                className={inputCls}
                onChange={set('jabatan')}
                placeholder="Jabatan Anda"
                value={form.jabatan}
              />
            </Field>
            <Field label="Lokasi Basis">
              <input
                className={inputCls}
                onChange={set('lokasi')}
                placeholder="Kota, Negara"
                value={form.lokasi}
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Tentang Saya">
              <textarea
                className={`${inputCls} min-h-24 resize-none`}
                onChange={set('tentang')}
                placeholder="Ceritakan sedikit tentang Anda dan pendekatan investasi Anda..."
                value={form.tentang}
              />
            </Field>
          </div>
        </div>

        {/* Preferensi Investasi */}
        <div className="rounded-2xl bg-white p-6">
          <SectionLabel>PREFERENSI INVESTASI</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Rentang Tiket Investasi (Juta Rp)">
              <div className="flex items-center gap-2">
                <input
                  className={inputCls}
                  onChange={set('tiketMin')}
                  placeholder="Min"
                  value={form.tiketMin}
                />
                <span className="shrink-0 text-[0.82rem] text-[#8d877f]">–</span>
                <input
                  className={inputCls}
                  onChange={set('tiketMax')}
                  placeholder="Maks"
                  value={form.tiketMax}
                />
              </div>
            </Field>

            <Field label="Sektor Fokus / SDG">
              <div className="flex flex-wrap gap-2">
                {SEKTOR_OPTIONS.map((s) => {
                  const active = form.sektorFokus.includes(s)
                  return (
                    <button
                      key={s}
                      className={`rounded-lg px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
                        active
                          ? 'bg-[#205336] text-white'
                          : 'border border-[#ddd7cd] bg-white text-[#5f5a53] hover:border-[#205336] hover:text-[#205336]'
                      }`}
                      onClick={() => toggleSektor(s)}
                      type="button"
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </Field>
          </div>
        </div>

        {/* Riwayat Pekerjaan */}
        <div className="rounded-2xl bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <SectionLabel>RIWAYAT PEKERJAAN</SectionLabel>
            <button
              className="flex items-center gap-1.5 rounded-lg border border-[#ddd7cd] px-3 py-1.5 text-[0.78rem] font-medium text-[#5f5a53] transition-colors hover:border-[#205336] hover:text-[#205336]"
              onClick={addRiwayat}
              type="button"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Pengalaman
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {riwayat.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#ece8df]">
                  <Briefcase className="h-3.5 w-3.5 text-[#5f5a53]" />
                </div>
                <div className="grid flex-1 grid-cols-3 gap-3">
                  <input
                    className={inputCls}
                    onChange={setRiwayatField(item.id, 'jabatan')}
                    placeholder="Jabatan"
                    value={item.jabatan}
                  />
                  <input
                    className={inputCls}
                    onChange={setRiwayatField(item.id, 'perusahaan')}
                    placeholder="Perusahaan"
                    value={item.perusahaan}
                  />
                  <input
                    className={inputCls}
                    onChange={setRiwayatField(item.id, 'periode')}
                    placeholder="Periode (mis. 2020 – 2023)"
                    value={item.periode}
                  />
                </div>
                <button
                  className="mt-2 rounded-lg p-1.5 text-[#b0aaa2] transition-colors hover:bg-[#fef2f2] hover:text-[#c0392b]"
                  onClick={() => removeRiwayat(item.id)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {confirmOpen && (
          <ConfirmModal
            key="confirm-simpan"
            title="Simpan Perubahan?"
            description="Perubahan profil Anda akan diperbarui dan tampil di direktori investor."
            confirmLabel="Ya, Simpan"
            successMessage="Profil berhasil disimpan."
            onConfirm={() => {}}
            onClose={() => setConfirmOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default InvestorProfilPage
