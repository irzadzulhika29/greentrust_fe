import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiFetch } from '@/lib/utils'
import PressButton from '@/components/ui/PressButton'

const BASE_API = import.meta.env.VITE_BASE_API

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
]



const PassportSubmissionView = ({ onIssue, issuing, issueError }) => (
  <>
    <header className="border-b border-[#e7e1d8]">
      <div className="px-6 py-5 lg:px-12">
        <h1 className="m-0 text-[2.25rem] leading-none tracking-[-0.06em] text-[#181816]">
          Ajukan Verifikasi Blockchain
        </h1>
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

          <div className="mt-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <PressButton asChild variant="ghost" className="h-14 flex-1 px-7 text-[1rem]">
                <Link to="/umkm/evidence">Tinjau lagi dokumen</Link>
              </PressButton>

              <PressButton
                variant="primary"
                className="h-14 flex-1 px-8 text-[1.12rem]"
                onClick={onIssue}
                disabled={issuing}
              >
                {issuing ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Menerbitkan...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Terbitkan Green Passport
                  </span>
                )}
              </PressButton>
            </div>

            {issueError && (
              <p className="mt-3 text-[0.82rem] text-red-600">{issueError}</p>
            )}
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
        </div>
      </div>
    </main>
  </>
)

const CATEGORY_COLORS = {
  BB: { tint: '#fbefd7', color: '#7a5521' },
  PP: { tint: '#dcebdc', color: '#236041' },
  PL: { tint: '#dff5f8', color: '#176174' },
  EE: { tint: '#f7edce', color: '#6b4b12' },
  SK: { tint: '#fde8e3', color: '#934f42' },
  LK: { tint: '#e7e7fb', color: '#45457b' },
}

