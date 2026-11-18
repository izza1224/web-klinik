import React, { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Home, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import TestimonialMarqueeDemo from "@/components/ui/marquee-01";

const services = [
  {
    title: "Perawatan Luka",
    desc: "Perawatan luka diabetes, pasca operasi, luka bakar, dan luka kronis menggunakan teknik modern wound care steril.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=75",
    type: "Klinik & Home Care",
  },
  {
    title: "Khitan Modern",
    desc: "Metode modern (klem/laser) minim nyeri, cepat sembuh, aman dan higienis untuk anak-anak maupun dewasa.",
    image: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8e8?w=600&q=75",
    type: "Klinik",
  },
  {
    title: "Pemasangan Infus",
    desc: "Pemberian cairan rehidrasi, terapi obat, atau multivitamin drip langsung di klinik maupun di rumah pasien.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=75",
    type: "Klinik & Home Care",
  },
  {
    title: "Pemasangan NGT",
    desc: "Pemasangan selang makan lambung dengan prosedur steril dan panduan nutrisi lengkap untuk kenyamanan pasien.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=75",
    type: "Klinik & Home Care",
  },
  {
    title: "Pemasangan Kateter",
    desc: "Pemasangan dan penggantian kateter urin dengan aseptik ketat guna mencegah risiko infeksi saluran kemih.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=75",
    type: "Klinik & Home Care",
  },
  {
    title: "Terapi Bekam",
    desc: "Terapi bekam basah/kering oleh terapis medis bersertifikat untuk melancarkan sirkulasi darah dan relaksasi otot.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=75",
    type: "Klinik & Home Care",
  },
  {
    title: "Terapi Inframerah",
    desc: "Fisioterapi infrared untuk meredakan kaku sendi, nyeri punggung, radang otot, dan mempercepat pemulihan.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=75",
    type: "Klinik",
  },
  {
    title: "Cek Lab Mini",
    desc: "Pemeriksaan gula darah sewaktu, asam urat, kolesterol total, dan hemoglobin dengan hasil cepat dalam hitungan menit.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=75",
    type: "Klinik",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const waLink = (msg: string) =>
    `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
      {/* ===== STICKY NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#beranda" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-md">
              +
            </div>
            <div>
              <span className="block font-extrabold text-xl text-blue-900 leading-tight">
                Klinik Sehat Mandiri
              </span>
              <span className="text-xs font-semibold text-teal-600 tracking-wide uppercase">
                Home Care &amp; Klinik
              </span>
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <a href="#beranda" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors">
              Beranda
            </a>
            <a href="#layanan" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors">
              Layanan
            </a>
            <a href="#tentang" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors">
              Tentang Kami
            </a>
            <a href="#galeri" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors">
              Testimoni
            </a>
            <a href="#lokasi" className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors">
              Lokasi
            </a>
          </div>

          {/* CTA WhatsApp Desktop */}
          <div className="hidden md:flex items-center">
            <a
              href={waLink("Halo Klinik Sehat Mandiri, saya ingin konsultasi layanan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 fill-current" />
              Chat WhatsApp
            </a>
          </div>

          {/* Tombol Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-700 rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
            <a href="#beranda" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 font-medium rounded-md hover:bg-slate-100">Beranda</a>
            <a href="#layanan" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 font-medium rounded-md hover:bg-slate-100">Layanan</a>
            <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 font-medium rounded-md hover:bg-slate-100">Tentang Kami</a>
            <a href="#galeri" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 font-medium rounded-md hover:bg-slate-100">Testimoni</a>
            <a href="#lokasi" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 font-medium rounded-md hover:bg-slate-100">Lokasi</a>
            <a
              href={waLink("Halo Klinik Sehat Mandiri, saya ingin konsultasi layanan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2.5 rounded-full mt-2"
            >
              <Phone className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="beranda" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
            alt="Layanan Home Care"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-teal-900/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Layanan Siaga 7 Hari Seminggu
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Layanan Medis Profesional <br />
            <span className="text-teal-300">Langsung ke Rumah Anda</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Perawat bersertifikat kami siap melakukan kunjungan home care ke rumah maupun tindakan di klinik dengan standar rumah sakit yang steril dan penuh empati.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink("Halo, saya ingin menjadwalkan kunjungan layanan Home Care / Klinik.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-full text-base shadow-xl shadow-emerald-950/30 transition-transform hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 fill-current" />
              Jadwalkan Sekarang (WA)
            </a>
            <a
              href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-semibold px-8 py-3.5 rounded-full text-base transition-colors"
            >
              Lihat Layanan
            </a>
          </div>
        </div>
      </section>

      {/* ===== FLOATING INFO BAR ===== */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-12 sm:-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Perawat ke Rumah</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Tindakan medis nyaman tanpa perlu antre di luar rumah.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Kunjungan Klinik</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Fasilitas tindakan bersih, higienis, dan peralatan modern.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Tenaga Bersertifikat</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Memiliki STR &amp; SIPP aktif dengan jam terbang tinggi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DAFTAR LAYANAN (8 KARTU) ===== */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-700 font-semibold text-xs uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full">
              Pilihan Layanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Layanan Medis Lengkap &amp; Terpercaya
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Setiap tindakan dilakukan dengan SOP rumah sakit ketat demi kenyamanan dan keselamatan pasien.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 bg-blue-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {srv.type}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{srv.desc}</p>
                  </div>
                  <a
                    href={waLink(`Halo, saya ingin tanya info dan biaya untuk layanan ${srv.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    Tanya via WA
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TENTANG KAMI ===== */}
      <section id="tentang" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Kolom Foto Perawat */}
            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
                  alt="Profil Perawat"
                  className="w-full h-[480px] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3">
                <Award className="w-10 h-10 text-blue-700" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Surat Izin Praktik</p>
                  <p className="font-bold text-slate-900 text-sm">STR &amp; SIPP Terdaftar Aktif</p>
                </div>
              </div>
            </div>

            {/* Kolom Deskripsi & Visi */}
            <div>
              <span className="text-blue-700 font-semibold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Tentang Tenaga Medis Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                Sentuhan Medis Humanis, Hangat &amp; Berpengalaman
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Kami percaya bahwa proses penyembuhan tidak hanya membutuhkan obat dan tindakan yang tepat, namun juga rasa nyaman, ketenangan batin, serta dukungan penuh bagi pasien dan keluarga.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">Lulusan Profesi Ners berpengalaman di RS rujukan</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">Sertifikasi resmi Modern Wound Care &amp; BHD</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">Protokol sterilisasi instrumen medis standar Kemenkes</span>
                </div>
              </div>

              {/* Bagian Sertifikat & STR dengan Lightbox */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Legalitas &amp; Sertifikat Keahlian (Klik untuk memperbesar)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: "Surat Tanda Registrasi", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=75" },
                    { title: "Sertifikat Wound Care", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=75" },
                    { title: "SIPP Praktik Mandiri", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=75" },
                  ].map((cert, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedCert(cert.img)}
                      className="group relative cursor-pointer rounded-xl overflow-hidden border border-slate-200 aspect-video shadow-sm"
                    >
                      <img src={cert.img} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                        <span className="text-white text-[11px] font-medium leading-tight">{cert.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BAGIAN TESTIMONI MARQUEE (REACT SHADCN COMPONENT) ===== */}
      <section id="galeri" className="py-24 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-teal-700 font-semibold text-xs uppercase tracking-widest bg-teal-100 px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Ulasan Pasien
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kepercayaan Pasien adalah Kebanggaan Kami
          </h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Ulasan nyata dari keluarga dan pasien yang telah mempercayakan tindakan home care dan kunjungan klinik bersama kami.
          </p>
        </div>

        {/* Pemasangan Komponen Marquee Animasi di sini */}
        <TestimonialMarqueeDemo />
      </section>

      {/* ===== LOKASI & KONTAK ===== */}
      <section id="lokasi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Info Lokasi */}
            <div className="space-y-6">
              <div>
                <span className="text-blue-700 font-semibold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  Lokasi &amp; Jam Buka
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                  Kunjungi Klinik Kami atau Jadwalkan Home Care
                </h2>
              </div>

              <div className="space-y-4 text-slate-600">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Alamat Lengkap</h4>
                    <p className="text-sm mt-0.5">Jl. Kesehatan No. 123, Kel. Sejahtera, Kec. Makmur, Kota Sehat 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Jam Pelayanan</h4>
                    <p className="text-sm mt-0.5">Klinik: Senin - Sabtu (08.00 - 20.00 WIB)</p>
                    <p className="text-sm">Home Care: Siaga setiap hari sesuai reservasi WhatsApp</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Buka Petunjuk Arah di Maps <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Google Maps Embed Interaktif */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[380px]">
              <iframe
                title="Google Maps Klinik"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.59609823898!2d106.7765!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p className="text-slate-200 font-semibold text-base mb-2">Klinik Sehat Mandiri &amp; Home Care</p>
          <p className="max-w-md mx-auto mb-6">Mitra terpercaya keluarga Anda dalam menghadirkan kenyamanan layanan medis profesional langsung di rumah.</p>
          <p className="text-xs text-slate-500">© 2026 Klinik Sehat Mandiri. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON (POJOK KANAN BAWAH) ===== */}
      <a
        href={waLink("Halo Klinik Sehat Mandiri, saya ingin konsultasi layanan.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-full shadow-2xl shadow-emerald-900/50 hover:scale-105 transition-all"
      >
        <Phone className="w-5 h-5 fill-current animate-bounce" />
        <span>Chat WhatsApp</span>
      </a>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-3xl w-full max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl relative">
            <img src={selectedCert} alt="Sertifikat" className="w-full h-full object-contain max-h-[80vh] rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
