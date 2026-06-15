import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { apiFetch } from "@/lib/utils";
import PressButton from "@/components/ui/PressButton";

const BASE_API = import.meta.env.VITE_BASE_API;

const issuanceSteps = [
  {
    number: 1,
    title: "Kumpulkan hash 18 dokumen tereview",
    note: "satu hash per file - tidak ada file asli yang naik on-chain",
  },
  {
    number: 2,
    title: "Submit batch ke smart contract",
    note: "jaringan: Polygon Amoy Testnet - estimasi <60 detik",
  },
  {
    number: 3,
    title: "Tunggu konfirmasi blok",
    note: "retry otomatis 3x dengan exponential backoff bila gagal",
  },
  {
    number: 4,
    title: "Penerbitan Passport publik",
    note: "profil Anda muncul di landing page - QR + slug ter-generate",
  },
];

const PassportSubmissionView = ({ onIssue, issuing, issueError, grsData }) => {
  const grs = grsData?.grs_score ?? 0
  const threshold = grsData?.passport_threshold ?? 70
  const tierLabel = grs >= 85 ? 'Unggul' : grs >= 70 ? 'Siap' : 'Berkembang'

  const summaryRows = [
    { label: 'GRS saat ini', value: `${grs} / 100`, valueTone: 'text-[#236041]' },
    { label: 'Ambang Passport', value: `${threshold}` },
    { label: 'Tier', badge: tierLabel },
    { label: 'Status', value: grsData?.passport_status ?? '—' },
  ]

  return (
    <>
      <header className="border-b border-[#e7e1d8]">
      <div className="px-6 py-5 lg:px-12">
        <h1 className="m-0 text-[2.25rem] leading-none tracking-[-0.06em] text-[#181816]">
          Ajukan Verifikasi Blockchain
        </h1>
      </div>
    </header>

    <main className="px-6 py-7 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.92fr)]">
        <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dcebdc] px-4 py-2 text-[0.86rem] font-bold uppercase text-[#244232]">
            <Check className="h-4 w-4" />
            GRS {grs} - {grs >= threshold ? `Lolos Ambang ${threshold}` : `Belum Lolos Ambang ${threshold}`}
          </div>

          <h2 className="mt-6 text-[2.15rem] leading-none tracking-[-0.06em] text-[#181816]">
            Anda siap menerbitkan Green Passport.
          </h2>
          <p className="mt-4 text-[1rem] font-normal leading-7 text-[#5f5a53]">
            Setelah Anda menekan tombol di bawah, sistem akan:
          </p>

          <div className="mt-6 space-y-4">
            {issuanceSteps.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#ddd6ca] bg-[#fbfaf7] text-[1rem] font-bold text-[#5f5a53]">
                  {step.number}
                </div>
                <div>
                  <div className="text-[1rem] font-bold leading-tight text-[#20201c]">
                    {step.title}
                  </div>
                  <div className="mt-1 text-[0.95rem] font-normal leading-6 text-[#8a857d]">
                    {step.note}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[18px] border border-[#efc9a8] bg-[#fff1e6] px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#a35f28]" />
              <p className="text-[0.98rem] font-normal leading-7 text-[#8a552c]">
                Dokumen yang sudah on-chain{" "}
                <span className="font-bold">tidak bisa dihapus</span> dari
                Evidence Vault. Anda tetap bisa menambah dokumen baru kapan
                saja.
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-[18px] bg-[#f5f2ec] px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#236041] text-white">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-[0.98rem] font-normal leading-7 text-[#3f403b]">
                Saya menyatakan bahwa dokumen yang saya unggah adalah bukti
                operasional asli dari bisnis saya, dan saya bertanggung jawab
                atas keasliannya.
              </p>
            </div>
          </div>

          <div className="mt-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <PressButton
                variant="outline"
                className="h-14 flex-1 px-7 text-[1rem]"
                onClick={() => {
                  window.location.href = "/umkm/evidence";
                }}
              >
                Tinjau lagi dokumen
              </PressButton>

              <PressButton
                variant="primary"
                className="h-14 flex-1 px-8 text-[1.12rem]"
                onClick={onIssue}
                disabled={issuing}
              >
                {issuing ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Menerbitkan...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Terbitkan Green Passport
                  </span>
                )}
              </PressButton>
            </div>

            {issueError && (
              <p className="mt-3 text-[0.82rem] text-red-600">{issueError}</p>
            )}
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-[20px] border border-[#ddd6ca] bg-white p-5 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
              Ringkasan
            </div>

            <div className="mt-4">
              {summaryRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="text-[0.98rem] font-normal text-[#7d7870]">
                    {row.label}
                  </div>

                  {row.badge ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#efc9a8] bg-[#fff1e6] px-3 py-1 text-[0.88rem] font-bold text-[#c6763b]">
                      <span>*</span>
                      {row.badge}
                    </div>
                  ) : (
                    <div
                      className={`text-[1rem] font-bold ${row.valueTone ?? "text-[#20201c]"}`}
                    >
                      {row.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
    </>
  )
}

const CATEGORY_COLORS = {
  BB: { tint: "#fbefd7", color: "#7a5521" },
  PP: { tint: "#dcebdc", color: "#236041" },
  PL: { tint: "#dff5f8", color: "#176174" },
  EE: { tint: "#f7edce", color: "#6b4b12" },
  SK: { tint: "#fde8e3", color: "#934f42" },
  LK: { tint: "#e7e7fb", color: "#45457b" },
};

const toTitleCase = (value) =>
  String(value ?? "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getTierLabel = (grs) => {
  if (grs >= 85) return "Unggul";
  if (grs >= 70) return "Siap";
  return "Draft";
};

const mapIssuedPassportData = (data) => {
  if (!data?.issued) {
    return null;
  }

  return {
    passport_id: data.green_passport?.passport_id,
    grs_score: data.green_passport?.grs_score,
    status: data.green_passport?.status,
    public_slug: data.green_passport?.public_slug,
    passport_url: data.share?.url ?? data.green_passport?.passport_url,
    qr_code_url: data.green_passport?.qr_code_url,
    blockchain_tx_hash: data.on_chain_proof?.blockchain_tx_hash,
    network: data.on_chain_proof?.network,
    block_number: data.on_chain_proof?.block_number,
    issued_at: data.green_passport?.issued_at,
    category_scores: data.category_scores ?? [],
    profile: data.profile ?? null,
    tier: data.green_passport?.tier,
    tier_label: data.green_passport?.tier_label,
  };
};

const PassportIssuedView = ({ passportData }) => {
  const grs = passportData?.grs_score ?? 0;
  const slug = passportData?.public_slug ?? "";
  const passportUrl = passportData?.passport_url ?? "";
  const qrCodeUrl = passportData?.qr_code_url ?? "";
  const txHash = passportData?.blockchain_tx_hash ?? "";
  const txShort = txHash ? `${txHash.slice(0, 8)}...${txHash.slice(-4)}` : "--";
  const network = passportData?.network ?? "--";
  const blockNumber = passportData?.block_number ?? "--";
  const issuedAt = passportData?.issued_at
    ? new Date(passportData.issued_at).toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "--";
  const categoryScores = passportData?.category_scores ?? [];
  const businessName = toTitleCase(slug || "green-trust-passport");
  const tierLabel = getTierLabel(grs);
  const passportHref = passportUrl || `http://localhost:5173/passport/${slug}`;
  const issuedCaption = passportData?.issued_at
    ? `diterbitkan pada ${new Date(passportData.issued_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`
    : "passport belum memiliki tanggal terbit";
  const descriptor = [
    network !== "--" ? network : null,
    txShort !== "--" ? `tx ${txShort}` : null,
    blockNumber !== "--" ? `blok #${blockNumber}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const onChainRows = [
    { label: "Network", value: network },
    { label: "TX Hash", value: txShort, tone: "text-[#236041]", link: true },
    { label: "Block", value: `#${blockNumber}` },
    {
      label: "Diterbitkan",
      value: issuedAt,
      tone: "text-[#4f8b5e]",
      success: true,
    },
  ];

  return (
    <>
      <main className="px-4 py-6 lg:px-8">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_300px]">
          <div className="space-y-4">
            <section className="relative overflow-hidden rounded-[24px] border border-[#e5e4e0] bg-white shadow-[0_14px_28px_rgba(21,24,18,0.05)]">
              <img
                src="/card_bg.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 top-6 h-[300px] w-[300px] opacity-[0.08] lg:-right-10 lg:top-4 lg:h-[380px] lg:w-[380px]"
              />

              <div className="relative p-3 lg:p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#7d7870]">
                      Passport
                    </div>
                    <div className="text-[0.75rem] font-medium text-[#111111]">
                      National Passport ID
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 self-start">
                    <div className="grid h-7 w-7 place-items-center rounded-full border border-[#e5e4e0] bg-[#f4f3ec]">
                      <img
                        src="/card_bg.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-95"
                      />
                    </div>
                    <div className="text-[0.92rem] font-semibold tracking-[-0.04em] text-[#205336]">
                      Green
                      <span className="font-normal text-[#5f5a53]">Trust</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-[140px_minmax(0,1fr)]">
                  <div className="flex flex-col items-center">
                    <div className="relative grid h-[110px] w-[110px] place-items-center rounded-full">
                      <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 110 110"
                        aria-hidden="true"
                      >
                        <circle
                          cx="55"
                          cy="55"
                          r="42"
                          fill="none"
                          stroke="#dedede"
                          strokeWidth="10"
                        />
                        <circle
                          cx="55"
                          cy="55"
                          r="42"
                          fill="none"
                          stroke="#c47739"
                          strokeLinecap="round"
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeDashoffset={`${2 * Math.PI * 42 * (1 - grs / 100)}`}
                        />
                      </svg>
                      <div className="relative text-center">
                        <div className="text-lg font-semibold leading-none tracking-[-0.08em] text-[#c47739]">
                          {grs}
                        </div>
                        <div className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-[#c47739]">
                          GRS
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 inline-flex min-w-[110px] items-center justify-center rounded-[10px] bg-[#c47739] px-3 py-1.5 text-[0.75rem] font-semibold text-white">
                      {tierLabel}
                    </div>
                  </div>

                  <div className="min-w-0 pt-1">
                    <h1 className="text-[0.92rem] font-semibold leading-tight tracking-[-0.04em] text-[#111111] lg:text-[1.1rem]">
                      {businessName}
                    </h1>
                    <div className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#111111]">
                      GreenTrust Passport
                    </div>
                    <div className="mt-1 text-[0.75rem] leading-5 text-[#5f5a53]">
                      {descriptor ||
                        "Status blockchain aktif dan siap dibagikan ke calon mitra."}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-2.5 sm:grid-cols-6">
                      {categoryScores.map((cat) => {
                        const meta = CATEGORY_COLORS[cat.category_id] ?? {
                          tint: "#eee",
                          color: "#555",
                        };

                        return (
                          <div key={cat.category_id} className="text-center">
                            <div
                              className="mx-auto grid h-8 w-8 place-items-center rounded-[10px] text-[0.7rem] font-bold"
                              style={{
                                backgroundColor: meta.tint,
                                color: meta.color,
                              }}
                            >
                              {cat.category_id}
                            </div>
                            <div className="mt-1 text-[0.72rem] font-semibold text-[#111111]">
                              {cat.percent}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border-t border-dashed border-[#9cd4b4] px-3 py-3 lg:px-4">
                <div className="flex gap-2.5">
                  <div className="flex items-start gap-2.5">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="QR Code Passport"
                        className="h-[64px] w-[64px] rounded-[12px] border border-[#e5e4e0] bg-white p-1 object-contain"
                      />
                    ) : (
                      <div className="grid h-[64px] w-[64px] place-items-center rounded-[12px] border border-[#e5e4e0] bg-[#fbfaf7] text-[0.65rem] font-bold tracking-[0.2em] text-[#20201c]">
                        QR
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#20201c]">
                      greentrust.id/passport/
                    </div>
                    <div className="mt-0.5 break-words text-[0.92rem] font-semibold leading-tight tracking-[-0.04em] text-[#111111] lg:text-[1.05rem]">
                      {slug}
                    </div>
                    <div className="flex justify-between mt-2 break-all text-[0.72rem] text-[#20201c]">
                      <div>
                        {txShort !== "--"
                          ? txShort
                          : "hash transaksi belum tersedia"}
                        <span className="text-[#5f5a53]">
                          {" "}
                          · {(network || "network").toLowerCase()}
                        </span>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="text-[0.72rem] leading-5 text-[#20201c]">
                          {issuedCaption}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[18px] border border-[#e5e4e0] bg-white p-4 shadow-[0_12px_24px_rgba(21,24,18,0.04)]">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
                Bagikan Ke Calon Mitra
              </div>
              <div className="mt-3 flex flex-col gap-2.5 rounded-[14px] border border-[#e5e4e0] bg-[#fbfaf7] p-2.5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1 truncate text-[0.86rem] font-bold text-[#3f403b]">
                  {passportHref}
                </div>
                <PressButton
                  variant="secondary"
                  className="!h-9 !px-3.5 !text-[0.82rem]"
                  onClick={() => navigator.clipboard.writeText(passportHref)}
                >
                  Salin
                </PressButton>
              </div>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(passportHref)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PressButton
                    variant="secondary"
                    className="w-full !flex !h-10 !items-center !justify-center !gap-2 !rounded-xl !text-[0.82rem]"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    Bagikan WhatsApp
                  </PressButton>
                </a>
                {qrCodeUrl ? (
                  <a href={qrCodeUrl} download={`qr-${slug}.png`}>
                    <PressButton
                      variant="ghost"
                      className="w-full !flex !h-10 !items-center !justify-center !gap-2 !rounded-xl !text-[0.82rem]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Unduh QR PNG
                    </PressButton>
                  </a>
                ) : (
                  <PressButton
                    variant="ghost"
                    disabled
                    className="w-full !flex !h-10 !items-center !justify-center !gap-2 !rounded-xl !text-[0.82rem]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Unduh QR PNG
                  </PressButton>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-4 shadow-[0_12px_24px_rgba(21,24,18,0.04)]">
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#8d877f]">
                Bukti On-Chain
              </div>
              <div className="mt-3">
                {onChainRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-t border-[#ece7de] py-3 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <div className="text-[0.82rem] font-normal text-[#7d7870]">
                      {row.label}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 text-[0.86rem] font-bold ${row.tone ?? "text-[#20201c]"}`}
                    >
                      {row.success ? <Check className="h-3.5 w-3.5" /> : null}
                      {row.value}
                      {row.link ? (
                        <ExternalLink className="h-3.5 w-3.5" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <PressButton
                variant="ghost"
                className="mt-4 !flex !h-10 !w-full !items-center !justify-center !gap-2 !rounded-xl !text-[0.82rem]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Buka Block Explorer
              </PressButton>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

const PassportPage = () => {
  const [issuing, setIssuing] = useState(false);
  const [issueError, setIssueError] = useState(null);
  const [passportData, setPassportData] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [grsData, setGrsData] = useState(null);

  const fetchPassportStatus = async () => {
    const token = localStorage.getItem("auth_token") ?? "";
    const response = await apiFetch(`${BASE_API}/green-passports/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    return mapIssuedPassportData(json?.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token") ?? "";

    apiFetch(`${BASE_API}/evidence/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) setGrsData(json.data);
      })
      .catch(() => {});

    fetchPassportStatus()
      .then((mapped) => {
        if (mapped) setPassportData(mapped);
      })
      .catch(() => {})
      .finally(() => setStatusLoading(false));
  }, []);

  const handleIssue = async () => {
    setIssueError(null);
    setIssuing(true);
    try {
      const token = localStorage.getItem("auth_token") ?? "";
      const res = await apiFetch(`${BASE_API}/green-passports/issue`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (
        res.status === 409 &&
        String(json?.message ?? "")
          .toLowerCase()
          .includes("already active")
      ) {
        const activePassport = await fetchPassportStatus();
        if (activePassport) {
          setPassportData(activePassport);
          return;
        }
      }

      if (!res.ok) {
        throw new Error(json?.message ?? `Error ${res.status}`);
      }
      setPassportData(json.data);
    } catch (err) {
      setIssueError(err.message ?? "Gagal menerbitkan passport. Coba lagi.");
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      {statusLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-[#5f5a53]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Memeriksa status passport...</span>
          </div>
        </div>
      ) : passportData ? (
        <PassportIssuedView passportData={passportData} />
      ) : (
        <PassportSubmissionView
          onIssue={handleIssue}
          issuing={issuing}
          issueError={issueError}
          grsData={grsData}
        />
      )}
    </div>
  );
};

export default PassportPage;
