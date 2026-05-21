import { SendHorizonal, Inbox, CheckCheck, XCircle, FileText } from 'lucide-react'

export const TABS = [
  { key: 'draft', label: 'Draft', icon: FileText },
  { key: 'sent', label: 'Dikirim', icon: SendHorizonal },
  { key: 'incoming', label: 'Permintaan UMKM', icon: Inbox },
  { key: 'approved', label: 'Disetujui', icon: CheckCheck },
  { key: 'rejected', label: 'Ditolak', icon: XCircle },
]

export const REJECT_CATEGORIES = [
  'Tidak butuh saat ini',
  'Tiket terlalu besar',
  'Tiket terlalu kecil',
  'Tenor tidak cocok',
  'Sudah ada mitra',
  'Lainnya',
]

export const STATUS_STYLES = {
  'Menunggu Anda': 'bg-[#fff4d6] text-[#c47739]',
  'Sedang Ditinjau': 'bg-[#fff4d6] text-[#c47739]',
  Disetujui: 'bg-[#e8f0eb] text-[#205336]',
  Ditolak: 'bg-[#fde8e3] text-[#934f42]',
}

export const TYPE_STYLES = {
  Pendanaan: 'bg-[#eaf2fb] text-[#336699]',
  Pengadaan: 'bg-[#fff0e3] text-[#c57f44]',
  Hibah: 'bg-[#f1ebfb] text-[#7b65a9]',
  Pinjaman: 'bg-[#eaf6ee] text-[#205336]',
}
