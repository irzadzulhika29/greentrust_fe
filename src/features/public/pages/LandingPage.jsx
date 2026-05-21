import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';

const LandingPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-white text-zinc-900 font-['Inter']">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-0px)] flex items-center">
        <div className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="max-w-xl animate-element">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 mb-8">
              <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Live</span>
              <span className="text-xs text-zinc-600 font-medium">14 UMKM baru terverifikasi minggu ini</span>
            </div>

            {/* Headline */}
            <h1 className="text-[56px] leading-[1.1] font-['Playfair_Display'] tracking-tight mb-6">
              Bukti hijau UMKM Indonesia, <span className="italic text-emerald-800">terverifikasi.</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-zinc-500 mb-10 leading-relaxed max-w-[480px]">
              Setiap profil di sini punya <strong className="text-zinc-800 font-semibold">Green Readiness Score</strong> objektif dan hash dokumen yang tercatat on-chain. Cari mitra hijau yang nyata — bukan klaim.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="/register" className="bg-[#111] hover:bg-black text-white px-6 py-3.5 rounded-xl font-medium transition-colors">
                Daftarkan Bisnis Anda
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 font-medium hover:bg-zinc-50 transition-colors">
                Lihat Cara Kerja <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Stats Cards */}
          <div className="grid grid-cols-2 gap-3 animate-element animate-delay-200">
            {/* Card 1 */}
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="text-3xl font-['Playfair_Display'] tracking-tight mb-1.5">128</div>
              <div className="text-xs font-semibold text-zinc-900 mb-0.5">Green Passport aktif</div>
              <div className="text-[11px] text-zinc-500">di 23 kota</div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="text-3xl font-['Playfair_Display'] tracking-tight mb-1.5">7.4k</div>
              <div className="text-xs font-semibold text-zinc-900 mb-0.5">Dokumen on-chain</div>
              <div className="text-[11px] text-zinc-500">SHA-256 hash · Polygon</div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="text-3xl font-['Playfair_Display'] tracking-tight mb-1.5">64</div>
              <div className="text-xs font-semibold text-zinc-900 mb-0.5">Detik median</div>
              <div className="text-[11px] text-zinc-500">klasifikasi AI</div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="text-3xl font-['Playfair_Display'] tracking-tight mb-1.5">Rp 0</div>
              <div className="text-xs font-semibold text-zinc-900 mb-0.5">Biaya sertifikasi</div>
              <div className="text-[11px] text-zinc-500">gratis untuk UMKM</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
