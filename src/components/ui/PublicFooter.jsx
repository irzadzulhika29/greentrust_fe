import { Link } from 'react-router-dom'
import { ShieldCheck, Leaf } from 'lucide-react'

const footerColumns = [
  {
    title: 'Produk',
    links: [
      { label: 'Beranda', href: '/', type: 'route' },
      { label: 'Jelajah UMKM', href: '/direktori', type: 'route' },
      { label: 'Untuk Investor', href: '/investor', type: 'route' },
      { label: 'Cara Kerja', href: '/cara-kerja', type: 'route' },
    ],
  },
  {
    title: 'UMKM',
    links: [
      { label: 'Daftarkan Bisnis', href: '/register', type: 'route' },
      { label: 'Evidence Vault', href: '/cara-kerja', type: 'route' },
      { label: 'GRS Engine', href: '/cara-kerja', type: 'route' },
      { label: 'Green Passport', href: '/direktori', type: 'route' },
    ],
  },
  {
    title: 'Sumber Daya',
    links: [
      { label: 'Block Explorer', href: '/direktori', type: 'route' },
      { label: 'Dokumentasi API', href: 'mailto:admin@greentrust.local?subject=Permintaan%20Dokumentasi%20API', type: 'external' },
      { label: 'FAQ', href: '/cara-kerja', type: 'route' },
      { label: 'Hubungi Admin', href: 'mailto:admin@greentrust.local?subject=Hubungi%20Admin%20GreenTrust', type: 'external' },
    ],
  },
]

const legalLinks = [
  { label: 'Kebijakan Privasi', href: 'mailto:admin@greentrust.local?subject=Kebijakan%20Privasi', type: 'external' },
  { label: 'Ketentuan', href: 'mailto:admin@greentrust.local?subject=Ketentuan%20Layanan', type: 'external' },
  { label: 'Status', href: '/direktori', type: 'route' },
]

const renderFooterLink = (item) => {
  const sharedClassName = 'text-[0.96rem] text-white/88 transition-colors duration-150 hover:text-white'

  if (item.type === 'route') {
    return (
      <Link key={item.label} to={item.href} className={sharedClassName}>
        {item.label}
      </Link>
    )
  }

  return (
    <a key={item.label} href={item.href} className={sharedClassName}>
      {item.label}
    </a>
  )
}

const PublicFooter = () => {
  return (
    <footer className="bg-[#205336] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr] lg:gap-10">
          <div className="max-w-md">
            <Link to="/" aria-label="Beranda GreenTrust Passport" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center text-white">
                <ShieldCheck className="h-7 w-7" strokeWidth={1.6} />
                <Leaf className="absolute h-3.5 w-3.5 fill-white" style={{ top: '7px', left: '7px' }} />
              </div>
              <div className="text-[1.8rem] font-semibold leading-none tracking-[-0.05em] text-white">
                GreenTrust<span className="text-white/55">Passport</span>
              </div>
            </Link>

            <p className="mt-6 text-[1.05rem] leading-9 text-white/78">
              Infrastruktur kepercayaan hijau untuk 64 juta UMKM Indonesia. Gratis, terbuka, terverifikasi blockchain.
            </p>

            <div className="mt-8 text-[0.82rem] font-semibold uppercase tracking-[0.34em] text-white/62">
              • Polygon Amoy • MVP / 2026
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="mb-6 text-[0.82rem] font-semibold uppercase tracking-[0.34em] text-white/55">
                {column.title}
              </div>
              <div className="flex flex-col gap-3">
                {column.links.map((item) => renderFooterLink(item))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/12 pt-6">
          <div className="flex flex-col gap-4 text-[0.92rem] text-white/72 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 GreenTrust Passport · IN:NOVATE CodeUp! Politeknik Astra</div>
            <div className="flex flex-wrap items-center gap-6">
              {legalLinks.map((item) => renderFooterLink(item))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter
