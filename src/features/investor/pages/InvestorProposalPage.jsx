import React from 'react'
import { Download, FileText } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'

const TABS = [
  { key: 'sent', label: 'Saya Kirim', count: 47 },
  { key: 'incoming', label: 'Permintaan UMKM', count: 1 },
  { key: 'approved', label: 'Disetujui', count: 29 },
  { key: 'rejected', label: 'Ditolak', count: 12 },
]

const STATUS_STYLES = {
  'Menunggu Anda': 'bg-[#fff4d6] text-[#c47739]',
  'Sedang Ditinjau': 'bg-[#fff4d6] text-[#c47739]',
  'Disetujui': 'bg-[#e8f0eb] text-[#205336]',
  'Ditolak': 'bg-[#fde8e3] text-[#934f42]',
}

const TYPE_STYLES = {
  'Pendanaan': 'bg-[#eaf2fb] text-[#336699]',
  'Pengadaan': 'bg-[#fff0e3] text-[#c57f44]',
  'Hibah': 'bg-[#f1ebfb] text-[#7b65a9]',
  'Pinjaman': 'bg-[#eaf6ee] text-[#205336]',
}

const proposals = [
  {
    id: 1,
    to: 'Batik Siti',
    type: 'Pendanaan',
    ref: 'PRP-2026-1042',
    date: '21 Mei 2026',
    time: '14:02',
    title: 'Pendanaan Modal Kerja Ekspansi Produksi',
    body: 'Halo Bu Siti, kami tertarik mendanai ekspansi workshop pewarnaan alam Anda. Lihat detail dalam lampiran. Terbuka untuk diskusi via WA / video call minggu depan.',
    file: { name: 'proposal-modal-kerja-ekspansi.pdf', size: '2.1 MB' },
    nilai: 'Rp 350.000.000',
    tenor: '24 bln tenor',
    terms: 'Bagi hasil 8%/thn',
    status: 'Menunggu Anda',
  },
  {
    id: 2,
    to: 'Batik Siti',
    type: 'Pengadaan',
    ref: 'PRP-2026-1038',
    date: '20 Mei 2026',
    time: '16:40',
    title: 'Kontrak Pembelian 800 Lembar Batik / Triwulan',
    body: 'Kainusa Group ingin menambah Batik Siti ke rantai supplier kami untuk lini Heritage. Kontrak awal 12 bulan, ekstensi otomatis. Lihat draft kontrak.',
    file: { name: 'kontrak-supply-kainusa.pdf', size: '1.6 MB' },
    nilai: 'Rp 480.000.000',
    tenor: '12 bln tenor',
    terms: 'PO triwulan + DP 30%',
    status: 'Sedang Ditinjau',
  },
  {
    id: 3,
    to: 'Kopi Bumi Toraja',
    type: 'Pendanaan',
    ref: 'PRP-2026-1031',
    date: '18 Mei 2026',
    time: '09:15',
    title: 'Investasi Pengembangan Kapasitas Roasting',
    body: 'Kami tertarik mendukung ekspansi kapasitas roasting Kopi Bumi Toraja untuk memenuhi permintaan ekspor ke Eropa. Detail investasi terlampir.',
    file: { name: 'proposal-roasting-toraja.pdf', size: '1.8 MB' },
    nilai: 'Rp 750.000.000',
    tenor: '36 bln tenor',
    terms: 'Ekuitas 15%',
    status: 'Disetujui',
  },
]

const InvestorProposalPage = () => {
  const [activeTab, setActiveTab] = React.useState('sent')

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#111111]">Proposal & Penawaran</h1>
          <p className="mt-1 text-sm text-[#5f5a53]">
            4 proposal yang Anda kirim sedang aktif. 1 proposal masuk dari UMKM butuh keputusan.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <PressButton variant="ghost" className="!flex !items-center !gap-2">
            <Download className="h-4 w-4" />
            Ekspor CSV
          </PressButton>
          <PressButton variant="primary" className="!flex !items-center !gap-2">
            <span>+</span>
            Tawarkan ke UMKM
          </PressButton>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Proposal Aktif', value: '47', sub: 'sejak bergabung' },
          { label: 'Disetujui UMKM', value: '29', sub: '62% approval rate' },
          { label: 'Permintaan UMKM Masuk', value: '1', sub: 'butuh tinjauan', highlight: true },
          { label: 'Total Nilai Disetujui', value: 'Rp 28 M', sub: '12 bulan terakhir', large: true },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-3">{stat.label}</div>
            <div className={`font-semibold leading-none ${stat.large ? 'text-3xl' : 'text-4xl'} ${stat.highlight ? 'text-[#c47739]' : 'text-[#111111]'}`}>
              {stat.value}
            </div>
            <div className="mt-2 text-xs text-[#5f5a53]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 rounded-xl border border-[#e5e4e0] bg-white p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
              activeTab === tab.key
                ? 'bg-[#111111] text-white'
                : 'text-[#5f5a53] hover:text-[#111111]'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                activeTab === tab.key ? 'bg-white text-[#111111]' : 'bg-[#e5e4e0] text-[#5f5a53]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Proposal list */}
      <div className="flex flex-col gap-4">
        {proposals.map((p) => (
          <div key={p.id} className="rounded-2xl border border-[#e5e4e0] bg-white shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            {/* Card header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <div className="flex items-center gap-2 text-sm text-[#5f5a53]">
                <FileText className="h-4 w-4 text-[#205336]" />
                <span>Anda kirim ke</span>
                <span className="font-semibold text-[#111111]">{p.to}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${TYPE_STYLES[p.type] ?? 'bg-[#f4f3ec] text-[#5f5a53]'}`}>
                  {p.type}
                </span>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[p.status] ?? 'bg-[#f4f3ec] text-[#5f5a53]'}`}>
                ● {p.status}
              </span>
            </div>
            <div className="px-6 pb-1 text-[10px] text-[#8d877f]">
              {p.ref} · {p.date} · {p.time}
            </div>

            {/* Card body */}
            <div className="grid gap-6 px-6 pb-6 pt-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">{p.title}</h3>
                <p className="text-sm text-[#5f5a53] leading-relaxed mb-4">{p.body}</p>
                {/* File attachment */}
                <div className="flex items-center gap-3 rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] px-4 py-3 w-fit">
                  <div className="text-[10px] font-bold uppercase text-[#5f5a53] bg-white border border-[#e5e4e0] rounded px-1.5 py-0.5">PDF</div>
                  <div>
                    <div className="text-sm font-semibold text-[#111111]">{p.file.name}</div>
                    <div className="text-xs text-[#5f5a53]">{p.file.size}</div>
                  </div>
                  <PressButton variant="primary" className="!flex !items-center !gap-1.5 !px-3 !py-1.5 !text-xs ml-2">
                    <Download className="h-3 w-3" />
                    Unduh
                  </PressButton>
                </div>
              </div>

              {/* Right: nilai + actions */}
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-[#e5e4e0] bg-[#f4f3ec] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-2">Nilai</div>
                  <div className="text-2xl font-semibold text-[#111111]">{p.nilai}</div>
                  <div className="mt-1 text-xs text-[#5f5a53]">{p.tenor} &nbsp; {p.terms}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <PressButton variant="ghost" className="w-full !justify-center">Edit</PressButton>
                  <PressButton variant="ghost" className="w-full !justify-center">Tarik kembali</PressButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestorProposalPage
