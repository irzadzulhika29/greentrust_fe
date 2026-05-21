# GreenTrust Passport — PLAN.md

Panduan eksekusi tunggal untuk repo ini. Sumber kebenaran produk tetap `docs/PRD_2.md` (v3.0, canonical — PRD_1 identik secara substansi). Dokumen ini menerjemahkan PRD ke rencana kerja konkret di codebase yang ada sekarang.

> **Status repo (per 2026-05-21):** Frontend React 19 + Vite + Tailwind v4 sudah running, struktur fitur per-role sudah di-scaffold (`auth`, `public`, `umkm`, `auditor`, `admin`). Backend, smart contract, dan integrasi Supabase **belum ada** di workspace ini.

---

## 1. Reconciliation — PRD vs Realita Codebase

PRD ditulis untuk Next.js + Bull Queue + 2 role (UMKM + Admin). Realita ada penyimpangan yang harus dibekukan dulu sebelum lanjut, supaya tidak menulis kode dua kali.

| Area | PRD §9.1 / §3.1 | Realita repo | Keputusan |
|---|---|---|---|
| Framework FE | Next.js 14 (SSR) | React 19 + Vite (SPA) | **Tetap Vite.** SSR tidak kritikal untuk MVP hackathon. SEO landing page diatasi via meta tags + prerender belakangan. |
| Role MVP | UMKM + Admin (Investor di v2.0) | Sudah ada `features/auditor/` | **Jadikan 4 role di MVP:** UMKM, Auditor, Admin, Investor. Investor & Auditor align dengan PRD v4 changelog (Investor sudah masuk MVP). Auditor = peran internal moderasi konten/dokumen di luar Admin. |
| Background jobs | Bull Queue (Redis) | Folder `n8n/Document GreenTrust.json` ada | **Pakai n8n** untuk AI classification pipeline. Backend hanya enqueue webhook ke n8n, bukan run Bull. |
| Backend | Go + Gin | Belum ada | Tetap Go + Gin — buat repo terpisah `greentrust-api/` ATAU subfolder `backend/`. Keputusan ditunda sampai mulai Fase 2. |
| Auth + DB | Supabase (Auth + Postgres + Storage + RLS) | Belum diintegrasikan | Tetap Supabase. Frontend pakai `@supabase/supabase-js` langsung untuk auth + read public data. Mutasi sensitif lewat backend Go. |
| Design system | "Tailwind generic" (PRD §9.1) | `DESIGN.md` — flat, purple accent, no gradients, no colorful borders | **`DESIGN.md` adalah law.** PRD tidak override. Setiap komponen baru wajib lewat checklist DESIGN.md §4. |

**Action item dari reconciliation:** update PRD changelog di sprint 1 supaya status dokumen produk sinkron dengan keputusan teknis di atas.

---

## 2. Arsitektur Target (MVP)

```
[ Browser SPA — Vite/React ]
       |  fetch + Supabase JS
       v
[ Supabase ]                   [ Backend Go + Gin ]
  - Auth (JWT)         <----    - /auth/*    (proxy ke Supabase admin)
  - Postgres + RLS     <---->   - /evidence/* (upload, hash, validasi)
  - Storage (private)           - /grs/recalc
                                - /passports/* (issue, blockchain submit)
                                - /reports, /admin/*
                                       |
                                       v
                               [ n8n webhook ]
                               (Document GreenTrust.json)
                                       |
                                       +--> LLM/Vision (Claude/GPT-4V)
                                       +--> tulis hasil ke Supabase
                                                |
                                                v
                                       [ Smart Contract — testnet ]
                                        Sepolia / Polygon Amoy
                                        via go-ethereum
```

Boundary penting:
- Frontend **tidak pernah** baca/tulis tabel sensitif (`user_identities`, `evidence_documents`) langsung. Hanya lewat backend Go.
- Frontend boleh baca tabel publik (`umkm_profiles`, `green_passports` status=active, `umkm_products`) langsung via Supabase JS dengan RLS yang permisif untuk row publik.
- File asli **tidak pernah** kena URL publik. Backend bikin signed URL TTL 15 menit per request (PRD PR-01).

---

## 3. Mapping PRD → Folder Codebase

Routing sudah di-scaffold di `src/router.jsx:1`. Mapping fitur PRD ke folder:

| Domain PRD | Folder | Halaman utama |
|---|---|---|
| Landing page + detail UMKM publik (PRD §5.2) | `src/features/public/` | `pages/LandingPage.jsx`, *(belum)* `pages/UmkmDetailPage.jsx`, `pages/PassportPage.jsx` |
| Auth (PRD §7.3, US-07/INV01) | `src/features/auth/` | `LoginPage.jsx`, `RegisterPage.jsx`, `InvestorLoginPage.jsx`, `InvestorRegisterPage.jsx` |
| UMKM dashboard, Evidence Vault, GRS, Passport (PRD §5.1, §6) | `src/features/umkm/` | `DashboardPage.jsx`, `ClaimPage.jsx`, `ProfilePage.jsx` + perlu tambah: `EvidenceVaultPage.jsx`, `PassportPage.jsx`, `OnboardingPage.jsx` |
| Investor view (PRD §7.4b) | *(belum ada)* `src/features/investor/` | Investor reuse halaman publik UMKM detail dengan permission ditingkatkan. Halaman list/filter setelah login. |
| Auditor (di luar PRD — keputusan tim) | `src/features/auditor/` | `DashboardPage.jsx`, `ReviewPage.jsx`, `HistoryPage.jsx` — moderasi dokumen low-confidence AI |
| Admin (PRD §3.2 Admin Dashboard) | `src/features/admin/` | `DashboardPage.jsx`, `UsersPage.jsx`, `SettingsPage.jsx` + perlu tambah: `ReportsPage.jsx` |
| Layout shell | `src/components/shared/AppLayout.jsx` | Sidebar (sudah ada) — perlu tambah role-aware nav |
| Primitives UI | `src/components/ui/` | `sidebar.jsx`, `sign-in.jsx` ada. Tambah secara incremental: `Button`, `Card`, `Input`, `Badge`, `ProgressBar`, `FileDropzone` (semua wajib patuh DESIGN.md §4). |

Route belum lengkap di `router.jsx:1` — minimum yang harus ditambah:
- `/passport/:slug` — public detail (PRD US-03, US-21)
- `/login` + `/register` — current-state UMKM auth entry
- `/investor/login` + `/investor/register` — investor auth entry
- `/onboarding` — current-state UMKM onboarding, kept unchanged in this slice
- `/umkm/evidence` — Evidence Vault (PRD §7.4)
- `/umkm/passport` — submit blockchain + lihat passport sendiri
- `/investor` + `/investor/explore` — list UMKM untuk investor login
- `/admin/reports` — moderasi laporan publik
- Route guard berdasarkan role (UMKM tidak boleh masuk `/admin`, dst).
- `/investor/onboarding` â€” onboarding investor 3 langkah (identitas, riwayat pekerjaan, selesai)
- `/investor/dashboard` â€” entry dashboard investor setelah onboarding selesai
- `/investor` tetap dipakai sebagai direktori publik investor

---

## 4. Data Model — Ringkasan

Tabel & rules detail ada di PRD §9.2 dan §8.4. Yang perlu dieksekusi di Fase 2:

Tabel wajib dibuat (lewat Supabase migration):
1. `user_identities` — KTP OCR, NIK terenkripsi
2. `umkm_profiles` — identitas bisnis, `whatsapp_number` NOT NULL, `profile_completion_score`
3. `umkm_products` — multi-produk
4. `investor_profiles` — registrasi investor
5. `evidence_documents` — file path, hash, AI confidence, status, `blockchain_tx_hash`, **`visibility_level`** (PRIVATE | LOGGED_IN | PUBLIC) — set by backend, bukan user
6. `green_passports` — UNIQUE per `umkm_id`, slug publik
7. `reports` — dari publik, INSERT only
8. `audit_logs` — INSERT only, immutable

RLS minimal (PR-02, PR-03, UR-05):
- `user_identities`: user hanya read/write rownya sendiri. Admin read-only.
- `evidence_documents`: 
  - Owner: full access kecuali DELETE jika `blockchain_tx_hash IS NOT NULL`
  - Investor authenticated: read row dengan `visibility_level IN ('LOGGED_IN','PUBLIC')` dan **bukan** kategori `legalitas` jika file bertipe KTP/finance
  - Public anon: read 0 row (dokumen tidak pernah accessible publik tanpa login)
- `green_passports` status='active': read public.

NIK encryption: AES-256 di kolom `nik`. Key di env backend, **tidak di Supabase**. Frontend tidak pernah lihat NIK plaintext — selalu masked `32xxxx` (PRD §8.4).

