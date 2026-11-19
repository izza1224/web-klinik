"use client";
import { useState, useEffect, useRef } from "react";
import {
  Phone, MapPin, Clock, ShieldCheck, Building2,
  Home as HomeIcon, Award, CheckCircle2, ExternalLink,
  Menu, X, Sparkles, Star, ChevronRight, Activity, ArrowRight,
  HeartHandshake, Stethoscope
} from "lucide-react";
import TestimonialMarquee from "@/components/ui/testimonial-marquee";

const WA_NUMBER = "6281234567890";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ---- Animated Counter Hook (smooth 0 -> target) ---- */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);

    // Trigger fallback when visible
    const timer = setTimeout(() => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setStarted(true);
        }
      }
    }, 300);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

const services = [
  { title: "Perawatan Luka", desc: "Perawatan luka diabetes, pasca operasi, luka bakar, dan kronis menggunakan teknik modern wound care steril.", image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=75", badge: "Klinik & Home Care" },
  { title: "Khitan Modern", desc: "Metode modern (klem/laser), minim nyeri, cepat sembuh, aman untuk anak-anak maupun dewasa.", image: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8e8?w=600&q=75", badge: "Klinik" },
  { title: "Pemasangan Infus", desc: "Rehidrasi, vitamin drip, atau terapi obat intravena, langsung di klinik maupun home visit.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=75", badge: "Klinik & Home Care" },
  { title: "Pemasangan NGT", desc: "Pemasangan selang lambung dengan prosedur aseptik ketat dan panduan nutrisi lengkap.", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=75", badge: "Klinik & Home Care" },
  { title: "Pemasangan Kateter", desc: "Pemasangan dan penggantian kateter urin dengan teknik steril untuk mencegah risiko infeksi.", image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=75", badge: "Klinik & Home Care" },
  { title: "Terapi Bekam", desc: "Bekam basah/kering oleh terapis bersertifikat untuk melancarkan peredaran darah dan relaksasi.", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=75", badge: "Klinik & Home Care" },
  { title: "Terapi Inframerah", desc: "Fisioterapi sinar infrared untuk meredakan nyeri sendi, kaku otot, dan mempercepat pemulihan.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=75", badge: "Klinik" },
  { title: "Cek Lab Mini", desc: "Gula darah, kolesterol, asam urat, hemoglobin – hasil cepat dalam hitungan menit, harga terjangkau.", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=75", badge: "Klinik" },
];

const certs = [
  { title: "Surat Tanda Registrasi (STR)", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80" },
  { title: "Sertifikat Wound Care", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80" },
  { title: "SIPP Praktik Mandiri", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
];

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#layanan", label: "Layanan Medis" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#galeri", label: "Testimoni" },
  { href: "#lokasi", label: "Lokasi & Kontak" },
];

export default function PageHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const statPatients = useCountUp(500, 2000);
  const statYears = useCountUp(3, 1600);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["beranda", "layanan", "tentang", "galeri", "lokasi"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-teal-500 selection:text-white">

      {/* ============================================================
          NAVBAR — STANDAR RUMAH SAKIT INTERNASIONAL
          Satu desain mewah, konsisten, berwibawa, dan modern
          ============================================================ */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-7xl bg-slate-950/85 hover:bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/40 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300">
          
          {/* Logo Brand: Medical Shield & Hospital Typography */}
          <a href="#beranda" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950/40 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-black text-2xl leading-none select-none drop-shadow">+</span>
              </div>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="block font-black text-[16px] sm:text-[17px] text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                  Klinik Sehat Mandiri
                </span>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                  Terakreditasi
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] font-medium text-teal-300/90 tracking-wider">
                Layanan Medis &amp; Home Care Resmi Kemenkes
              </span>
            </div>
          </a>

          {/* Navigation Links — Clean & Modern */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1 gap-1 shadow-inner">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = activeNav === href.replace("#", "");
              return (
                <a key={href} href={href}
                  className={`px-4 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-sm shadow-black/20"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}>
                  {label}
                </a>
              );
            })}
          </div>

          {/* Right Action: Emergency Hotline & WhatsApp Appointment */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Hotline Pill (Desktop) */}
            <a href="tel:081234567890" className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-full bg-white/5 border border-white/10 transition-colors">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>0812-3456-7890</span>
            </a>

            {/* Main WhatsApp Button */}
            <a href={waLink("Halo Klinik Sehat Mandiri, saya ingin reservasi layanan medis / home care.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-emerald-500/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>Konsultasi WA</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 bg-slate-950/95 backdrop-blur-2xl rounded-2xl border border-white/15 shadow-2xl p-4 text-white">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-slate-200 font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-colors">
              {label} <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 mt-2 space-y-2">
            <a href={waLink("Halo Klinik Sehat Mandiri, saya ingin reservasi layanan medis.")} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30">
              <Phone className="w-4 h-4" /> Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* ============================================================
          HERO SECTION — STANDAR RUMAH SAKIT INTERNASIONAL (100vh)
          Background blur halus (bokeh medis) + Teks presisi di tengah layar
          ============================================================ */}
      <section id="beranda" className="relative h-screen min-h-[680px] flex flex-col justify-between overflow-hidden">

        {/* Background Layers — Foto medis dengan BLUR HALUS (blur-sm / ~2.5px) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=85"
            alt="Klinik Sehat Mandiri Medical Care"
            className="w-full h-full object-cover object-center scale-105 filter blur-[2.5px] brightness-[0.88] contrast-[1.08]"
          />
          {/* Medical sapphire lighting & contrast overlays */}
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-blue-950/65 to-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-transparent to-slate-950/90" />
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Spacer Atas */}
        <div className="h-24 sm:h-28" />

        {/* Hero Content — PAS DI TENGAH LAYAR (CENTERED) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center my-auto">

          {/* Hospital Accreditation & Trust Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-950/70 border border-cyan-400/35 backdrop-blur-md text-xs sm:text-sm font-semibold text-cyan-200 mb-6 shadow-xl shadow-black/30">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Standar Medis SOP Rumah Sakit • STR &amp; SIPP Kemenkes RI Aktif</span>
          </div>

          {/* Headline Utama — Berwibawa & Elegan */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.08] mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            <span className="block text-white">Layanan Medis Profesional</span>
            <span className="block bg-gradient-to-r from-teal-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
              &amp; Home Care Terpercaya
            </span>
          </h1>

          {/* Deskripsi Standar RS Internasional */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-100/95 max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Dapatkan perawatan medis berstandar rumah sakit tanpa perlu antre di luar. Ditangani langsung oleh perawat bersertifikasi resmi untuk perawatan luka, infus, kateter, hingga pemulihan pasca rawat inap.
          </p>

          {/* Tombol Aksi Utama */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
            <a href={waLink("Halo, saya ingin menjadwalkan home care / tindakan klinik.")}
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-full text-base shadow-2xl shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-emerald-500/60 ring-1 ring-emerald-300/30">
              <Phone className="w-5 h-5 fill-current flex-shrink-0" />
              <span>Jadwalkan Layanan Medis (WA)</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-full text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-1 shadow-lg shadow-black/20">
              <span>Lihat 8 Pilihan Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Trust Highlights (4 Pilar Standar RS) */}
          <div className="hidden sm:flex items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-200/90 pt-2 border-t border-white/10 max-w-3xl">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Steril Standar SOP RS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Perawat STR &amp; SIPP Aktif</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Home Visit 7 Hari Seminggu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Konsultasi Awal Cepat</span>
            </div>
          </div>

        </div>

        {/* Indikator Scroll di bagian bawah */}
        <div className="pb-8 relative z-10 flex flex-col items-center justify-center text-white/75 text-xs">
          <span className="tracking-widest uppercase font-semibold mb-1.5 drop-shadow">Scroll ke bawah</span>
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex items-start justify-center p-1 shadow-md">
            <div className="w-1.5 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION STATISTIK & RATING (Tampil setelah di-scroll)
          Ukurannya proporsional, rapi, dan simetris di tengah
          ============================================================ */}
      <section className="relative z-20 py-12 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-slate-50 to-blue-50/40 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-slate-200 items-center">
              
              {/* Stat 1: Pasien Dilayani */}
              <div ref={statPatients.ref} className="flex flex-col items-center justify-center text-center px-4">
                <span className="text-3xl sm:text-4xl font-black text-blue-950 tabular-nums tracking-tight">
                  {statPatients.count}+
                </span>
                <span className="text-sm font-bold text-slate-800 mt-1">Pasien Dilayani</span>
                <span className="text-xs text-slate-500 mt-0.5">Tindakan Medis di Rumah &amp; Klinik</span>
              </div>

              {/* Stat 2: Rating Kepuasan */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">5.0 / 5.0 Rating Kepuasan</span>
                <span className="text-xs text-slate-500 mt-0.5">Ulasan Nyata Pasien &amp; Keluarga</span>
              </div>

              {/* Stat 3: Pengalaman */}
              <div ref={statYears.ref} className="flex flex-col items-center justify-center text-center px-4">
                <span className="text-3xl sm:text-4xl font-black text-blue-950 tabular-nums tracking-tight">
                  {statYears.count}+ Tahun
                </span>
                <span className="text-sm font-bold text-slate-800 mt-1">Pengalaman Medis</span>
                <span className="text-xs text-slate-500 mt-0.5">STR &amp; SIPP Resmi Terdaftar</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3 KEUNGGULAN SECTION — Bersih, Terang, Elegan, dan Nyaman
          ============================================================ */}
      <section className="relative z-20 py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-2">
              Keunggulan Layanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mengapa Memilih Klinik Sehat Mandiri?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <HomeIcon className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                Tersedia 7 Hari
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Perawat ke Rumah</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Tindakan medis nyaman tanpa perlu antre atau keluar rumah. Perawat datang tepat waktu dengan peralatan steril lengkap sesuai SOP.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                Fasilitas Higienis
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Kunjungan Klinik</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Fasilitas klinik bersih, nyaman, dan higienis dengan peralatan modern standar rumah sakit untuk tindakan cepat dan aman.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="inline-block px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
                Terdaftar Resmi
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Tenaga Bersertifikat</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Semua tindakan ditangani perawat profesional dengan STR dan SIPP aktif dari Kemenkes RI, bersertifikat wound care modern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          LAYANAN
          ============================================================ */}
      <section id="layanan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-teal-100 text-teal-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">Pilihan Layanan</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Layanan Medis Lengkap &amp; Terpercaya</h2>
            <p className="text-slate-500 mt-3 text-base">Setiap tindakan mengikuti SOP ketat demi keselamatan dan kenyamanan pasien.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">{s.badge}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{s.desc}</p>
                  <a href={waLink(`Halo, saya ingin tanya info dan biaya untuk layanan ${s.title}.`)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-500 hover:text-white border border-emerald-200 transition-all">
                    <Phone className="w-3.5 h-3.5" /> Tanya via WA
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TENTANG KAMI
          ============================================================ */}
      <section id="tentang" className="py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80" alt="Perawat" className="w-full h-[480px] object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 right-6 bg-white rounded-2xl px-4 py-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <Award className="w-9 h-9 text-blue-700 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">Legalitas Resmi</p>
                  <p className="font-bold text-slate-900 text-sm">STR &amp; SIPP Aktif</p>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">Tentang Tenaga Medis</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">Sentuhan Medis Humanis,<br />Hangat &amp; Berpengalaman</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Halo, saya <strong>Ns. Sari Dewi, S.Kep</strong> — perawat berpengalaman lebih dari 8 tahun di keperawatan klinis dan komunitas. Klinik Sehat Mandiri didirikan untuk menghadirkan layanan medis berkualitas yang terasa hangat dan personal.</p>
              <div className="space-y-3 mb-7">
                {["Lulusan Profesi Ners dari universitas terkemuka", "Tersertifikasi Modern Wound Care, BHD & Phlebotomy", "Pengalaman di RS rujukan provinsi selama 5+ tahun", "Protokol sterilisasi standar Kemenkes RI"].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-teal-400 pl-4 py-1 bg-teal-50 rounded-r-xl text-slate-700 italic text-sm leading-relaxed mb-7">
                &ldquo;Setiap pasien adalah prioritas. Kami hadir bukan hanya untuk mengobati, tetapi menemani perjalanan kesembuhan Anda dengan penuh empati.&rdquo;
              </blockquote>
              <div className="border-t border-slate-200 pt-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Legalitas &amp; Sertifikat — Klik untuk memperbesar</h4>
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

      {/* ============================================================ TESTIMONI ============================================================ */}
      <section id="galeri" className="py-24 bg-white overflow-hidden border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3"><Sparkles className="w-3.5 h-3.5" /> Ulasan Pasien</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Kepercayaan Pasien adalah Kebanggaan Kami</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">Ulasan nyata dari keluarga dan pasien yang telah mempercayakan layanan kesehatan kepada kami.</p>
        </div>
        <TestimonialMarquee />
      </section>

      {/* ============================================================ LOKASI ============================================================ */}
      <section id="lokasi" className="py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">Lokasi &amp; Jam Buka</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Kunjungi Klinik Kami atau Jadwalkan Home Care</h2>
              </div>
              <div className="space-y-5">
                {[
                  { icon: <MapPin className="w-5 h-5"/>, color:"bg-blue-50 text-blue-600 border-blue-100", title:"Alamat Lengkap", content:"Jl. Kesehatan No. 123, Kel. Sejahtera, Kec. Makmur, Kota Sehat 12345" },
                  { icon: <Clock className="w-5 h-5"/>, color:"bg-teal-50 text-teal-600 border-teal-100", title:"Jam Pelayanan", content:"Klinik: Senin–Sabtu 08.00–20.00 WIB\nHome Care: Siaga setiap hari sesuai reservasi WA" },
                  { icon: <Phone className="w-5 h-5"/>, color:"bg-indigo-50 text-indigo-600 border-indigo-100", title:"WhatsApp", content:"+62 812-3456-7890" },
                ].map(({icon, color, title, content}) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl flex-shrink-0 border ${color}`}>{icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">{title}</h4>
                      <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5">
                Buka Petunjuk Arah di Maps <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[400px]">
              <iframe title="Lokasi Klinik"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.59609823898!2d106.7765!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ FOOTER ============================================================ */}
      <footer className="bg-slate-950 text-slate-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">+</div>
            <span className="text-white font-black text-xl tracking-tight">Klinik Sehat Mandiri</span>
          </div>
          <p className="text-slate-500 max-w-sm mx-auto mb-6 text-sm">Mitra terpercaya keluarga Anda dalam menghadirkan layanan medis profesional yang hangat dan humanis.</p>
          <div className="flex justify-center gap-6 mb-6 flex-wrap text-sm">
            {NAV_LINKS.map(({href,label}) => (
              <a key={href} href={href} className="text-slate-500 hover:text-white transition-colors">{label}</a>
            ))}
          </div>
          <p className="text-xs text-slate-700">© 2026 Klinik Sehat Mandiri. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </footer>

      {/* Floating WA */}
      <a href={waLink("Halo Klinik Sehat Mandiri, saya ingin konsultasi layanan.")} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all">
        <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span>Chat WA</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </a>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer">
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
            <img src={lightbox} alt="Sertifikat" className="w-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
