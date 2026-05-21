import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Paperclip, X } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'

const INVESTOR_OPTIONS = [
  {
    id: 1,
    initials: 'AP',
    name: 'Arnold Prasetyo',
    role: 'Principal',
    institution: 'Ekuator Hijau Ventures',
    ticket: 'Rp 500jt – 5 M',
    approval: '62%',
    sectors: 'Tekstil, Agrikultur, Kerajinan',
    tenor: '12–36 bulan',
    themeFrom: '#28557c',
  },
  {
    id: 2,
    initials: 'MH',
    name: 'Mira Handayani',
    role: 'Procurement Director',
    institution: 'Kainusa Group',
    ticket: 'Rp 200jt – 2 M',
    approval: '71%',
    sectors: 'Tekstil, Batik, Kerajinan',
    tenor: '12–24 bulan',
    themeFrom: '#c27a3b',
  },
  {
    id: 3,
    initials: 'FA',
    name: 'Farhan Al-Hakim',
    role: 'Senior Credit Officer',
    institution: 'KSP Hijau Nusantara',
    ticket: 'Rp 50jt – 800jt',
    approval: '48%',
    sectors: 'Agrikultur, Kuliner, Ritel',
    tenor: '12–60 bulan',
    themeFrom: '#215f3b',
  },
]

const PROPOSAL_TYPES = [
  { key: 'pendanaan', label: 'Pendanaan', emoji: '💰', desc: 'Pinjaman, equity, atau bagi hasil' },
  { key: 'pengadaan', label: 'Pengadaan / Supply', emoji: '📦', desc: 'Kontrak pembelian produk' },
]

const UmkmProposalBaruPage = () => {
  const navigate = useNavigate()
  const [selectedInvestor, setSelectedInvestor] = React.useState(INVESTOR_OPTIONS[0])
  const [showInvestorPicker, setShowInvestorPicker] = React.useState(false)
  const [proposalType, setProposalType] = React.useState('pendanaan')
  const [title, setTitle] = React.useState('')
  const [nilai, setNilai] = React.useState('')
  const [tenor, setTenor] = React.useState('')
  const [skema, setSkema] = React.useState('')
  const [pesan, setPesan] = React.useState('')
  const [file, setFile] = React.useState(null)
  const fileInputRef = React.useRef(null)

  const handleFileDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0])
  }

  const formatBytes = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#e5e4e0] pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#111111]">Ajukan Proposal Baru</h1>
          <p className="mt-1 text-sm text-[#5f5a53]">
            Anda akan mengirim proposal ke investor terpilih. Pastikan dokumen lampiran sudah lengkap.
          </p>
        </div>
        <PressButton variant="ghost" onClick={() => navigate('/umkm/proposal')}>
          Kembali
        </PressButton>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Left: form */}
        <div className="rounded-2xl border border-[#e5e4e0] bg-white p-6 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">

          {/* Tujuan ke investor */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
              Tujuan ke Investor *
            </div>
            <div className="rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] px-4 py-3 flex items-center gap-3">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: selectedInvestor.themeFrom }}
              >
                {selectedInvestor.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#111111]">{selectedInvestor.name}</div>
                <div className="text-xs text-[#5f5a53]">
                  {selectedInvestor.role} · {selectedInvestor.institution}
                </div>
                <div className="text-xs text-[#5f5a53]">
                  Tiket: {selectedInvestor.ticket} · {selectedInvestor.approval} approval
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInvestorPicker((v) => !v)}
                className="text-xs font-semibold text-[#205336] border border-[#e5e4e0] rounded-lg px-3 py-1.5 hover:bg-white transition-colors"
              >
                Ganti
              </button>
            </div>

            {/* Investor picker dropdown */}
            {showInvestorPicker && (
              <div className="mt-2 rounded-xl border border-[#e5e4e0] bg-white shadow-lg overflow-hidden">
                {INVESTOR_OPTIONS.map((inv) => (
                  <button
                    key={inv.id}
                    type="button"
                    onClick={() => { setSelectedInvestor(inv); setShowInvestorPicker(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f4f3ec] transition-colors border-b border-[#e5e4e0] last:border-0 ${
                      selectedInvestor.id === inv.id ? 'bg-[#e8f0eb]' : ''
                    }`}
                  >
                    <div
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: inv.themeFrom }}
                    >
                      {inv.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#111111]">{inv.name}</div>
                      <div className="text-xs text-[#5f5a53]">{inv.institution} · {inv.ticket}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tipe proposal */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
              Tipe Proposal *
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PROPOSAL_TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setProposalType(t.key)}
                  className={`rounded-xl border p-4 text-left transition-colors duration-150 ${
                    proposalType === t.key
                      ? 'border-[#205336] bg-[#e8f0eb]'
                      : 'border-[#e5e4e0] bg-white hover:border-[#205336]'
                  }`}
                >
                  <div className="text-base font-semibold text-[#111111]">{t.emoji} {t.label}</div>
                  <div className="text-xs text-[#5f5a53] mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Judul */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
              Judul Proposal *
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Permintaan Pinjaman Pembelian Mesin Cap Baru"
              className="w-full rounded-xl border border-[#e5e4e0] bg-white px-4 py-2.5 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
            />
          </div>

          {/* Nilai, Tenor, Skema */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: 'Nilai (Rp) *', value: nilai, setter: setNilai, placeholder: '120.000.000' },
              { label: 'Tenor *', value: tenor, setter: setTenor, placeholder: '18 bulan' },
              { label: 'Skema *', value: skema, setter: setSkema, placeholder: 'Cicilan tetap' },
            ].map((field) => (
              <div key={field.label}>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
                  {field.label}
                </div>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[#e5e4e0] bg-white px-3 py-2.5 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
                />
              </div>
            ))}
          </div>

          {/* Pesan */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
              Pesan ke Investor
            </div>
            <textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              rows={4}
              placeholder="Pak Arnold, kami ingin menambah kapasitas produksi 40% dengan 2 mesin cap baru..."
              className="w-full rounded-xl border border-[#e5e4e0] bg-white px-4 py-3 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20 resize-none"
            />
          </div>

          {/* Lampiran */}
          <div className="mb-6">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
              Lampiran (PDF, maks 20 MB)
            </div>
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e5e4e0] bg-[#f4f3ec] py-8 cursor-pointer hover:border-[#205336] transition-colors"
            >
              <Paperclip className="h-6 w-6 text-[#5f5a53]" />
              <p className="text-sm text-[#5f5a53]">
                Tarik file ke sini atau{' '}
                <span className="font-semibold text-[#205336]">pilih dari komputer</span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {file && (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#e5e4e0] bg-white px-4 py-3">
                <div className="text-[10px] font-bold uppercase text-[#5f5a53] bg-[#f4f3ec] border border-[#e5e4e0] rounded px-1.5 py-0.5">PDF</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#111111] truncate">{file.name}</div>
                  <div className="text-xs text-[#5f5a53]">{formatBytes(file.size)} · siap kirim</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-[#934f42] hover:text-[#7a3a2e] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <PressButton variant="ghost">Simpan Draft</PressButton>
            <PressButton variant="primary" disabled={!title || !nilai || !tenor || !skema}>
              Kirim Proposal
            </PressButton>
          </div>
        </div>

        {/* Right: investor profile + tips */}
        <div className="flex flex-col gap-4">
          {/* Investor profile */}
          <div className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-4">
              Profil Investor Tujuan
            </div>
            <div className="flex flex-col gap-3 divide-y divide-[#e5e4e0]">
              {[
                { label: 'Fokus sektor', value: selectedInvestor.sectors },
                { label: 'Rentang tiket', value: selectedInvestor.ticket },
                { label: 'Tenor preferensi', value: selectedInvestor.tenor },
                { label: 'Approval rate', value: selectedInvestor.approval },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 pt-3 first:pt-0">
                  <span className="text-sm text-[#5f5a53]">{row.label}</span>
                  <span className="text-sm font-semibold text-[#111111] text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-[#e5e4e0] bg-[#e8f0eb] p-5">
            <div className="text-sm font-semibold text-[#205336] mb-3">💡 Tips proposal kuat:</div>
            <ul className="flex flex-col gap-1.5">
              {[
                'Sebutkan link Passport publik Anda',
                'Sertakan laporan keuangan 6–24 bulan',
                'Jelaskan ROI dan penggunaan dana spesifik',
                'Ringkas — maks 5 halaman PDF',
              ].map((tip) => (
                <li key={tip} className="text-xs text-[#205336] flex items-start gap-1.5">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UmkmProposalBaruPage
