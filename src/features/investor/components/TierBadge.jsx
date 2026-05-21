import { Star, CheckCircle2 } from 'lucide-react'

const TierBadge = ({ tier }) => {
  if (tier === 'Unggul') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff3e8] px-2 py-0.5 text-[0.7rem] font-semibold text-[#c47739]">
        <Star className="h-2.5 w-2.5 fill-[#c47739]" />
        Unggul
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#eef3ed] px-2 py-0.5 text-[0.7rem] font-semibold text-[#205336]">
      <CheckCircle2 className="h-2.5 w-2.5" />
      Siap
    </span>
  )
}

export default TierBadge
