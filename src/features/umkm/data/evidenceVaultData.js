export const categories = [
  {
    code: 'BB',
    slug: 'bb',
    name: 'Bahan Baku & Sourcing',
    weight: 20,
    current: 3,
    total: 3,
    status: 'Lengkap',
    color: '#7a5521',
    tint: '#fbefd7',
  },
  {
    code: 'PP',
    slug: 'pp',
    name: 'Proses Produksi',
    weight: 20,
    current: 2,
    total: 3,
    status: 'Sebagian',
    color: '#236041',
    tint: '#dcebdc',
  },
  {
    code: 'PL',
    slug: 'pl',
    name: 'Pengelolaan Limbah',
    weight: 20,
    current: 1,
    total: 3,
    status: 'Sebagian',
    color: '#176174',
    tint: '#dff5f8',
  },
  {
    code: 'EE',
    slug: 'ee',
    name: 'Energi & Emisi',
    weight: 15,
    current: 2,
    total: 3,
    status: 'Sebagian',
    color: '#6b4b12',
    tint: '#f7edce',
  },
  {
    code: 'SK',
    slug: 'sk',
    name: 'Sosial & Ketenagakerjaan',
    weight: 15,
    current: 4,
    total: 4,
    status: 'Lengkap',
    color: '#934f42',
    tint: '#fde8e3',
  },
  {
    code: 'LK',
    slug: 'lk',
    name: 'Legalitas & Kepatuhan',
    weight: 10,
    current: 4,
    total: 4,
    status: 'Lengkap',
    color: '#45457b',
    tint: '#e7e7fb',
  },
]

