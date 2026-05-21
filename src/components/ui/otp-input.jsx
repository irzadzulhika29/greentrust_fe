import { useRef, useState } from 'react'

/**
 * Basic OTP input — 6 digit boxes.
 * Props:
 *   onComplete(value: string) — called when all 6 digits are filled
 *   inline — if true, renders without outer card wrapper (for embedding in a page)
 */
export const Basic = ({ onComplete, inline = false }) => {
  const [otp, setOtp] = useState(Array(6).fill(''))
  const inputs = useRef([])

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = val
    setOtp(next)

    if (val && index < 5) {
      inputs.current[index + 1]?.focus()
    }

    if (next.every((d) => d !== '')) {
      onComplete?.(next.join(''))
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = Array(6).fill('')
    pasted.split('').forEach((char, i) => { next[i] = char })
    setOtp(next)
    const lastFilled = Math.min(pasted.length, 5)
    inputs.current[lastFilled]?.focus()
    if (pasted.length === 6) onComplete?.(pasted)
  }

  const content = (
    <div className="w-full">
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f] mb-2">
        Kode Verifikasi
      </div>
      <h2
        className="text-[2rem] leading-[0.95] tracking-[-0.06em] text-[#171717] mb-2.5"
      >
        Cek email Anda.
      </h2>
      <p className="text-[0.85rem] leading-6 text-[#5f5b55] mb-6">
        Kami mengirim kode 6 digit ke email Anda. Masukkan kode di bawah untuk mengaktifkan akun.
      </p>

      <div className="flex gap-2.5" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-full rounded-lg border border-[#d8d3ca] bg-white text-center text-[1.2rem] font-semibold text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10 caret-transparent"
          />
        ))}
      </div>

      <p className="mt-5 text-[0.8rem] text-[#8d877f]">
        Tidak menerima kode?{' '}
        <button
          type="button"
          className="font-semibold text-[#2d6d46] transition hover:text-[#1d4f32]"
          onClick={() => {
            setOtp(Array(6).fill(''))
            inputs.current[0]?.focus()
          }}
        >
          Kirim ulang
        </button>
      </p>
    </div>
  )

  if (inline) return content

  return (
    <div className="rounded-2xl border border-[#d8d3ca] bg-white p-8 shadow-sm">
      {content}
    </div>
  )
}

export default Basic
