import { useEffect, useState } from 'react'
import { SlidersHorizontal, TrendingUp } from 'lucide-react'
import { apiFetch } from '@/lib/utils'

const BASE_API = import.meta.env.VITE_BASE_API

const InvestorDisimpanPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('auth_token') ?? ''
    apiFetch(`${BASE_API}/investor/portfolio`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.status?.isSuccess) setItems(json.data?.items ?? [])
        else throw new Error(json?.message ?? 'Gagal memuat portofolio')
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="px-8 py-8 sm:px-10 lg:px-12">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-5 text-[2rem] font-semibold text-[#111111]">Portofolio Saya</h1>
          <p className="  text-sm text-[#5f5a53]">
            Pantau kinerja keberlanjutan dan pengembalian dari UMKM yang Anda danai.
          </p>
        </div>
        <button
          className="flex shrink-0 items-center gap-2 rounded-xl border border-[#ddd7cd] bg-white px-4 py-2 text-[0.82rem] font-medium text-[#5f5a53] transition-colors hover:border-[#205336] hover:text-[#205336]"
          type="button"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[0.88rem] text-[#8d877f]">Memuat portofolio...</div>
      ) : fetchError ? (
        <div className="py-12 text-center text-[0.88rem] text-red-600">{fetchError}</div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center text-[0.88rem] text-[#8d877f]">Belum ada portofolio.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.profile_id} className="flex flex-col rounded-2xl bg-white p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f0eb] text-[0.9rem] font-semibold text-[#205336]">
                  {item.business_name.slice(0, 1)}
                </div>
                <span className={`text-[0.75rem] font-medium ${item.status === 'active' ? 'text-[#205336]' : 'text-[#5f5a53]'}`}>
                  {item.status === 'active' ? 'Aktif' : item.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-[1rem] font-semibold text-[#111111]">{item.business_name}</div>
                <div className="mt-0.5 text-[0.78rem] text-[#5f5a53]">
                  {item.sector_name} · {item.city}
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[#8d877f]">Total Nilai</div>
                  <div className="text-[0.9rem] font-semibold text-[#111111]">{item.formatted_total_value}</div>
                </div>
                <div>
                  <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[#8d877f]">GRS Terkini</div>
                  <div className="flex items-center gap-1 text-[0.9rem] font-semibold text-[#111111]">
                    {item.current_grs}
                    {item.grs_trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-[#205336]" />}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-[#f0ece4] pt-3.5">
                <span className="text-[0.75rem] text-[#8d877f]">{item.funded_since_label}</span>
                <button
                  className="flex items-center gap-1 text-[0.78rem] font-semibold text-[#205336] transition-colors hover:text-[#1d4f32]"
                  type="button"
                >
                  Lihat Detail →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InvestorDisimpanPage
