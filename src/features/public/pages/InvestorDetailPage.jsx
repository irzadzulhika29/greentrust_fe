import { ArrowLeft, MapPin, Send, Bookmark, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { findInvestorBySlug } from "@/features/public/data/investorDirectoryData";
import PressButton from "@/components/ui/PressButton";
import Iridescence from "@/components/ui/Iridescence";

const InvestorDetailPage = () => {
  const { slug } = useParams();
  const investor = findInvestorBySlug(slug);

  if (!investor) return <Navigate to="/investor" replace />;

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#111111]">
      <Navbar />

      {/* Hero — Iridescence background, 50vh */}
      <div className="relative w-full" style={{ height: "50vh" }}>
        <div className="absolute inset-0">
          <Iridescence
            color={[
              0.12549019607843137, 0.3254901960784314, 0.21176470588235294,
            ]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
        </div>

        {/* back link */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <Link
            to="/investor"
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-150"
          >
            <ArrowLeft className="h-3 w-3" />
            Kembali ke Direktori Investor
          </Link>
        </div>

        {/* Identity info inside hero, bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              {/* left: avatar + name + meta */}
              <div className="flex items-end gap-5">
                <div
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white shadow-md border-2 border-white/20"
                  style={{ backgroundColor: investor.themeFrom }}
                >
                  {investor.initials}
                </div>
                <div>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">
                    {investor.name}
                  </h1>
                  <div className="mt-1 text-sm text-white/70">
                    {investor.role} · {investor.institution}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {investor.location}
                    </span>
                    <span>·</span>
                    <span>{investor.portfolio} proposal</span>
                    <span>·</span>
                    <span>{investor.approval} approval</span>
                  </div>
                </div>
              </div>
            </div>

            {/* desc + tags */}
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-2xl">
              {investor.desc}
            </p>
            <div className=" flex   justify-between items-center gap-3 text-xs text-white/60">
              <div className="mt-3 flex flex-wrap gap-2">
                {investor.sectors.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
                {investor.sdgs.map((sdg) => (
                  <span
                    key={sdg}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm"
                  >
                    {sdg}
                  </span>
                ))}
                {/* right: CTA buttons */}
              
              </div>
                <div className="flex items-center gap-2">
                  <PressButton
                    variant="secondary"
                    className="!flex !items-center !gap-2 !px-5"
                  >
                    <Send className="h-4 w-4" />
                    Kirim Proposal
                  </PressButton>
                  <PressButton
                    variant="ghost"
                    className="!flex !items-center !gap-2 !px-5 !bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
                  >
                    <Bookmark className="h-4 w-4" />
                    Simpan
                  </PressButton>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: work history + investment history */}
          <div className="flex flex-col gap-6">
            {/* Pengalaman */}
            <div className="rounded-2xl border border-[#e5e4e0] bg-white p-6 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#111111]">
                  Pengalaman
                </h2>
                <span className="text-xs text-[#5f5a53]">
                  {investor.workHistory.length} posisi
                </span>
              </div>
              <div className="flex flex-col gap-5">
                {investor.workHistory.map((job, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-white"
                      style={{ backgroundColor: investor.themeFrom }}
                    >
                      {job.initials}
                    </div>
                    <div className="min-w-0 flex-1 border-b border-[#e5e4e0] pb-5 last:border-0 last:pb-0">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-semibold text-[#111111]">{job.title}</div>
                          <div className="text-sm text-[#5f5a53]">{job.company} · {job.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#5f5a53]">{job.period}</div>
                          <div className="text-xs text-[#5f5a53]">{job.location}</div>
                        </div>
                      </div>
                      <div className="mt-1.5 text-xs text-[#111111]">
                        <span className="font-semibold">Skill:</span> {job.skills}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Riwayat Investasi */}
            {investor.investmentHistory?.length > 0 && (
              <div className="rounded-2xl border border-[#e5e4e0] bg-white p-6 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
                <h2 className="mb-5 text-2xl font-semibold text-[#111111]">
                  Riwayat Investasi
                </h2>
                <div className="flex flex-col">
                  {investor.investmentHistory.map((inv, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border-t border-[#e5e4e0] py-4 first:border-0 first:pt-0"
                    >
                      {/* thumbnail placeholder */}
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-[#e5e4e0]" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#111111]">{inv.name}</div>
                        <div className="text-sm text-[#5f5a53]">
                          {inv.category} · {inv.city} · {inv.year}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm text-[#111111]">{inv.duration}</div>
                        <div className="text-xs text-[#5f5a53]">{inv.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: stats + proposal CTA + activities */}
          <div className="flex flex-col gap-4">
            {/* Stats card */}
            <div className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53]">
                {investor.type}
              </div>
              <div className="mt-3 flex flex-col gap-3 divide-y divide-[#e5e4e0]">
                <div className="pt-3 first:pt-0">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">
                    Rentang Tiket
                  </div>
                  <div className="mt-1 text-base font-semibold text-[#111111]">
                    {investor.ticket}
                  </div>
                </div>
                <div className="pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">
                    Portofolio Aktif
                  </div>
                  <div className="mt-1 text-base font-semibold text-[#111111]">
                    {investor.portfolio}
                  </div>
                </div>
                <div className="pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">
                    Approval Rate
                  </div>
                  <div className="mt-1 text-base font-semibold text-[#111111]">
                    {investor.approval} ({investor.approvalDetail})
                  </div>
                </div>
                <div className="pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#8d877f]">
                    Verifikasi
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#205336]">
                    <CheckCircle2 className="h-4 w-4" />
                    {investor.verified
                      ? "Identitas terverifikasi"
                      : "Belum terverifikasi"}
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal CTA card */}
            <div className="rounded-2xl border border-[#e5e4e0] bg-[#eaf6ee] p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#205336]">
                Kirim Proposal
              </div>
              <p className="mt-2 text-sm text-[#5f5a53] leading-relaxed">
                Passport Anda sudah aktif. Anda bisa mengajukan proposal
                pendanaan / pengadaan langsung ke {investor.name.split(" ")[0]}.
              </p>
              <PressButton
                variant="primary"
                className="mt-4 w-full !flex !items-center !justify-center"
              >
                Buat Proposal Baru
              </PressButton>
            </div>

            {/* Activities */}
            <div className="rounded-2xl border border-[#e5e4e0] bg-white p-5 shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#5f5a53]">
                Aktivitas Terbaru
              </div>
              <div className="flex flex-col gap-3">
                {investor.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#205336]" />
                    <div>
                      <div className="text-sm text-[#111111]">{act.text}</div>
                      <div className="text-xs text-[#5f5a53]">{act.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDetailPage;
