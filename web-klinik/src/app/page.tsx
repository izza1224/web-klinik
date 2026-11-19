"use client";
import { useState, useEffect, useRef } from "react";
import {
  Phone, MapPin, Clock, ShieldCheck, Building2,
  Home as HomeIcon, Award, CheckCircle2, ExternalLink,
  Menu, X, Sparkles, Star, ChevronRight, Activity
} from "lucide-react";
import TestimonialMarquee from "@/components/ui/testimonial-marquee";

const WA_NUMBER = "6281234567890";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ---- Animated Counter Hook ---- */
function useCountUp(target: number, duration = 1800, suffix = "") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, suffix, ref };
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
  { href: "#layanan", label: "Layanan" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#galeri", label: "Testimoni" },
  { href: "#lokasi", label: "Lokasi" },
];

/* ======================================================
   STAT ITEM COMPONENT (with counter animation)
   ====================================================== */
function StatItem({ target, suffix, label, decimals }: { target: number; suffix: string; label: string; decimals?: number }) {
  const { count, ref } = useCountUp(target, 1800);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 group">
      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums transition-all">
        {decimals ? count.toFixed(decimals) : count}{suffix}
      </span>
      <span className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">{label}</span>
    </div>
  );
}

export default function PageHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Active nav tracking
      const sections = ["beranda","layanan","tentang","galeri","lokasi"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">

      {/* ============================================================
          NAVBAR — Glassmorphism premium
          ============================================================ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/60 border-b border-slate-100"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">

            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-11 h-11">
                <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-30" />
                <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-black text-2xl leading-none select-none">+</span>
                </div>
              </div>
              <div className="leading-tight">
                <span className={`block font-extrabold text-[17px] tracking-tight transition-colors ${scrolled ? "text-blue-900" : "text-white"}`}>
                  Klinik Sehat Mandiri
                </span>
                <span className="block text-[11px] font-semibold text-teal-500 uppercase tracking-widest">
                  Home Care &amp; Klinik
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const id = href.replace("#","");
                const isActive = activeNav === id;
                return (
                  <a key={href} href={href}
                    className={`relative px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200 ${
                      scrolled
                        ? isActive
                          ? "text-blue-700 bg-blue-50"
                          : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                        : isActive
                          ? "text-white bg-white/15"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+6281234567890"
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-all ${
                  scrolled ? "text-slate-700 hover:text-blue-700" : "text-white/80 hover:text-white"
                }`}>
                <Phone className="w-4 h-4" />
                0812-3456-7890
              </a>
              <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/50">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat WhatsApp
              </a>
            </div>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-slate-700 font-medium rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors group">
                  {label}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 mt-2 flex flex-col gap-2">
                <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 rounded-xl">
                  <Phone className="w-4 h-4" /> Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================
          HERO SECTION — Premium full-screen
          ============================================================ */}
      <section id="beranda" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=85"
            alt="Layanan Home Care"
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/85 to-indigo-900/80" />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{backgroundImage:"radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize:"40px 40px"}} />
          {/* Glow effects */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center text-white">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium text-white/90 mb-8 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Layanan Aktif 7 Hari Seminggu
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6">
            <span className="block text-white drop-shadow-sm">Layanan Medis</span>
            <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Profesional &amp; Terpercaya
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Perawat bersertifikat siap melakukan home care langsung ke rumah Anda atau tindakan medis di klinik — steril, aman, dan penuh empati.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={waLink("Halo, saya ingin menjadwalkan home care / kunjungan klinik.")}
              target="_blank" rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-full text-base shadow-2xl shadow-emerald-500/30 transition-all hover:-translate-y-1 hover:shadow-emerald-500/50">
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Jadwalkan Sekarang
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#layanan"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-full text-base backdrop-blur-md transition-all hover:-translate-y-1">
              Lihat Layanan
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Animated Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
            <StatItem target={500} suffix="+" label="Pasien Dilayani" />
            <div className="hidden sm:block w-px h-14 bg-white/15 rounded-full" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">Rating Kepuasan</span>
            </div>
            <div className="hidden sm:block w-px h-14 bg-white/15 rounded-full" />
            <StatItem target={3} suffix="+ Tahun" label="Pengalaman" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
          <span className="text-white text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============================================================
          KEUNGGULAN SECTION (3 Cards) — Proper placement below hero
          ============================================================ */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <HomeIcon className="w-7 h-7 text-blue-300" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Perawat ke Rumah</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tindakan medis nyaman tanpa perlu keluar rumah. Perawat datang tepat waktu sesuai janji.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-xs font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  Tersedia 7 hari
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/40 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-teal-500/20 border border-teal-400/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-7 h-7 text-teal-300" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Kunjungan Klinik</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Fasilitas tindakan bersih, higienis, dan peralatan modern standar rumah sakit.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-teal-400 text-xs font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  Senin–Sabtu 08–20
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-indigo-500/20 border border-indigo-400/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-7 h-7 text-indigo-300" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Tenaga Bersertifikat</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  STR &amp; SIPP aktif terdaftar Kemenkes, terlatih dan berpengalaman di RS rujukan.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-indigo-400 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Terdaftar Resmi
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          LAYANAN
          ============================================================ */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-teal-100 text-teal-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
              Pilihan Layanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Layanan Medis Lengkap &amp; Terpercaya
            </h2>
            <p className="text-slate-500 mt-3 text-base">
              Setiap tindakan mengikuti SOP ketat demi keselamatan dan kenyamanan pasien.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
                    {s.badge}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{s.desc}</p>
                  <a href={waLink(`Halo, saya ingin tanya info dan biaya untuk layanan ${s.title}.`)}
                    target="_blank" rel="noopener noreferrer"
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
      <section id="tentang" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
                  alt="Perawat" className="w-full h-[480px] object-cover object-top" />
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
              <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
                Tentang Tenaga Medis
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">
                Sentuhan Medis Humanis,<br />Hangat &amp; Berpengalaman
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Halo, saya <strong>Ns. Sari Dewi, S.Kep</strong> — perawat berpengalaman lebih dari 8 tahun di keperawatan klinis dan komunitas. Klinik Sehat Mandiri didirikan untuk menghadirkan layanan medis berkualitas yang terasa hangat dan personal.
              </p>
              <div className="space-y-3 mb-7">
                {["Lulusan Profesi Ners dari universitas terkemuka",
                  "Tersertifikasi Modern Wound Care, BHD & Phlebotomy",
                  "Pengalaman di RS rujukan provinsi selama 5+ tahun",
                  "Protokol sterilisasi standar Kemenkes RI"].map(item => (
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

      {/* ============================================================
          TESTIMONI MARQUEE
          ============================================================ */}
      <section id="galeri" className="py-24 bg-slate-50 overflow-hidden border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Ulasan Pasien
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kepercayaan Pasien adalah Kebanggaan Kami
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Ulasan nyata dari keluarga dan pasien yang telah mempercayakan layanan kesehatan kepada kami.
          </p>
        </div>
        <TestimonialMarquee />
      </section>

      {/* ============================================================
          LOKASI
          ============================================================ */}
      <section id="lokasi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3">
                  Lokasi &amp; Jam Buka
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Kunjungi Klinik Kami atau Jadwalkan Home Care
                </h2>
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

            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[400px] relative">
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

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="bg-slate-950 text-slate-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">+</div>
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

      {/* ============================================================
          FLOATING WA BUTTON
          ============================================================ */}
      <a href={waLink("Halo Klinik Sehat Mandiri, saya ingin konsultasi layanan.")}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all">
        <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Chat WA
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </a>

      {/* ============================================================
          LIGHTBOX
          ============================================================ */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer">
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
            <img src={lightbox} alt="Sertifikat" className="w-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