const detailOverrides = {
  bb: {
    summary: '3 dari 3 dokumen terpenuhi. Kontribusi 20 dari 20 poin GRS.',
    score: 100,
    requiredDocs: [
      {
        title: 'Nota / invoice pembelian bahan baku',
        fileName: 'Nota Indigo CV. Sumber Warna.pdf',
        completed: true,
      },
      {
        title: 'Surat jalan dari supplier',
        fileName: 'Surat Jalan Mei 2026.pdf',
        completed: true,
      },
      {
        title: 'Foto atau profil supplier',
        fileName: 'Profil Sumber Warna.docx',
        completed: true,
      },
    ],
    aiInsightTitle: 'Kategori ini sudah lengkap, tapi bisa lebih kuat.',
    aiInsightBody:
      'Tambah dokumen pendukung opsional untuk meningkatkan kepercayaan investor pada bukti Anda.',
    aiRecommendations: [
      {
        title: 'Sertifikat fair-trade dari supplier',
        note: 'memperkuat klaim ethical sourcing',
      },
      {
        title: 'Foto lokasi kebun supplier',
        note: 'visualisasi langsung untuk investor',
      },
    ],
    uploadedDocs: [
      {
        type: 'PDF',
        name: 'Nota Indigo CV. Sumber Warna.pdf',
        meta: '1.2 MB • 12 Apr 2026 • conf 96%',
        status: 'on-chain',
      },
      {
        type: 'PDF',
        name: 'Surat Jalan Mei 2026.pdf',
        meta: '720 KB • 04 Mei 2026 • conf 92%',
        status: 'on-chain',
      },
      {
        type: 'DOCX',
        name: 'Profil Sumber Warna.docx',
        meta: '440 KB • 08 Apr 2026 • conf 88%',
        status: 'on-chain',
      },
      {
        type: 'JPG',
        name: 'Foto Workshop Pewarnaan.jpg',
        meta: '2.4 MB • 19 Mei 2026 • conf 58%',
        status: 'review',
        warning: 'AI tidak yakin — perlu koreksi',
      },
    ],
    nextPriority: [
      {
        code: 'PL',
        title: 'Pengelolaan Limbah',
        note: 'Kurang 2 dok',
        gain: '+13 GRS',
      },
      {
        code: 'EE',
        title: 'Energi & Emisi',
        note: 'Kurang 1 dok',
        gain: '+5 GRS',
      },
    ],
    acceptedExamples: [
      'Nota tulis tangan (foto JPG)',
      'Invoice PDF cetak/digital',
      'Struk thermal yang difoto',
      'Email konfirmasi supplier (PDF/screenshot)',
    ],
  },
  pp: {
    summary: '2 dari 3 dokumen terpenuhi. Kontribusi 13 dari 20 poin GRS.',
    score: 67,
    requiredDocs: [
      {
        title: 'SOP produksi atau alur proses',
        fileName: 'SOP Produksi Batik Alami.pdf',
        completed: true,
      },
      {
        title: 'Foto area produksi aktif',
        fileName: 'Workshop Produksi Mei.jpg',
        completed: true,
      },
      {
        title: 'Dokumen kontrol kualitas',
        fileName: 'Belum diunggah',
        completed: false,
      },
    ],
    aiInsightTitle: 'Masih ada satu bukti inti yang belum masuk.',
    aiInsightBody:
      'Tambahkan dokumen quality control agar proses produksi terlihat konsisten dan siap audit.',
    aiRecommendations: [
      {
        title: 'Checklist QC harian',
        note: 'menunjukkan proses inspeksi yang berjalan',
      },
      {
        title: 'Foto label batch produksi',
        note: 'membantu traceability produk',
      },
    ],
    uploadedDocs: [
      {
        type: 'PDF',
        name: 'SOP Produksi Batik Alami.pdf',
        meta: '980 KB • 02 Mei 2026 • conf 95%',
        status: 'on-chain',
      },
      {
        type: 'JPG',
        name: 'Workshop Produksi Mei.jpg',
        meta: '1.8 MB • 15 Mei 2026 • conf 91%',
        status: 'on-chain',
      },
    ],
    nextPriority: [
      {
        code: 'PL',
        title: 'Pengelolaan Limbah',
        note: 'Kurang 2 dok',
        gain: '+13 GRS',
      },
      {
        code: 'EE',
        title: 'Energi & Emisi',
        note: 'Kurang 1 dok',
        gain: '+5 GRS',
      },
    ],
    acceptedExamples: [
      'Checklist QC cetak',
      'Foto proses inspeksi produk',
      'Lembar SOP yang ditandatangani',
      'Spreadsheet batch produksi yang di-export PDF',
    ],
  },
  pl: {
    summary: '1 dari 3 dokumen terpenuhi. Kontribusi 7 dari 20 poin GRS.',
    score: 33,
    requiredDocs: [
      {
        title: 'Foto tempat pemilahan limbah',
        fileName: 'Area Pemilahan Limbah.jpg',
        completed: true,
      },
      {
        title: 'Catatan pengangkutan / pengolahan limbah',
        fileName: 'Belum diunggah',
        completed: false,
      },
      {
        title: 'Bukti reuse / recycle material',
        fileName: 'Belum diunggah',
        completed: false,
      },
    ],
    aiInsightTitle: 'Kategori ini paling cepat menaikkan skor Anda.',
    aiInsightBody:
      'Tambahkan dua bukti operasional sederhana agar investor melihat praktik limbah yang benar-benar berjalan.',
    aiRecommendations: [
      {
        title: 'Foto karung limbah terlabel',
        note: 'validasi pemisahan limbah di lokasi',
      },
      {
        title: 'Nota penjualan sisa kain',
        note: 'mendukung reuse atau recycle material',
      },
    ],
    uploadedDocs: [
      {
        type: 'JPG',
        name: 'Area Pemilahan Limbah.jpg',
        meta: '1.4 MB • 10 Mei 2026 • conf 86%',
        status: 'on-chain',
      },
    ],
    nextPriority: [
      {
        code: 'EE',
        title: 'Energi & Emisi',
        note: 'Kurang 1 dok',
        gain: '+5 GRS',
      },
      {
        code: 'PP',
        title: 'Proses Produksi',
        note: 'Kurang 1 dok',
        gain: '+7 GRS',
      },
    ],
    acceptedExamples: [
      'Foto area sampah terpisah',
      'Bukti setor ke bank sampah',
      'Invoice penjualan limbah',
      'Dokumen kerja sama pengangkut limbah',
    ],
  },
  ee: {
    summary: '2 dari 3 dokumen terpenuhi. Kontribusi 10 dari 15 poin GRS.',
    score: 67,
    requiredDocs: [
      {
        title: 'Tagihan listrik / energi usaha',
        fileName: 'Tagihan Listrik April 2026.pdf',
        completed: true,
      },
      {
        title: 'Foto peralatan hemat energi',
        fileName: 'Lampu LED Produksi.jpg',
        completed: true,
      },
      {
        title: 'Catatan konsumsi energi bulanan',
        fileName: 'Belum diunggah',
        completed: false,
      },
    ],
    aiInsightTitle: 'Bukti efisiensi energi sudah terlihat, tapi belum konsisten.',
    aiInsightBody:
      'Satu catatan monitoring rutin akan membuat klaim efisiensi energi jauh lebih kuat.',
    aiRecommendations: [
      {
        title: 'Rekap meter listrik bulanan',
        note: 'menunjukkan tren pemakaian energi',
      },
      {
        title: 'Foto stiker hemat energi di area kerja',
        note: 'mendukung kebiasaan operasional',
      },
    ],
    uploadedDocs: [
      {
        type: 'PDF',
        name: 'Tagihan Listrik April 2026.pdf',
        meta: '560 KB • 30 Apr 2026 • conf 94%',
        status: 'on-chain',
      },
      {
        type: 'JPG',
        name: 'Lampu LED Produksi.jpg',
        meta: '1.1 MB • 17 Mei 2026 • conf 84%',
        status: 'on-chain',
      },
    ],
    nextPriority: [
      {
        code: 'PL',
        title: 'Pengelolaan Limbah',
        note: 'Kurang 2 dok',
        gain: '+13 GRS',
      },
      {
        code: 'PP',
        title: 'Proses Produksi',
        note: 'Kurang 1 dok',
        gain: '+7 GRS',
      },
    ],
    acceptedExamples: [
      'Tagihan PLN usaha',
      'Foto lampu LED atau mesin hemat energi',
      'Catatan meter listrik di buku tulis',
      'Export spreadsheet pemakaian energi',
    ],
  },
  sk: {
    summary: '4 dari 4 dokumen terpenuhi. Kontribusi 15 dari 15 poin GRS.',
    score: 100,
    requiredDocs: [
      {
        title: 'Daftar pekerja aktif',
        fileName: 'Daftar Pekerja 2026.pdf',
        completed: true,
      },
      {
        title: 'Bukti pembayaran upah',
        fileName: 'Slip Upah April 2026.pdf',
        completed: true,
      },
      {
        title: 'Aturan keselamatan kerja',
        fileName: 'Poster K3.docx',
        completed: true,
      },
      {
        title: 'Foto APD atau briefing kerja',
        fileName: 'Briefing Produksi.jpg',
        completed: true,
      },
    ],
    aiInsightTitle: 'Kategori sosial Anda sudah sangat kuat.',
    aiInsightBody:
      'Jika ingin menambah kualitas narasi, unggah bukti pelatihan atau dokumentasi briefing berkala.',
    aiRecommendations: [
      {
        title: 'Foto sesi pelatihan pekerja',
        note: 'menunjukkan peningkatan kapasitas tim',
      },
      {
        title: 'Notulen briefing keselamatan',
        note: 'mendukung budaya kerja aman',
      },
    ],
    uploadedDocs: [
      {
        type: 'PDF',
        name: 'Daftar Pekerja 2026.pdf',
        meta: '420 KB • 07 Mei 2026 • conf 97%',
        status: 'on-chain',
      },
      {
        type: 'PDF',
        name: 'Slip Upah April 2026.pdf',
        meta: '690 KB • 30 Apr 2026 • conf 93%',
        status: 'on-chain',
      },
      {
        type: 'DOCX',
        name: 'Poster K3.docx',
        meta: '320 KB • 12 Apr 2026 • conf 88%',
        status: 'on-chain',
      },
      {
        type: 'JPG',
        name: 'Briefing Produksi.jpg',
        meta: '1.3 MB • 14 Mei 2026 • conf 89%',
        status: 'on-chain',
      },
    ],
    nextPriority: [
      {
        code: 'PL',
        title: 'Pengelolaan Limbah',
        note: 'Kurang 2 dok',
        gain: '+13 GRS',
      },
      {
        code: 'EE',
        title: 'Energi & Emisi',
        note: 'Kurang 1 dok',
        gain: '+5 GRS',
      },
    ],
    acceptedExamples: [
      'Daftar hadir pelatihan',
      'Foto APD saat digunakan',
      'Slip upah atau transfer bank',
      'Poster atau SOP keselamatan kerja',
    ],
  },
  lk: {
    summary: '4 dari 4 dokumen terpenuhi. Kontribusi 10 dari 10 poin GRS.',
    score: 100,
    requiredDocs: [
      {
        title: 'NIB / legalitas usaha',
        fileName: 'NIB GreenTrust Batik.pdf',
        completed: true,
      },
      {
        title: 'NPWP usaha',
        fileName: 'NPWP Usaha.pdf',
        completed: true,
      },
      {
        title: 'Izin lokasi atau domisili',
        fileName: 'Surat Domisili Usaha.pdf',
        completed: true,
      },
      {
        title: 'Dokumen kepatuhan tambahan',
        fileName: 'Sertifikat Usaha Mikro.pdf',
        completed: true,
      },
    ],
    aiInsightTitle: 'Legalitas inti sudah lengkap dan siap diverifikasi.',
    aiInsightBody:
      'Anda hanya perlu menjaga dokumen tetap terbaru agar proses audit dan issuance passport berjalan lancar.',
    aiRecommendations: [
      {
        title: 'Tanda bukti perpanjangan izin',
        note: 'berguna saat masa berlaku dokumen hampir habis',
      },
      {
        title: 'Foto papan nama usaha',
        note: 'mendukung kecocokan identitas lokasi',
      },
    ],
    uploadedDocs: [
      {
        type: 'PDF',
        name: 'NIB GreenTrust Batik.pdf',
        meta: '480 KB • 03 Apr 2026 • conf 99%',
        status: 'on-chain',
      },
      {
        type: 'PDF',
        name: 'NPWP Usaha.pdf',
        meta: '390 KB • 03 Apr 2026 • conf 98%',
        status: 'on-chain',
      },
      {
        type: 'PDF',
        name: 'Surat Domisili Usaha.pdf',
        meta: '510 KB • 05 Apr 2026 • conf 94%',
        status: 'on-chain',
      },
      {
        type: 'PDF',
        name: 'Sertifikat Usaha Mikro.pdf',
        meta: '610 KB • 09 Apr 2026 • conf 92%',
        status: 'on-chain',
      },
    ],
    nextPriority: [
      {
        code: 'PL',
        title: 'Pengelolaan Limbah',
        note: 'Kurang 2 dok',
        gain: '+13 GRS',
      },
      {
        code: 'PP',
        title: 'Proses Produksi',
        note: 'Kurang 1 dok',
        gain: '+7 GRS',
      },
    ],
    acceptedExamples: [
      'NIB atau izin usaha PDF',
      'NPWP hasil scan',
      'Surat domisili atau lokasi usaha',
      'Sertifikat UMKM atau dokumen kepatuhan lokal',
    ],
  },
}

export const getIndicatorHref = (slug) => `/umkm/evidence/${slug}`

export const evidenceIndicatorDetails = categories.map((category) => ({
  ...category,
  ...detailOverrides[category.slug],
}))

export const findEvidenceIndicatorBySlug = (slug) =>
  evidenceIndicatorDetails.find((category) => category.slug === slug)
