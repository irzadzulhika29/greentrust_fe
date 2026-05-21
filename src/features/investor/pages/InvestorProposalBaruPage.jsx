import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Paperclip, X, ExternalLink } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const PROPOSAL_TYPES = [
  { key: 'funding', label: 'Pendanaan', emoji: '💰', desc: 'Pinjaman, equity, atau bagi hasil' },
  { key: 'supply', label: 'Pengadaan / Supply', emoji: '📦', desc: 'Kontrak pembelian produk' },
]

const InvestorProposalBaruPage = () => {
  const navigate = useNavigate()
  const [umkms, setUmkms] = React.useState([])
  const [loadingUmkms, setLoadingUmkms] = React.useState(true)
  const [selectedUmkm, setSelectedUmkm] = React.useState(null)
  const [showUmkmPicker, setShowUmkmPicker] = React.useState(false)
  const [proposalType, setProposalType] = React.useState('funding')
  const [title, setTitle] = React.useState('')
  const [nilai, setNilai] = React.useState('')
  const [tenor, setTenor] = React.useState('')
  const [skema, setSkema] = React.useState('')
  const [pesan, setPesan] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState(null)
  const fileInputRef = React.useRef(null)

  React.useEffect(() => {
    apiFetch(`${BASE_API}/umkms`)
      .then((r) => r.json())
      .then((json) => {
        const items = json?.data?.items ?? []
        setUmkms(items)
        if (items.length > 0) setSelectedUmkm(items[0])
      })
      .catch(() => {})
      .finally(() => setLoadingUmkms(false))
  }, [])

  const handleSubmit = async () => {
    if (!selectedUmkm || !title || !nilai || !tenor || !skema) return
    setSubmitError(null)
    setSubmitting(true)
    const token = localStorage.getItem('auth_token') ?? ''
    try {
      const body = new FormData()
      body.append('receiver_role', 'umkm')
      body.append('receiver_profile_id', selectedUmkm.profile_id)
      body.append('proposal_type', proposalType)
      body.append('title', title)
      body.append('amount', nilai.replace(/\D/g, ''))
      body.append('tenor_months', tenor.replace(/\D/g, ''))
      body.append('scheme', skema)
      body.append('message', pesan)
      body.append('action', 'draft')
      if (file) body.append('attachments', file)

      const res = await apiFetch(`${BASE_API}/proposals`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message ?? `Error ${res.status}`)

      navigate('/investor/proposal')
    } catch (err) {
      setSubmitError(err.message ?? 'Gagal menyimpan proposal. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

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
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#e5e4e0] pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#111111]">Tawarkan ke UMKM</h1>
          <p className="mt-1 text-sm text-[#5f5a53]">
            Buat draft proposal pendanaan atau pengadaan ke UMKM terpilih.
          </p>
        </div>
        <PressButton variant="ghost" onClick={() => navigate('/investor/proposal')}>
          Kembali
        </PressButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Left: form */}
        <div className="rounded-2xl border border-[#e5e4e0] bg-white p-6 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">

          {/* Tujuan ke UMKM */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">
              Tujuan ke UMKM *
            </div>
            {loadingUmkms ? (
              <div className="rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] px-4 py-3 text-sm text-[#8d877f]">Memuat daftar UMKM...</div>
            ) : selectedUmkm ? (
              <div className="rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] px-4 py-3 flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#205336] text-sm font-bold text-white">
                  {selectedUmkm.business_name.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#111111]">{selectedUmkm.business_name}</div>
                  <div className="text-xs text-[#5f5a53]">{selectedUmkm.sector_name} · {selectedUmkm.city}</div>
                  <div className="text-xs text-[#5f5a53]">GRS: {selectedUmkm.grs_score} · {selectedUmkm.tier_label}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <PressButton
                    variant="ghost"
                    className="!text-xs !px-3 !py-1.5 !flex !items-center !gap-1"
                    onClick={() => navigate(`/passport/${selectedUmkm.profile_id}`)}
                  >
                    <ExternalLink className="h-3 w-3" />
                    Lihat
                  </PressButton>
                  <button
                    type="button"
                    onClick={() => setShowUmkmPicker((v) => !v)}
                    className="text-xs font-semibold text-[#205336] border border-[#e5e4e0] rounded-lg px-3 py-1.5 hover:bg-white transition-colors"
                  >
                    Ganti
                  </button>
                </div>
              </div>
            ) : null}

            {/* UMKM picker */}
            {showUmkmPicker && (
              <div className="mt-2 rounded-xl border border-[#e5e4e0] bg-white shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                {umkms.map((umkm) => (
                  <div
                    key={umkm.profile_id}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f4f3ec] transition-colors border-b border-[#e5e4e0] last:border-0 cursor-pointer ${
                      selectedUmkm?.profile_id === umkm.profile_id ? 'bg-[#e8f0eb]' : ''
                    }`}
                    onClick={() => { setSelectedUmkm(umkm); setShowUmkmPicker(false) }}
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#205336] text-xs font-bold text-white">
                      {umkm.business_name.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#111111]">{umkm.business_name}</div>
                      <div className="text-xs text-[#5f5a53]">{umkm.sector_name} · {umkm.city} · GRS {umkm.grs_score}</div>
                    </div>
                    <span
                      className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-[#205336] border border-[#e5e4e0] rounded-lg px-2 py-1 hover:bg-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); navigate(`/passport/${umkm.profile_id}`) }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Lihat
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tipe proposal */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">Tipe Proposal *</div>
            <div className="grid grid-cols-2 gap-3">
              {PROPOSAL_TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setProposalType(t.key)}
                  className={`rounded-xl border p-4 text-left transition-colors duration-150 ${
                    proposalType === t.key ? 'border-[#205336] bg-[#e8f0eb]' : 'border-[#e5e4e0] bg-white hover:border-[#205336]'
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
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">Judul Proposal *</div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Penawaran Pendanaan Ekspansi Produksi"
              className="w-full rounded-xl border border-[#e5e4e0] bg-white px-4 py-2.5 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
            />
          </div>

          {/* Nilai, Tenor, Skema */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { label: 'Nilai (Rp) *', value: nilai, setter: setNilai, placeholder: '500.000.000' },
              { label: 'Tenor *', value: tenor, setter: setTenor, placeholder: '24 bulan' },
              { label: 'Skema *', value: skema, setter: setSkema, placeholder: 'Bagi hasil 8%' },
            ].map((field) => (
              <div key={field.label}>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">{field.label}</div>
                <input type="text" value={field.value} onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[#e5e4e0] bg-white px-3 py-2.5 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20"
                />
              </div>
            ))}
          </div>

          {/* Pesan */}
          <div className="mb-5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">Pesan ke UMKM</div>
            <textarea value={pesan} onChange={(e) => setPesan(e.target.value)} rows={4}
              placeholder="Halo, kami tertarik mendanai ekspansi bisnis Anda..."
              className="w-full rounded-xl border border-[#e5e4e0] bg-white px-4 py-3 text-sm text-[#111111] placeholder-[#5f5a53]/50 focus:border-[#205336] focus:outline-none focus:ring-2 focus:ring-[#205336]/20 resize-none"
            />
          </div>

          {/* Lampiran */}
          <div className="mb-6">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">Lampiran (PDF, maks 20 MB)</div>
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e5e4e0] bg-[#f4f3ec] py-8 cursor-pointer hover:border-[#205336] transition-colors"
            >
              <Paperclip className="h-6 w-6 text-[#5f5a53]" />
              <p className="text-sm text-[#5f5a53]">Tarik file ke sini atau <span className="font-semibold text-[#205336]">pilih dari komputer</span></p>
              <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            </div>
            {file && (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#e5e4e0] bg-white px-4 py-3">
                <div className="text-[10px] font-bold uppercase text-[#5f5a53] bg-[#f4f3ec] border border-[#e5e4e0] rounded px-1.5 py-0.5">PDF</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#111111] truncate">{file.name}</div>
                  <div className="text-xs text-[#5f5a53]">{formatBytes(file.size)} · siap kirim</div>
                </div>
                <button type="button" onClick={() => setFile(null)} className="text-[#934f42] hover:text-[#7a3a2e] transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          {submitError && <p className="mb-3 text-[0.78rem] text-red-600">{submitError}</p>}
          <div className="flex items-center justify-end gap-3">
            <PressButton variant="ghost" disabled={submitting} onClick={() => navigate('/investor/proposal')}>Batal</PressButton>
            <PressButton
              variant="primary"
              disabled={!title || !nilai || !tenor || !skema || !selectedUmkm || submitting}
              onClick={handleSubmit}
            >
              {submitting ? 'Menyimpan...' : 'Buat Draft'}
            </PressButton>
          </div>
        </div>

        {/* Right: UMKM profile + tips */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-4">Profil UMKM Tujuan</div>
            {selectedUmkm ? (
              <div className="flex flex-col gap-3 divide-y divide-[#e5e4e0]">
                {[
                  { label: 'Sektor', value: selectedUmkm.sector_name || '—' },
                  { label: 'Lokasi', value: `${selectedUmkm.city}, ${selectedUmkm.province}` },
                  { label: 'GRS Score', value: `${selectedUmkm.grs_score} / 100` },
                  { label: 'Tier', value: selectedUmkm.tier_label || '—' },
                  { label: 'Dokumen On-Chain', value: `${selectedUmkm.on_chain_document_count ?? 0} dokumen` },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 pt-3 first:pt-0">
                    <span className="text-sm text-[#5f5a53]">{row.label}</span>
                    <span className="text-sm font-semibold text-[#111111] text-right">{row.value}</span>
                  </div>
                ))}
                <div className="pt-3">
                  <PressButton
                    variant="ghost"
                    className="w-full !flex !items-center !justify-center !gap-2 !text-xs"
                    onClick={() => navigate(`/passport/${selectedUmkm.profile_id}`)}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Lihat Green Passport
                  </PressButton>
                </div>
              </div>
            ) : (
              <div className="text-sm text-[#8d877f]">Pilih UMKM terlebih dahulu.</div>
            )}
          </div>

          <div className="rounded-2xl border border-[#e5e4e0] bg-[#e8f0eb] p-5">
            <div className="text-sm font-semibold text-[#205336] mb-3">💡 Tips proposal kuat:</div>
            <ul className="flex flex-col gap-1.5">
              {[
                'Sebutkan nilai dan tenor yang spesifik',
                'Jelaskan skema pengembalian dengan jelas',
                'Sertakan term sheet atau proposal PDF',
                'Ringkas — maks 5 halaman PDF',
              ].map((tip) => (
                <li key={tip} className="text-xs text-[#205336] flex items-start gap-1.5">
                  <span>•</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorProposalBaruPage
