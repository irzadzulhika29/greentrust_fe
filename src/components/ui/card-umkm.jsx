import * as React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ArrowRight, Star, Check } from 'lucide-react'
import PressButton from '@/components/ui/PressButton'

const UmkmCard = React.forwardRef(
  (
    {
      className,
      imageUrl,
      name,
      category,
      city,
      grs,
      tier,
      desc,
      href = '#',
      themeColor = '150 50% 25%',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{ '--theme-color': themeColor }}
        className={cn('group w-full h-full min-h-[380px]', className)}
        {...props}
      >
        <Link
          to={href}
          className="relative flex flex-col w-full h-full min-h-[380px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out group-hover:scale-105"
          aria-label={`Lihat Green Passport ${name}`}
          style={{ boxShadow: '0 0 40px -15px rgba(32,83,54,0.4)' }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Gradient Overlay — green only */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(5,20,12,0.98) 0%, rgba(13,43,28,0.92) 35%, rgba(13,43,28,0.6) 55%, rgba(13,43,28,0.15) 75%, transparent 100%)',
            }}
          />

          {/* Tier badge top-left */}
          <div className="absolute top-3 left-3">
            <div
              className="rounded-full inline-flex items-center bg-white gap-1 px-2.5 py-2    text-sm font-semibold "
            >
              {tier === 'Unggul' ? (
                <Star className="w-3 h-3 fill-current" />
              ) : (
                <Check className="w-3 h-3" />
              )}
              {tier}
            </div>
          </div>

          {/* GRS score top-right — circular progress */}
          <div className="absolute top-3 right-3">
            {(() => {
              const size = 56
              const stroke = 4
              const r = (size - stroke) / 2
              const circ = 2 * Math.PI * r
              const progress = circ - (grs / 100) * circ
              return (
                <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                  <svg width={size} height={size} className="-rotate-90">
                    {/* track */}
                    <circle
                      cx={size / 2} cy={size / 2} r={r}
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={stroke}
                    />
                    {/* progress */}
                    <circle
                      cx={size / 2} cy={size / 2} r={r}
                      fill="none"
                      stroke="#FDA800"
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={circ}
                      strokeDashoffset={progress}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-bold leading-none text-white">{grs}</span>
                    <span className="text-[8px] font-semibold uppercase text-white/60 leading-none mt-0.5">GRS</span>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Content */}
          <div className="relative flex flex-col justify-end flex-1 p-5 text-white">
            <div className="mb-1 text-[10px] font-semibold uppercase text-white/60">
              {category} · {city}
            </div>
            <h3 className="text-xl font-bold leading-tight">{name}</h3>


            {desc && (
              <div className="mt-2 text-xs text-white/70 leading-relaxed line-clamp-2">
                {desc}
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-4">
              <PressButton
                variant="primary"
                className="w-full !flex !items-center !justify-between !rounded-lg !px-4 !py-2.5 !text-sm"
              >
                <span>Lihat Detail</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </PressButton>
            </div>
          </div>
        </Link>
      </div>
    )
  }
)

UmkmCard.displayName = 'UmkmCard'

export { UmkmCard }
