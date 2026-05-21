import { Link } from 'react-router-dom'

const toneClasses = {
  active: 'bg-white text-[#171717]',
  inactive: 'bg-transparent text-[#6f6a62]',
}

const markerClasses = {
  active: 'bg-[#e8f0eb] text-[#205336]',
  inactive: 'bg-white/75 text-[#8c867d]',
}

const AuthModeSwitch = ({ items, variant = 'compact' }) => {
  const isDetailed = variant === 'detailed'

  return (
    <div className={`rounded-2xl bg-[#efede6] p-1 ${isDetailed ? 'mt-5' : 'mt-4 inline-flex'}`}>
      <div className={`grid gap-1 ${isDetailed ? 'grid-cols-2' : 'grid-cols-2'}`}>
        {items.map((item) => (
          <Link
            className={`rounded-[14px] px-4 py-3 transition-colors duration-200 ${toneClasses[item.active ? 'active' : 'inactive']}`}
            key={item.to}
            to={item.to}
          >
            {isDetailed ? (
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${markerClasses[item.active ? 'active' : 'inactive']}`}>
                  <div className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-current" />
                </div>
                <div>
                  <div className="text-[0.95rem] font-semibold leading-none">{item.label}</div>
                  {item.description ? (
                    <div className="mt-1 text-[0.78rem] leading-none text-[#7b756d]">{item.description}</div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="min-w-[7.5rem] text-center text-[0.92rem] font-semibold leading-none">
                {item.label}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AuthModeSwitch
