import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  findEvidenceIndicatorBySlug,
  getIndicatorHref,
} from "@/features/umkm/data/evidenceVaultData";
import { apiFetch } from "@/lib/utils";

const N8N_URL = import.meta.env.VITE_N8N_URL;
const BASE_API = import.meta.env.VITE_BASE_API;

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileExt = (name) => name.split(".").pop().toUpperCase().slice(0, 4);

const ACCEPTED_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];
const MAX_BYTES = 10 * 1024 * 1024;

const UploadDocumentModal = ({
  indicator,
  requirementId,
  requirementName,
  onClose,
  onSuccess,
}) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const addFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter((f) => {
      if (!ACCEPTED_MIME.includes(f.type)) return false;
      if (f.size > MAX_BYTES) return false;
      return true;
    });
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...valid.filter((f) => !existing.has(f.name + f.size))];
    });
  }, []);

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileInput = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;

    setSubmitState("loading");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("auth_token") ?? "";
      const requests = files.map((file) => {
        const formData = new FormData();
        formData.append("document", file);
        formData.append("requirement_id", requirementId);

        return apiFetch(`${N8N_URL}/evidence-docs`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      });

      const results = await Promise.all(requests);
      const failed = results.filter((r) => !r.ok);

      if (failed.length > 0) {
        throw new Error(
          `${failed.length} file gagal dikirim (status ${failed[0].status})`,
        );
      }

      setSubmitState("success");
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 1500);
    } catch (err) {
      setSubmitState("error");
      setErrorMsg(err.message ?? "Terjadi kesalahan saat mengirim file.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1c19]/45 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className="w-full max-w-[920px] rounded-[24px] border border-[#ddd6ca] bg-white shadow-[0_28px_60px_rgba(17,17,15,0.18)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e7e1d8] px-6 py-5">
          <div>
            <div
              id="upload-modal-title"
              className="text-[0.88rem] font-bold uppercase text-[#4f8b5e]"
            >
              Unggah Dokumen
            </div>
            <div className="mt-2 text-[1.35rem] font-bold leading-none tracking-[-0.05em] text-[#181816]">
              {indicator.name}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[18px] bg-[#f7f4ee] text-[#6d675f] transition hover:bg-[#efe9df] hover:text-[#20201c]"
            aria-label="Tutup modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 px-6 py-5">
          {/* Drop zone */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex min-h-[158px] w-full flex-col items-center justify-center rounded-[22px] border-2 border-dashed px-5 text-center transition ${
              isDragging
                ? "border-[#236041] bg-[#eef6f0]"
                : "border-[#d9e2da] bg-[#f8f5ef] hover:border-[#236041] hover:bg-[#f2f8f3]"
            }`}
          >
            <div className="text-[2.2rem]" aria-hidden="true">
              📂
            </div>
            <div className="mt-3 text-[1.2rem] font-bold leading-tight tracking-[-0.05em] text-[#20201c]">
              Tarik file ke sini, atau{" "}
              <span className="text-[#236041]">jelajah dari komputer</span>
            </div>
            <div className="mt-2 text-[0.82rem] font-semibold uppercase text-[#8d877f]">
              PDF • JPG • PNG • maks 10 MB per file
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="sr-only"
            onChange={handleFileInput}
            aria-label="Pilih file"
          />

          {/* Requirement info */}
          <div className="rounded-[14px] bg-[#eef6f0] px-3 py-2 text-[0.82rem] font-semibold leading-5 text-[#2d6644]">
            Dokumen untuk: <span className="font-bold">{requirementName}</span>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={file.name + file.size}
                  className="rounded-[18px] border border-[#ddd6ca] bg-white px-4 py-3 shadow-[0_12px_24px_rgba(21,24,18,0.03)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#e7e1d8] bg-[#fbfaf7] text-[0.72rem] font-bold text-[#8a857d]">
                        {getFileExt(file.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[0.95rem] font-bold leading-tight text-[#20201c]">
                          {file.name}
                        </div>
                        <div className="mt-0.5 text-[0.8rem] font-semibold text-[#8a857d]">
                          {formatBytes(file.size)}
                        </div>
                      </div>
                    </div>

                    {submitState === "success" ? (
                      <div className="rounded-full border border-[#c8dfca] bg-[#dcebdc] px-3 py-1.5 text-[0.82rem] font-bold text-[#4f8b5e]">
                        ✓ terkirim
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={submitState === "loading"}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#8a857d] transition hover:bg-[#f4f1ea] hover:text-[#20201c] disabled:opacity-40"
                        aria-label={`Hapus ${file.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error banner */}
          {submitState === "error" && (
            <div className="flex items-start gap-3 rounded-[16px] border border-[#f5cfc9] bg-[#fff4f2] px-4 py-3 text-[#8b3a2e]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-[0.88rem] font-normal leading-5">{errorMsg}</p>
            </div>
          )}

          {/* Success banner */}
          {submitState === "success" && (
            <div className="flex items-start gap-3 rounded-[16px] border border-[#c8dfca] bg-[#eef6f0] px-4 py-3 text-[#2d6644]">
              <Check className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-[0.88rem] font-normal leading-5">
                File berhasil dikirim ke pipeline AI. Pemrosesan berjalan di
                latar belakang.
              </p>
            </div>
          )}

          {/* Info banner — only when idle/error */}
          {submitState !== "success" && (
            <div className="flex items-start gap-3 rounded-[16px] border border-[#cfe0f0] bg-[#eef6ff] px-4 py-3 text-[#4b5d6f]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-[0.88rem] font-normal leading-5">
                Anda bisa menutup jendela ini — pemrosesan berjalan di latar
                belakang. Notifikasi muncul saat semua file siap direview.
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse justify-end gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-[16px] border border-[#ddd6ca] bg-white px-7 text-[0.95rem] font-bold text-[#20201c] transition hover:bg-[#fbfaf7]"
            >
              Tutup
            </button>

            {submitState === "success" ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#236041] bg-[#236041] px-7 text-[0.95rem] font-bold text-white transition hover:bg-[#1a4d31]"
              >
                Selesai
                <Check className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={files.length === 0 || submitState === "loading"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] border border-[#20201c] bg-[#20201c] px-7 text-[0.95rem] font-bold text-white transition hover:bg-[#11110f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitState === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EvidenceIndicatorDetailPage = () => {
  const { indicatorCode } = useParams();
  const indicator = findEvidenceIndicatorBySlug(indicatorCode);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [nextRecommendations, setNextRecommendations] = useState([]);

  useEffect(() => {
    if (!indicator) return;
    const token = localStorage.getItem("auth_token") ?? "";

    apiFetch(`${BASE_API}/evidence/categories/${indicator.code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) setCategoryDetail(json.data);
      })
      .catch(() => {})
      .finally(() => setLoadingDetail(false));

    apiFetch(`${BASE_API}/evidence/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        const recs = json?.data?.next_recommendations ?? [];
        setNextRecommendations(recs.filter((r) => r.code !== indicator.code).slice(0, 3));
      })
      .catch(() => {});
  }, [indicator]);

  if (!indicator) {
    return <Navigate to="/umkm/evidence" replace />;
  }

  const refreshData = () => {
    const token = localStorage.getItem("auth_token") ?? "";
    setLoadingDetail(true);
    apiFetch(`${BASE_API}/evidence/categories/${indicator.code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) setCategoryDetail(json.data);
      })
      .catch(() => {})
      .finally(() => setLoadingDetail(false));
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#20201c]">
      <header>
        <div className="px-6 py-5 lg:px-12">
          <div className="mb-5">
            <Link
              to="/umkm/evidence"
              className="inline-flex items-center gap-2 text-[0.86rem] font-bold text-[#5f5a53] transition hover:text-[#20201c]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Evidence Vault
            </Link>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="m-0 !text-3xl leading-none tracking-[-0.06em] text-[#181816]">
                Indikator {indicator.name}
              </h1>
              <p className="mt-3 text-[0.98rem] font-normal leading-6 text-[#5f5a53]">
                {indicator.summary}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-7 lg:px-12">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
          <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[0.68rem] font-semibold uppercase text-[#8d877f]">
                  Daftar Dokumen Yang Dibutuhkan
                </div>
                <div className="mt-2 text-[1.95rem] leading-none tracking-[-0.05em] text-[#181816]">
                  {loadingDetail
                    ? "—"
                    : `${categoryDetail?.category?.fulfilled_count ?? 0} dari ${categoryDetail?.category?.required_count ?? 0} terpenuhi`}
                </div>
              </div>

              <div
                className="grid h-[81px] w-[81px] place-items-center rounded-full border-[6px] bg-white text-lg font-bold"
                style={{ borderColor: indicator.color, color: "#181816" }}
              >
                {loadingDetail ? "—" : (categoryDetail?.category?.score ?? 0)}
              </div>
            </div>

            <div className="space-y-1">
              {loadingDetail ? (
                <div className="flex items-center justify-center gap-2 py-8 text-[0.88rem] text-[#8d877f]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memuat...
                </div>
              ) : (
                (categoryDetail?.requirements ?? []).map((req) => {
                  const fulfilled = (categoryDetail?.documents ?? []).some(
                    (d) =>
                      d.requirement_id === req.requirement_id &&
                      d.status !== "rejected",
                  );
                  return (
                    <div
                      key={req.requirement_id}
                      className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                            fulfilled
                              ? "bg-[#236041] text-white"
                              : "bg-[#f4f1ea] text-[#8d877f]"
                          }`}
                        >
                          {fulfilled ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[1rem] font-bold leading-tight text-[#20201c]">
                            {req.name}
                          </div>
                          <div className="mt-1 text-[0.9rem] font-normal text-[#8a857d]">
                            {req.description}
                          </div>
                        </div>
                      </div>

                      {fulfilled ? (
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#236041] text-white">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRequirement({
                              id: req.requirement_id,
                              name: req.name,
                            });
                            setIsUploadModalOpen(true);
                          }}
                          className="inline-flex shrink-0 items-center gap-2 text-[0.95rem] font-bold transition"
                          style={{ color: indicator.color }}
                        >
                          Unggah
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="rounded-[18px]">
            <div className="space-y-6">
              <section className="rounded-[18px] border border-[#ddd6ca] bg-white p-6 shadow-[0_16px_34px_rgba(21,24,18,0.04)]">
                <div className="text-[0.68rem] font-semibold uppercase text-[#8d877f]">
                  Kategori Prioritas Berikutnya
                </div>

                <div className="mt-4 space-y-1">
                  {nextRecommendations.length === 0 ? (
                    <div className="py-4 text-center text-sm text-[#8d877f]">Semua kategori sudah lengkap.</div>
                  ) : nextRecommendations.map((rec) => (
                    <Link
                      key={rec.category_id}
                      to={getIndicatorHref(rec.code.toLowerCase())}
                      className="flex items-center justify-between gap-4 border-t border-[#ece7de] py-4 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[0.95rem] font-bold"
                          style={{ backgroundColor: '#f0ece4', color: '#5f5a53' }}
                        >
                          {rec.code}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[1rem] font-bold leading-tight text-[#20201c]">
                            {rec.name}
                          </div>
                          <div className="mt-1 text-[0.86rem] font-normal text-[#8a857d]">
                            {rec.reason}
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <div className="text-[0.96rem] font-bold text-[#236041]">
                          +{rec.potential_grs_gain}
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#7d7870]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>

      {isUploadModalOpen && selectedRequirement ? (
        <UploadDocumentModal
          indicator={indicator}
          requirementId={selectedRequirement.id}
          requirementName={selectedRequirement.name}
          onClose={() => {
            setIsUploadModalOpen(false);
            setSelectedRequirement(null);
          }}
          onSuccess={refreshData}
        />
      ) : null}
    </div>
  );
};

export default EvidenceIndicatorDetailPage;
