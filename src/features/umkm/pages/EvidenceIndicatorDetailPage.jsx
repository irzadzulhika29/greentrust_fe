import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Ellipsis, Info, Plus, X } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  categories,
  findEvidenceIndicatorBySlug,
  getIndicatorHref,
} from '@/features/umkm/data/evidenceVaultData'

const statusClasses = {
  'on-chain': 'bg-[#dcebdc] text-[#4f8b5e]',
  review: 'bg-[#fbefd7] text-[#c9853e]',
}

const uploadQueue = [
  {
    type: 'PDF',
    name: 'Tagihan PLN Februari.pdf',
    meta: '380 KB • terklasifikasi: EE • conf 96%',
    state: 'done',
  },
  {
    type: 'JPG',
    name: 'Foto IPAL workshop.jpg',
    meta: '2.1 MB • OCR & ekstraksi konten...',
    state: 'processing',
    progress: 55,
  },
  {
    type: 'PDF',
    name: 'Kontrak BPJS karyawan.pdf',
    meta: '1.4 MB • compute SHA-256...',
    state: 'processing',
    progress: 18,
  },
]

const UploadDocumentModal = ({ indicator, onClose }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1c19]/45 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className="w-full max-w-[920px] rounded-[24px] border border-[#ddd6ca] bg-white shadow-[0_28px_60px_rgba(17,17,15,0.18)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e7e1d8] px-6 py-5">
          <div>
            <div
              id="upload-modal-title"
              className="text-[0.88rem] font-bold uppercase text-[#4f8b5e]"
            >
              Unggah Dokumen
            </div>
            <div className="mt-2 text-[1.35rem] font-bold leading-none tracking-[-0.05em] text-[#181816]">
              {indicator.name}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[18px] bg-[#f7f4ee] text-[#6d675f] transition hover:bg-[#efe9df] hover:text-[#20201c]"
            aria-label="Tutup modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 px-6 py-5">
          <button
            type="button"
            className="flex min-h-[158px] w-full flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-[#d9e2da] bg-[#f8f5ef] px-5 text-center"
          >
            <div className="text-[2.2rem]" aria-hidden="true">
              📂
            </div>
            <div className="mt-3 text-[1.2rem] font-bold leading-tight tracking-[-0.05em] text-[#20201c]">
              Tarik file ke sini, atau <span className="text-[#236041]">jelajah dari komputer</span>
            </div>
            <div className="mt-2 text-[0.82rem] font-semibold uppercase text-[#8d877f]">
              PDF • JPG • PNG  maks 10 MB • 17/20 hari ini
            </div>
          </button>

          <div className="space-y-3">
            {uploadQueue.map((item) => (
              <div
                key={item.name}
                className="rounded-[18px] border border-[#ddd6ca] bg-white px-4 py-3 shadow-[0_12px_24px_rgba(21,24,18,0.03)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#e7e1d8] bg-[#fbfaf7] text-[0.72rem] font-bold text-[#8a857d]">
                      {item.type}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[0.95rem] font-bold leading-tight text-[#20201c]">{item.name}</div>
                      <div className="mt-0.5 text-[0.8rem] font-semibold text-[#8a857d]">{item.meta}</div>
                    </div>
                  </div>

                  {item.state === 'done' ? (
                    <div className="rounded-full border border-[#c8dfca] bg-[#dcebdc] px-3 py-1.5 text-[0.82rem] font-bold text-[#4f8b5e]">
                      ✓ selesai
                    </div>
                  ) : (
                    <div className="text-[0.92rem] font-bold text-[#5f5a53]">{item.progress}%</div>
                  )}
                </div>

                {item.state === 'processing' ? (
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e6ece6]">
                    <div
                      className="h-full rounded-full bg-[#236041]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-[16px] border border-[#cfe0f0] bg-[#eef6ff] px-4 py-3 text-[#4b5d6f]">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-[0.88rem] font-normal leading-5">
              Anda bisa menutup jendela ini — pemrosesan berjalan di latar belakang. Notifikasi muncul saat
              semua file siap direview.
            </p>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-[16px] border border-[#ddd6ca] bg-white px-7 text-[0.95rem] font-bold text-[#20201c] transition hover:bg-[#fbfaf7]"
            >
              Tutup
            </button>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#20201c] bg-[#20201c] px-7 text-[0.95rem] font-bold text-white transition hover:bg-[#11110f]"
            >
              Review Hasil
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const EvidenceIndicatorDetailPage = () => {
  const { indicatorCode } = useParams()
  const indicator = findEvidenceIndicatorBySlug(indicatorCode)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  if (!indicator) {
    return <Navigate to="/umkm/evidence" replace />
  }

  const nextPriorityItems = indicator.nextPriority
    .map((item) => {
      const linkedCategory = categories.find((category) => category.code === item.code)

      return linkedCategory ? { ...item, ...linkedCategory } : null
    })
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      <header className="border-b border-[#e7e1d8]">
        <div className="px-6 py-5 lg:px-12">
          <div className="mb-5">
            <Link
              to="/umkm/evidence"
              className="inline-flex items-center gap-2 text-[0.86rem] font-bold text-[#5f5a53] transition hover:text-[#20201c]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Evidence Vault
            </Link>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="m-0 !text-3xl leading-none tracking-[-0.06em] text-[#181816]">
                Indikator {indicator.name}
              </h1>
              <p className="mt-3 text-[0.98rem] font-normal leading-6 text-[#5f5a53]">
                {indicator.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-[#20201c] bg-[#20201c] px-5 text-xs font-bold text-white transition hover:bg-[#11110f]"
            >
              <Plus className="h-4 w-4" />
              Tambah Dokumen
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 py-7 lg:px-12">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
          <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[0.68rem] font-semibold uppercase text-[#8d877f]">
                  Daftar Dokumen Yang Dibutuhkan
                </div>
                <div className="mt-2 text-[1.95rem] leading-none tracking-[-0.05em] text-[#181816]">
                  {indicator.current} dari {indicator.total} terpenuhi
                </div>
              </div>

              <div
                className="grid h-[68px] w-[68px] place-items-center rounded-full border-[6px] bg-white text-[1.75rem] font-bold"
                style={{ borderColor: indicator.color, color: '#181816' }}
              >
                {indicator.score}
              </div>
            </div>

            <div className="space-y-1">
              {indicator.requiredDocs.map((doc) => (
                <div
                  key={doc.title}
                  className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                        doc.completed ? 'bg-[#236041] text-white' : 'bg-[#f4f1ea] text-[#8d877f]'
                      }`}
                    >
                      {doc.completed ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[1rem] font-bold leading-tight text-[#20201c]">{doc.title}</div>
                      <div className="mt-1 text-[0.9rem] font-normal text-[#8a857d]">{doc.fileName}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!doc.completed) {
                        setIsUploadModalOpen(true)
                      }
                    }}
                    className="inline-flex shrink-0 items-center gap-2 text-[0.95rem] font-bold transition"
                    style={{ color: indicator.color }}
                  >
                    {doc.completed ? 'Lihat' : 'Unggah'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[18px] border border-[#ddd6ca] bg-[#f4fbf6] p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ca] bg-white px-3 py-1 text-[0.72rem] font-bold uppercase text-[#4f8b5e]">
              <Plus className="h-3 w-3" />
              AI Gap Analyzer
            </div>

            <h2 className="mt-5 text-[1.7rem] leading-[1.1] tracking-[-0.05em] text-[#181816]">
              {indicator.aiInsightTitle}
            </h2>
            <p className="mt-4 text-[1rem] font-normal leading-7 text-[#5f5a53]">{indicator.aiInsightBody}</p>

            <div className="mt-6 space-y-3">
              {indicator.aiRecommendations.map((recommendation) => (
                <div
                  key={recommendation.title}
                  className="flex items-center justify-between gap-4 rounded-[16px] border border-[#ddd6ca] bg-white px-4 py-4"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 text-[1rem] font-bold text-[#4f8b5e]">+</div>
                    <div className="min-w-0">
                      <div className="text-[1rem] font-bold leading-tight text-[#20201c]">
                        {recommendation.title}
                      </div>
                      <div className="mt-1 text-[0.9rem] font-normal text-[#8a857d]">{recommendation.note}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="inline-flex shrink-0 items-center gap-1 text-[0.92rem] font-bold text-[#4f8b5e]"
                  >
                    Unggah
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="text-[0.68rem] font-semibold uppercase text-[#8d877f]">
                Dokumen Terunggah • {indicator.uploadedDocs.length} File
              </div>

              <div className="flex items-center gap-2 text-[0.86rem] font-semibold text-[#7d7870]">
                <span>Filter:</span>
                <button
                  type="button"
                  className="rounded-full border border-[#ddd6ca] bg-[#fbfaf7] px-3 py-1 text-[0.8rem] font-bold text-[#5f5a53]"
                >
                  Semua
                </button>
                <button
                  type="button"
                  className="rounded-full border border-[#c8dfca] bg-[#dcebdc] px-3 py-1 text-[0.8rem] font-bold text-[#4f8b5e]"
                >
                  on-chain
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {indicator.uploadedDocs.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-start justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#e7e1d8] bg-[#fbfaf7] text-[0.72rem] font-bold text-[#8a857d]">
                      {doc.type}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[1rem] font-bold leading-tight text-[#20201c]">{doc.name}</div>
                      <div className="mt-1 text-[0.86rem] font-normal text-[#8a857d]">{doc.meta}</div>
                      {doc.warning ? (
                        <div className="mt-2 text-[0.82rem] font-bold text-[#c9853e]">{doc.warning}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div
                      className={`rounded-full px-3 py-1 text-[0.8rem] font-bold ${
                        statusClasses[doc.status]
                      }`}
                    >
                      {doc.status === 'on-chain' ? 'on-chain' : 'perlu review'}
                    </div>
                    <button type="button" className="text-[#8a857d] transition hover:text-[#20201c]">
                      <Ellipsis className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
              <div className="text-[0.68rem] font-semibold uppercase text-[#8d877f]">
                Kategori Prioritas Berikutnya
              </div>

              <div className="mt-4 space-y-1">
                {nextPriorityItems.map((item) => (
                  <Link
                    key={item.code}
                    to={getIndicatorHref(item.slug)}
                    className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[0.95rem] font-bold"
                        style={{ backgroundColor: item.tint, color: item.color }}
                      >
                        {item.code}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[1rem] font-bold leading-tight text-[#20201c]">{item.title}</div>
                        <div className="mt-1 text-[0.86rem] font-normal text-[#8a857d]">{item.note}</div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <div className="text-[0.96rem] font-bold text-[#c47739]">{item.gain}</div>
                      <ArrowRight className="h-4 w-4 text-[#7d7870]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[18px] border border-dashed border-[#ddd6ca] bg-[#fffdf9] p-6">
              <div className="text-[1rem] font-bold text-[#20201c]">Contoh dokumen yang diterima AI:</div>
              <ul className="mt-3 space-y-2 pl-5 text-[0.96rem] font-normal leading-6 text-[#5f5a53]">
                {indicator.acceptedExamples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      {isUploadModalOpen ? (
        <UploadDocumentModal indicator={indicator} onClose={() => setIsUploadModalOpen(false)} />
      ) : null}
    </div>
  )
}

export default EvidenceIndicatorDetailPage
