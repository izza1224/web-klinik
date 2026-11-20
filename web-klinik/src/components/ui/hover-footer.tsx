"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<{ x: number | null; y: number | null }>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Calculate width based on text length so the text fills the width
  // and scales up to be massive, bold, and prominent just like 21st.dev
  const calculatedWidth = Math.max(300, text.length * 54);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${calculatedWidth} 100`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold 
        dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(15, 23, 42, 0.95) 40%, rgba(13, 148, 136, 0.25) 100%)",
      }}
    />
  );
};

export function HoverFooter() {
  const WA_NUMBER = "6281234567890";
  const waLink = (msg: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  // Menu Navigasi
  const footerLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Layanan Medis", href: "#layanan" },
    { label: "Tentang Kami & Perawat", href: "#tentang" },
    { label: "Legalitas & Sertifikat", href: "#tentang" },
    { label: "Ulasan Pasien", href: "#galeri" },
    { label: "Lokasi & Jam Buka", href: "#lokasi" },
  ];

  // Jam Operasional
  const openingHours = [
    { days: "Senin – Jumat", hours: "08.00 – 20.00 WIB", note: "Klinik & Home Care" },
    { days: "Sabtu – Minggu", hours: "08.00 – 18.00 WIB", note: "Tindakan Terjadwal" },
    { days: "Home Care Visit", hours: "Siaga 24 Jam", note: "Reservasi via WA", highlight: true },
  ];

  // Kontak Info
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-teal-400 flex-shrink-0" />,
      label: "Email",
      text: "info@homecareku.com",
      href: "mailto:info@homecareku.com",
    },
    {
      icon: <Phone size={18} className="text-teal-400 flex-shrink-0" />,
      label: "WhatsApp / Telp",
      text: "+62 812-3456-7890",
      href: waLink("Halo Homecareku, saya ingin bertanya seputar layanan medis."),
    },
    {
      icon: <MapPin size={18} className="text-teal-400 flex-shrink-0" />,
      label: "Alamat Klinik",
      text: "Jl. Kesehatan No. 123, Kel. Sejahtera, Kec. Makmur, Kota Sehat 12345",
      href: "https://maps.google.com",
    },
  ];

  // Social Links
  const socialLinks = [
    {
      icon: <Phone size={18} />,
      label: "WhatsApp",
      href: waLink("Halo Homecareku, saya ingin konsultasi layanan medis."),
    },
    {
      icon: <InstagramIcon size={18} />,
      label: "Instagram",
      href: "https://instagram.com",
    },
    {
      icon: <FacebookIcon size={18} />,
      label: "Facebook",
      href: "https://facebook.com",
    },
    {
      icon: <Globe size={18} />,
      label: "Website",
      href: "#beranda",
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 relative rounded-t-[2.5rem] overflow-hidden border-t border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          
          {/* Kolom 1: Brand & Profil Singkat */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Logo Homecareku"
                className="w-10 h-10 object-contain drop-shadow"
              />
              <span className="text-white text-2xl font-black tracking-tight">
                Homecareku
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mitra terpercaya keluarga Anda dalam menghadirkan layanan medis profesional yang hangat dan humanis.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Layanan Aktif 7 Hari Seminggu
              </div>
            </div>
          </div>

          {/* Kolom 2: Menu Navigasi */}
          <div>
            <h4 className="text-white text-base font-bold mb-5 flex items-center gap-2">
              Menu Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-teal-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Jam Pelayanan / Jam Buka */}
          <div>
            <h4 className="text-white text-base font-bold mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              Jam Pelayanan
            </h4>
            <div className="space-y-3 text-sm">
              {openingHours.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-xl border transition-all",
                    item.highlight
                      ? "bg-teal-950/40 border-teal-500/40 text-teal-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-300"
                  )}
                >
                  <div className="flex items-center justify-between font-semibold text-xs text-white">
                    <span>{item.days}</span>
                    <span className={item.highlight ? "text-emerald-400 font-bold" : "text-teal-400"}>
                      {item.hours}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom 4: Kontak Kami */}
          <div>
            <h4 className="text-white text-base font-bold mb-5 flex items-center gap-2">
              Kontak Kami
            </h4>
            <ul className="space-y-3.5 text-sm">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 group">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-teal-500/40 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-slate-300 hover:text-teal-300 transition-colors text-xs leading-relaxed block"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-slate-300 text-xs leading-relaxed block">
                        {item.text}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-slate-800 my-8" />

        {/* Footer Bagian Bawah */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-4 md:space-y-0 relative z-30">
          {/* Social Icons */}
          <div className="flex space-x-4">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-300 hover:border-teal-500/40 transition-all hover:-translate-y-0.5"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">
            &copy; 2026 Homecareku. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>

      {/* Text Hover Effect Animasi Kudus - Ukuran besar & posisi pas persis seperti contoh 21st.dev */}
      <div className="flex h-[24rem] sm:h-[28rem] lg:h-[30rem] -mt-32 sm:-mt-40 lg:-mt-44 -mb-20 sm:-mb-28 lg:-mb-32 items-center justify-center pointer-events-auto select-none overflow-hidden max-w-7xl mx-auto px-4">
        <TextHoverEffect text="Kudus" className="z-10 w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
