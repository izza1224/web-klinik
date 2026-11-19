"use client";
import { useState, useEffect, useRef } from "react";
import {
  Phone, MapPin, Clock, ShieldCheck, Building2,
  Home as HomeIcon, Award, CheckCircle2, ExternalLink,
  Menu, X, Sparkles, Star, ChevronRight, Activity, ArrowRight,
  HeartHandshake
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
      { threshold: 0.1 }
    );
    obs.observe(el);

    // Fallback trigger if element is immediately in viewport on page load
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setStarted(true);
      }
    }, 250);

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
      // Smooth cubic ease-out
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
  { href: "#layanan", label: "Layanan" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#galeri", label: "Testimoni" },
  { href: "#lokasi", label: "Lokasi" },
];

export default function PageHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("beranda");

  const statPatients = useCountUp(500, 2000);
  const statYears = useCountUp(3, 1600);

  const scrolled = scrollY > 60;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["beranda", "layanan", "tentang", "galeri", "lokasi"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
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
          NAVBAR ATAS — Transparan saat di paling atas
          ============================================================ */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-white/20 border border-white/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                <span className="text-white font-black text-2xl leading-none select-none">+</span>
              </div>
              <div className="leading-tight">
                <span className="block font-extrabold text-[17px] text-white tracking-tight">Klinik Sehat Mandiri</span>
                <span className="block text-[11px] font-semibold text-teal-300 uppercase tracking-widest">Home Care &amp; Klinik</span>
              </div>
            </a>

            {/* Nav items */}
            <div className="hidden md:flex items-center gap-1 bg-white/10 border border-white/15 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href}
                  className="px-4 py-1.5 text-[14px] font-medium text-white/85 hover:text-white hover:bg-white/15 rounded-full transition-all duration-200">
                  {label}
                </a>
              ))}
            </div>

            {/* CTA WA */}
            <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>Chat WhatsApp</span>
            </a>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          FLOATING PILL NAVBAR — Muncul saat di-scroll
          ============================================================ */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4 ${
        scrolled ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-400/20 px-4 py-2 flex items-center justify-between gap-4">
          {/* Logo compact */}
          <a href="#beranda" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              <span className="text-white font-black text-xl leading-none">+</span>
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block font-extrabold text-[15px] text-slate-900 tracking-tight">Klinik Sehat Mandiri</span>
              <span className="block text-[10px] font-semibold text-teal-600 uppercase tracking-widest">Home Care &amp; Klinik</span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center bg-slate-100/80 rounded-xl px-1.5 py-1 gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = activeNav === href.replace("#", "");
              return (
                <a key={href} href={href}
                  className={`px-3.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}>
                  {label}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 shrink-0">
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>Chat WA</span>
          </a>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-slate-700 font-semibold rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
              {label} <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 mt-1">
            <a href={waLink("Halo, saya ingin konsultasi layanan klinik.")} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 rounded-xl">
              <Phone className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* ============================================================
          HERO SECTION — Premium Medical Blue + Clean Centered Content
          ============================================================ */}
      <section id="beranda" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-14">

        {/* Background Layers — Medical Blue Gradient with subtle hospital photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=85"
            alt="Hero Background"
            className="w-full h-full object-cover object-center filter brightness-[0.85]"
          />
          {/* Multi-tone clinical gradient — lively medical sapphire, NOT muddy black */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/92 via-blue-900/85 to-teal-950/90" />

          {/* Soft ambient lighting accents */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-cyan-400/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-[450px] h-[350px] bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none" />

          {/* Smooth bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/70" />
        </div>

        {/* Content Container — Centered Alignment */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center my-auto">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-medium text-cyan-200 mb-6 shadow-md shadow-black/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Layanan Aktif 7 Hari Seminggu • Home Care &amp; Klinik</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.1] mb-6 max-w-4xl">
            <span className="block text-white drop-shadow-sm">Layanan Medis</span>
            <span className="block bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-sm">
              Profesional &amp; Terpercaya
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Perawat bersertifikat siap melakukan home care langsung ke rumah Anda maupun tindakan di klinik — steril, aman, nyaman, dan penuh empati.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
            <a href={waLink("Halo, saya ingin menjadwalkan home care / kunjungan klinik.")}
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-full text-base shadow-xl shadow-emerald-600/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-emerald-600/50">
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>Jadwalkan Sekarang (WA)</span>
            </a>
            <a href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-8 py-4 rounded-full text-base backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
              <span>Lihat Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* ============================================================
              CENTERED STATS CARD (Count-Up Animation 0 -> 500+ & 3+)
              ============================================================ */}
          <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-blue-950/40">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/20 items-center">
              {/* Stat 1: Pasien Dilayani */}
              <div ref={statPatients.ref} className="flex flex-col items-center justify-center text-center px-4">
                <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                  {statPatients.count}+
                </span>
                <span className="text-sm font-semibold text-teal-300 mt-1">Pasien Dilayani</span>
                <span className="text-xs text-blue-100/70 mt-0.5">Home Care &amp; Klinik</span>
              </div>

              {/* Stat 2: Rating Kepuasan */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="flex items-center justify-center gap-1 mb-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-teal-300">5.0 Rating Kepuasan</span>
                <span className="text-xs text-blue-100/70 mt-0.5">Ulasan Pasien &amp; Keluarga</span>
              </div>

              {/* Stat 3: Pengalaman */}
              <div ref={statYears.ref} className="flex flex-col items-center justify-center text-center px-4">
                <span className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                  {statYears.count}+ Tahun
                </span>
                <span className="text-sm font-semibold text-teal-300 mt-1">Pengalaman Medis</span>
                <span className="text-xs text-blue-100/70 mt-0.5">STR &amp; SIPP Resmi Aktif</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-6 text-white/60 text-xs">
          <span className="tracking-widest uppercase font-medium mb-1.5">Scroll untuk melihat</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-white/70 rounded-full animate-bounce" />
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
