

🌿

**PRODUCT REQUIREMENTS DOCUMENT**

**GreenTrust Passport**

AI-Powered Green Supply Chain Passport untuk UMKM Indonesia

| Versi | 3.0.0 — Final Aligned |
| :---- | :---- |
| **Tanggal** | 20 Mei 2026 |
| **Status** | Draft Final — Untuk Review |
| **Author** | Khaizuran Alvaro (CTO) — AkademiCompe |
| **Kompetisi** | IN:NOVATE – CodeUp\! Politeknik Astra |
| **Phase** | MVP — UMKM-centric, 2 role (UMKM \+ Admin) |
| **GRS Threshold** | 70 / 100 untuk terbitkan Green Passport |
| **Changelog** | v3.0: Rebuild sepenuhnya berdasarkan keputusan product final. Role MVP: UMKM \+ Admin. Investor masuk v2.0. Landing page \= showcase UMKM hijau. CTA via WhatsApp. |

Khaizuran Alvaro · Azmi Al Ghifari Rahman · Muhammad Irza Dzulhika

# **Informasi Dokumen**

| Field | Detail |
| :---- | :---- |
| **Nama Produk** | GreenTrust Passport |
| **Versi** | 3.0.0 |
| **Author** | Khaizuran Alvaro (CTO) |
| **Status** | Draft Final — Pending Sign-off |
| **Fase Produk** | MVP — Hackathon Phase |
| **Role MVP** | UMKM \+ Admin (Investor direncanakan di v2.0) |
| **GRS Threshold Passport** | 70 / 100 |
| **Referensi** | Executive Summary GreenTrust | PRD Team Matchmaker v1.1 | PRD eCommerce v1.2 |

## **Riwayat Revisi**

| Versi | Tanggal | Deskripsi | Author |
| :---- | :---- | :---- | :---- |
| 1.0.0 | 20 Mei 2026 | PRD awal dari executive summary. | AkademiCompe |
| 2.0.0 | 20 Mei 2026 | Enhanced: tambah Business Rules, Smart GRS Engine, Activity Diagram, BPMN, Open Questions, Sign-off. | Khaizuran Alvaro |
| **3.0.0** | 20 Mei 2026 | Rebuild final: MVP \= UMKM-centric, landing page showcase, CTA WA, GRS threshold 70, OQ v3 terjawab. | Khaizuran Alvaro |

# **1\. Executive Summary**

**🌟 Visi Produk:** GreenTrust Passport menjadi infrastruktur kepercayaan hijau bagi ekosistem UMKM Indonesia — di mana setiap UMKM dapat membuktikan keberlanjutan operasional mereka secara digital, terverifikasi, dan dapat ditemukan oleh siapapun yang membutuhkan mitra bisnis hijau.

GreenTrust Passport adalah platform web yang membantu UMKM Indonesia mengubah bukti operasional sehari-hari menjadi Green Passport digital yang terstruktur dan terverifikasi oleh blockchain. Platform ini menjadi jembatan kepercayaan antara UMKM dengan pihak eksternal — investor, lembaga pembiayaan, maupun buyer — yang membutuhkan bukti ESG sebelum mengambil keputusan bisnis.

Di fase MVP, platform sepenuhnya berfokus pada pengalaman UMKM: mulai dari onboarding, upload dokumen, klasifikasi AI, kalkulasi Green Readiness Score, hingga penerbitan Green Passport yang tampil di landing page publik. Siapapun yang tertarik dapat langsung menghubungi UMKM via WhatsApp dari halaman detail mereka.

## **1.1 Inti Masalah yang Diselesaikan**

**💡 Core Problem:** UMKM Indonesia sudah menjalankan praktik ramah lingkungan, tetapi tidak mampu membuktikannya secara terstruktur dan kredibel kepada pihak eksternal. Hambatan utama bersifat dokumentasi dan verifikasi, bukan operasional.

## **1.2 Proposisi Nilai**

| Untuk Siapa | Nilai yang Diterima |
| :---- | :---- |
| **UMKM** | Dokumentasi otomatis berbasis AI, Green Readiness Score instan, Green Passport digital yang dapat ditemukan dan dibagikan — tanpa biaya sertifikasi formal. |
| **Investor / Lender** | Temukan UMKM hijau terverifikasi langsung dari landing page. Due diligence dipercepat: lihat GRS, detail dokumen, dan verifikasi blockchain dalam satu halaman. |
| **Buyer / Procurement** | Cari supplier UMKM yang sudah terbukti ramah lingkungan. Verifikasi kredensial ESG tanpa perlu audit manual. |
| **Admin Platform** | Dashboard moderasi dan monitoring kualitas data UMKM. Kelola laporan abuse dan pastikan integritas konten platform. |

# **2\. Latar Belakang & Analisis Masalah**

## **2.1 Konteks Pasar**

| Fakta | Implikasi |
| :---- | :---- |
| \>64 juta UMKM menyumbang \>60% PDB dan menyerap 97% tenaga kerja (Kemenkop UKM, 2023\) | Dampak masif jika solusi berhasil diadopsi secara luas |
| EU CSRD & ESG multinasional mensyaratkan bukti keberlanjutan dari seluruh rantai pasok | UMKM tereksklusi dari supply chain dan pembiayaan internasional tanpa credential hijau |
| Biaya sertifikasi formal (ISO 14001\) Rp 50–200 juta/tahun — tidak terjangkau UMKM kecil | Barrier struktural ke pasar hijau premium yang hanya bisa ditembus usaha menengah-besar |
| Investor hijau & lembaga pembiayaan membutuhkan data ESG terstruktur untuk due diligence | Ada demand nyata untuk credential hijau UMKM yang credible dan efisien untuk diverifikasi |

## **2.2 Root Cause Analysis — 5 Akar Masalah**

| Akar Masalah | Deskripsi | Dampak |
| :---- | :---- | :---- |
| **1\. Fragmentasi Bukti** | Dokumen tersebar di nota fisik, foto WA, spreadsheet — tidak ada sistem terpusat | Tidak dapat disajikan ke investor/lender/buyer secara cepat |
| **2\. Absensi Standar** | UMKM tidak tahu dokumen apa yang diperlukan untuk memenuhi standar ESG | Tidak tahu harus mulai dari mana — friction tinggi di awal journey |
| **3\. Klaim Tak Terverifikasi** | Klaim 'ramah lingkungan' tidak bisa divalidasi — information asymmetry | Investor/lender tidak percaya; kehilangan peluang pendanaan |
| **4\. Biaya Sertifikasi Tinggi** | ISO 14001 tidak terjangkau UMKM kecil | Structural exclusion dari pasar dan pembiayaan hijau premium |
| **5\. Integritas Digital Lemah** | Dokumen digital mudah dimanipulasi tanpa jejak | Investor/auditor tidak bisa memastikan keaslian bukti |

## **2.3 Pain Points Teridentifikasi**

| ID | Pain Point | Dampak Bisnis | Severity |
| :---- | :---- | :---- | :---- |
| PP-01 | Tidak ada sistem dokumentasi keberlanjutan yang terpusat | UMKM gagal masuk pasar hijau dan akses pembiayaan | **CRITICAL** |
| PP-02 | Klaim ESG tidak terverifikasi — information asymmetry | Investor/lender tidak percaya; trust gap menghambat keputusan bisnis | **CRITICAL** |
| PP-03 | Biaya sertifikasi formal tidak terjangkau | Structural exclusion dari pasar dan pembiayaan hijau | **HIGH** |
| PP-04 | Integritas dokumen digital tidak terjamin | Pihak eksternal tidak bisa memastikan keaslian bukti | **HIGH** |
| PP-05 | Tidak ada panduan gap — UMKM tidak tahu apa yang kurang | UMKM tidak bisa memperbaiki kesiapan hijau secara sistematis | **MEDIUM** |

## **2.4 Hipotesis Solusi**

**Hypothesis:** Jika kami membangun platform yang mengotomasi klasifikasi dokumen via AI, menghitung GRS secara objektif, mendaftarkan bukti ke blockchain, dan menerbitkan Green Passport yang dapat ditemukan secara publik — maka UMKM dapat membuktikan keberlanjutan mereka tanpa sertifikasi formal, dan pihak eksternal mendapat cara yang cepat dan terpercaya untuk memverifikasi kredensial hijau UMKM.

## **2.5 Kontribusi SDGs**

| SDG | Target | Kontribusi GreenTrust |
| :---- | :---- | :---- |
| SDG 8 — Decent Work & Economic Growth | Akses UMKM ke pasar dan pembiayaan yang lebih besar | Green Passport membuka akses ke investor hijau dan procurement premium |
| SDG 12 — Responsible Consumption & Production | Dokumentasi dan peningkatan praktik produksi bertanggung jawab | AI Gap Analyzer mendorong perbaikan operasional berkelanjutan |
| SDG 17 — Partnerships for the Goals | Kemitraan UMKM–investor–pemerintah berbasis transparansi data | Ekosistem data terpercaya yang menghubungkan seluruh stakeholder |

# **3\. Product Scope**

## **3.1 Ringkasan Fase**

| Fase | Scope | Role yang Terlibat |
| :---- | :---- | :---- |
| **MVP (sekarang)** | Landing page showcase UMKM hijau. UMKM mendaftar, upload dokumen, terbitkan Green Passport. Kontak via WhatsApp. | UMKM \+ Admin |
| v2.0 (next) | Tambah role Investor. Dashboard dua arah. UMKM dan Investor bisa saling explore dan ajukan proposal kerja sama. | UMKM \+ Admin \+ Investor |

## **3.2 In-Scope — MVP**

* Landing page publik: tampilkan daftar UMKM yang sudah terverifikasi (Green Passport aktif). Dapat diakses tanpa login.

* Halaman detail UMKM publik: profil bisnis \+ Green Passport (GRS, breakdown indikator, dokumen terverifikasi). Tanpa login: lihat profil \+ overall GRS. Dengan login: lihat detail dokumen. CTA WhatsApp di bawah.

* Registrasi & Onboarding UMKM: daftar akun, verifikasi email, isi data identitas diri dan identitas bisnis.

* Evidence Vault: upload dokumen per kategori indikator (PDF, JPEG, PNG, DOCX, maks 10MB).

* AI Classification Pipeline: identifikasi dan klasifikasi dokumen ke 6 indikator keberlanjutan secara otomatis.

* Green Readiness Score (GRS): kalkulasi skor 0–100 berdasarkan dokumen yang diunggah per kategori.

* AI Gap Analyzer: tampilkan dokumen apa yang masih kurang per kategori dan rekomendasikan langkah berikutnya.

* Blockchain Proof of Integrity: hash SHA-256 dokumen didaftarkan ke smart contract setelah GRS ≥ 70\.

* Penerbitan Green Passport: halaman publik dengan slug URL \+ QR code \+ shareable link.

* Fitur Report: user publik bisa melaporkan dokumen atau profil yang menyesatkan. Masuk ke dashboard Admin.

* Admin Dashboard: moderasi laporan, pantau kualitas data, kelola status UMKM.

* Bilingual UI: Bahasa Indonesia (default) \+ English.

* Responsive: Mobile Web (360px+) dan Desktop.

## **3.3 Out-of-Scope — MVP (Defer ke v2.0+)**

| Tidak Dikerjakan di MVP | Deferral Plan |
| :---- | :---- |
| Role Investor — akun, dashboard, dan fitur explore Investor | v2.0: Investor dapat daftar, lihat detail UMKM (termasuk dokumen), dan ajukan proposal. |
| Sistem pengajuan proposal dua arah (UMKM ↔ Investor) | v2.0: UMKM ajukan proposal pendanaan/pengadaan ke Investor; Investor tawarkan proposal ke UMKM. Notifikasi in-app \+ email. |
| Halaman profil Investor | v2.0: Investor punya halaman profil yang bisa dilihat UMKM. |
| AI Matching Algorithm berbasis ML | v2.0: setelah ada cukup data interaksi. MVP gunakan rule-based scoring. |
| Sertifikasi resmi otomatis (ISO, SNI) | v3.0: integrasi dengan lembaga sertifikasi resmi setelah go-live. |
| Notifikasi push mobile (PWA/native app) | v3.0: fokus web terlebih dahulu. |

# **4\. User Personas & Jobs to Be Done**

## **4.1 Persona — MVP**

| Persona | Deskripsi & Goal | Jobs to Be Done |
| :---- | :---- | :---- |
| **Pelaku UMKM (Primary User)** | Pengusaha batik/craft/rotan/produk alam skala kecil. Goal: mendapatkan Green Passport agar bisa diakses oleh investor dan buyer yang mencari UMKM hijau. | Ketika ada investor yang mencari UMKM hijau, saya ingin profil dan bukti keberlanjutan saya bisa ditemukan dan diverifikasi dengan mudah, agar saya tidak kehilangan peluang pendanaan. |
| **Admin Platform (Internal)** | Tim internal yang memantau kualitas data, moderasi konten, dan mengelola laporan dari publik. | Ketika ada laporan masuk, saya ingin bisa meninjau, mengambil tindakan, dan memastikan konten platform tetap berkualitas dan terpercaya. |

## **4.2 Persona — v2.0 (untuk referensi roadmap)**

| Persona | Deskripsi & Goal | Jobs to Be Done |
| :---- | :---- | :---- |
| **Investor / Lender** | Manajer investasi atau analis kredit hijau. Goal: menemukan UMKM terverifikasi untuk due diligence sebelum keputusan pendanaan. | Ketika mengevaluasi UMKM untuk pendanaan hijau, saya ingin melihat GRS dan bukti blockchain dalam satu halaman agar due diligence lebih efisien. |
| **Buyer / Procurement** | Procurement manager yang mencari supplier UMKM ramah lingkungan. | Ketika mencari supplier untuk green procurement, saya ingin memverifikasi kredensial ESG UMKM tanpa perlu audit manual yang mahal. |

# **5\. Alur Produk & User Journey**

## **5.1 Alur Utama UMKM — End-to-End**

**Alur lengkap dari pertama kali UMKM mengenal platform hingga Green Passport terbit dan dapat ditemukan publik.** 

| Step | Aksi UMKM | Respon Sistem | Output |
| :---- | :---- | :---- | :---- |
| 1 | Buka landing page, lihat UMKM yang sudah terverif, tertarik daftar | Tampilkan landing page dengan daftar Green Passport aktif \+ tombol 'Daftarkan Bisnis Anda' | Awareness terbentuk |
| 2 | Klik Daftar, isi email \+ password | Kirim email verifikasi. Setelah klik link verif, akun aktif. | Akun UMKM terbuat |
| 3 | Isi data identitas diri (nama, nomor HP, NIK) | Simpan ke tabel user\_identities. Hitung profile\_completion\_score. | Identitas diri tersimpan |
| 4 | Isi data identitas bisnis (nama usaha, sektor, lokasi, deskripsi, nomor WA bisnis) | Simpan ke tabel umkm\_profiles. Update completion score. | Profil bisnis tersimpan |
| 5 | Masuk ke Evidence Vault, lihat 6 kategori indikator beserta daftar dokumen yang dibutuhkan per kategori | Tampilkan 6 kategori dengan status masing-masing (Belum Ada, Sebagian, Lengkap) dan progress bar GRS. | UMKM paham apa yang harus disiapkan |
| 6 | Upload dokumen ke salah satu kategori (misal: foto nota bahan baku ke kategori Bahan Baku) | Validasi format & ukuran. Simpan ke private storage. Compute SHA-256 hash. Trigger AI classification job. | Dokumen tersimpan dengan status 'Memproses' |
| 7 | Menunggu hasil AI, lalu melihat hasil klasifikasi | AI pipeline selesai: tampilkan kategori yang terdeteksi \+ confidence score. Notifikasi in-app bahwa dokumen selesai diproses. | Dokumen terklasifikasi |
| 8 | Review hasil AI. Jika ada yang salah, klik 'Koreksi' dan pilih kategori yang tepat | Simpan koreksi \+ catat correction log. Recalculate GRS. | Data akurat tersimpan |
| 9 | Ulangi upload untuk kategori lain hingga GRS naik | Setiap dokumen baru yang diproses otomatis recalculate GRS. AI Gap Analyzer update rekomendasi. | GRS meningkat bertahap |
| 10 | Lihat AI Gap Analyzer: dokumen apa yang masih kurang di setiap kategori | Tampilkan daftar dokumen yang belum dipenuhi per kategori beserta contoh dokumen yang bisa diunggah. | UMKM tahu langkah berikutnya |
| 11 | GRS mencapai ≥ 70\. Tombol 'Ajukan Verifikasi Blockchain' aktif. | Sistem cek GRS ≥ 70 server-side. Jika memenuhi, tampilkan tombol submit. Jika belum, tampilkan berapa poin yang kurang. | Gate terbuka |
| 12 | Klik 'Ajukan Verifikasi Blockchain', konfirmasi | Sistem ambil hash semua dokumen yang sudah reviewed. Submit ke smart contract via background job. Retry 3x jika gagal. | Hash terdaftar on-chain |
| 13 | Menerima notifikasi: blockchain registration sukses. Klik 'Terbitkan Green Passport'. | Generate halaman publik dengan slug URL. Generate QR code PNG. Set status passport \= active. UMKM muncul di landing page. | Green Passport live dan dapat ditemukan publik |
| 14 | Salin link atau QR code, bagikan ke investor/lender/buyer via WA atau email | Halaman publik accessible tanpa login (profil \+ overall GRS). Detail dokumen accessible dengan login. | UMKM dapat ditemukan dan diverifikasi |
| 15 | Di kemudian hari, tambah dokumen baru yang belum diupload sebelumnya | Proses ulang dari step 6\. GRS recalculate. Passport otomatis update (GRS naik, dokumen baru muncul di halaman publik). | GRS meningkat, passport makin kuat |

## **5.2 Alur Pengunjung Publik (Tanpa Login)**