const PassportIssuedView = ({ passportData }) => {
  const grs = passportData?.grs_score ?? 0
  const slug = passportData?.public_slug ?? ''
  const passportUrl = passportData?.passport_url ?? ''
  const qrCodeUrl = passportData?.qr_code_url ?? ''
  const txHash = passportData?.blockchain_tx_hash ?? ''
  const txShort = txHash ? `${txHash.slice(0, 8)}...${txHash.slice(-4)}` : '—'
  const network = passportData?.network ?? '—'
  const blockNumber = passportData?.block_number ?? '—'
  const issuedAt = passportData?.issued_at
    ? new Date(passportData.issued_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
    : '—'
  const categoryScores = passportData?.category_scores ?? []

  const onChainRows = [
    { label: 'Network', value: network },
    { label: 'TX Hash', value: txShort, tone: 'text-[#236041]', link: true },
    { label: 'Block', value: `#${blockNumber}` },
    { label: 'Diterbitkan', value: issuedAt, tone: 'text-[#4f8b5e]', success: true },
  ]

  return (
  <>
    <header className="px-6 py-5 lg:px-12">
      <div className="rounded-[24px] border border-[#e7e1d8] bg-[radial-gradient(circle_at_top_left,rgba(220,235,220,0.9),transparent_35%),radial-gradient(circle_at_top_right,rgba(251,239,215,0.9),transparent_30%),#fbfaf7] p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
        <div className="flex items-start gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] bg-[#236041] text-white shadow-[0_16px_24px_rgba(35,96,65,0.22)]">
            <Check className="h-8 w-8" />
          </div>
          <div className="min-w-0">
            <div className="text-[0.88rem] font-bold uppercase tracking-[0.3em] text-[#4f8b5e]">
              Passport Diterbitkan • {issuedAt}
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
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">GreenTrust Passport</div>
              <div className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#8d877f]">Republik Indonesia • MVP</div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff1e6] px-4 py-2 text-[0.98rem] font-bold text-[#c6763b]">
                <span>★</span>
                {grs >= 85 ? 'Unggul' : grs >= 70 ? 'Siap' : 'Draft'}
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
                  cx="85" cy="85" r="72" fill="none"
                  stroke="#c47739" strokeLinecap="round" strokeWidth="15"
                  strokeDasharray={`${2 * Math.PI * 72}`}
                  strokeDashoffset={`${2 * Math.PI * 72 * (1 - grs / 100)}`}
                />
              </svg>
              <div className="relative grid h-[124px] w-[124px] place-items-center rounded-full bg-white">
                <div className="text-center">
                  <div className="text-[3.3rem] font-bold leading-none tracking-[-0.06em] text-[#080807]">{grs}</div>
                  <div className="mt-2 text-[0.86rem] font-bold uppercase tracking-[0.18em] text-[#8d877f]">GRS / 100</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[3rem] leading-none tracking-[-0.07em] text-[#181816]">{slug}</div>
              <div className="mt-3 text-[1.05rem] font-normal text-[#7d7870]">{network}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {categoryScores.map((cat) => {
              const meta = CATEGORY_COLORS[cat.category_id] ?? { tint: '#eee', color: '#555' }
              return (
                <div key={cat.category_id} className="text-center">
                  <div
                    className="mx-auto grid h-10 w-10 place-items-center rounded-xl text-[0.95rem] font-bold"
                    style={{ backgroundColor: meta.tint, color: meta.color }}
                  >
                    {cat.category_id}
                  </div>
                  <div className="mt-2 text-[0.82rem] font-bold text-[#5f5a53]">{cat.percent}%</div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 grid gap-4 border-t border-dashed border-[#ece7de] pt-6 sm:grid-cols-[116px_minmax(0,1fr)] sm:items-center">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code Passport" className="h-[116px] w-[116px] rounded-xl border border-[#ddd6ca] object-contain" />
            ) : (
              <div className="grid h-[116px] w-[116px] place-items-center rounded-xl border border-[#ddd6ca] bg-[#fbfaf7] text-[0.9rem] font-bold tracking-[0.22em] text-[#20201c]">QR</div>
            )}
            <div>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.26em] text-[#8d877f]">greentrust.id/passport/</div>
              <div className="mt-1 text-[1.7rem] font-bold leading-tight tracking-[-0.04em] text-[#20201c]">{slug}</div>
              <div className="mt-3 text-[0.92rem] font-normal text-[#5f5a53]">
                <span className="font-bold text-[#4f8b5e]">●</span> tx {txShort} • {network.toLowerCase()}
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">Bagikan Ke Calon Mitra</div>
            <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-[#ddd6ca] bg-[#fbfaf7] p-3">
              <div className="min-w-0 flex-1 truncate text-[1rem] font-bold text-[#3f403b]">{passportUrl || `greentrust.id/passport/${slug}`}</div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(passportUrl || `greentrust.id/passport/${slug}`)}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#101310] px-4 text-[0.92rem] font-bold text-white transition hover:bg-[#171b17]"
              >
                Salin
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(passportUrl || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#2ecc5f] bg-[#2ecc5f] px-5 text-[1rem] font-bold text-white shadow-[0_10px_20px_rgba(46,204,95,0.2)] transition hover:bg-[#28b854]"
              >
                <ArrowRight className="h-4 w-4" />
                Bagikan WhatsApp
              </a>
              {qrCodeUrl ? (
                <a
                  href={qrCodeUrl}
                  download={`qr-${slug}.png`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#ddd6ca] bg-white px-5 text-[1rem] font-bold text-[#20201c] transition hover:bg-[#fbfaf7]"
                >
                  <Download className="h-4 w-4" />
                  Unduh QR PNG
                </a>
              ) : (
                <button type="button" disabled className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#ddd6ca] bg-white px-5 text-[1rem] font-bold text-[#20201c] opacity-50">
                  <Download className="h-4 w-4" />
                  Unduh QR PNG
                </button>
              )}
            </div>
          </section>

          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">Bukti On-Chain</div>
            <div className="mt-4">
              {onChainRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0">
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
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#4f8b5e]">Lanjutan</div>
            <div className="mt-3 text-[1.5rem] font-bold leading-tight tracking-[-0.04em] text-[#20201c]">Tambah dokumen untuk tingkatkan GRS</div>
            <div className="mt-2 text-[0.98rem] font-normal leading-6 text-[#5f5a53]">
              GRS Anda bisa terus naik dengan menambah dokumen baru ke Evidence Vault.
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
}

const PassportPage = () => {
  const [issuing, setIssuing] = useState(false)
  const [issueError, setIssueError] = useState(null)
  const [passportData, setPassportData] = useState(null)

  const handleIssue = async () => {
    setIssueError(null)
    setIssuing(true)
    try {
      const token = localStorage.getItem('auth_token') ?? ''
      const res = await apiFetch(`${BASE_API}/green-passports/issue`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.message ?? `Error ${res.status}`)
      }
      setPassportData(json.data)
    } catch (err) {
      setIssueError(err.message ?? 'Gagal menerbitkan passport. Coba lagi.')
    } finally {
      setIssuing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      {passportData
        ? <PassportIssuedView passportData={passportData} />
        : <PassportSubmissionView onIssue={handleIssue} issuing={issuing} issueError={issueError} />}
    </div>
  )
}

export default PassportPage
