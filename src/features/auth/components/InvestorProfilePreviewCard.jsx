const toneMeta = {
  'VC / Modal Ventura': { badge: 'VC', color: '#244f72' },
  'Private Equity': { badge: 'PE', color: '#385b7a' },
  Lender: { badge: 'LD', color: '#45616f' },
  default: { badge: 'IN', color: '#244f72' },
}

const formatName = (identityValues) =>
  [identityValues.firstName, identityValues.lastName].filter(Boolean).join(' ') || 'Nama investor'

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'IN'

const InvestorProfilePreviewCard = ({ identityValues, careerValues }) => {
  const fullName = formatName(identityValues)
  const tone = toneMeta[careerValues.investorType] ?? toneMeta.default

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#d8d3ca] bg-white shadow-[0_18px_38px_rgba(20,23,18,0.05)]">
      <div className="flex items-center justify-between bg-[#1f3442] px-5 py-3 text-white">
        <div className="text-[0.63rem] font-semibold uppercase tracking-[0.22em]">
        </div>
        <span className="px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em]">
          {tone.badge}
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start gap-3.5">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-bold text-white"
            style={{ backgroundColor: tone.color }}
          >
            {getInitials(fullName)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[1rem] font-semibold text-[#171717]">{fullName}</div>
            <div className="mt-0.5 text-[0.82rem] text-[#5f5a53]">
              {careerValues.roleTitle || 'Posisi utama'} · {careerValues.institutionName || 'Institusi'}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {careerValues.skillTags.slice(0, 4).map((skill) => (
                <span
                  className="rounded-full bg-[#eef3ed] px-2 py-0.5 text-[0.67rem] font-medium text-[#385b46]"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[0.8rem] leading-5 text-[#5f5a53]">
          {careerValues.achievementSummary || 'Tambahkan ringkasan pencapaian untuk membangun kepercayaan UMKM.'}
        </p>

        <div className="grid grid-cols-3 gap-3 border-t border-[#ece6db] pt-4">
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
              Tiket
            </div>
            <div className="mt-1 text-[0.82rem] font-semibold text-[#171717]">
              {careerValues.ticketRange || 'Rp 500jt — 5M'}
            </div>
          </div>
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
              Fokus
            </div>
            <div className="mt-1 text-[0.82rem] font-semibold text-[#171717]">
              {Array.isArray(careerValues.sectorFocus)
              ? careerValues.sectorFocus.length
                ? `${careerValues.sectorFocus.length} sektor`
                : '—'
              : careerValues.sectorFocus || '—'}
            </div>
          </div>
          <div>
            <div className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#8d877f]">
              Approval
            </div>
            <div className="mt-1 text-[0.82rem] font-semibold text-[#171717]">
              {careerValues.approvalRate || '62%'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorProfilePreviewCard
