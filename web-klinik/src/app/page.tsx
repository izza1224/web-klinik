"use client";
import { useState } from "react";
import {
  Phone, MapPin, Clock, ShieldCheck, Building2,
  Home as HomeIcon, Award, CheckCircle2, ExternalLink, Menu, X, Sparkles
} from "lucide-react";
import TestimonialMarquee from "@/components/ui/testimonial-marquee";

const WA_NUMBER = "6281234567890";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const services = [
  {
    title: "Perawatan Luka",
    desc: "Perawatan luka diabetes, pasca operasi, luka bakar, dan kronis menggunakan teknik modern wound care steril.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=75",
    badge: "Klinik & Home Care",
  },
  {
    title: "Khitan Modern",
    desc: "Metode modern (klem/laser), minim nyeri, cepat sembuh, dan aman untuk anak-anak maupun dewasa.",
    image: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8e8?w=600&q=75",
    badge: "Klinik",
  },
  {
    title: "Pemasangan Infus",
    desc: "Rehidrasi, vitamin drip, atau terapi obat intravena, langsung di klinik maupun home visit.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=75",
    badge: "Klinik & Home Care",
  },
  {
    title: "Pemasangan NGT",
    desc: "Pemasangan selang lambung dengan prosedur aseptik ketat dan panduan nutrisi lengkap untuk pasien.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=75",
    badge: "Klinik & Home Care",
  },
  {
    title: "Pemasangan Kateter",
    desc: "Pemasangan dan penggantian kateter urin dengan teknik steril untuk mencegah risiko infeksi.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=75",
    badge: "Klinik & Home Care",
  },
  {
    title: "Terapi Bekam",
    desc: "Bekam basah/kering oleh terapis bersertifikat untuk melancarkan peredaran darah dan relaksasi.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=75",
    badge: "Klinik & Home Care",
  },
  {
    title: "Terapi Inframerah",
    desc: "Fisioterapi sinar infrared untuk meredakan nyeri sendi, kaku otot, dan mempercepat pemulihan.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=75",
    badge: "Klinik",
  },
  {
    title: "Cek Lab Mini",
    desc: "Gula darah, kolesterol, asam urat, hemoglobin – hasil cepat dalam hitungan menit, harga terjangkau.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=75",
    badge: "Klinik",
  },
];

const certs = [
  { title: "Surat Tanda Registrasi (STR)", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80" },
  { title: "Sertifikat Wound Care", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80" },
  { title: "SIPP Praktik Mandiri", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 bg-blue-700 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-md select-none">+</div>
            <div className="leading-tight">
              <span className="block font-extrabold text-[17px] text-blue-900">Klinik Sehat Mandiri</span>
              <span className="block text-[11px] font-semibold text-teal-600 uppercase tracking-wider">Home Care &amp; Klinik</span>
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {["beranda","layanan","tentang","galeri","lokasi"].map(id => (
              <a key={id} href={`#${id}`}
                className="px-4 py-2 text-[15px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors capitalize">
                {id === "galeri" ? "Testimoni" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 shrink-0">
            <Phone className="w-4 h-4 fill-current" />
            Chat WhatsApp
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-700 rounded-lg transition-colors">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1 shadow-lg">
            {["beranda","layanan","tentang","galeri","lokasi"].map(id => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-50 capitalize">
                {id === "galeri" ? "Testimoni" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-2 bg-emerald-600 text-white font-semibold py-3 rounded-full">
              <Phone className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="beranda" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
            alt="Hero" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/85 to-teal-800/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-28 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Layanan Siaga 7 Hari Seminggu
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Layanan Medis Profesional<br />
            <span className="text-teal-300">Langsung ke Rumah Anda</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Perawat bersertifikat kami siap melakukan home care ke rumah maupun tindakan di klinik — steril, aman, dan penuh empati.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={waLink("Halo, saya ingin menjadwalkan home care / kunjungan klinik.")} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full text-base shadow-xl transition-all hover:-translate-y-0.5">
              <Phone className="w-5 h-5 fill-current" />
              Jadwalkan Sekarang (WA)
            </a>
            <a href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors">
              Lihat Layanan
            </a>
          </div>

          {/* Statistik */}
          <div className="flex items-center justify-center gap-10 mt-12 flex-wrap">
            {[["500+","Pasien Dilayani"],["5 ★","Rating Kepuasan"],["3 Thn","Pengalaman"]].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <span className="block text-3xl font-black text-white">{val}</span>
                <span className="text-xs text-slate-300 font-medium mt-0.5 block">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLOATING INFO BAR ===== */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-10 sm:-mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <HomeIcon className="w-6 h-6"/>, color:"bg-blue-50 text-blue-700", title:"Perawat ke Rumah", desc:"Tindakan medis nyaman tanpa perlu antre di luar." },
            { icon: <Building2 className="w-6 h-6"/>, color:"bg-teal-50 text-teal-700", title:"Kunjungan Klinik", desc:"Fasilitas bersih, higienis dan peralatan modern." },
            { icon: <ShieldCheck className="w-6 h-6"/>, color:"bg-indigo-50 text-indigo-700", title:"Tenaga Bersertifikat", desc:"STR & SIPP aktif, terlatih dan berpengalaman." },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex items-center gap-4">
              <div className={`w-13 h-13 p-3 rounded-xl flex-shrink-0 ${color}`}>{icon}</div>
              <div>
                <h3 className="font-bold text-slate-900 text-[15px]">{title}</h3>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LAYANAN ===== */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-teal-100 text-teal-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">Pilihan Layanan</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">Layanan Medis Lengkap &amp; Terpercaya</h2>
            <p className="text-slate-600 mt-3 text-base">Setiap tindakan mengikuti SOP ketat demi keselamatan dan kenyamanan pasien.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <span className="absolute top-2.5 right-2.5 bg-blue-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">{s.badge}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">{s.desc}</p>
                  <a href={waLink(`Halo, saya ingin tanya info dan biaya untuk layanan ${s.title}.`)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors">
                    <Phone className="w-3.5 h-3.5 fill-current" /> Tanya via WA
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TENTANG KAMI ===== */}
      <section id="tentang" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Foto */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl max-h-[500px]">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
                  alt="Perawat" className="w-full h-[480px] object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-1 sm:right-6 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <Award className="w-9 h-9 text-blue-700 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Legalitas Resmi</p>
                  <p className="font-bold text-slate-900 text-sm">STR &amp; SIPP Aktif</p>
                </div>
              </div>
            </div>

            {/* Teks */}
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">Tentang Tenaga Medis</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-5 tracking-tight">
                Sentuhan Medis Humanis,<br />Hangat &amp; Berpengalaman
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-[15px]">
                Halo, saya <strong>Ns. Sari Dewi, S.Kep</strong> — perawat dengan pengalaman lebih dari 8 tahun di keperawatan klinis dan komunitas. Klinik Sehat Mandiri didirikan untuk menghadirkan layanan medis berkualitas tinggi yang terasa hangat dan personal.
              </p>

              <div className="space-y-3 mb-7">
                {[
                  "Lulusan Profesi Ners dari universitas terkemuka",
                  "Tersertifikasi Modern Wound Care, BHD & Phlebotomy",
                  "Pengalaman di RS rujukan provinsi selama 5+ tahun",
                  "Protokol sterilisasi standar Kemenkes RI",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-teal-400 pl-4 py-1 bg-teal-50 rounded-r-xl text-slate-700 italic text-sm leading-relaxed mb-7">
                &ldquo;Setiap pasien adalah prioritas. Kami hadir bukan hanya untuk mengobati, tetapi menemani perjalanan kesembuhan Anda dengan penuh empati.&rdquo;
              </blockquote>

              {/* Galeri Sertifikat */}
              <div className="border-t border-slate-200 pt-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Legalitas &amp; Sertifikat — Klik untuk memperbesar
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {certs.map((c) => (
                    <div key={c.title} onClick={() => setLightbox(c.img)}
                      className="group relative cursor-pointer rounded-xl overflow-hidden aspect-video border border-slate-200 shadow-sm hover:shadow-md transition-all">
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1.5">
                        <span className="text-white text-[10px] font-semibold text-center leading-snug">{c.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI MARQUEE ===== */}
      <section id="galeri" className="py-24 bg-slate-50 overflow-hidden border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Ulasan Pasien
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kepercayaan Pasien adalah Kebanggaan Kami
          </h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Ulasan nyata dari keluarga yang telah mempercayakan layanan home care dan kunjungan klinik bersama kami.
          </p>
        </div>
        {/* Komponen Marquee Animasi (shadcn/ui) */}
        <TestimonialMarquee />
      </section>

      {/* ===== LOKASI ===== */}
      <section id="lokasi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">Lokasi &amp; Jam Buka</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Kunjungi Klinik Kami atau Jadwalkan Home Care
                </h2>
              </div>
              <div className="space-y-5">
                {[
                  { icon: <MapPin className="w-5 h-5"/>, color:"bg-blue-50 text-blue-700", title:"Alamat Lengkap", content:"Jl. Kesehatan No. 123, Kel. Sejahtera, Kec. Makmur, Kota Sehat 12345" },
                  { icon: <Clock className="w-5 h-5"/>, color:"bg-teal-50 text-teal-700", title:"Jam Pelayanan", content:"Klinik: Senin–Sabtu 08.00–20.00 WIB\nHome Care: Siaga setiap hari sesuai reservasi WA" },
                  { icon: <Phone className="w-5 h-5"/>, color:"bg-indigo-50 text-indigo-700", title:"WhatsApp", content:"+62 812-3456-7890" },
                ].map(({icon, color, title, content}) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl flex-shrink-0 ${color}`}>{icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
                      <p className="text-slate-600 text-sm mt-0.5 whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors">
                Buka Petunjuk Arah di Maps <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[400px]">
              <iframe
                title="Lokasi Klinik"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.59609823898!2d106.7765!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-xl">+</div>
            <span className="text-white font-bold text-lg">Klinik Sehat Mandiri</span>
          </div>
          <p className="text-slate-500 max-w-sm mx-auto mb-6 text-xs">Mitra terpercaya keluarga Anda dalam menghadirkan layanan medis profesional yang hangat dan humanis.</p>
          <p className="text-xs text-slate-600">© 2026 Klinik Sehat Mandiri. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      {/* ===== FLOATING WA BUTTON ===== */}
      <a href={waLink("Halo Klinik Sehat Mandiri, saya ingin konsultasi layanan.")} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-900/50 hover:scale-105 transition-all">
        <Phone className="w-5 h-5 fill-current" />
        Chat WA
      </a>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer">
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
            <img src={lightbox} alt="Sertifikat" className="w-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
