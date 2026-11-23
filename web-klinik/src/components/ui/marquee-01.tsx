"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";
import { Star } from "lucide-react";

export interface MarqueeReviewItem {
  name: string;
  username?: string;
  role?: string;
  body?: string;
  review?: string;
  service?: string;
  rating?: number;
  profile?: string;
}

const PALETTES = [
  { bg: "2563eb", badge: "bg-blue-50 text-blue-700 border-blue-200", gradient: "from-blue-600 to-indigo-600" },
  { bg: "e11d48", badge: "bg-rose-50 text-rose-700 border-rose-200", gradient: "from-rose-500 to-pink-600" },
  { bg: "7c3aed", badge: "bg-purple-50 text-purple-700 border-purple-200", gradient: "from-purple-600 to-indigo-600" },
  { bg: "d97706", badge: "bg-amber-50 text-amber-800 border-amber-200", gradient: "from-amber-500 to-orange-600" },
  { bg: "059669", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", gradient: "from-emerald-500 to-teal-600" },
  { bg: "0284c7", badge: "bg-sky-50 text-sky-700 border-sky-200", gradient: "from-sky-500 to-blue-600" },
  { bg: "ea580c", badge: "bg-orange-50 text-orange-700 border-orange-200", gradient: "from-orange-500 to-red-500" },
  { bg: "0891b2", badge: "bg-cyan-50 text-cyan-700 border-cyan-200", gradient: "from-cyan-500 to-teal-600" },
  { bg: "c026d3", badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", gradient: "from-fuchsia-500 to-purple-600" },
  { bg: "4f46e5", badge: "bg-indigo-50 text-indigo-700 border-indigo-200", gradient: "from-indigo-600 to-violet-600" },
];

function getPalette(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTES.length;
  return PALETTES[index];
}

function getInitials(name: string) {
  const clean = name.replace(/^(Bpk\.|Ibu|dr\.|Ns\.|H\.|Hj\.)\s*/i, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return (clean.slice(0, 2) || "PS").toUpperCase();
}

const defaultReviews: MarqueeReviewItem[] = [
  {
    name: "Ibu Ratna Dewi",
    role: "Keluarga Pasien Stroke",
    service: "Home Care & Perawatan Infus",
    body: "Perawatnya ramah sekali, datang tepat waktu ke rumah dan penanganan infusnya rapi tanpa rasa sakit. Sangat membantu keluarga kami yang kesulitan membawa orang tua ke klinik.",
    rating: 5,
  },
  {
    name: "Bpk. Hendra Gunawan",
    role: "Pasien Pasca Operasi",
    service: "Modern Wound Care",
    body: "Luka pasca operasi cepat kering dan bersih berkat perawatan steril dari Homecareku. Dijelaskan juga cara perawatan sehari-harinya dengan sangat jelas.",
    rating: 5,
  },
  {
    name: "Bpk. Ahmad Fauzi",
    role: "Orang Tua Pasien Khitan",
    service: "Khitan Modern Klem",
    body: "Anak saya khitan di klinik, prosesnya sangat cepat dan anak tidak rewel sama sekali. Hari kedua sudah bisa beraktivitas seperti biasa. Mantap!",
    rating: 5,
  },
  {
    name: "Ibu Siti Mariam",
    role: "Pasien Rutin Cek Lab",
    service: "Cek Lab Mini & Terapi Bekam",
    body: "Hasil cek gula darah dan kolesterol langsung keluar di tempat. Dilanjut terapi bekam badannya jadi enteng banget. Sangat recommended!",
    rating: 5,
  },
  {
    name: "Bpk. Bambang Sutrisno",
    role: "Keluarga Pasien Diabetes",
    service: "Rawat Luka Diabetes (Gangren)",
    body: "Luka diabetes di kaki bapak mertua yang tadinya memburuk, alhamdulillah sekarang menutup setelah rutin dirawat home care. Teknik balut luka modern-nya sangat higienis dan tidak bau.",
    rating: 5,
  },
  {
    name: "Ibu Nurul Hidayah",
    role: "Ibu Pasca Caesar (Maternity)",
    service: "Perawatan Luka Caesar",
    body: "Layanan ganti perban luka SC langsung ke rumah sangat menolong saya yang masih nyeri jalan. Nakesnya teliti, telaten, dan selalu memberi edukasi tentang tanda infeksi.",
    rating: 5,
  },
  {
    name: "Bpk. Eko Prasetyo",
    role: "Keluarga Pasien Lansia",
    service: "Pemasangan NGT & Kateter",
    body: "Ibu saya yang tirah baring butuh ganti selang NGT dan kateter urine rutin. Pelayanannya cepat tanggap, sangat berhati-hati, dan selalu sabar memotivasi pasien.",
    rating: 5,
  },
  {
    name: "Ibu Sri Wahyuni",
    role: "Pasien Pemulihan Pasca Sakit",
    service: "Suntik Vitamin & Infus Booster",
    body: "Panggil layanan infus multivitamin dan suntik neurobion ke rumah saat badan drop. Nakesnya profesional, tusukan jarumnya halus sekali tidak sakit. Badan langsung fit kembali.",
    rating: 5,
  },
  {
    name: "Bpk. Tri Wahyudi",
    role: "Keluarga Pasien Home Visit",
    service: "Fisioterapi & Latihan Gerak",
    body: "Latihan gerak mandiri pasca stroke di rumah sangat memuaskan. Terapisnya telaten membimbing dari yang awalnya cuma bisa berbaring sampai sekarang bisa duduk tegak sendiri.",
    rating: 5,
  },
  {
    name: "Ibu Maya Kartika",
    role: "Pasien Penanganan Luka Bakar",
    service: "Perawatan Luka Bakar",
    body: "Tangan melepuh terkena minyak panas, langsung chat WA dan ditangani dengan cepat. Diberikan salep dan penutup luka modern sehingga sembuh tanpa bekas keloid.",
    rating: 5,
  },
];

const ReviewCard = ({
  profile,
  name,
  username,
  role,
  service,
  body,
  rating = 5,
}: MarqueeReviewItem) => {
  const palette = getPalette(name);
  const initials = getInitials(name);
  const cleanName = name.replace(/^(Bpk\.|Ibu|dr\.|Ns\.|H\.|Hj\.)\s*/i, "").trim();
  const avatarUrl =
    profile ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      cleanName
    )}&background=${palette.bg}&color=fff&size=150&bold=true`;

  return (
    <Card className="relative h-full w-84 cursor-pointer overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5 rounded-2xl mx-2 flex flex-col justify-between">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {profile ? (
              <img
                className="rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                width="40"
                height="40"
                style={{ width: 40, height: 40 }}
                alt={name}
                src={avatarUrl}
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-tr ${palette.gradient} text-white font-extrabold text-xs flex items-center justify-center shadow-sm flex-shrink-0 border-2 border-white tracking-wider`}
              >
                {initials}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-900 leading-tight truncate">
                {name}
              </span>
              <span className="text-xs text-slate-500 font-medium truncate">
                {role || username || "Pasien Homecareku"}
              </span>
            </div>
          </div>
          {service && (
            <span
              className={`text-[10px] font-bold ${palette.badge} px-2.5 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0`}
            >
              {service}
            </span>
          )}
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300 fill-slate-100"
              }`}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
          &ldquo;{body || "Pelayanan medis sangat profesional dan memuaskan."}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
};

export default function Marquee01({ items }: { items?: MarqueeReviewItem[] }) {
  const data = items && items.length > 0 ? items : defaultReviews;
  const normalized = data.map((item) => ({
    ...item,
    body: item.body || item.review || "",
  }));

  const half = Math.ceil(normalized.length / 2);
  const firstRow = normalized.slice(0, half);
  const secondRow = normalized.length > 1 ? normalized.slice(half) : normalized;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden gap-3">
      <Marquee pauseOnHover className="[--duration:35s]">
        {firstRow.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s]">
        {secondRow.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
    </div>
  );
}
