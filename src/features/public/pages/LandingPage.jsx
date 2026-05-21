import { ArrowRight, Diamond, CircleDot, Circle, LayoutGrid } from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';
import { UmkmCard } from '@/components/ui/card-umkm';
import PressButton from '@/components/ui/PressButton';
import Grainient from '@/components/ui/Grainient';
import { publicUmkmList } from '@/features/public/data/publicUmkmData';

const heroStats = [
  { value: '128', label: 'Green Passport aktif', sub: 'di 23 kota Indonesia' },
  { value: '7.4k', label: 'Dokumen on-chain', sub: 'hash SHA-256 · Polygon' },
  { value: '64dtk', label: 'Median klasifikasi AI', sub: 'multimodal LLM+Vision' },
  { value: 'Rp 0', label: 'Biaya sertifikasi', sub: 'vs ISO 14001 Rp 200jt/th' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      {/* Hero */}
      <div className="relative ">
        <div className="absolute inset-0" style={{ height: '80vh' }}>
          <Grainient
            color1="#205336"
            color2="#1b7341"
            color3="#0d2b1c"
            timeSpeed={0.25}
            colorBalance={0.0}
            warpStrength={1.0}
            warpFrequency={5.0}
            warpSpeed={2.0}
            warpAmplitude={50.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={500.0}
            noiseScale={2.0}
            grainAmount={0.08}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.4}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
          />
        </div>

        <main className="  relative z-10 flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-5 pb-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="max-w-xl animate-element">
              <h1 className="mb-6 text-[56px] font-semibold leading-[1.1] tracking-tight text-white">
                Bukti hijau UMKM Indonesia, <span className="italic text-[#FDA800]">terverifikasi.</span>
              </h1>
              <p className="mb-10 max-w-[480px] text-lg leading-relaxed text-white/70">
                Setiap profil di sini punya <strong className="font-semibold text-white">Green Readiness Score</strong>{' '}
                objektif dan hash dokumen yang tercatat on-chain. Cari mitra hijau yang nyata — bukan klaim.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <PressButton variant="secondary" onClick={() => window.location.href='/register'}>
                  Daftarkan Bisnis Anda
                </PressButton>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 animate-element animate-delay-200">
              {[
                { value: '128', label: 'Green Passport aktif', sub: 'di 23 kota' },
                { value: '7.4k', label: 'Dokumen on-chain', sub: 'SHA-256 hash · Polygon' },
                { value: '64', label: 'Detik median', sub: 'klasifikasi AI' },
                { value: 'Rp 0', label: 'Biaya sertifikasi', sub: 'gratis untuk UMKM' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-1.5 text-3xl font-semibold text-[#FDA800]">{stat.value}</div>
                  <div className="mb-0.5 text-xs font-semibold text-white">{stat.label}</div>
                  <div className="text-[11px] text-white/60">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div className="absolute bottom-40 left-1/2 z-20 w-full max-w-7xl -translate-x-1/2 translate-y-1/2 px-4 sm:px-6 lg:px-8">
          <div className="animate-element animate-delay-400">
            <div className="grid grid-cols-2 divide-y divide-[#e5e4e0] rounded-2xl  bg-[#FDA800] shadow-[0_20px_40px_rgba(17,17,17,0.08)] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-white px-8 py-6">
                  <div className="mb-3 text-4xl font-semibold leading-none ">{stat.value}</div>
                  <div className="mb-1 text-sm font-semibold ">{stat.label}</div>
                  <div className="text-xs text-white">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections below hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mt-0 animate-element animate-delay-400 lg:mt-0">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 text-[10px] font-semibold uppercase text-[#205336]">Masalahnya</div>
              <h2 className="mb-6 text-4xl font-semibold leading-tight text-[#111111]">
                UMKM Indonesia sudah hijau — tapi tidak bisa membuktikannya.
              </h2>
              <p className="text-base leading-relaxed text-[#5f5a53]">
                64 juta UMKM menggerakkan 60% PDB. Banyak yang menjalankan praktik ramah lingkungan, tapi bukti
                operasional mereka tersebar di nota fisik, foto WA, dan spreadsheet. Investor butuh data ESG
                terstruktur — UMKM tidak punya cara untuk menyajikannya.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Diamond, title: 'Fragmentasi Bukti', desc: 'Nota tersebar di mana-mana, tidak dapat disajikan ke investor' },
                { icon: CircleDot, title: 'Standar Tidak Jelas', desc: 'UMKM tidak tahu dokumen apa yang dibutuhkan' },
                { icon: Circle, title: 'Klaim Tak Terverifikasi', desc: 'Tidak ada cara memvalidasi klaim "ramah lingkungan"' },
                { icon: LayoutGrid, title: 'Sertifikasi Mahal', desc: 'ISO 14001 Rp 50–200jt/tahun, di luar jangkauan' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-[#e5e4e0] bg-white p-5">
                  <Icon className="mb-4 h-5 w-5 text-[#205336]" strokeWidth={1.5} />
                  <div className="mb-1.5 text-sm font-semibold text-[#111111]">{title}</div>
                  <div className="text-xs leading-relaxed text-[#5f5a53]">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 animate-element animate-delay-400">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-semibold text-[#111111]">Yang sudah membuktikan diri.</h2>
            <PressButton variant="outline-orange" onClick={() => {}}>
              <span className="flex items-center gap-2">Lihat Semua 128 <ArrowRight className="h-4 w-4" /></span>
            </PressButton>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {publicUmkmList.map((umkm) => (
              <UmkmCard
                key={umkm.name}
                imageUrl={umkm.imageUrl}
                name={umkm.name}
                category={umkm.category}
                city={umkm.city}
                grs={umkm.grs}
                tier={umkm.tier}
                since={umkm.since}
                employees={umkm.employees}
                themeColor={umkm.themeColor}
                href={`/passport/${umkm.slug}`}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
