import { Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, getIndicatorHref } from '@/features/umkm/data/evidenceVaultData'

const EvidenceCategoryCard = ({ category }) => {
  const progress = (category.current / category.total) * 100
  const isComplete = category.status === 'Lengkap'

  return (
    <article className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          className="grid h-12 w-12 place-items-center rounded-lg text-sm font-bold"
          style={{ backgroundColor: category.tint, color: category.color }}
        >
          {category.code}
        </div>
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
            isComplete ? 'bg-[#dcebdc] text-[#4f8b5e]' : 'bg-[#fbefd7] text-[#c9853e]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {category.status}
        </div>
      </div>

      <h2 className="m-0 text-base font-bold leading-tight tracking-[-0.03em] text-[#20201c]">
        {category.name}
      </h2>
      <p className="mt-1 text-sm font-normal text-[#8a857d]">
        Bobot GRS: <span className="font-bold text-[#5f5a53]">{category.weight}%</span>
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase text-[#8d877f]">Dokumen</div>
          <div className="text-sm font-bold text-[#7d7870]">
            {category.current} / {category.total}
          </div>
        </div>
        <div className="h-2 rounded-full bg-[#e9ece8]">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: category.color }}
          />
        </div>
      </div>

      <div className="mt-5 w-full">
        <Link
          to={getIndicatorHref(category.slug)}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-[#ddd6ca] bg-[#fbfaf7] text-sm font-bold text-[#5f5a53] transition hover:bg-white"
        >
          Detail
        </Link>
      </div>
    </article>
  )
}

const EvidenceVaultPage = () => {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      <header>
        <div className="flex flex-col gap-5 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h1 className="m-0 text-4xl leading-none tracking-[-0.06em] text-[#181816]">
              Evidence Vault
            </h1>
            <p className="mt-3 max-w-[58rem] text-base font-normal leading-6 text-[#5f5a53]">
              Unggah bukti operasional Anda ke 6 indikator. AI mengklasifikasi otomatis. GRS dihitung server-side dan tidak bisa dimanipulasi.
            </p>
          </div>
        </div>
      </header>

      <main className="px-6 py-7 lg:px-12">
        <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
          <div className="grid gap-6 xl:grid-cols-[150px_minmax(0,1fr)_140px] xl:items-center">
            <div className="relative grid h-[126px] w-[126px] place-items-center rounded-full">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 126 126" aria-hidden="true">
                <circle cx="63" cy="63" r="53" fill="none" stroke="#efe9df" strokeWidth="12" />
                <circle
                  cx="63"
                  cy="63"
                  r="53"
                  fill="none"
                  stroke="#c47739"
                  strokeLinecap="round"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 53}`}
                  strokeDashoffset={`${2 * Math.PI * 53 * 0.13}`}
                />
              </svg>
              <div className="relative grid h-[92px] w-[92px] place-items-center rounded-full bg-white">
                <div className="text-center">
                  <div className="text-4xl font-bold leading-none tracking-[-0.06em] text-[#080807]">87</div>
                  <div className="mt-2 text-[10px] font-bold uppercase text-[#8d877f]">
                    GRS / 100
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-3xl leading-none tracking-[-0.06em] text-[#181816]">
                  GRS Anda <span className="text-[#236041]">87 / 100</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#fbefd7] px-4 py-2 text-sm font-bold text-[#c47739]">
                  <Star className="h-4 w-4 fill-current" />
                  Unggul
                </div>
              </div>

              <div className="mt-5">
                <div className="relative h-2 rounded-full bg-[#e9ece8]">
                  <div className="h-full w-[87%] rounded-full bg-[#c47739]" />
                  <div className="absolute left-[70%] top-1/2 h-6 w-px -translate-y-1/2 bg-[#181816]" />
                </div>
                <div className="mt-3 flex justify-center text-[10px] font-bold text-[#2f2f2b]">
                  70 - ambang Passport
                </div>
              </div>
            </div>

            <div className="text-left xl:text-right">
              <div className="text-[10px] font-semibold uppercase text-[#8d877f]">
                Untuk * Unggul
              </div>
              <div className="mt-1 text-3xl leading-none tracking-[-0.06em] text-[#c47739]">
                + 3 dok
              </div>
              <div className="mt-2 text-sm font-semibold text-[#8a857d]">Limbah - Energi</div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-3">
          {categories.map((category) => (
            <EvidenceCategoryCard category={category} key={category.code} />
          ))}
        </section>

        <section className="mt-6 rounded-[18px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#ddd6ca] bg-[#fbfaf7]">
              <Clock className="h-4 w-4 text-[#236041]" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#20201c]">AI memproses dokumen secara bertahap</div>
              <div className="text-xs font-semibold text-[#8d877f]">
                Status final dan hash on-chain akan tampil setelah validasi backend selesai.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default EvidenceVaultPage


