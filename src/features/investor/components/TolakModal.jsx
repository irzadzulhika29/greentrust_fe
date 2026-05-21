import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleX, X, Check } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'
import { REJECT_CATEGORIES } from '@/features/investor/constants/proposalConstants'

const TolakModal = ({ proposal, onClose }) => {
  const [categories, setCategories] = React.useState([])
  const [explanation, setExplanation] = React.useState('')
  const [openToFuture, setOpenToFuture] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const toggleCategory = (cat) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )

  const isValid = categories.length > 0 && explanation.length >= 20

  const handleSubmit = () => {
    if (!isValid) return
    setSubmitted(true)
    setTimeout(onClose, 2200)
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-120 overflow-hidden rounded-2xl bg-white"
        exit={{ scale: 0.96, y: 8 }}
        initial={{ scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Success overlay */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-white"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                animate={{ scale: 1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#205336]"
                initial={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.1 }}
              >
                <svg fill="none" height="32" viewBox="0 0 32 32" width="32">
                  <motion.path
                    animate={{ pathLength: 1 }}
                    d="M6 16 L13 23 L26 10"
                    initial={{ pathLength: 0 }}
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                  />
                </svg>
              </motion.div>
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="text-[0.88rem] text-[#7d786f]"
                initial={{ opacity: 0, y: 6 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                Penolakan terkirim.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#934f42]">
            <CircleX className="h-3.5 w-3.5" />
            Tolak Proposal
          </span>
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f3ec] text-[#5f5a53] transition-colors hover:bg-[#ece8df] hover:text-[#111111]"
            onClick={onClose}
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-5 px-6 pb-6">
          <p className="text-[0.82rem] leading-[1.55] text-[#5f5a53]">
            Alasan akan dikirim ke investor. Ini membantu mereka memahami konteks Anda dan menjaga
            hubungan profesional untuk peluang berikutnya.
          </p>

          {/* Proposal ref */}
          <div className="flex items-center gap-3 rounded-xl bg-[#f4f3ec] px-4 py-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#28557c] text-[0.72rem] font-bold text-white">
              {proposal.fromInitials}
            </div>
            <div className="min-w-0 text-[0.8rem] text-[#5f5a53]">
              <span className="font-semibold text-[#111111]">{proposal.ref}</span>
              {' · '}dari {proposal.from}
              {' · '}
              <span className="font-semibold text-[#111111]">{proposal.nilai}</span>
            </div>
          </div>

          {/* Kategori alasan */}
          <div>
            <div className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#8d877f]">
              Kategori alasan
            </div>
            <div className="flex flex-wrap gap-2">
              {REJECT_CATEGORIES.map((cat) => {
                const active = categories.includes(cat)
                return (
                  <button
                    className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors ${
                      active
                        ? 'bg-[#205336] text-white'
                        : 'bg-[#f4f3ec] text-[#5f5a53] hover:bg-[#ece8df]'
                    }`}
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Penjelasan */}
          <div>
            <div className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#8d877f]">
              Penjelasan ke investor{' '}
              <span className="normal-case tracking-normal text-[#8d877f]">(min 20 karakter)</span>
            </div>
            <textarea
              className="min-h-25 w-full rounded-xl bg-white px-3.5 py-3 text-[0.88rem] text-[#1c1c1c] outline-none ring-1 ring-[#e5e4e0] transition-colors focus:ring-2 focus:ring-[#205336]/30"
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Jelaskan alasan penolakan secara singkat dan profesional..."
              value={explanation}
            />
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[0.72rem] text-[#8d877f]">{explanation.length} / min 20</span>
              {explanation.length >= 20 && (
                <span className="flex items-center gap-1 text-[0.72rem] font-medium text-[#205336]">
                  <Check className="h-3 w-3" />
                  valid
                </span>
              )}
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex cursor-pointer items-start gap-2.5 text-[0.82rem] text-[#5f5a53]">
            <input
              checked={openToFuture}
              className="mt-0.5 h-4 w-4 shrink-0 rounded accent-emerald-800"
              onChange={(e) => setOpenToFuture(e.target.checked)}
              type="checkbox"
            />
            Saya bersedia dihubungi kembali oleh investor ini untuk peluang lain di masa depan.
          </label>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-[#f0ece4] pt-4">
            <PressButton variant="ghost" onClick={onClose}>
              Batal
            </PressButton>
            <PressButton disabled={!isValid} variant="danger" onClick={handleSubmit}>
              Kirim Penolakan
            </PressButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TolakModal
