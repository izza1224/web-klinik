"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Budi Hartono",
    username: "@budihartono",
    body: "Alhamdulillah luka diabetes ayah saya yang susah sembuh, dalam 2 minggu perawatan rutin kondisinya membaik pesat. Perawatnya sabar dan telaten sekali!",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    name: "Ratna Agustina",
    username: "@ratna_agustina",
    body: "Anak saya khitan metode modern di sini, prosesnya cepat dan minim nyeri. Ruangan bersih dan steril. Pasca khitan juga dikontrol secara berkala, sangat puas!",
    profile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
  {
    name: "Dian Susanti",
    username: "@diansusanti",
    body: "Minta home visit pemasangan infus ibu saya yang tidak bisa keluar rumah. Perawat datang tepat waktu, SOP steril ketat, ramah dan sangat komunikatif.",
    profile: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
  },
  {
    name: "Hendra Wijaya",
    username: "@hendrawijaya",
    body: "Pemasangan NGT untuk kakek berjalan sangat lancar dan hati-hati. Dikasih panduan cara pemberian makan via selang juga dengan sangat detail. Terima kasih!",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    name: "Siti Rahmawati",
    username: "@siti_rahma",
    body: "Terapi bekam dan inframerah di klinik ini bikin badan enteng. Terapis bersertifikat dan alatnya steril sekali pakai. Pasti langganan terus tiap bulan!",
    profile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
  },
  {
    name: "Ahmad Fauzi",
    username: "@ahmadfauzi",
    body: "Cek lab mini hasilnya langsung keluar dalam hitungan menit dan harganya sangat bersahabat. Penjelasan hasil dari perawat juga sangat mudah dipahami!",
    profile: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
  },
];

const firstRow = reviews.slice(0, 3);
const secondRow = reviews.slice(3);

const ReviewCard = ({
  profile, name, username, body,
}: {
  profile: string; name: string; username: string; body: string;
}) => (
  <Card className="relative h-full w-72 cursor-pointer overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl mx-2">
    <CardContent className="p-0 flex flex-col gap-3">
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full object-cover border border-slate-200"
          width="40" height="40"
          style={{ width: 40, height: 40 }}
          alt={name}
          src={profile}
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{username}</p>
        </div>
        <div className="ml-auto text-yellow-400 text-sm tracking-tight">★★★★★</div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">&ldquo;{body}&rdquo;</p>
    </CardContent>
  </Card>
);

export default function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-3 py-2">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((r) => <ReviewCard key={r.username} {...r} />)}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((r) => <ReviewCard key={r.username} {...r} />)}
      </Marquee>
      {/* Gradient fade kiri-kanan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-50 to-transparent z-10" />
    </div>
  );
}
