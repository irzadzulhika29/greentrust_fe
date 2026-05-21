import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const issuanceSteps = [
  {
    number: 1,
    title: 'Kumpulkan hash 18 dokumen tereview',
    note: 'satu hash per file - tidak ada file asli yang naik on-chain',
  },
  {
    number: 2,
    title: 'Submit batch ke smart contract',
    note: 'jaringan: Polygon Amoy Testnet - estimasi <60 detik',
  },
  {
    number: 3,
    title: 'Tunggu konfirmasi blok',
    note: 'retry otomatis 3x dengan exponential backoff bila gagal',
  },
  {
    number: 4,
    title: 'Penerbitan Passport publik',
    note: 'profil Anda muncul di landing page - QR + slug ter-generate',
  },
]

const summaryRows = [
  { label: 'UMKM', value: 'Batik Siti' },
  { label: 'GRS final', value: '87 / 100', valueTone: 'text-[#236041]' },
  { label: 'Tier', badge: 'Unggul' },
  { label: 'Dokumen on-chain', value: '18 file' },
  { label: 'Jaringan', value: 'Polygon Amoy' },
  { label: 'Estimasi gas', value: '0 IDR (testnet)', valueTone: 'text-[#4f8b5e]' },
]

const hashRows = [
  { order: 1, hash: '7f3b9c2a4e1d8e6c...91a7', code: 'BB' },
  { order: 2, hash: '2a4e1d8e6c91a7e2...04ff', code: 'PP' },
  { order: 3, hash: '8e6c91a7e2042f3b...d8b1', code: 'PL' },
  { order: 4, hash: 'b1a791a7e204...91a7', code: 'EE' },
  { order: 5, hash: 'a791a7e2042f3b...04ff', code: 'SK' },
]

const indicatorScores = [
  { code: 'BB', score: '100%', tint: '#fbefd7', color: '#7a5521' },
  { code: 'PP', score: '85%', tint: '#dcebdc', color: '#236041' },
  { code: 'PL', score: '100%', tint: '#dff5f8', color: '#176174' },
  { code: 'EE', score: '75%', tint: '#f7edce', color: '#6b4b12' },
  { code: 'SK', score: '100%', tint: '#fde8e3', color: '#934f42' },
  { code: 'LK', score: '90%', tint: '#e7e7fb', color: '#45457b' },
]

const onChainRows = [
  { label: 'Network', value: 'Polygon Amoy' },
  { label: 'TX Hash', value: '0x7f3b...a91c', tone: 'text-[#236041]', link: true },
  { label: 'Block', value: '#7,428,193' },
  { label: 'Konfirmasi', value: '48 detik', tone: 'text-[#4f8b5e]', success: true },
]

const PassportSubmissionView = ({ onIssue }) => (
  <>
    <header className="border-b border-[#e7e1d8]">
      <div className="px-6 py-5 lg:px-12">
        <h1 className="m-0 text-[2.25rem] leading-none tracking-[-0.06em] text-[#181816]">
          Ajukan Verifikasi Blockchain
        </h1>
        <p className="mt-3 max-w-[72rem] text-[0.98rem] font-normal leading-6 text-[#5f5a53]">
          Hash SHA-256 dari 18 dokumen tereview akan didaftarkan ke smart contract Polygon Amoy.
          Operasi tidak bisa dibatalkan.
        </p>
      </div>
    </header>

    <main className="px-6 py-7 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.92fr)]">
        <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dcebdc] px-4 py-2 text-[0.86rem] font-bold uppercase text-[#244232]">
            <Check className="h-4 w-4" />
            GRS 87 • Lolos Ambang 70
          </div>

          <h2 className="mt-6 text-[2.15rem] leading-none tracking-[-0.06em] text-[#181816]">
            Anda siap menerbitkan Green Passport.
          </h2>
          <p className="mt-4 text-[1rem] font-normal leading-7 text-[#5f5a53]">
            Setelah Anda menekan tombol di bawah, sistem akan:
          </p>

          <div className="mt-6 space-y-4">
            {issuanceSteps.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#ddd6ca] bg-[#fbfaf7] text-[1rem] font-bold text-[#5f5a53]">
                  {step.number}
                </div>
                <div>
                  <div className="text-[1rem] font-bold leading-tight text-[#20201c]">{step.title}</div>
                  <div className="mt-1 text-[0.95rem] font-normal leading-6 text-[#8a857d]">{step.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[18px] border border-[#efc9a8] bg-[#fff1e6] px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#a35f28]" />
              <p className="text-[0.98rem] font-normal leading-7 text-[#8a552c]">
                Dokumen yang sudah on-chain <span className="font-bold">tidak bisa dihapus</span> dari
                Evidence Vault. Anda tetap bisa menambah dokumen baru kapan saja.
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-[18px] bg-[#f5f2ec] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#236041] text-white">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-[0.98rem] font-normal leading-7 text-[#3f403b]">
                Saya menyatakan bahwa dokumen yang saya unggah adalah bukti operasional asli dari bisnis
                saya, dan saya bertanggung jawab atas keasliannya.
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/umkm/evidence"
              className="inline-flex h-14 items-center justify-center rounded-[18px] border border-[#ddd6ca] bg-white px-7 text-[1rem] font-bold text-[#20201c] transition hover:bg-[#fbfaf7]"
            >
              Tinjau lagi dokumen
            </Link>

            <button
              type="button"
              onClick={onIssue}
              className="inline-flex h-16 items-center justify-center gap-2 rounded-[18px] border border-[#101310] bg-[#101310] px-8 text-[1.12rem] font-bold text-white shadow-[0_16px_24px_rgba(17,20,17,0.12)] transition hover:bg-[#171b17]"
            >
              <ShieldCheck className="h-5 w-5" />
              Terbitkan Green Passport
            </button>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
              Ringkasan
            </div>

            <div className="mt-4">
              {summaryRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="text-[0.98rem] font-normal text-[#7d7870]">{row.label}</div>

                  {row.badge ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff1e6] px-3 py-1 text-[0.88rem] font-bold text-[#c6763b]">
                      <span>★</span>
                      {row.badge}
                    </div>
                  ) : (
                    <div className={`text-[1rem] font-bold ${row.valueTone ?? 'text-[#20201c]'}`}>{row.value}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
                Hash Yang Akan Didaftarkan
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ca] bg-[#fbfaf7] px-3 py-1 text-[0.82rem] font-bold text-[#5f5a53] transition hover:bg-white"
              >
                <Copy className="h-3.5 w-3.5" />
                Salin
              </button>
            </div>

            <div className="mt-4">
              {hashRows.map((row) => (
                <div
                  key={`${row.order}-${row.hash}`}
                  className="grid grid-cols-[24px_minmax(0,1fr)_28px] items-center gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="text-[0.98rem] font-normal text-[#7d7870]">{row.order}.</div>
                  <div className="truncate text-[0.98rem] font-bold text-[#5f5a53]">{row.hash}</div>
                  <div className="text-right text-[0.98rem] font-bold text-[#7d7870]">{row.code}</div>
                </div>
              ))}

              <div className="border-t border-[#ece7de] pt-4 text-[0.98rem] font-normal text-[#7d7870]">
                + 13 hash lainnya...
              </div>
            </div>
          </section>

          <section className="rounded-[20px] border border-[#ddd6ca] bg-[#fbfaf7] p-5">
            <div className="text-[0.92rem] font-bold text-[#20201c]">Sesudah passport terbit</div>
            <div className="mt-2 text-[0.92rem] font-normal leading-6 text-[#5f5a53]">
              Anda tetap bisa menambah dokumen baru. GRS akan dihitung ulang dan halaman publik passport
              ikut diperbarui otomatis.
            </div>
            <Link
              to="/umkm/evidence"
              className="mt-4 inline-flex items-center gap-2 text-[0.92rem] font-bold text-[#236041] transition hover:text-[#173f2b]"
            >
              Kembali ke Evidence Vault
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  </>
)

const PassportIssuedView = () => (
  <>
    <header className="px-6 py-5 lg:px-12">
      <div className="rounded-[24px] border border-[#e7e1d8] bg-[radial-gradient(circle_at_top_left,rgba(220,235,220,0.9),transparent_35%),radial-gradient(circle_at_top_right,rgba(251,239,215,0.9),transparent_30%),#fbfaf7] p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
        <div className="flex items-start gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] bg-[#236041] text-white shadow-[0_16px_24px_rgba(35,96,65,0.22)]">
            <Check className="h-8 w-8" />
          </div>

          <div className="min-w-0">
            <div className="text-[0.88rem] font-bold uppercase tracking-[0.3em] text-[#4f8b5e]">
              Passport Diterbitkan • 21 Mei 2026 • 14:38 WIB
            </div>
            <h1 className="mt-2 text-[2.2rem] leading-none tracking-[-0.07em] text-[#181816] lg:text-[3.5rem]">
              Selamat. Bukti hijau Anda sekarang <span className="text-[#236041]">tercatat selamanya.</span>
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main className="px-6 pb-7 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(350px,0.92fr)]">
        <section className="rounded-[24px] border border-[#f0bf99] bg-white p-6 shadow-[0_18px_38px_rgba(21,24,18,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
                GreenTrust Passport
              </div>
              <div className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#8d877f]">
                Republik Indonesia • MVP
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff1e6] px-4 py-2 text-[0.98rem] font-bold text-[#c6763b]">
                <span>★</span>
                Unggul
              </div>
            </div>

            <div className="grid h-28 w-28 place-items-center rounded-full border-2 border-dashed border-[#f1d8c5] text-[0.88rem] font-bold uppercase tracking-[0.18em] text-[#e3c5b2]">
              Verified
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-b border-dashed border-[#ece7de] pb-6 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-center">
            <div className="relative grid h-[170px] w-[170px] place-items-center rounded-full">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 170 170" aria-hidden="true">
                <circle cx="85" cy="85" r="72" fill="none" stroke="#efe9df" strokeWidth="15" />
                <circle
                  cx="85"
                  cy="85"
                  r="72"
                  fill="none"
                  stroke="#c47739"
                  strokeLinecap="round"
                  strokeWidth="15"
                  strokeDasharray={`${2 * Math.PI * 72}`}
                  strokeDashoffset={`${2 * Math.PI * 72 * 0.13}`}
                />
              </svg>
              <div className="relative grid h-[124px] w-[124px] place-items-center rounded-full bg-white">
                <div className="text-center">
                  <div className="text-[3.3rem] font-bold leading-none tracking-[-0.06em] text-[#080807]">87</div>
                  <div className="mt-2 text-[0.86rem] font-bold uppercase tracking-[0.18em] text-[#8d877f]">
                    GRS / 100
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[3rem] leading-none tracking-[-0.07em] text-[#181816]">Batik Siti</div>
              <div className="mt-3 text-[1.15rem] font-normal text-[#5f5a53]">Siti Rahayu</div>
              <div className="mt-1 text-[1.05rem] font-normal text-[#7d7870]">
                Tekstil & Batik • Yogyakarta • sejak 2008
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {indicatorScores.map((indicator) => (
              <div key={indicator.code} className="text-center">
                <div
                  className="mx-auto grid h-10 w-10 place-items-center rounded-xl text-[0.95rem] font-bold"
                  style={{ backgroundColor: indicator.tint, color: indicator.color }}
                >
                  {indicator.code}
                </div>
                <div className="mt-2 text-[0.82rem] font-bold text-[#5f5a53]">{indicator.score}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 border-t border-dashed border-[#ece7de] pt-6 sm:grid-cols-[116px_minmax(0,1fr)] sm:items-center">
            <div className="grid h-[116px] w-[116px] place-items-center rounded-xl border border-[#ddd6ca] bg-[#fbfaf7] text-[0.9rem] font-bold tracking-[0.22em] text-[#20201c]">
              QR
            </div>

            <div>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.26em] text-[#8d877f]">
                greentrust.id/passport/
              </div>
              <div className="mt-1 text-[1.7rem] font-bold leading-tight tracking-[-0.04em] text-[#20201c]">
                batik-siti-jogja
              </div>
              <div className="mt-3 text-[0.92rem] font-normal text-[#5f5a53]">
                <span className="font-bold text-[#4f8b5e]">●</span> tx `0x7f3b9c2a...a91c` • polygon amoy
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
              Bagikan Ke Calon Mitra
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-[#ddd6ca] bg-[#fbfaf7] p-3">
              <div className="min-w-0 flex-1 truncate text-[1rem] font-bold text-[#3f403b]">
                greentrust.id/passport/batik-siti-jogja
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#101310] px-4 text-[0.92rem] font-bold text-white transition hover:bg-[#171b17]"
              >
                Salin
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#2ecc5f] bg-[#2ecc5f] px-5 text-[1rem] font-bold text-white shadow-[0_10px_20px_rgba(46,204,95,0.2)] transition hover:bg-[#28b854]"
              >
                <ArrowRight className="h-4 w-4" />
                Bagikan WhatsApp
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#ddd6ca] bg-white px-5 text-[1rem] font-bold text-[#20201c] transition hover:bg-[#fbfaf7]"
              >
                <Download className="h-4 w-4" />
                Unduh QR PNG
              </button>
            </div>
          </section>

          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
              Bukti On-Chain
            </div>

            <div className="mt-4">
              {onChainRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="text-[0.98rem] font-normal text-[#7d7870]">{row.label}</div>
                  <div className={`inline-flex items-center gap-2 text-[1rem] font-bold ${row.tone ?? 'text-[#20201c]'}`}>
                    {row.success ? <Check className="h-4 w-4" /> : null}
                    {row.value}
                    {row.link ? <ExternalLink className="h-4 w-4" /> : null}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[16px] border border-[#ddd6ca] bg-white px-5 text-[1rem] font-bold text-[#20201c] transition hover:bg-[#fbfaf7]"
            >
              <ExternalLink className="h-4 w-4" />
              Buka Block Explorer
            </button>
          </section>

          <section className="rounded-[20px] border border-[#ddd6ca] bg-[radial-gradient(circle_at_top_left,rgba(220,235,220,0.85),transparent_36%),#fbfaf7] p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#4f8b5e]">
              Lanjutan
            </div>
            <div className="mt-3 text-[1.5rem] font-bold leading-tight tracking-[-0.04em] text-[#20201c]">
              Tambah 3 dokumen Limbah & Energi
            </div>
            <div className="mt-2 text-[0.98rem] font-normal leading-6 text-[#5f5a53]">
              GRS Anda bisa naik ke <span className="font-bold text-[#c6763b]">92 (Unggul ★)</span> —
              badge khusus di landing page.
            </div>
            <Link
              to="/umkm/evidence"
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#101310] bg-[#101310] px-5 text-[1rem] font-bold text-white transition hover:bg-[#171b17]"
            >
              Buka Evidence Vault
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  </>
)

const PassportPage = () => {
  const [isIssued, setIsIssued] = useState(false)

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      {isIssued ? <PassportIssuedView /> : <PassportSubmissionView onIssue={() => setIsIssued(true)} />}
    </div>
  )
}

export default PassportPage