| Step | Aksi Pengunjung | Yang Terlihat |
| :---- | :---- | :---- |
| 1 | Buka landing page | Daftar UMKM yang sudah terverifikasi: nama bisnis, sektor, GRS score, lokasi, thumbnail. |
| 2 | Klik salah satu UMKM | Halaman detail UMKM: profil bisnis (nama, sektor, lokasi, deskripsi), overall GRS, badge tier, QR code, dan tombol WhatsApp CTA. |
| 3 | Klik tombol WhatsApp CTA | Redirect ke WhatsApp dengan nomor bisnis UMKM. Pesan pre-filled opsional: 'Halo, saya tertarik menjalin kerja sama dengan \[nama bisnis\] yang saya lihat di GreenTrust Passport.' |
| 4 | Klik 'Lihat Detail Dokumen' — muncul prompt login | Redirect ke halaman login/register. Setelah login, kembali ke halaman detail dengan dokumen per indikator yang terbuka. |
| 5 | Klik 'Verifikasi di Blockchain' (tersedia tanpa login) | Buka block explorer publik dengan TX hash yang sudah pre-filled. Pengunjung bisa verifikasi keaslian dokumen secara mandiri. |
| 6 | Klik tombol 'Laporkan' | Modal report muncul. Isi alasan laporan (teks bebas, wajib min 20 karakter). Submit tanpa perlu login. Laporan masuk ke Admin Dashboard. |

# **6\. Green Readiness Score Engine**

## **6.1 Filosofi Desain**

GRS dirancang agar objektif dan tidak bisa dimanipulasi. UMKM hanya bisa meningkatkan skor dengan mengunggah dokumen yang valid — bukan dengan mengubah input apapun. Sistem yang menentukan apakah dokumen memenuhi kriteria suatu kategori, bukan UMKM.

## **6.2 Formula Utama**

**Formula GRS:** GRS \= Σ(W\_i × C\_i) × 100Di mana:  W\_i \= Bobot indikator ke-i (dalam desimal, total \= 1.0)  C\_i \= Skor kelengkapan kategori ke-i (nilai 0.0 – 1.0)  GRS Range: 0 (tidak ada dokumen) hingga 100 (semua kategori terpenuhi penuh)

## **6.3 Cara C\_i Dihitung per Kategori**

Setiap kategori memiliki daftar dokumen yang dibutuhkan. C\_i dihitung berdasarkan berapa dokumen yang sudah terpenuhi:

**Formula C\_i:** C\_i \= (Jumlah dokumen terpenuhi di kategori i) ÷ (Total dokumen yang dibutuhkan di kategori i)Contoh: Kategori Bahan Baku membutuhkan 3 dokumen (nota pembelian, surat jalan, foto supplier).Jika UMKM baru upload 2 dari 3 → C\_i \= 2/3 \= 0.667Jika semua 3 terpenuhi → C\_i \= 1.0Jika belum ada → C\_i \= 0.0

## **6.4 Tabel Indikator, Bobot, dan Dokumen yang Dibutuhkan**

| i | Kategori Indikator | Bobot (W\_i) | Daftar Dokumen yang Dibutuhkan |
| :---- | :---- | :---- | :---- |
| 1 | Bahan Baku & Sourcing | **0.20** | Nota/invoice pembelian bahan baku, surat jalan dari supplier, foto atau profil supplier |
| 2 | Proses Produksi | **0.20** | Foto dokumentasi proses produksi, SOP atau prosedur kerja tertulis, rekaman kegiatan (video/foto seri) |
| 3 | Pengelolaan Limbah | **0.20** | Manifest atau catatan pengelolaan limbah, foto fasilitas pengolahan limbah (IPAL/TPS), kontrak dengan pihak ketiga pengelola limbah |
| 4 | Energi & Emisi | **0.15** | Tagihan listrik (min 3 bulan terakhir), dokumentasi sumber energi terbarukan (jika ada), catatan konsumsi bahan bakar atau kalkulator emisi |
| 5 | Sosial & Ketenagakerjaan | **0.15** | Daftar karyawan dan nominal gaji, bukti kepesertaan BPJS, foto lingkungan kerja, kontrak kerja |
| 6 | Legalitas & Kepatuhan | **0.10** | NIB (Nomor Induk Berusaha), NPWP, izin usaha/SIUP (jika relevan), izin lingkungan atau SPPL |
|  | **TOTAL** | **1.00** | GRS \= 100 jika semua dokumen di semua kategori terpenuhi |

## **6.5 Contoh Kalkulasi End-to-End**

### **Skenario: UMKM Batik — Siti, Jogjakarta**

| Kategori | Butuh | Sudah Ada | C\_i | Kontribusi ke GRS |
| :---- | :---- | :---- | :---- | :---- |
| Bahan Baku (W=0.20) | 3 dok | 3 dok | 3/3 \= 1.00 | 0.20 × 1.00 \= 0.20 |
| Proses Produksi (W=0.20) | 3 dok | 2 dok | 2/3 \= 0.67 | 0.20 × 0.67 \= 0.13 |
| Pengelolaan Limbah (W=0.20) | 3 dok | 1 dok | 1/3 \= 0.33 | 0.20 × 0.33 \= 0.07 |
| Energi & Emisi (W=0.15) | 3 dok | 0 dok | 0/3 \= 0.00 | 0.15 × 0.00 \= 0.00 |
| Sosial & Ketenagakerjaan (W=0.15) | 4 dok | 4 dok | 4/4 \= 1.00 | 0.15 × 1.00 \= 0.15 |
| Legalitas & Kepatuhan (W=0.10) | 4 dok | 3 dok | 3/4 \= 0.75 | 0.10 × 0.75 \= 0.075 |
| **TOTAL GRS** |  |  |  | **(0.20+0.13+0.07+0+0.15+0.075) × 100 \= 62.5** |

**Interpretasi:** GRS Siti \= 62.5 — belum mencapai threshold 70\. AI Gap Analyzer akan merekomendasikan: (1) lengkapi Proses Produksi dengan 1 dokumen SOP, (2) upload minimal 2 dokumen Energi & Emisi, (3) tambah 1 dokumen Legalitas. Jika ketiga ini terpenuhi, GRS estimasi naik ke \~83.

## **6.6 GRS Tier & Threshold Passport**

| Range GRS | Tier | Status Passport | Keterangan |
| :---- | :---- | :---- | :---- |
| 0 – 39 | **Tier 1 — Awal** | Tidak bisa submit | Mulai dari legalitas dan bahan baku |
| 40 – 59 | **Tier 2 — Berkembang** | Tidak bisa submit | Butuh lebih banyak kategori terpenuhi |
| 60 – 69 | **Tier 3 — Hampir** | Tidak bisa submit — kurang dari threshold | Dekat\! Lengkapi 1–2 kategori lagi |
| 70 – 84 | **Tier 4 — Siap ✅** | **✅ Bisa submit ke blockchain & terbitkan Passport** | Muncul di landing page |
| 85 – 100 | **Tier 5 — Unggul ⭐** | **✅ Passport dengan badge Unggul** | Badge khusus di landing page |

**Penting:** Threshold 70 bersifat fixed — tidak berubah setelah launch. UMKM yang GRS-nya turun di bawah 70 (misalnya ada dokumen yang masa berlakunya habis) akan mendapat notifikasi untuk memperbarui dokumen.

# **7\. Fitur & User Stories**

## **7.1 RICE Prioritization**

**Formula RICE:** RICE Score \= (Reach × Impact × Confidence) ÷ EffortReach: estimasi user terdampak per kuartal | Impact: 3=Massive, 2=High, 1=Medium | Confidence: 1.0=Tinggi, 0.8=Sedang | Effort: person-months

| Fitur | R | I | C | E | RICE | Prioritas |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Landing Page & Halaman Detail UMKM | 50 | 3 | 1.0 | 1 | **150** | P0 — Must Have |
| Registrasi & Onboarding UMKM | 50 | 3 | 1.0 | 1 | **150** | P0 — Must Have |
| Evidence Vault (Upload per Kategori) | 50 | 3 | 1.0 | 1 | **150** | P0 — Must Have |
| AI Classification Pipeline | 50 | 3 | 0.8 | 2 | **60** | P0 — Must Have |
| Green Readiness Score (GRS) | 50 | 2 | 1.0 | 1 | **100** | P0 — Must Have |
| AI Gap Analyzer | 50 | 2 | 0.8 | 1 | **80** | P0 — Must Have |
| Blockchain Proof of Integrity | 50 | 2 | 0.8 | 2 | **40** | P0 — Must Have |
| Green Passport \+ QR \+ WhatsApp CTA | 50 | 3 | 1.0 | 1 | **150** | P0 — Must Have |
| Fitur Report (publik ke Admin) | 30 | 1 | 1.0 | 1 | **30** | P1 — Should Have |
| Admin Dashboard (moderasi & laporan) | 5 | 2 | 1.0 | 1 | **10** | P1 — Should Have |
| Bilingual UI (ID \+ EN) | 50 | 1 | 0.8 | 1 | **40** | P1 — Should Have |

## **7.2 User Stories — Landing Page & Halaman Detail**

| ID | User Story | Acceptance Criteria |
| :---- | :---- | :---- |
| US-01 | Sebagai pengunjung, saya ingin melihat daftar UMKM hijau yang sudah terverifikasi di landing page agar saya bisa browse dan menemukan mitra bisnis potensial. | Grid UMKM terverif tampil. Setiap card: nama bisnis, sektor, kota, GRS score, tier badge. Load \<2 detik. |
| US-02 | Sebagai pengunjung, saya ingin memfilter UMKM berdasarkan sektor dan kota agar pencarian lebih efisien. | Filter sektor (batik/craft/bambu/dll) dan kota berfungsi real-time tanpa reload. |
| US-03 | Sebagai pengunjung, saya ingin mengklik UMKM dan melihat halaman detail profil beserta Green Passport-nya. | Halaman detail tampil: profil bisnis, GRS, tier badge, QR code, tombol WhatsApp CTA, tombol Verifikasi Blockchain. |
| US-04 | Sebagai pengunjung, saya ingin menghubungi UMKM langsung via WhatsApp dari halaman detail. | Tombol WhatsApp CTA redirect ke WA dengan nomor bisnis UMKM. Pesan pre-filled opsional. |
| US-05 | Sebagai pengunjung, saya ingin memverifikasi keaslian dokumen UMKM di blockchain tanpa perlu login. | Tombol 'Verifikasi di Blockchain' buka block explorer dengan TX hash pre-filled. Accessible tanpa login. |
| US-06 | Sebagai pengunjung, saya ingin bisa melaporkan konten yang menyesatkan tanpa perlu login. | Modal report: isi alasan (min 20 karakter), submit. Konfirmasi laporan terkirim. Laporan masuk Admin Dashboard. |

## **7.3 User Stories — Registrasi & Profil UMKM**

| ID | User Story | Acceptance Criteria |
| :---- | :---- | :---- |
| US-07 | Sebagai calon pengguna UMKM, saya ingin mendaftar akun dengan email dan password. | Registrasi \<60 detik. Email verifikasi terkirim. Akun aktif setelah klik link verif. |
| US-08 | Sebagai UMKM, saya ingin mengisi data identitas diri (nama lengkap, nomor HP, NIK) agar profil saya dapat dipercaya. | Form identitas diri tersimpan. Semua field wajib diisi sebelum bisa akses Evidence Vault. |
| US-09 | Sebagai UMKM, saya ingin mengisi data identitas bisnis (nama usaha, sektor, kota, deskripsi, nomor WA bisnis). | Profil bisnis tersimpan. Nomor WA bisnis wajib diisi karena digunakan untuk CTA di halaman publik. |
| US-10 | Sebagai UMKM, saya tidak bisa mengakses Evidence Vault sebelum melengkapi data identitas diri dan bisnis. | Gate enforced server-side: API /evidence/upload return 403 jika profile\_completion\_score \< 100 untuk field wajib. |

## **7.4 User Stories — Evidence Vault & AI**

| ID | User Story | Acceptance Criteria |
| :---- | :---- | :---- |
| US-11 | Sebagai UMKM, saya ingin melihat 6 kategori indikator beserta daftar dokumen yang dibutuhkan per kategori dan status pengisian masing-masing. | Dashboard Evidence Vault: 6 kategori dengan progress bar, jumlah dokumen terpenuhi vs total, dan GRS kontribusi per kategori. |
| US-12 | Sebagai UMKM, saya ingin mengupload dokumen ke kategori tertentu (PDF, JPEG, PNG, DOCX, maks 10MB). | Upload berhasil dengan progress indicator. Validasi format dan ukuran di frontend dan backend. Trigger AI job. |
| US-13 | Sebagai UMKM, saya ingin melihat hasil klasifikasi AI untuk setiap dokumen yang diupload. | Hasil muncul \<30 detik: kategori yang terdeteksi, confidence score (Tinggi/Sedang/Rendah), ringkasan konten yang diekstrak. |
| US-14 | Sebagai UMKM, saya ingin mengoreksi hasil klasifikasi AI jika kategorinya salah. | Tombol 'Koreksi' tersedia. UMKM pilih kategori yang benar dari dropdown. Correction log dicatat. GRS recalculate. |
| US-15 | Sebagai UMKM, saya ingin melihat rekomendasi AI tentang dokumen apa yang masih kurang per kategori. | AI Gap Analyzer tampilkan per kategori: status (Lengkap/Sebagian/Belum Ada), dokumen yang kurang, dan contoh dokumen yang bisa diunggah. |
| US-16 | Sebagai UMKM, saya ingin GRS saya diupdate secara otomatis setiap kali saya menambahkan dokumen baru. | GRS recalculate setiap kali dokumen baru selesai diproses AI atau setelah koreksi. Tampilkan animasi update. |
| US-17 | Sebagai UMKM, saya tidak bisa menghapus dokumen yang sudah didaftarkan ke blockchain. | Tombol hapus hanya aktif untuk dokumen dengan status di bawah 'on\_chain'. Dokumen on-chain: tombol hapus disabled dengan tooltip penjelasan. |

## **7.4b User Stories — Investor (MVP)**

| ID | User Story | Acceptance Criteria |
| :---- | :---- | :---- |
| US-INV01 | Sebagai investor, saya ingin mendaftar akun dengan memilih toggle Investor di halaman registrasi. | Form registrasi Investor: nama lengkap, email, password, institusi (opsional). Role investor tersimpan di DB. Akses langsung setelah verifikasi email. |
| US-INV02 | Sebagai investor yang sudah login, saya ingin melihat dokumen per indikator di halaman detail UMKM (kecuali dokumen PRIVATE). | Setelah login sebagai investor, breakdown GRS per kategori tampil beserta daftar dokumen (nama, tanggal upload, kategori, status blockchain). File PRIVATE tidak muncul sama sekali. |
| US-INV03 | Sebagai investor, saya ingin memverifikasi hash dokumen UMKM langsung dari halaman detail. | Tombol Verifikasi per dokumen on-chain. Klik buka block explorer dengan TX hash pre-filled. |
| US-INV04 | Sebagai investor, saya ingin memfilter UMKM berdasarkan GRS tier setelah login. | Filter GRS tier (Siap ≥70 / Unggul ≥85) tersedia di landing page untuk user yang sudah login sebagai investor. |

## **7.5 User Stories — Blockchain & Green Passport**

| ID | User Story | Acceptance Criteria |
| :---- | :---- | :---- |
| US-18 | Sebagai UMKM, saya ingin melihat tombol 'Ajukan Verifikasi Blockchain' aktif hanya ketika GRS saya sudah ≥ 70\. | Tombol disabled \+ tooltip 'GRS Anda X/70' jika belum mencapai threshold. Aktif dan klikable saat GRS ≥ 70\. |
| US-19 | Sebagai UMKM, saya ingin mendapat konfirmasi bahwa dokumen saya berhasil terdaftar di blockchain. | Notifikasi in-app dan email setelah TX blockchain confirmed. Tampilkan TX hash dan link ke block explorer. |
| US-20 | Sebagai UMKM, saya ingin menerbitkan Green Passport saya setelah blockchain registration sukses. | Tombol 'Terbitkan Green Passport' muncul setelah blockchain confirmed. Satu klik: passport aktif, UMKM muncul di landing page. |
| US-21 | Sebagai UMKM, saya ingin mendapat QR code dan link yang bisa langsung saya bagikan ke investor atau buyer. | QR code PNG ter-generate otomatis. Link publik dengan slug: greentrust.id/passport/\[slug\]. Copy-to-clipboard 1 klik. |
| US-22 | Sebagai UMKM, saya ingin bisa terus menambahkan dokumen setelah passport terbit untuk meningkatkan GRS. | Evidence Vault tetap aktif setelah passport terbit. Dokumen baru diproses dan GRS update. Halaman publik passport otomatis reflect skor terbaru. |

# **8\. Business Rules & Constraints**

## **8.1 Rules UMKM**

| ID | Rule | Implementasi |
| :---- | :---- | :---- |
| UR-01 | UMKM harus login sebelum mengakses Evidence Vault atau menerbitkan Passport | Auth middleware. Redirect ke /login dengan return\_url. |
| UR-02 | Profile gate: data identitas diri dan bisnis harus lengkap sebelum bisa upload dokumen | profile\_completion\_score dihitung otomatis. API /evidence/upload return 403 jika belum lengkap. |
| UR-03 | Hanya 1 Green Passport aktif per akun UMKM | UNIQUE constraint pada (umkm\_id, status='active') di tabel green\_passports. |
| UR-04 | GRS minimum 70 untuk bisa submit ke blockchain dan terbitkan Green Passport | Server-side check. API /passports/submit return 403 dengan pesan 'GRS Anda X, minimum 70' jika belum memenuhi. |
| UR-05 | Dokumen yang sudah on-chain tidak dapat dihapus | Hard delete diblokir untuk dokumen dengan blockchain\_tx\_hash \!= NULL. Return 409 Conflict. |
| UR-06 | Format dokumen: PDF, JPEG, PNG, DOCX. Ukuran maks 10MB per file. | Validasi MIME type dan file size di frontend (instant feedback) dan backend (final gate). Return 400 jika tidak sesuai. |
| UR-07 | Rate limit upload: maks 20 dokumen per hari per akun | Rate limit di API layer. Return 429 Too Many Requests dengan pesan 'Batas upload hari ini sudah tercapai'. |
| UR-08 | Nomor WA bisnis wajib diisi karena digunakan untuk tombol CTA di halaman publik | Field whatsapp\_number NOT NULL di tabel umkm\_profiles. Validasi format nomor WA Indonesia. |

## **8.4 Document Visibility Rules**

**⚠️ Prinsip:** Setiap dokumen memiliki visibility\_level yang di-set otomatis saat upload berdasarkan jenis data. UMKM tidak bisa mengubah level ini.

