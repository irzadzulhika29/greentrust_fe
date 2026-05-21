export const UMKM_LIST = [
  { initials: 'B', name: 'Batik Siti', sector: 'Tekstil', location: 'Jogyakarta', grs: 92, tier: 'Unggul', docs: 18 },
  { initials: 'K', name: 'Kriya Rotan Jaya', sector: 'Kerajinan', location: 'Cirebon', grs: 85, tier: 'Unggul', docs: 16 },
  { initials: 'K', name: 'Kopi Alam Asri', sector: 'Agrikultur', location: 'Bandung', grs: 78, tier: 'Siap', docs: 14 },
]

export const ACTIVITIES = [
  {
    type: 'check',
    title: 'Proposal Diterima',
    desc: 'Batik Siti menerima proposal pendanaan Anda.',
    time: '2 JAM LALU',
    color: '#205336',
  },
  {
    type: 'arrow',
    title: 'GRS Naik ke 85',
    desc: 'Kriya Rotan Jaya masuk ke tier Unggul.',
    time: '5 JAM LALU',
    color: '#c47739',
  },
]

export const DASHBOARD_STATS = [
  {
    label: 'UMKM dalam pantauan',
    value: '24',
    sub: 'Total UMKM terverifikasi di watchlist Anda.',
    badge: '+3 minggu ini',
    badgeColor: 'text-[#205336]',
  },
  {
    label: 'Proposal aktif',
    value: '5',
    sub: '2 disetujui, 3 menunggu konfirmasi UMKM.',
    badge: 'Dalam proses',
    badgeColor: 'text-[#5f5a53]',
  },
]
