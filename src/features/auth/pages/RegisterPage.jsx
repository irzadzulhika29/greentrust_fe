import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Basic as OtpInput } from '@/components/ui/otp-input';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('umkm');
  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOtp(true);
  };

  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] font-['Inter']">
      {/* Left Pane */}
      <div className="bg-[#f6f2ea] flex flex-col relative px-6 py-4 sm:px-10 lg:px-14 lg:py-5 xl:px-16 overflow-hidden border-b border-[#d6d1c7] lg:border-b-0 lg:border-r">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,120,79,0.08),transparent_34%)]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2b6840]/25 bg-white shadow-[0_10px_30px_rgba(24,40,24,0.08)]">
            <div className="w-3 h-3 border-[1.5px] border-[#1f6a43] rounded-sm"></div>
          </div>
          <div>
            <div className="text-[1.1rem] font-semibold leading-none tracking-[-0.04em] text-[#1f6a43]">
              GreenTrust <span className="text-[#343434]">Passport</span>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="relative z-10 mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center py-2 lg:mx-0">
          {showOtp ? (
            <OtpInput
              inline
              onComplete={(val) => {
                console.log('OTP verified:', val);
                navigate('/onboarding');
              }}
            />
          ) : (
            <>
              <h1
                className="mt-2 text-[2rem] leading-[0.95] tracking-[-0.06em] text-[#171717] sm:text-[2.4rem] mb-2.5"
                style={{ fontFamily: 'Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif' }}
              >
                Mulai bukti hijau Anda hari ini.
              </h1>
              <p className="max-w-[28rem] text-[0.85rem] leading-6 text-[#5f5b55] mb-4">
                Pilih peran. Pendaftaran selesai dalam &lt;60 detik, tanpa biaya, tanpa sertifikasi formal.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('umkm')}
                    className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-colors ${
                      role === 'umkm'
                        ? 'border-[#2b6840]/30 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'
                        : 'border-[#d8d3ca] bg-white/50 hover:bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transform rotate-45 mt-0.5 ${role === 'umkm' ? 'bg-emerald-100' : 'bg-[#e8e4de]'}`}>
                      <div className={`w-1.5 h-1.5 rounded-sm ${role === 'umkm' ? 'bg-emerald-600' : 'bg-[#b0a99f]'}`}></div>
                    </div>
                    <div>
                      <div className={`font-semibold text-[0.78rem] ${role === 'umkm' ? 'text-[#171717]' : 'text-[#8d877f]'}`}>Pelaku UMKM</div>
                      <div className="text-[0.68rem] text-[#8d877f] mt-0.5">punya bisnis hijau</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('investor')}
                    className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-colors ${
                      role === 'investor'
                        ? 'border-[#2b6840]/30 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'
                        : 'border-[#d8d3ca] bg-white/50 hover:bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transform rotate-45 mt-0.5 ${role === 'investor' ? 'bg-emerald-100' : 'bg-[#e8e4de]'}`}>
                      <div className={`w-1.5 h-1.5 rounded-sm ${role === 'investor' ? 'bg-emerald-600' : 'bg-[#b0a99f]'}`}></div>
                    </div>
                    <div>
                      <div className={`font-semibold text-[0.78rem] ${role === 'investor' ? 'text-[#171717]' : 'text-[#8d877f]'}`}>Investor / Buyer</div>
                      <div className="text-[0.68rem] text-[#8d877f] mt-0.5">cari UMKM hijau</div>
                    </div>
                  </button>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                    Email Aktif
                  </label>
                  <input
                    type="email"
                    defaultValue="siti.rahayu@batiksiti.id"
                    className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10"
                  />
                </div>

                {/* Password */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                      Password
                    </label>
                    <input
                      type="password"
                      defaultValue="••••••••••"
                      className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10 tracking-[0.2em]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8d877f]">
                      Konfirmasi
                    </label>
                    <input
                      type="password"
                      defaultValue="••••••••••"
                      className="h-10 w-full rounded-lg border border-[#d8d3ca] bg-white px-3.5 text-[0.88rem] text-[#1c1c1c] outline-none transition focus:border-[#2b6840] focus:ring-4 focus:ring-[#2b6840]/10 tracking-[0.2em]"
                    />
                  </div>
                </div>

                {/* Password rules */}
                <div className="flex items-center gap-2 text-[0.68rem] text-[#8d877f] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></div>
                  8+ karakter · huruf besar · angka · simbol
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-2.5 text-[0.8rem] text-[#55554f]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-3.5 w-3.5 rounded border-[#b9c7b5] text-[#2f6b47] focus:ring-[#2f6b47] flex-shrink-0 accent-emerald-800"
                  />
                  <span>
                    Saya menyetujui{' '}
                    <a href="#" className="font-semibold text-[#2d6d46] hover:text-[#1d4f32]">Ketentuan Layanan</a>
                    {' '}dan{' '}
                    <a href="#" className="font-semibold text-[#2d6d46] hover:text-[#1d4f32]">Kebijakan Privasi</a>.
                    {' '}NIK terenkripsi AES-256.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="h-10 w-full rounded-lg bg-[#101310] text-[0.88rem] font-semibold text-white shadow-[0_18px_35px_rgba(16,19,16,0.18)] transition hover:-translate-y-0.5 hover:bg-[#171c17]"
                >
                  Buat Akun &amp; Kirim Verifikasi
                </button>
              </form>

              <div className="mt-4 text-center text-[0.82rem] text-[#656058]">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-[#2d6d46] transition hover:text-[#1d4f32] inline-flex items-center gap-1"
                >
                  Masuk <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Pane */}
      <div className="hidden lg:flex flex-col justify-center px-14 xl:px-16 bg-[#112F20] text-white overflow-hidden">
        <div className="max-w-[500px]">
          <div className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#9dbd90] mb-4">
            Onboarding
          </div>
          <h2
            className="text-[3.2rem] leading-[0.98] tracking-[-0.05em] text-white mb-8 xl:text-[4rem]"
            style={{ fontFamily: 'Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif' }}
          >
            Setelah daftar, Anda akan melalui{' '}
            <span className="font-normal text-[#A1D0AA] italic">5 langkah</span> singkat.
          </h2>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#1A3D2A] border border-[#234F36]">
              <div className="w-7 h-7 rounded-full bg-[#A1D0AA] text-[#112F20] flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-white text-xs mb-0.5">Verifikasi email</div>
                <div className="text-[10px] text-emerald-100/70">Klik tautan dari kotak masuk Anda</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#163524] border border-[#1E432E]">
              <div className="w-7 h-7 rounded-full bg-white text-[#112F20] flex items-center justify-center flex-shrink-0 font-bold text-[10px]">02</div>
              <div>
                <div className="font-semibold text-white text-xs mb-0.5">Unggah KTP (OCR otomatis)</div>
                <div className="text-[10px] text-emerald-100/70">Data identitas terisi dari foto KTP</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#132D1F] border border-[#1A3D2A]">
              <div className="w-7 h-7 rounded-full bg-[#1A3D2A] text-emerald-300/80 flex items-center justify-center flex-shrink-0 font-bold text-[10px] border border-[#234F36]">03</div>
              <div>
                <div className="font-semibold text-white/90 text-xs mb-0.5">Lengkapi profil bisnis</div>
                <div className="text-[10px] text-emerald-100/50">Nama usaha, lokasi, nomor WA bisnis</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#132D1F] border border-[#1A3D2A]">
              <div className="w-7 h-7 rounded-full bg-[#1A3D2A] text-emerald-300/80 flex items-center justify-center flex-shrink-0 font-bold text-[10px] border border-[#234F36]">04</div>
              <div>
                <div className="font-semibold text-white/90 text-xs mb-0.5">Unggah dokumen di Evidence Vault</div>
                <div className="text-[10px] text-emerald-100/50">6 kategori indikator keberlanjutan</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-[#132D1F] border border-[#1A3D2A]">
              <div className="w-7 h-7 rounded-full bg-[#1A3D2A] text-emerald-300/80 flex items-center justify-center flex-shrink-0 font-bold text-[10px] border border-[#234F36]">05</div>
              <div>
                <div className="font-semibold text-white/90 text-xs mb-0.5">GRS ≥ 70 → terbitkan Passport</div>
                <div className="text-[10px] text-emerald-100/50">Hash terdaftar di blockchain testnet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