| Jenis Dokumen / Data | Visibility Level | Siapa yang Bisa Akses |
| :---- | :---- | :---- |
| **KTP (file asli)** | **PRIVATE** | Hanya pemilik akun dan admin. Tidak pernah tampil ke investor atau publik dalam kondisi apapun. |
| **NIK** | **PRIVATE** | Terenkripsi AES-256 di DB. UI pemilik: tersensor (32xxxx). Investor/publik: tidak tampil. |
| **Data keuangan (laporan keuangan, catatan pendapatan, neraca)** | **PRIVATE** | Hanya pemilik dan admin. Tidak tampil ke investor meskipun sudah login. |
| **Dokumen operasional (nota, invoice, manifest limbah, tagihan listrik)** | **LOGGED IN** | Hanya user yang sudah login (investor atau UMKM pemilik lain tidak bisa lihat milik UMKM lain kecuali investor). |
| **Foto proses produksi, foto lingkungan kerja, foto supplier** | **LOGGED IN** | Hanya user yang sudah login. |
| **Profil bisnis (nama, kategori, kota, deskripsi)** | **PUBLIC** | Semua pengunjung tanpa login. |
| **Green Readiness Score (overall \+ tier)** | **PUBLIC** | Semua pengunjung tanpa login. |
| **Foto lokasi usaha** | **PUBLIC** | Semua pengunjung tanpa login. |
| **Katalog produk (foto, nama, deskripsi, stok)** | **PUBLIC** | Semua pengunjung tanpa login. |
| **Status blockchain \+ TX hash** | **PUBLIC** | Semua pengunjung. Tombol Verifikasi Blockchain accessible tanpa login. |

## **8.2 Rules Platform**

| ID | Rule | Implementasi |
| :---- | :---- | :---- |
| PR-01 | File asli dokumen UMKM tidak pernah terekspos publik — hanya hash yang disimpan di blockchain dan halaman publik menampilkan metadata, bukan file | Private storage bucket. Signed URL dibuat backend per request dengan TTL 15 menit. Tidak ada URL permanen. |
| PR-02 | GRS dihitung server-side — tidak bisa dimanipulasi dari client | Tidak ada endpoint untuk update GRS secara langsung. GRS hanya diupdate oleh job yang dipicu setelah dokumen selesai diproses. |
| PR-03 | Halaman publik (landing page \+ detail UMKM) dapat diakses tanpa login. Detail dokumen memerlukan login. | Middleware cek auth hanya untuk endpoint detail dokumen. Halaman publik tidak ada auth gate. |
| PR-04 | Laporan dari publik masuk ke Admin Dashboard. Admin yang memutuskan tindakan. | Tabel reports: id, target\_type, target\_id, reason, status (pending|reviewed|action\_taken). INSERT oleh publik, UPDATE hanya oleh admin. |
| PR-05 | Semua aksi admin dicatat di audit log yang immutable | INSERT ONLY ke tabel audit\_logs. Tidak ada endpoint UPDATE atau DELETE. Admin tidak bisa edit log sendiri. |

## **8.3 Rules Blockchain**

| ID | Rule | Implementasi |
| :---- | :---- | :---- |
| BR-01 | Hanya hash SHA-256 (bukan file asli) yang disimpan di smart contract | Smart contract struct: { bytes32 documentHash, string docType, uint256 timestamp, address issuer }. Tidak ada fungsi store file. |
| BR-02 | MVP menggunakan testnet (Sepolia / Polygon Amoy) untuk menghindari biaya gas produksi | Environment config menentukan network. Migration ke mainnet L2 (Polygon) direncanakan di v2.0 sebelum go-live. |
| BR-03 | Konfirmasi transaksi harus \<60 detik. Jika gagal setelah 3 retry, status dokumen set ke blockchain\_failed dan admin dinotifikasi | Retry logic dengan exponential backoff: 10s, 30s, 60s. Alert ops jika error rate \>2%. |
| BR-04 | Hash duplikat ditolak — dokumen yang sama tidak bisa didaftarkan dua kali | Cek hash di DB sebelum submit ke chain. Return error 'Dokumen sudah terdaftar' dengan link ke registrasi sebelumnya. |

# **9\. Arsitektur Teknis**

## **9.1 Stack Teknologi**

| Layer | Teknologi | Rasionalisasi |
| :---- | :---- | :---- |
| **Frontend** | Next.js 14 \+ Tailwind CSS | SSR untuk SEO landing page dan halaman Passport publik. Static generation untuk performa optimal. Tailwind untuk UI responsif cepat. |
| **Backend API** | Golang \+ Gin Framework | Concurrency superior via goroutine untuk paralel AI job. Library go-ethereum untuk integrasi smart contract langsung. Biner ringan, latensi rendah. |
| **Database** | PostgreSQL via Supabase | Row-Level Security (RLS) untuk isolasi data per UMKM. JSONB untuk GRS breakdown dan dokumen metadata yang fleksibel. |
| **File Storage** | Supabase Storage (Private Bucket) | Private bucket: file asli tidak publicly accessible. Signed URL per-request dengan TTL 15 menit. |
| **AI Pipeline** | LLM \+ Vision Model (Claude / GPT-4V) | Multimodal: LLM untuk PDF/dokumen teks, Vision Model untuk gambar (foto nota, foto proses). Output terstruktur \+ confidence score. |
| **Background Jobs** | Bull Queue (Redis-based) | Untuk AI classification, blockchain registration, dan pengiriman notifikasi email — tidak blocking main API response. |
| **Blockchain** | Solidity \+ Hardhat \+ ethers.js | Testnet Sepolia / Polygon Amoy di MVP. Hash SHA-256 dokumen disimpan di smart contract. Verified via block explorer publik. |
| **Auth** | Supabase Auth (JWT \+ RLS) | JWT session. RLS memastikan setiap UMKM hanya bisa akses data miliknya di level database. |

## **9.2 Data Model — Tabel Utama**

### **Tabel: user\_identities (Identitas Diri UMKM)**

| Field | Type | Required | Keterangan |
| :---- | :---- | :---- | :---- |
| id | UUID | YES | Primary Key |
| user\_id | UUID FK UNIQUE | YES | Relasi ke auth.users. |
| **ktp\_file\_path** | **TEXT** | **YES** | Path KTP di PRIVATE bucket. SENSITIF — hanya owner & admin bisa akses. |
| first\_name | VARCHAR(100) | YES (OCR) | Nama depan dari OCR KTP. Dapat dikoreksi manual. |
| last\_name | VARCHAR(100) | YES (OCR) | Nama belakang dari OCR KTP. |
| birth\_place | VARCHAR(100) | YES (OCR) | Tempat lahir dari KTP. |
| birth\_date | DATE | YES (OCR) | Tanggal lahir dari KTP. |
| **nik** | **VARCHAR(16)** | **YES (OCR)** | NIK dari KTP. Terenkripsi AES-256. SENSITIF. |
| address\_line | TEXT | YES (OCR) | Alamat dari KTP. |
| address\_province | VARCHAR(100) | YES (OCR) | Provinsi dari KTP. |
| address\_city | VARCHAR(100) | YES (OCR) | Kota/Kabupaten dari KTP. |
| phone\_number | VARCHAR(20) | YES (Manual) | Nomor HP aktif. Input manual. Format: 628xxx. |
| email\_contact | VARCHAR(255) | YES (Manual) | Email aktif. Input manual. Digunakan untuk notifikasi. |
| is\_confirmed | BOOLEAN | Auto | True setelah UMKM konfirmasi hasil OCR dan semua field terisi. |
| created\_at | TIMESTAMP | Auto | Auto-set saat insert. |

### **Tabel: umkm\_profiles (Identitas Bisnis)**

| Field | Type | Required | Keterangan |
| :---- | :---- | :---- | :---- |
| id | UUID | YES | Primary Key |
| user\_id | UUID FK UNIQUE | YES | Relasi ke auth.users. |
| business\_name | VARCHAR(255) | YES | Nama usaha. Digunakan di landing page dan slug Passport. |
| business\_address\_line | TEXT | YES | Alamat usaha lengkap. |
| business\_province | VARCHAR(100) | YES | Provinsi lokasi usaha. Dropdown terstandarisasi. |
| business\_city | VARCHAR(100) | YES | Kota/Kabupaten. Digunakan untuk filter landing page. |
| business\_category | ENUM | YES | kuliner | jasa | ritel | kerajinan | agrikultur | tekstil | lainnya |
| is\_service\_business | BOOLEAN | YES | True jika bisnis jasa — section produk di-skip. Default: false. |
| location\_photos | JSONB | YES | Array URL foto lokasi usaha (1–5 foto). Ditampilkan di halaman publik. |
| whatsapp\_number | VARCHAR(20) | YES | Nomor WA bisnis untuk CTA di halaman publik. Format: 628xxx. |
| profile\_completion\_score | INT | Auto | 0–100. user\_identities.is\_confirmed (50%) \+ semua field bisnis wajib (50%). Gate Evidence Vault \= 100\. |
| created\_at | TIMESTAMP | Auto | Auto-set saat insert. |

### **Tabel: umkm\_products (Katalog Produk)**

| Field | Type | Required | Keterangan |
| :---- | :---- | :---- | :---- |
| id | UUID | YES | Primary Key |
| umkm\_id | UUID FK | YES | Relasi ke umkm\_profiles. 1 UMKM bisa punya banyak produk (tanpa batas). |
| product\_name | VARCHAR(255) | YES | Nama produk. |
| product\_description | TEXT | NO | Deskripsi produk. Opsional. |
| product\_photo\_url | TEXT | YES | URL foto produk di storage. Wajib min 1 foto. Ditampilkan di halaman publik. |
| stock\_quantity | INT | YES | Jumlah stok saat ini. Dapat diupdate kapanpun. |
| is\_active | BOOLEAN | Auto | Default true. False jika UMKM unpublish produk. |
| created\_at | TIMESTAMP | Auto | Auto-set saat insert. |

### **Tabel: investor\_profiles**

| Field | Type | Required | Keterangan |
| :---- | :---- | :---- | :---- |
| id | UUID | YES | Primary Key |
| user\_id | UUID FK UNIQUE | YES | Relasi ke auth.users. |
| full\_name | VARCHAR(255) | YES | Nama lengkap investor. Diisi saat registrasi. |
| institution\_name | VARCHAR(255) | NO | Nama institusi/perusahaan. Opsional. |
| created\_at | TIMESTAMP | Auto | Auto-set saat insert. |

### **Tabel: evidence\_documents**

| Field | Type | Required | Keterangan |
| :---- | :---- | :---- | :---- |
| id | UUID | YES | Primary Key |
| umkm\_id | UUID FK | YES | Relasi ke umkm\_profiles. |
| category | ENUM | Auto/Edit | bahan\_baku | proses\_produksi | limbah | energi | sosial | legalitas. Set oleh AI, bisa dikoreksi UMKM. |
| file\_path | TEXT | YES | Path di private Supabase Storage. |
| file\_hash\_sha256 | VARCHAR(64) | YES | Hash dokumen. Digunakan untuk blockchain registration dan deteksi duplikat. |
| ai\_confidence | DECIMAL(3,2) | Auto | 0.00–1.00. Confidence score dari AI. |
| status | ENUM | YES | uploading | processing | classified | reviewed | on\_chain | blockchain\_failed |
| blockchain\_tx\_hash | VARCHAR(66) | Optional | TX hash setelah on-chain registration. NULL jika belum didaftarkan. |
| uploaded\_at | TIMESTAMP | Auto | Auto-set saat insert. |

### **Tabel: green\_passports**

| Field | Type | Required | Keterangan |
| :---- | :---- | :---- | :---- |
| id | UUID | YES | Primary Key. |
| umkm\_id | UUID FK UNIQUE | YES | UNIQUE: hanya 1 passport aktif per UMKM. |
| grs\_score | DECIMAL(5,2) | Auto | Skor GRS terkini. Di-recalculate setiap kali dokumen baru diproses. |
| grs\_breakdown | JSONB | Auto | Breakdown per kategori: { category, c\_i, weight, doc\_count, docs\_needed }. |
| status | ENUM | YES | draft | active | suspended. 'active' \= muncul di landing page. |
| public\_slug | VARCHAR(100) UNIQUE | YES | URL slug publik: /passport/\[slug\]. Auto-generated dari nama bisnis \+ random suffix. |
| qr\_code\_url | TEXT | Auto | URL QR code PNG yang di-generate saat passport pertama kali diterbitkan. |
| issued\_at | TIMESTAMP | Auto | Waktu passport pertama kali diterbitkan. |
| last\_updated\_at | TIMESTAMP | Auto | Waktu terakhir GRS di-recalculate. |

# **10\. Non-Functional Requirements**

| Kategori | Requirement | Target | Prioritas |
| :---- | :---- | :---- | :---- |
| **Performa** | Landing page load time | \<2 detik pada koneksi 4G (Lighthouse ≥80) | P0 |
|  | AI Classification latency | \<30 detik per dokumen | P0 |
|  | API response time (non-AI) | \<500 ms (p95) | P0 |
|  | Blockchain TX confirmation | \<60 detik | P0 |
| **Keandalan** | System uptime | ≥99% | P0 |
|  | AI job failure recovery | Retry 3x exponential backoff. Alert ops jika error rate \>5% | P0 |
| **Keamanan** | Enkripsi in-transit | TLS 1.3 untuk semua koneksi | P0 |
|  | File privat — tidak accessible publik | Signed URL TTL 15 menit. Return 403 tanpa token. | P0 |
|  | RLS (Row-Level Security) | UMKM hanya akses data miliknya sendiri di level DB | P0 |
|  | NIK terenkripsi | AES-256 di storage. Tidak tampil di UI publik manapun. | P0 |
| **Usability** | Onboarding completion | \>80% UMKM selesai onboarding tanpa bantuan | P0 |
|  | Mobile responsiveness | Fungsional sempurna dari 360px | P0 |
| **Aksesibilitas** | Bilingual | Bahasa Indonesia (default) \+ English (toggle) | P1 |

# **11\. Acceptance Criteria**

## **11.1 Landing Page & Halaman Detail**

| \# | Kriteria | Status QA |
| :---- | :---- | :---- |
| 1 | Landing page menampilkan daftar UMKM aktif dengan card: nama, sektor, kota, GRS, tier badge. Load \<2 detik. | \[ \] Pass / \[ \] Fail |
| 2 | Filter sektor dan kota berfungsi real-time tanpa page reload. | \[ \] Pass / \[ \] Fail |
| 3 | Halaman detail UMKM accessible tanpa login: profil bisnis \+ overall GRS \+ tombol WhatsApp CTA \+ tombol Verifikasi Blockchain. | \[ \] Pass / \[ \] Fail |
| 4 | Tombol WhatsApp CTA redirect ke WA dengan nomor bisnis UMKM yang benar. | \[ \] Pass / \[ \] Fail |
| 5 | Detail dokumen per indikator tersembunyi untuk pengunjung tanpa login. Muncul setelah login. | \[ \] Pass / \[ \] Fail |
| 6 | Tombol Verifikasi Blockchain buka block explorer dengan TX hash pre-filled. Accessible tanpa login. | \[ \] Pass / \[ \] Fail |
| 7 | Fitur Report bisa disubmit tanpa login. Laporan masuk ke Admin Dashboard. | \[ \] Pass / \[ \] Fail |

## **11.2 Registrasi & Profil**

| \# | Kriteria | Status QA |
| :---- | :---- | :---- |
| 8 | Registrasi berhasil \<60 detik. Email verifikasi terkirim. Akun aktif setelah klik link verif. | \[ \] Pass / \[ \] Fail |
| 9 | UMKM tidak bisa akses Evidence Vault sebelum semua field identitas diri dan bisnis terisi (termasuk nomor WA bisnis). | \[ \] Pass / \[ \] Fail |
| 10 | API /evidence/upload return 403 jika profile\_completion\_score \< 100 meskipun client-side gate di-bypass. | \[ \] Pass / \[ \] Fail |

## **11.3 Evidence Vault & AI**

| \# | Kriteria | Status QA |
| :---- | :---- | :---- |
| 11 | Dashboard Evidence Vault menampilkan 6 kategori dengan progress bar dan jumlah dokumen terpenuhi vs total. | \[ \] Pass / \[ \] Fail |
| 12 | Upload dokumen berhasil. File \>10MB atau format tidak didukung ditolak dengan error message yang jelas. | \[ \] Pass / \[ \] Fail |
| 13 | Hasil klasifikasi AI muncul \<30 detik setelah upload. Menampilkan kategori \+ confidence score. | \[ \] Pass / \[ \] Fail |
| 14 | Koreksi kategori berhasil disimpan. GRS recalculate setelah koreksi. | \[ \] Pass / \[ \] Fail |
| 15 | GRS recalculate otomatis setiap kali dokumen baru selesai diproses. | \[ \] Pass / \[ \] Fail |
| 16 | AI Gap Analyzer menampilkan per kategori: dokumen yang kurang \+ contoh dokumen yang bisa diunggah. | \[ \] Pass / \[ \] Fail |
| 17 | Hash duplikat ditolak dengan pesan 'Dokumen sudah pernah diunggah'. | \[ \] Pass / \[ \] Fail |

## **11.4 Blockchain & Green Passport**

| \# | Kriteria | Status QA |
| :---- | :---- | :---- |
| 18 | Tombol 'Ajukan Verifikasi Blockchain' disabled \+ tooltip jika GRS \<70. Aktif saat GRS ≥70. | \[ \] Pass / \[ \] Fail |
| 19 | Hash SHA-256 ter-record di smart contract \<60 detik. TX hash dapat dicek di block explorer. | \[ \] Pass / \[ \] Fail |
| 20 | Green Passport diterbitkan setelah blockchain confirmed. UMKM muncul di landing page. | \[ \] Pass / \[ \] Fail |
| 21 | QR code dan shareable link ter-generate. Copy-to-clipboard berfungsi satu klik. | \[ \] Pass / \[ \] Fail |
| 22 | Dokumen on-chain tidak bisa dihapus. Return 409 Conflict. | \[ \] Pass / \[ \] Fail |
| 23 | Penambahan dokumen baru setelah passport terbit memperbarui GRS dan halaman publik secara otomatis. | \[ \] Pass / \[ \] Fail |

# **12\. Risk Management**

| ID | Risiko | Dampak | Prob. | Mitigasi |
| :---- | :---- | :---- | :---- | :---- |
| R-01 | AI accuracy rendah untuk dokumen berbahasa Indonesia informal (nota tangan, dialek daerah, foto blur) | **HIGH** | **HIGH** | Prompt engineering konteks Indonesia. Fallback human review untuk confidence \<60%. Correction loop sebagai data training. |
| R-02 | Adopsi lambat — UMKM frustrasi dengan proses upload & verifikasi yang terasa berat | **HIGH** | **MEDIUM** | UX onboarding step-by-step yang sangat sederhana. Video tutorial. Pilot dengan komunitas UMKM yang sudah digital-savvy dulu. |
| R-03 | Landing page kosong saat launch — tidak ada UMKM yang terverifikasi | **HIGH** | **MEDIUM** | Pre-launch: rekrut 10–15 UMKM pilot yang sudah diproses sebelum launch. Landing tidak empty dari hari pertama. |
| R-04 | Biaya API AI meningkat seiring bertambahnya upload dokumen | **MEDIUM** | **MEDIUM** | Cache hasil klasifikasi. Batch processing. Budget alert otomatis. Evaluasi self-hosted model di v2.0. |
| R-05 | Kebocoran data sensitif UMKM (NIK, nomor WA, dokumen bisnis) | **HIGH** | **MEDIUM** | NIK terenkripsi AES-256. Private storage. RLS database. TLS 1.3. Penetration test sebelum launch. |
| R-06 | Blockchain TX gagal atau delay — UMKM tidak bisa terbitkan Passport | **MEDIUM** | **MEDIUM** | Retry 3x dengan exponential backoff. Status tracking real-time. Notifikasi jika gagal \+ instruksi retry manual. |
| R-07 | Laporan (report) abuse dari publik membanjiri Admin dengan laporan tidak valid | **MEDIUM** | **LOW** | Rate limit submit report per IP. Validasi minimum 20 karakter alasan. Admin bisa bulk-dismiss laporan. |

# **13\. Roadmap Produk**

## **13.1 MVP — Fase Hackathon (12 Minggu)**

| Periode | Deliverable | KPI Target | Owner |
| :---- | :---- | :---- | :---- |
| W1–2 | Wireframe, DB schema, Auth system, Registrasi & Profil UMKM (identitas diri \+ bisnis) | Onboarding flow selesai tanpa bug | FE \+ BE |
| W3–4 | Evidence Vault UI \+ API, Upload per kategori, SHA-256 hash, Private storage | Upload berhasil, file aman di private storage | FE \+ BE |
| W5–6 | AI Classification Pipeline, Confidence score, Review & Koreksi UI | AI accuracy ≥80% pada dokumen test | BE \+ AI |
| W7–8 | GRS Engine, AI Gap Analyzer, Dashboard Evidence Vault dengan progress bar | GRS realtime, Gap Analyzer akurat | BE \+ FE |
| W9–10 | Smart Contract (testnet), Blockchain registration flow, Penerbitan Green Passport, QR \+ shareable link | TX confirm \<60 detik, Passport live di halaman publik | BE \+ SC |
| W11 | Landing Page (showcase UMKM), Filter sektor & kota, Halaman detail \+ WhatsApp CTA, Fitur Report, Admin Dashboard | Landing page fungsional, CTA WA bekerja | FE \+ BE |
| W12 | QA E2E, Security test, Load test, Pre-launch seeding 10–15 UMKM pilot, Soft launch | 0 critical bug, 10+ UMKM tampil di landing page hari pertama | PM \+ QA |

**Critical Path Pre-Launch:** (1) Min 10 UMKM pilot harus sudah selesai proses dan Green Passport aktif SEBELUM tanggal launch agar landing page tidak kosong. (2) Nomor WA bisnis semua UMKM pilot harus valid dan aktif. (3) Smart contract sudah di-audit internal sebelum deploy testnet.

## **13.2 v2.0 — Investor Role & Two-Way Collaboration**

| Fitur | Deskripsi | Target |
| :---- | :---- | :---- |
| Role Investor | Registrasi akun Investor. Investor dapat login, browse landing page, dan melihat detail dokumen Green Passport UMKM. | Investor bisa due diligence mandiri tanpa kontak WA |
| Halaman Profil Investor | Investor punya halaman profil sendiri yang dapat dilihat UMKM: nama/institusi, fokus investasi, portofolio. | UMKM bisa evaluate investor sebelum terima proposal |
| Pengajuan Proposal UMKM → Investor | UMKM dapat mengajukan proposal pendanaan atau pengadaan ke investor tertentu. Investor menerima notifikasi in-app \+ email. | Alur deal flow terstruktur di dalam platform |
| Penawaran Proposal Investor → UMKM | Investor dapat mengirim penawaran kerja sama (pendanaan/pengadaan) ke UMKM. UMKM menerima notifikasi. | Investor proaktif bisa approach UMKM yang menarik |
| Dashboard Dua Arah | UMKM: lihat penawaran masuk \+ status proposal keluar. Investor: lihat proposal masuk \+ status penawaran keluar. | Manajemen deal flow terpusat |

# **14\. Activity Diagram — System Flow MVP**

## **14.1 Deskripsi & Swimlane**

Activity Diagram berikut menggambarkan alur sistem internal GreenTrust Passport MVP. Format Swimlane dengan 4 jalur:

* UMKM — aksi yang dilakukan pengguna

* Sistem Backend — validasi, penyimpanan, orkestrasi job

* AI Pipeline — klasifikasi dokumen dan gap analysis

* Blockchain Layer — hash registration dan proof of integrity

| Notasi:● Rounded Rectangle Biru \= Aksi pengguna (UMKM)● Rounded Rectangle Abu-abu \= Proses sistem backend● Rounded Rectangle Hijau \= Output sukses / notifikasi● Rounded Rectangle Merah \= Error / validasi gagal● Diamond Kuning \= Decision Point (XOR Gateway)● Bar Horizontal \= Fork / Join (proses paralel)● Lingkaran Solid \= Start Node | Lingkaran Ganda \= End Node |
| :---- |

## **14.2 Alur per Phase**

| \# | Phase | Aktor | Deskripsi Alur |
| :---- | :---- | :---- | :---- |
| 1 | Registrasi & Onboarding | UMKM \+ Sistem | UMKM daftar → sistem kirim email verif → UMKM klik link → akun aktif → UMKM isi identitas diri \+ bisnis → sistem hitung completion score → gate terbuka. |
| 2 | Upload & Hash | UMKM \+ Sistem | UMKM pilih kategori, upload dokumen → sistem validasi format & ukuran → simpan ke private storage → compute SHA-256 hash → cek duplikat → trigger AI job ke queue. |
| 3 | AI Classification | Sistem \+ AI Pipeline | AI ambil dokumen dari queue → OCR / extraction → classify ke 6 indikator → output confidence score → simpan hasil ke DB → trigger GRS recalculation → notifikasi in-app ke UMKM. |
| 4 | Review & GRS | UMKM \+ Sistem | UMKM lihat hasil AI → XOR: setuju (konfirmasi) atau koreksi (edit kategori, log dicatat) → sistem recalculate GRS \= Σ(W\_i × C\_i) × 100 → update dashboard. |
| 5 | Gap Analysis | Sistem \+ AI Pipeline | AI identifikasi kategori C\_i \< 1.0 → generate rekomendasi dokumen per kategori → tampilkan di Evidence Vault. |
| 6 | Blockchain Submission | UMKM \+ Sistem \+ Blockchain | UMKM klik 'Ajukan Verifikasi' (GRS ≥70) → sistem ambil semua hash → submit ke smart contract via background job → XOR: TX confirmed (\<60s) atau failed (retry 3x) → update status on-chain → notifikasi. |
| 7 | Penerbitan Passport | UMKM \+ Sistem | UMKM klik 'Terbitkan Passport' → sistem generate halaman publik \+ slug URL \+ QR code PNG → set status \= active → UMKM muncul di landing page. |
| 8 | Sharing & Verifikasi | UMKM \+ Pengunjung | UMKM share link/QR → pengunjung buka halaman publik → lihat profil \+ GRS → klik Verifikasi → sistem cek hash on-chain → tampilkan status verified / not found. |

# **15\. BPMN — Business Process User Flow**

## **15.1 Deskripsi**

BPMN menggunakan notasi BPMN 2.0 untuk menggambarkan user flow dari perspektif non-teknis. 3 Pool utama di MVP:

* UMKM — pelaku usaha yang mendaftar dan menerbitkan Green Passport

* PLATFORM / SISTEM — proses otomatis backend

* PENGUNJUNG PUBLIK — siapapun yang mengakses landing page tanpa login

## **15.2 Alur per Pool**

### **Pool: UMKM**

| Step | Task / Gateway | Deskripsi |
| :---- | :---- | :---- |
| U1 | Daftar & Verifikasi Email | UMKM daftar dengan email \+ password. Klik link verifikasi email untuk aktivasi akun. |
| U2 | Isi Identitas Diri \+ Bisnis | Isi nama, NIK, HP, nama usaha, sektor, kota, deskripsi, nomor WA bisnis. |
| U3 | Upload Dokumen per Kategori | Akses Evidence Vault. Pilih kategori, upload dokumen yang relevan. Bisa bertahap. |
| U4 | Review Hasil AI | Cek hasil klasifikasi. Koreksi jika ada yang salah. Konfirmasi dokumen yang benar. |
| U5 | Monitor GRS & Gap Analysis | Pantau GRS yang naik setiap kali dokumen ditambahkan. Ikuti rekomendasi AI Gap Analyzer. |
| U6 | Gateway XOR: GRS ≥ 70? | Jika belum: lanjut upload dokumen sesuai rekomendasi. Jika sudah: tombol Submit aktif. |
| U7 | Submit ke Blockchain | Klik 'Ajukan Verifikasi Blockchain'. Menunggu konfirmasi TX. |
| U8 | Terbitkan Green Passport | Setelah TX confirmed, klik 'Terbitkan Passport'. Salin link dan QR untuk disebarkan. |

### **Pool: PLATFORM / SISTEM**

| Step | Task | Deskripsi |
| :---- | :---- | :---- |
| P1 | Validasi & Hash | Cek format, ukuran, MIME type. Compute SHA-256. Cek duplikat. Simpan ke private storage. |
| P2 | AI Classification Job | Enqueue job ke Bull Queue. AI pipeline proses: OCR → extract → classify → confidence score. |
| P3 | Recalculate GRS | GRS \= Σ(W\_i × C\_i) × 100\. Update tabel green\_passports.grs\_score dan grs\_breakdown. |
| P4 | Run Gap Analyzer | Identifikasi kategori C\_i \< 1.0. Generate list dokumen yang kurang per kategori. Simpan ke DB. |
| P5 | Blockchain Registration | Submit hash ke smart contract via go-ethereum. Retry 3x jika gagal. Update status dokumen. |
| P6 | Generate Passport Page \+ QR | Buat halaman publik dengan slug unik. Generate QR code PNG. Set status passport \= active. |

### **Pool: PENGUNJUNG PUBLIK**

| Step | Task / Gateway | Deskripsi |
| :---- | :---- | :---- |
| V1 | Browse Landing Page | Lihat daftar UMKM hijau. Filter sektor dan kota. |
| V2 | Klik Detail UMKM | Lihat profil bisnis, overall GRS, tier badge, QR code. |
| V3 | Gateway XOR: Login? | Tidak login: lihat profil \+ overall GRS \+ CTA WA. Login: lihat detail dokumen per indikator juga. |
| V4 | Hubungi via WhatsApp | Klik tombol CTA → redirect ke WA dengan nomor bisnis UMKM. |
| V5 | Verifikasi Blockchain | Klik tombol Verifikasi → buka block explorer dengan TX hash pre-filled. |

## **15.3 Perbandingan Activity Diagram vs BPMN**

| Aspek | Activity Diagram (Sec. 14\) | BPMN (Sec. 15\) |
| :---- | :---- | :---- |
| Perspektif | System Flow — bagaimana sistem bekerja internal | User Flow — bagaimana pengguna berinteraksi |
| Audiens | Developer, QA, Backend Engineer | PM, Investor, CEO, Stakeholder bisnis |
| Notasi | UML Activity Diagram \+ Swimlane | BPMN 2.0: Pool, Gateway XOR, Task, Message Flow |

# **16\. Open Questions — Status Terjawab**

| \# | Pertanyaan | Keputusan Final | Status |
| :---- | :---- | :---- | :---- |
| OQ-1 | Apakah Green Passport bisa diakses publik tanpa login? | Publik bisa lihat profil \+ overall GRS. Detail dokumen per indikator butuh login. | **✅ Closed** |
| OQ-2 | Cara C\_i dihitung: S\_i \= 1 atau proporsional? | Proporsional: C\_i \= dokumen terpenuhi / total dokumen yang dibutuhkan di kategori. Bukan binary. | **✅ Closed** |
| OQ-3 | Apakah bobot GRS dan threshold dikalibrasi ulang setelah pilot? | Fixed sejak launch. Tidak berubah. | **✅ Closed** |
| OQ-4 | Apakah verifikasi blockchain perlu login? | Tidak perlu login. Verifikasi blockchain accessible publik. | **✅ Closed** |
| OQ-5 | Apakah UMKM bisa pilih dokumen mana yang tampil di halaman publik? | Semua dokumen terverifikasi otomatis tampil. | **✅ Closed** |
| OQ-6 | Apakah ada mekanisme report? | Ya. Publik bisa report dengan alasan. Masuk ke Admin Dashboard. | **✅ Closed** |
| OQ-7 | Apakah verifikasi perlu pihak legal resmi? | Self-reported untuk hackathon. Kerja sama legal sebelum go-live. | **✅ Closed** |
| OQ-8 | Multi-bahasa? | Bilingual: Bahasa Indonesia (default) \+ English (toggle). | **✅ Closed** |
| OQ-9 | Berapa role di MVP? Bagaimana flow registrasi? | MVP: 2 role (UMKM \+ Admin). Investor defer ke v2.0. Registrasi: semua user \= UMKM. Admin dikelola internal. | **✅ Closed** |
| OQ-10 | Threshold GRS untuk terbitkan Green Passport? | 70 / 100\. Fixed. | **✅ Closed** |

# **17\. Sign-off**

Semua Acceptance Criteria pada Seksi 11 HARUS berstatus Pass sebelum dokumen ini disetujui dan produk dinyatakan siap launch.

| Jabatan | Nama | Tanggal | Tanda Tangan |
| :---- | :---- | :---- | :---- |
| **Chief Executive Officer** |  |  |  |
| **Chief Technology Officer** | Khaizuran Alvaro |  |  |
| **Product Manager** |  |  |  |
| **Lead Frontend Engineer** |  |  |  |
| **Lead Backend Engineer** |  |  |  |
| **UI/UX Designer** |  |  |  |

# **18\. Glosarium**

| Istilah | Definisi |
| :---- | :---- |
| **AI Gap Analyzer** | Fitur yang mengidentifikasi dokumen apa yang masih kurang per kategori indikator dan memberikan rekomendasi spesifik kepada UMKM. |
| **Blockchain Proof of Integrity** | Penyimpanan hash SHA-256 dokumen ke smart contract. Membuktikan dokumen asli dan tidak dimodifikasi sejak didaftarkan. |
| **C\_i (Skor Kelengkapan Kategori)** | Nilai 0.0–1.0 per kategori indikator. Dihitung sebagai: dokumen terpenuhi / total dokumen dibutuhkan di kategori tersebut. |
| **Confidence Score** | Nilai 0.00–1.00 dari AI untuk setiap dokumen yang diklasifikasikan, menunjukkan tingkat keyakinan terhadap hasil klasifikasi. |
| **Evidence Vault** | Repositori privat terpusat untuk seluruh dokumen bukti keberlanjutan UMKM. Hanya accessible oleh pemilik akun. |
| **GRS (Green Readiness Score)** | Skor 0–100 mengukur kesiapan keberlanjutan UMKM. Formula: Σ(W\_i × C\_i) × 100\. Threshold untuk terbitkan Passport: 70\. |
| **Green Passport** | Halaman publik digital UMKM yang menampilkan profil bisnis, GRS, dan bukti verifikasi blockchain. Dapat dibagikan via link atau QR code. |
| **Hash SHA-256** | Fingerprint kriptografis 64 karakter dari sebuah dokumen. Perubahan sekecil apapun pada file mengubah hash secara total. Digunakan sebagai Proof of Integrity. |
| **MVP** | Minimum Viable Product — versi produk paling minimal yang cukup untuk diuji kepada pengguna awal dan memvalidasi asumsi bisnis utama. |
| **NIK** | Nomor Induk Kependudukan. Disimpan terenkripsi AES-256. Tidak pernah tampil di UI publik manapun. |
| **Profile Completion Score** | Skor 0–100 mengukur kelengkapan profil UMKM. Semua field wajib harus terisi (score \= 100\) sebelum bisa akses Evidence Vault. |
| **RLS (Row-Level Security)** | Mekanisme database PostgreSQL yang memastikan setiap UMKM hanya bisa mengakses data miliknya sendiri di level database. |
| **RICE Score** | Framework prioritisasi: (Reach × Impact × Confidence) ÷ Effort. Menentukan urutan pengerjaan fitur. |
| **Signed URL** | URL sementara (TTL 15 menit) untuk akses file di private storage. Di-generate backend per request. Tidak ada URL permanen untuk file privat. |
| **Smart Contract** | Program di blockchain yang mengeksekusi aturan otomatis tanpa perantara. Di GreenTrust: menyimpan hash dokumen UMKM dan timestamp registrasi. |
| **W\_i (Bobot Indikator)** | Bobot masing-masing kategori indikator dalam formula GRS. Total W\_i \= 1.0. Fixed dan tidak dapat diubah user. |
| **WhatsApp CTA** | Tombol di halaman detail UMKM yang redirect ke WhatsApp dengan nomor bisnis UMKM pre-filled. Cara utama pengunjung menghubungi UMKM di MVP. |

# **19\. Referensi**

* Executive Summary GreenTrust Passport (2026). AkademiCompe — Universitas Brawijaya.

* PRD Team Builder & Matchmaker v1.1 (2026). AkademiCompe — referensi pola OKR, Success Metrics, dan struktur dokumen.

* PRD Project e-Commerce v1.2 (2026). AkademiCompe — referensi Business Rules, Acceptance Criteria checklist, dan Risk Management.

* Kementerian Koperasi dan UKM RI. (2023). Data UMKM Indonesia 2023\.

* European Commission. (2022). Corporate Sustainability Reporting Directive (CSRD).

* United Nations. (2015). Transforming Our World: The 2030 Agenda for Sustainable Development.

* World Bank. (2021). Indonesia Economic Prospects: Toward a Green, Resilient, and Inclusive Recovery.

GreenTrust Passport PRD v4.0 — AkademiCompe, Universitas Brawijaya — 2026

CONFIDENTIAL — Disusun untuk kompetisi IN:NOVATE – CodeUp\! Politeknik Astra