import { useState } from 'react'
import { Navbar } from '@/components/ui/navbar'
import Iridescence from '@/components/ui/Iridescence'

const UMKM_STEPS = [
  {
    step: '01',
    kicker: '< 2 menit',
    title: 'Daftar & verifikasi identitas',
    description:
      'Email, password, foto KTP, dan alamat diproses OCR agar identitas terisi otomatis. NIK tetap terenkripsi AES-256 dan tidak tampil ke publik.',
    visual: 'identity',
  },
  {
    step: '02',
    kicker: 'profil bisnis',
    title: 'Lengkapi profil bisnis',
    description:
      'Isi nama usaha, sektor, lokasi, deskripsi, foto operasional, dan nomor WhatsApp bisnis sebagai identitas publik Green Passport Anda.',
    visual: 'business',
  },
  {
    step: '03',
    kicker: '6 indikator',
    title: 'Unggah bukti ke 6 indikator',
    description:
      'Evidence Vault menampilkan kategori dokumen yang dibutuhkan. Upload PDF, foto, atau nota operasional hingga 10MB per file.',
    visual: 'evidence',
  },
  {
    step: '04',
    kicker: 'otomatis',
    title: 'AI klasifikasi & hitung GRS',
    description:
      'AI membaca isi dokumen, menentukan indikator yang tepat, lalu menghitung Green Readiness Score untuk membuka langkah berikutnya.',
    visual: 'grs',
  },
  {
    step: '05',
    kicker: 'GRS >= 70',
    title: 'Blockchain & terbitkan Passport',
    description:
      'Setelah lolos threshold, hash dokumen didaftarkan ke blockchain dan Green Passport publik Anda siap dibagikan lewat link dan QR.',
    visual: 'passport',
  },
]

const INVESTOR_STEPS = [
  {
    step: '01',
    kicker: '< 5 menit',
    title: 'Daftar sebagai Investor',
    description:
      'Foto KTP untuk identitas terenkripsi. Lalu isi riwayat pekerjaan dan institusi Anda, mirip profil LinkedIn yang akan dilihat UMKM sebelum menerima proposal.',
    visual: 'investorIdentity',
  },
  {
    step: '02',
    kicker: 'terfilter',
    title: 'Filter & jelajahi direktori UMKM',
    description:
      'Akses filter tier GRS eksklusif, per sektor, lokasi, dan indikator unggul. Real-time, tanpa perlu audit lapangan lebih dulu.',
    visual: 'investorFilter',
  },
  {
    step: '03',
    kicker: 'satu halaman',
    title: 'Due diligence per UMKM',
    description:
      'Buka profil: GRS overall, breakdown 6 indikator, daftar dokumen pendukung, serta hash SHA-256 yang bisa Anda verifikasi langsung di block explorer.',
    visual: 'investorDueDiligence',
  },
  {
    step: '04',
    kicker: 'fleksibel',
    title: 'Kirim proposal atau hubungi langsung',
    description:
      'Pilih UMKM yang cocok, kirim proposal pendanaan atau pembelian dengan lampiran, atau lanjut ke WhatsApp untuk diskusi informal langsung dengan pemilik.',
    visual: 'investorProposal',
  },
]

const EVIDENCE_LABELS = [
  { code: 'BS', name: 'Bahan Baku & Sourcing' },
  { code: 'PP', name: 'Proses Produksi' },
  { code: 'PL', name: 'Pengelolaan Limbah' },
  { code: 'EE', name: 'Energi & Emisi' },
  { code: 'SK', name: 'Sosial & Ketenagakerjaan' },
  { code: 'LK', name: 'Legalitas & Kepatuhan' },
]

const INVESTOR_FILTERS = ['Unggul', 'Tekstil', 'Jogja', 'On-chain']

const MODES = {
  umkm: {
    label: 'Untuk UMKM',
    accent: '#205336',
    title: (
      <>
        Dari nota WhatsApp ke <span className="italic text-white">Green Passport</span>, dalam 5
        langkah.
      </>
    ),
    description:
      'Cukup unggah bukti operasional yang sudah Anda miliki. GreenTrust mengubahnya menjadi profil bisnis, bukti ESG terstruktur, dan passport publik yang bisa diverifikasi.',
    steps: UMKM_STEPS,
  },
  investor: {
    label: 'Untuk Investor',
    accent: '#224f78',
    title: (
      <>
        Dari pencarian UMKM ke <span className="italic text-white">keputusan investasi</span>, dalam satu sore.
      </>
    ),
    description:
      'Lewati audit lapangan dan pertukaran email dokumen. Skor GRS objektif, hash dokumen on-chain, dan WhatsApp langsung ke pemilik UMKM.',
    steps: INVESTOR_STEPS,
  },
}

const renderUmkmVisual = (visual) => {
  if (visual === 'identity') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-4 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="rounded-[24px] border border-[#edf1ec] bg-[#edf5ef] p-4">
          <div className="mb-4 flex items-start justify-between">
            <div className="space-y-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6b8e76]">
              <div>KTP terdeteksi</div>
              <div className="text-[#111111]">NIK, nama, alamat</div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-[#8ead97] bg-white text-[9px] font-semibold text-[#205336]">
              FOTO
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-2">
              {['Fatik Siti', '3275 31XX XXXX XXXX', 'Jl. Bantul No. 18, Yogyakarta'].map((line) => (
                <div key={line} className="rounded-xl bg-white px-3 py-2 text-xs text-[#205336]">
                  {line}
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-[#dfe9e2] bg-[#f7faf8] p-3 text-[10px] leading-relaxed text-[#5f5a53]">
              OCR mengisi field dasar sebelum user melakukan konfirmasi akhir.
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-1 text-[10px] text-[#5f5a53]">
          <span className="font-semibold text-[#205336]">OCR</span>
          <span>confidence 94%</span>
        </div>
      </div>
    )
  }

  if (visual === 'business') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f5a53]">profil usaha</div>
        <div className="space-y-3">
          {[
            { label: 'Nama usaha', value: 'Batik Siti' },
            { label: 'Sektor', value: 'Tekstil & Batik' },
            { label: 'Kota', value: 'Yogyakarta' },
            { label: 'WhatsApp bisnis', value: '+62 812-3456-7891', accent: true },
          ].map((field) => (
            <div key={field.label}>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c877f]">{field.label}</div>
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  field.accent ? 'border-[#f0c28c] bg-[#fffaf2]' : 'border-[#e5e4e0] bg-[#fcfcfa]'
                }`}
              >
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (visual === 'evidence') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="grid gap-3 sm:grid-cols-2">
          {EVIDENCE_LABELS.map((item, index) => (
            <div key={item.code} className="rounded-2xl border border-[#ece9e3] bg-[#fcfcfa] p-3">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f3ec] text-[10px] font-semibold text-[#205336]">
                  {item.code}
                </div>
                <div className="text-xs font-semibold text-[#111111]">{item.name}</div>
              </div>
              <div className="h-1.5 rounded-full bg-[#ece9e3]">
                <div className="h-1.5 rounded-full bg-[#205336]" style={{ width: `${48 + ((index % 3) * 16)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (visual === 'grs') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f3ec] text-lg font-semibold text-[#205336]">
            AI
          </div>
          <div>
            <div className="text-sm font-semibold text-[#111111]">Nota pembelian terdeteksi</div>
            <div className="text-xs text-[#5f5a53]">Kategori: Bahan Baku | confidence 92%</div>
          </div>
        </div>
        <div className="mb-3 rounded-2xl bg-[#f7faf8] p-3 text-xs leading-relaxed text-[#5f5a53]">
          AI multimodal membaca isi dokumen dan memberi kategori sebelum GRS diperbarui.
        </div>
        <div className="rounded-full bg-[#e8f0eb] p-2">
          <div className="h-4 rounded-full bg-[#205336]" style={{ width: '68%' }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-[#5f5a53]">GRS saat ini</span>
          <span className="font-semibold text-[#205336]">68 / 100</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[28px] border border-[#efcfb1] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8c877f]">GreenTrust Passport</div>
          <div className="mt-2 text-2xl font-semibold text-[#111111]">87</div>
          <div className="text-xs text-[#5f5a53]">GRS score</div>
        </div>
        <div className="rounded-full bg-[#fff4d6] px-3 py-1 text-xs font-semibold text-[#b16b1b]">Unggul</div>
      </div>
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#e5e4e0] bg-[#f4f3ec] text-xs font-semibold text-[#205336]">
          QR
        </div>
        <div>
          <div className="text-lg font-semibold text-[#111111]">Batik Siti</div>
          <div className="text-sm text-[#5f5a53]">Yogyakarta</div>
          <div className="mt-2 font-mono text-[11px] text-[#205336]">batik-siti-jogja</div>
        </div>
      </div>
      <div className="rounded-xl border border-[#e5e4e0] px-4 py-3 text-xs text-[#5f5a53]">
        Hash SHA-256 dan QR siap dibagikan ke investor, buyer, atau lembaga pembiayaan.
      </div>
    </div>
  )
}

const renderInvestorVisual = (visual) => {
  if (visual === 'investorIdentity') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="space-y-3">
          {[
            { initials: 'EH', role: 'Principal', org: 'Ekacita Ventures · Full-time', meta: 'APR 2025 - sekarang · 1 th 5 bln', tone: 'bg-[#243444]' },
            { initials: 'BN', role: 'Investment Analyst', org: 'BNi Hijau Desk · Full-time', meta: '+ tambah pengalaman', tone: 'bg-[#7a5f59]' },
          ].map((item) => (
            <div key={item.role} className="flex items-start gap-3 rounded-2xl border border-[#eef1f3] bg-[#fcfcfa] p-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold text-white ${item.tone}`}>
                {item.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#111111]">{item.role}</div>
                <div className="text-xs text-[#5f5a53]">{item.org}</div>
                <div className="mt-1 text-[11px] text-[#5f5a53]">{item.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (visual === 'investorFilter') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f5a53]">filter aktif</div>
        <div className="mb-5 flex flex-wrap gap-2">
          {INVESTOR_FILTERS.map((filter) => (
            <span key={filter} className="rounded-full border border-[#d5e3f0] bg-[#f5f9fd] px-3 py-1 text-[11px] font-semibold text-[#224f78]">
              {filter}
            </span>
          ))}
        </div>
        <div className="space-y-3">
          {[
            { name: 'Batik Siti', city: 'Yogyakarta', score: '87', tone: 'text-[#c47739]' },
            { name: 'Anyaman Cirebon', city: 'Cirebon', score: '78', tone: 'text-[#205336]' },
            { name: 'Kopi Bumi Toraja', city: 'Tana Toraja', score: '92', tone: 'text-[#224f78]' },
          ].map((item, index) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl border border-[#eef1f3] bg-[#fcfcfa] px-3 py-3">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-xl ${index === 0 ? 'bg-[#e7ddd1]' : index === 1 ? 'bg-[#f0dccf]' : 'bg-[#243444]'}`} />
                <div>
                  <div className="text-sm font-semibold text-[#111111]">{item.name}</div>
                  <div className="text-xs text-[#5f5a53]">{item.city}</div>
                </div>
              </div>
              <div className={`text-lg font-semibold ${item.tone}`}>{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (visual === 'investorDueDiligence') {
    return (
      <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
        <div className="grid gap-3 sm:grid-cols-2">
          {EVIDENCE_LABELS.map((item, index) => (
            <div key={item.code} className="rounded-2xl border border-[#ece9e3] bg-[#fcfcfa] p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f3ec] text-[10px] font-semibold text-[#b16b1b]">
                    {item.code}
                  </div>
                  <div className="text-xs font-semibold text-[#111111]">{item.name}</div>
                </div>
                <div className="text-[10px] font-semibold text-[#205336]">{index < 4 ? 'verify' : 'view'}</div>
              </div>
              <div className="text-[11px] leading-relaxed text-[#5f5a53]">
                {index < 3 ? '1 nota, 1 invoice, 1 hash on-chain' : 'Breakdown dokumen dan status verifikasi tersedia'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[28px] border border-[#e5e4e0] bg-white p-5 shadow-[0_24px_60px_rgba(17,17,17,0.06)]">
      <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#224f78]">proposal baru</div>
      <div className="mb-4 text-2xl font-semibold text-[#111111]">Pendanaan Modal Kerja</div>
      <div className="rounded-2xl border border-[#ece9e3] bg-[#fcfcfa] p-4 text-sm leading-relaxed text-[#5f5a53]">
        <div>Nilai: Rp 350.000.000</div>
        <div>Tenor: 24 bulan, bagi hasil 15%/thn</div>
        <div>Lampiran: proposal-pendanaan.pdf (2 MB)</div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="button" className="rounded-xl border border-[#e5e4e0] bg-white px-4 py-3 text-sm font-semibold text-[#111111]">
          Batal
        </button>
        <button type="button" className="rounded-xl bg-[#111111] px-4 py-3 text-sm font-semibold text-white">
          Kirim
        </button>
      </div>
    </div>
  )
}

const CaraKerjaPage = () => {
  const [mode, setMode] = useState('umkm')
  const activeMode = MODES[mode]

  return (
    <div className="min-h-screen bg-[#f9f7f1] text-[#111111]">
      <Navbar />

      <div className="relative" style={{ height: '50vh' }}>
        <div className="absolute inset-0">
          <Iridescence
            color={[0.12549019607843137, 0.3254901960784314, 0.21176470588235294]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
        </div>
        <section className="relative z-10 flex h-full flex-col justify-center">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">cara kerja</div>
              <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {activeMode.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/80">{activeMode.description}</p>

            </div>
          </div>
        </section>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <section className="mt-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-[#e5e4e0] bg-white p-1 shadow-[0_16px_40px_rgba(17,17,17,0.08)]">
            {Object.entries(MODES).map(([key, item]) => {
              const isActive = mode === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`min-w-[148px] rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                    isActive ? 'text-white shadow-[0_10px_24px_rgba(17,17,17,0.14)]' : 'text-[#111111]'
                  }`}
                  style={isActive ? { backgroundColor: item.accent } : { backgroundColor: '#ffffff' }}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-12 space-y-8">
          {activeMode.steps.map((item, index) => {
            const isEven = index % 2 === 0
            const accentClass = mode === 'investor' ? 'text-[#dbe9f8]' : 'text-[#d7e8dc]'
            const kickerClass = mode === 'investor' ? 'text-[#8ea9c4]' : 'text-[#7d9a84]'

            return (
              <div
                key={`${mode}-${item.step}`}
                className="grid items-center gap-8 border-t border-dashed border-[#ddd8cc] pt-8 lg:grid-cols-2 lg:gap-12"
              >
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="mb-3 flex items-end gap-4">
                    <span className={`text-6xl font-light leading-none ${accentClass}`}>{item.step}</span>
                    <span className={`pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${kickerClass}`}>
                      {item.kicker}
                    </span>
                  </div>
                  <h2 className="max-w-xl text-3xl font-semibold leading-tight text-[#111111]">{item.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5f5a53]">{item.description}</p>
                </div>

                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  {mode === 'umkm' ? renderUmkmVisual(item.visual) : renderInvestorVisual(item.visual)}
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default CaraKerjaPage