---

## 5. Fase Eksekusi

PRD §13.1 punya timeline 12 minggu. Karena ini hackathon dan repo baru tahap scaffolding, fase di bawah ini lebih ringkas dan fokus dependency, bukan kalender mingguan yang fiktif.

### Fase 0 — Foundations (sekarang)
- [x] Scaffold FE + routing per-role
- [x] DESIGN.md
- [ ] Pin keputusan reconciliation §1 di file ini
- [ ] Buat `backend/` skeleton Go + Gin (atau repo terpisah, putuskan)
- [ ] Buat project Supabase + 1 migration awal: `auth.users` extension, `umkm_profiles`, `green_passports` (status enum)
- [ ] Setup env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, dan backend env terpisah

**DoD:** `npm run dev` jalan, login Supabase berhasil dummy, backend `/healthz` return 200.

### Fase 1 — Auth + Onboarding UMKM
PRD US-07 s/d US-10 + US-INV01.
- Register UMKM (email/password) + verifikasi email
- Register Investor (explicit investor auth path, investor-first slice)
- Register investor sukses lanjut ke `/investor/onboarding`, bukan langsung ke dashboard
- Onboarding investor 3 langkah: identitas diri â†’ riwayat pekerjaan â†’ selesai, lalu CTA ke `/investor/dashboard`
- Onboarding wizard 2 langkah: identitas diri (KTP upload + OCR via n8n) → identitas bisnis (termasuk `whatsapp_number` validasi format `628xxx`)
- `profile_completion_score` dihitung server-side, gate route `/umkm/evidence` di backend (return 403) **dan** di FE

