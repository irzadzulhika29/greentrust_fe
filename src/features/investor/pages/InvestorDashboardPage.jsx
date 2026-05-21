const InvestorDashboardPage = () => {
  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#111111]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#5f5a53]">Selamat datang kembali, Arnold.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Proposal Aktif', value: '47', sub: 'sejak bergabung' },
          { label: 'Disetujui UMKM', value: '29', sub: '62% approval rate' },
          { label: 'Permintaan UMKM Masuk', value: '1', sub: 'butuh tinjauan', highlight: true },
          { label: 'Total Nilai Disetujui', value: 'Rp 28 M', sub: '12 bulan terakhir', large: true },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_4px_12px_rgba(17,17,17,0.04)]">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f] mb-3">{stat.label}</div>
            <div className={`font-semibold leading-none ${stat.large ? 'text-3xl' : 'text-4xl'} ${stat.highlight ? 'text-[#c47739]' : 'text-[#111111]'}`}>
              {stat.value}
            </div>
            <div className="mt-2 text-xs text-[#5f5a53]">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestorDashboardPage
