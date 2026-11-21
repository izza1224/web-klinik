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

const defaultReviews: MarqueeReviewItem[] = [
  {
    name: "Budi Hartono",
    username: "@budihartono",
    role: "Keluarga Pasien Diabetes",
    service: "Modern Wound Care",
    body: "“Alhamdulillah luka diabetes ayah saya yang susah sembuh, dalam 2 minggu perawatan rutin oleh Ns. Sari kondisinya membaik pesat. Perawatnya sabar dan telaten sekali!”",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
  },
  {
    name: "Ratna Agustina",
    username: "@ratna_agustina",
    role: "Ibu Pasien Khitan",
    service: "Khitan Modern",
    body: "“Anak saya khitan metode modern di sini, prosesnya cepat dan minim nyeri. Ruangan bersih dan steril. Pasca khitan juga dikontrol secara berkala, sangat puas!”",
    profile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    rating: 5,
  },
  {
    name: "Dian Susanti",
    username: "@diansusanti",
    role: "Keluarga Pasien Home Visit",
    service: "Pemasangan Infus",
    body: "“Minta home visit pemasangan infus ibu saya yang tidak bisa keluar rumah. Perawat datang tepat waktu, SOP steril ketat, ramah dan sangat komunikatif.”",
    profile: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    rating: 5,
  },
  {
    name: "Hendra Wijaya",
    username: "@hendrawijaya",
    role: "Keluarga Pasien Lansia",
    service: "Pemasangan NGT",
    body: "“Pemasangan NGT untuk kakek berjalan sangat lancar dan hati-hati. Dikasih panduan cara pemberian makan via selang juga dengan detail. Terima kasih banyak!”",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
  },
  {
    name: "Siti Rahmawati",
    username: "@siti_rahma",
    role: "Pasien Rutin",
    service: "Terapi Bekam",
    body: "“Terapi bekam dan inframerah di klinik ini bikin badan enteng. Terapis bersertifikat dan alatnya steril sekali pakai. Pasti langganan terus tiap bulan.”",
    profile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    username: "@ahmadfauzi",
    role: "Pasien Checkup",
    service: "Cek Lab Mini",
    body: "“Cek lab mini hasilnya langsung keluar dalam hitungan menit dan harganya sangat bersahabat. Penjelasan hasil dari perawat juga sangat mudah dipahami.”",
    profile: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
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
  const avatarUrl =
    profile ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0d9488&color=fff&size=150`;

  return (
    <Card className="relative h-full w-80 cursor-pointer overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5 rounded-2xl mx-1.5 flex flex-col justify-between">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full object-cover border border-slate-200"
              width="40"
              height="40"
              style={{ width: 40, height: 40 }}
              alt={name}
              src={avatarUrl}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 leading-tight">
                {name}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {role || username || "Pasien Homecareku"}
              </span>
            </div>
          </div>
          {service && (
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
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
          {body || "Pelayanan medis sangat profesional dan memuaskan."}
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