**DoD:** UR-02 enforced server-side (PRD §11.2 #10 lulus QA manual).

### Fase 2 — Evidence Vault + AI Pipeline
PRD US-11 s/d US-17, §6 GRS engine.
- UI 6 kategori dengan progress bar + dokumen yang dibutuhkan (lihat §6.4)
- Endpoint `POST /evidence/upload`:
  1. Validasi MIME + size (UR-06)
  2. Simpan ke Supabase Storage private bucket
  3. Compute SHA-256, cek duplikat (BR-04)
  4. Set `visibility_level` otomatis berdasarkan kategori + tipe file (§8.4)
  5. Trigger n8n webhook untuk klasifikasi
- n8n workflow: OCR/extract → klasifikasi 6 indikator + confidence → callback ke backend → simpan ke `evidence_documents`
- Recalculate GRS server-side setelah dokumen `classified` atau `reviewed`. Formula `Σ(W_i × C_i) × 100` di backend, **tidak** di FE.
- AI Gap Analyzer: query yang return list dokumen kurang per kategori
- Koreksi kategori manual oleh UMKM → log di `correction_log`, recompute GRS

**DoD:** Upload → AI classify → GRS naik, end-to-end < 30 detik (PRD §10 perf target).

### Fase 3 — Auditor (review low-confidence)
Bukan dari PRD, tapi sudah di-scaffold. Justifikasi: PRD R-01 mitigasi minta "fallback human review untuk confidence <60%".
- Auditor melihat antrian dokumen `ai_confidence < 0.60` di `ReviewPage.jsx`
- Approve/reject/recategorize dengan log
- Hasil auditor mengubah status dokumen dari `classified` → `reviewed`

**DoD:** Dokumen low-confidence tidak bisa naik ke blockchain sebelum di-review auditor.

### Fase 4 — Blockchain + Green Passport
PRD US-18 s/d US-22, §8.3.
- Smart contract Solidity (struct di BR-01) di-deploy ke Sepolia/Polygon Amoy
- Endpoint `POST /passports/submit`:
  1. Server-side check `grs_score >= 70` (UR-04)
  2. Ambil semua dokumen status `reviewed`
  3. Submit batch hash ke contract via go-ethereum
  4. Retry 3x exponential backoff (BR-03)
- Endpoint `POST /passports/issue`: generate slug + QR PNG, set `status='active'`
- Halaman publik `/passport/:slug` dengan SSR meta tags (gunakan `react-helmet` atau prerender plugin)
- Tombol "Verifikasi di Blockchain" buka block explorer dengan TX hash pre-filled — accessible tanpa login (PRD §11.1 #6)

**DoD:** PRD §11.4 #18–23 semua Pass.

### Fase 5 — Public Surface + Investor + Reports
- Landing page list UMKM aktif dengan filter sektor + kota (US-01, US-02)
- Detail UMKM publik: profil + GRS + WhatsApp CTA (US-03, US-04)
- Investor login → reveal breakdown dokumen per kategori, hide PRIVATE (US-INV02, §8.4)
- Filter GRS tier untuk investor (US-INV04)
- Modal Report tanpa login (US-06): rate limit per IP, min 20 char alasan
- Admin Reports page: list reports, action taken log

**DoD:** Pengunjung anonymous bisa buka landing → detail → klik WA → masuk WhatsApp dengan nomor benar.

### Fase 6 — Hardening + Pre-launch
- i18n ID/EN (PRD §10 P1)
- Mobile audit di 360px (PRD §10 P0)
- Penetration test ringan: cek RLS di-enforce, signed URL TTL 15 min, rate limit upload
- Seed 10–15 UMKM pilot dengan Green Passport aktif (PRD §13.1 critical path)

**DoD:** PRD §11 acceptance criteria semua Pass + landing page tidak kosong.

---

## 6. Backlog Lintas Fase

Hal yang gampang lupa kalau cuma fokus per-fase:

- **Audit log** (PR-05) — pasang sejak Fase 1, append-only, INSERT only via SQL function.
- **NIK encryption** — pasang sejak Fase 1 supaya tidak ada plaintext NIK di DB.
- **Idempotency** upload — gunakan `file_hash_sha256` sebagai key, BR-04.
- **Rate limit** — middleware di backend Go: upload (UR-07), report submit, login attempt.
- **Observability** — minimum: log structured + error rate alert di pipeline AI dan blockchain (BR-03, R-04).
- **Bilingual** (P1) — siapkan struktur `i18n/` sejak awal, jangan hardcode string ID.
- **Route guard** di `router.jsx` — saat ini tidak ada protection. Pasang sebelum Fase 2 supaya `/admin` tidak diakses UMKM.

---

## 7. Risiko Aktif & Open Questions

PRD §12 sudah list 7 risiko. Yang spesifik untuk repo ini sekarang:

| ID | Isu | Owner | Mitigasi |
|---|---|---|---|
| RP-01 | Penyimpangan stack FE Next.js → Vite belum tertulis di PRD | CTO | Update PRD §9.1 di sprint 1 |
| RP-02 | Folder `auditor/` ada tapi role auditor tidak ada di PRD | PM | Putuskan: tetap MVP atau defer ke v2.0. Rekomendasi: **tetap MVP** — selaras mitigasi R-01. |
| RP-03 | n8n workflow `Document GreenTrust.json` belum di-review terkait latency target <30s | Backend lead | Test load awal Fase 2, fallback queue local jika n8n bottleneck |
| RP-04 | Backend Go belum punya repo/folder | Backend lead | Putuskan monorepo vs split repo sebelum Fase 1 mulai |
| RP-05 | Investor masuk MVP (per PRD_2 changelog v4) tapi flow proposal masih v2.0 — hindari scope creep | PM | Investor MVP **read-only** view + filter, tidak ada feature proposal |

Open questions yang belum ditutup PRD §16:
1. Smart contract di Sepolia atau Polygon Amoy? Pilih satu sebelum Fase 4.
2. Provider OCR KTP — pakai tool di n8n existing atau tambah Google Vision/AWS Textract?
3. WhatsApp CTA — pakai `wa.me/<nomor>` (gratis, sudah cukup) atau WhatsApp Business API (deferred).

---

## 8. Definition of Done — MVP Launch

Mengikuti PRD §11 + §13.1 critical path. MVP dianggap launch-ready jika:

1. Semua acceptance criteria PRD §11.1–§11.4 berstatus Pass
2. Min 10 UMKM pilot dengan Green Passport aktif tampil di landing page
3. Lighthouse score landing page ≥ 80 di mobile (PRD §10)
4. Penetration test ringan: 0 finding kategori High
5. Smart contract di-audit internal sebelum deploy testnet (PRD §13.1)
6. Sign-off section PRD §17 ditandatangani

---

## 9. Cara Pakai Dokumen Ini

- Sumber kebenaran fitur & business rule: **`docs/PRD_2.md`**
- Sumber kebenaran visual: **`DESIGN.md`**
- Sumber kebenaran eksekusi & deviasi teknis: **file ini (`PLAN.md`)**

Setiap deviasi baru dari PRD wajib dicatat di tabel §1 atau §7. Jangan ubah PRD diam-diam.
