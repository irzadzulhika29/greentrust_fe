import { Star } from 'lucide-react'

const GrsGauge = ({ value }) => {
  const r = 26
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg className="-rotate-90" fill="none" height="64" viewBox="0 0 64 64" width="64">
        <circle cx="32" cy="32" r={r} stroke="#ece8df" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          stroke="#c47739"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="5"
        />
      </svg>
      <div className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-[#fff3e8]">
        <Star className="h-3.5 w-3.5 fill-[#c47739] text-[#c47739]" />
      </div>
    </div>
  )
}

export default GrsGauge
