# GreenTrust Passport

GreenTrust adalah platform kredensial hijau untuk UMKM Indonesia. Platform ini membantu UMKM membuktikan praktik ramah lingkungan mereka melalui sistem verifikasi dokumen berbasis AI dan pencatatan hash on-chain.

## Latar Belakang

64 juta UMKM menggerakkan 60% PDB Indonesia. Banyak yang sudah menjalankan praktik ramah lingkungan, namun bukti operasional mereka tersebar di nota fisik, foto WhatsApp, dan spreadsheet. Investor membutuhkan data ESG terstruktur — UMKM tidak punya cara untuk menyajikannya.

GreenTrust menjawab masalah ini dengan:

- **Evidence Vault** — UMKM mengunggah dokumen operasional ke 6 kategori indikator ESG
- **Green Readiness Score (GRS)** — skor 0–100 dihitung server-side dari dokumen yang diunggah
- **Green Passport** — profil publik terverifikasi dengan hash dokumen tercatat on-chain
- **Marketplace Proposal** — menghubungkan UMKM terverifikasi dengan investor dan buyer

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion v12 |
| Icons | Lucide React |
| Linting | ESLint 10 |
| Bahasa | JavaScript (ESM) |

## Struktur Proyek

```
src/
├── main.jsx
├── App.jsx
├── router.jsx
├── index.css
├── assets/
├── components/
│   ├── shared/         # AppLayout, sidebar
│   └── ui/             # Komponen UI reusable
├── features/
│   ├── auth/           # Login, register, onboarding
│   ├── public/         # Landing, direktori, passport publik
│   ├── umkm/           # Dashboard, evidence vault, passport, proposal
│   ├── investor/       # Dashboard, proposal, profil
│   ├── auditor/        # Review dokumen (placeholder)
│   └── admin/          # Manajemen platform (placeholder)
└── lib/
    └── utils.js        # apiFetch, getAuthPayload, proposalAction
```

## Setup

### Prasyarat

- Node.js 18+
- npm 9+

### Instalasi

```bash
npm install
```

### Environment Variables

Buat file `.env` di root proyek:

```env
VITE_BASE_API=https://<host>/api/v1
VITE_N8N_URL=https://<n8n-host>/webhook
```

| Variable | Keterangan |
|---|---|
| `VITE_BASE_API` | Base URL REST API backend |
| `VITE_N8N_URL` | Webhook n8n untuk pipeline AI klasifikasi dokumen |

### Menjalankan Dev Server

```bash
npm run dev
```

### Build Produksi

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Fitur per Role

### Publik (tanpa autentikasi)

| Route | Halaman |
|---|---|
| `/` | Landing page |
| `/direktori` | Direktori UMKM terverifikasi |
| `/passport/:profileId` | Green Passport publik UMKM |
| `/investor` | Direktori investor |
| `/investor/:profileId` | Profil investor |

### UMKM

| Route | Halaman |
|---|---|
| `/umkm` | Dashboard — GRS, progress 6 kategori |
| `/umkm/evidence` | Evidence Vault — unggah dokumen, rekomendasi |
| `/umkm/evidence/:indicatorCode` | Detail indikator |
| `/umkm/passport` | Green Passport — terbitkan dan bagikan |
| `/umkm/proposal` | Kelola proposal masuk dan terkirim |
| `/umkm/proposal/baru` | Buat proposal baru ke investor |
| `/umkm/proposal/:proposalId` | Detail proposal |

### Investor

| Route | Halaman |
|---|---|
| `/investor/dashboard` | Dashboard — statistik portofolio, rekomendasi UMKM |
| `/investor/proposal` | Kelola proposal |
| `/investor/proposal/baru` | Tawarkan proposal ke UMKM |
| `/investor/proposal/:proposalId` | Detail proposal |
| `/investor/profil` | Pengaturan profil |
| `/investor/disimpan` | Portofolio UMKM |

## Autentikasi

Autentikasi menggunakan JWT yang disimpan di `localStorage`:

- `auth_token` — token setelah login, dipakai untuk semua request API
- `reg_session_token` — token sesi registrasi/onboarding

Semua request API melalui `apiFetch()` di `src/lib/utils.js` yang secara otomatis:

- Menyertakan header `ngrok-skip-browser-warning` untuk dev tunnel
- Redirect ke halaman login yang sesuai role saat menerima response `401 Unauthorized`

## Kategori Indikator ESG

| Kode | Nama | Bobot GRS |
|---|---|---|
| BB | Bahan Baku & Sourcing | 20% |
| PP | Proses Produksi | 20% |
| PL | Pengelolaan Limbah | 20% |
| EE | Energi & Emisi | 15% |
| SK | Sosial & Ketenagakerjaan | 15% |
| LK | Legalitas & Kepatuhan | 10% |

## Tier GRS

| Tier | Rentang Skor |
|---|---|
| Unggul | 85 – 100 |
| Siap | 70 – 84 |
| Berkembang | 0 – 69 |

Passport dapat diterbitkan jika GRS mencapai ambang minimum 70.
