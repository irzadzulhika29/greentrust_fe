import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'

const ConfirmModal = ({
  title = 'Konfirmasi',
  description,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  confirmVariant = 'primary',
  successMessage = 'Berhasil disimpan.',
  onConfirm,
  onClose,
}) => {
  const [done, setDone] = React.useState(false)

  const handleConfirm = () => {
    setDone(true)
    onConfirm?.()
    setTimeout(onClose, 2200)
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && !done && onClose()}
    >
      <motion.div
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white"
        exit={{ scale: 0.96, y: 8 }}
        initial={{ scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Success overlay */}
        <AnimatePresence>
          {done && (
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
                {successMessage}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <span className="text-[0.95rem] font-semibold text-[#111111]">{title}</span>
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f3ec] text-[#5f5a53] transition-colors hover:bg-[#ece8df] hover:text-[#111111]"
            onClick={onClose}
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        {description && (
          <div className="px-6 pb-2 text-[0.85rem] leading-relaxed text-[#5f5a53]">
            {description}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[#f0ece4] px-6 py-4">
          <PressButton variant="ghost" onClick={onClose}>
            {cancelLabel}
          </PressButton>
          <PressButton variant={confirmVariant} onClick={handleConfirm}>
            {confirmLabel}
          </PressButton>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConfirmModal
