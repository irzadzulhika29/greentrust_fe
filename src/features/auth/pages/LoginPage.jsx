import { useNavigate } from 'react-router-dom'
import { Leaf, ShieldCheck } from 'lucide-react'

const statItems = [
  { label: 'PASSPORT AKTIF', value: '128' },
  { label: 'HASH ON-CHAIN', value: '7,418' },
]

const LoginPage = () => {
  const navigate = useNavigate()

  const handleSignIn = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    console.log('Login:', data)
    navigate('/umkm')
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f6f2ea] text-[#1e241e]">
      <div className="grid h-screen lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* Left panel */}
        <section className="relative flex h-screen flex-col justify-between overflow-hidden border-b border-[#d6d1c7] px-6 py-4 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-5 xl:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,120,79,0.08),transparent_34%)]" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2b6840]/25 bg-white shadow-[0_10px_30px_rgba(24,40,24,0.08)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1f6a43]" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-[1.1rem] font-semibold leading-none tracking-[-0.04em] text-[#1f6a43]">
                GreenTrust <span className="text-[#343434]">Passport</span>
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="relative z-10 mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center py-2 lg:mx-0">
            <h1
              className="animate-element animate-delay-200 mt-2 text-[2rem] leading-[0.95] tracking-[-0.06em] text-[#171717] sm:text-[2.4rem]"
              style={{ fontFamily: 'Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif' }}
            >
              Selamat datang kembali.
            </h1>
            <p className="animate-element animate-delay-300 mt-2.5 max-w-[28rem] text-[0.85rem] leading-6 text-[#5f5b55]">
              Lanjutkan dokumentasi hijau bisnis Anda, atau telusuri UMKM terverifikasi.
            </p>

            <form className="mt-5 space-y-3" onSubmit={handleSignIn}>
              <div className="animate-element animate-delay-400">
                <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]" htmlFor="email">
                  Email
                </label>
                <input
                  className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
                  defaultValue="siti@batiksitijogja.id"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>

              <div className="animate-element animate-delay-500">
                <div className="mb-1 flex items-center justify-between">
                  <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]" htmlFor="password">
                    Password
                  </label>
                  <button className="text-[0.75rem] font-semibold text-[#2c6c45] transition hover:text-[#1d4f32]" type="button">
                    Lupa?
                  </button>
                </div>
                <input
                  className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
                  defaultValue="••••••••••"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>

              <label className="animate-element animate-delay-600 flex items-center gap-2.5 text-[0.8rem] text-[#55554f]">
                <input
                  className="h-3.5 w-3.5 rounded border-[#b9c7b5] text-[#2f6b47] focus:ring-[#2f6b47]"
                  defaultChecked
                  name="remember"
                  type="checkbox"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>

              <button
                className="animate-element animate-delay-700 h-10 w-full rounded-lg bg-[#101310] text-[0.88rem] font-semibold text-white shadow-[0_18px_35px_rgba(16,19,16,0.18)] transition hover:-translate-y-0.5 hover:bg-[#171c17]"
                type="submit"
              >
                Masuk
              </button>

              <div className="animate-element animate-delay-800 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#ddd7cd]" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#8d877f]">Atau</span>
                <div className="h-px flex-1 bg-[#ddd7cd]" />
              </div>
            </form>

            <div className="animate-element animate-delay-1000 mt-4 text-center text-[0.82rem] text-[#656058]">
              Belum punya akun?{' '}
              <button
                className="font-semibold text-[#2d6d46] transition hover:text-[#1d4f32]"
                onClick={() => navigate('/register')}
                type="button"
              >
                Daftar sekarang →
              </button>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <section className="relative hidden overflow-hidden bg-[#143d28] lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(121,179,113,0.08),transparent_42%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(172,213,167,0.22)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#4f8a57]/12 blur-3xl" />

          <div className="relative z-10 flex h-screen w-full flex-col justify-between px-14 py-12 xl:px-16">
            <div className="max-w-[44rem]">
              <div className="animate-slide-right animate-delay-300 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[#9dbd90]">
                Manifesto
              </div>
              <h2
                className="animate-slide-right animate-delay-500 mt-4 max-w-[14ch] text-[3.2rem] leading-[0.98] tracking-[-0.05em] text-[#f6f2ea] xl:text-[4rem]"
                style={{ fontFamily: 'Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif' }}
              >
                Praktik hijau bukan janji, melainkan <span className="font-normal text-[#9ec27f] italic">nota, foto, dan hash</span> yang bisa diperiksa.
              </h2>
            </div>

            <div className="flex justify-end pr-6 xl:pr-12">
              <div className="animate-slide-right animate-delay-700 relative w-[20rem] rotate-[4deg] rounded-[1.6rem] border border-[#d6bc9a] bg-[#fffaf2] p-5 text-[#26231d] shadow-[0_40px_80px_rgba(9,18,12,0.3)]">
                <div className="absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,243,232,0.98))]" />
                <div className="absolute inset-0 rounded-[1.6rem] opacity-40 [background-image:linear-gradient(90deg,rgba(120,120,120,0.06)_1px,transparent_1px)] [background-size:14px_100%]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-[#8b8a83]">
                        GreenTrust Passport
                      </div>
                      <div className="mt-0.5 text-[0.62rem] uppercase tracking-[0.3em] text-[#9e9a90]">
                        Republik Indonesia · MVP
                      </div>
                    </div>
                    <div className="h-16 w-16 rounded-full border border-dashed border-[#e5cfb6]" />
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-[7px] border-[#c4793a] bg-white">
                      <span className="text-4xl font-semibold tracking-[-0.06em]">92</span>
                      <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.28em] text-[#7d786e]">GRS / 100</span>
                    </div>

                    <div>
                      <div
                        className="text-[1.7rem] leading-none tracking-[-0.05em] text-[#2e2a25]"
                        style={{ fontFamily: 'Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif' }}
                      >
                        Kopi Bumi Toraja
                      </div>
                      <div className="mt-1.5 text-[0.88rem] text-[#736d64]">Marlon Tappi</div>
                      <div className="mt-2 inline-flex rounded-full border border-[#f0c79f] bg-[#f9e7d3] px-2.5 py-0.5 text-[0.78rem] font-semibold text-[#c06d2d]">
                        ★ Unggul
                      </div>
                    </div>
                  </div>

                  <div className="my-5 border-t border-dashed border-[#ddd3c5]" />

                  <div className="flex items-end gap-4">
                    <div className="grid h-16 w-16 grid-cols-5 gap-[3px] rounded-md bg-[#111] p-1">
                      {Array.from({ length: 25 }).map((_, index) => (
                        <span
                          key={index}
                          className={`rounded-[1px] ${index % 2 === 0 || index % 7 === 0 ? 'bg-white' : 'bg-black'}`}
                        />
                      ))}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8c877d]">
                        greentrust.id/passport/
                      </div>
                      <div className="text-[1.1rem] font-semibold tracking-[-0.04em]">kopi-arabika-toraja</div>
                      <div className="font-mono text-[0.72rem] text-[#5b8c52]">tx: 0x7f3b...a91c · 14 Apr 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#c6d8c4]">
              {statItems.map((item) => (
                <div className="flex items-center gap-3" key={item.label}>
                  <Leaf className="h-3 w-3 fill-current" />
                  <span>
                    {item.value} {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LoginPage
