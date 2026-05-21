import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { getPressButtonMotion, getPressButtonVariant } from './pressButtonConfig.js'

/**
 * PressButton — tombol utama GreenTrust dengan efek press (spring animation).
 *
 * Variants:
 *   secondary     — Gold #FDA800 — default, untuk CTA utama
 *   primary       — Forest Green #205336
 *   outline       — Ghost dengan border hijau
 *   outline-orange — Ghost dengan border gold
 *   ghost         — Neutral border abu
 *   danger        — Merah untuk aksi destruktif
 *
 * Usage:
 *   <PressButton>Daftarkan Bisnis</PressButton>
 *   <PressButton variant="outline-orange">Lihat Cara Kerja</PressButton>
 *   <PressButton variant="primary" disabled>Loading...</PressButton>
 */
const PressButton = ({
  variant = 'secondary',
  children,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const v = getPressButtonVariant(variant)
  const motionState = getPressButtonMotion(variant, disabled)

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ boxShadow: v.shadow }}
      whileHover={motionState.whileHover}
      whileTap={motionState.whileTap}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={twMerge(
        'cursor-pointer px-5 py-2.5 rounded-lg font-semibold text-sm',
        'transition-colors duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
        v.base,
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default PressButton
