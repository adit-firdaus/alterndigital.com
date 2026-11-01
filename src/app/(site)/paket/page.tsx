import { getSite } from "@/lib/site";
import { waMeUrl } from "@/lib/wa";

export const dynamic = "force-dynamic";

const packages = [
  { name: "Aplikasi Mobile Starter", price: "Mulai Rp4.000.000", description: "Aplikasi Android sederhana dengan publikasi menggunakan akun Google Play Altern Digital. Cakupan dan fitur disepakati sebelum pengerjaan." },
  { name: "Aplikasi Mobile Dedicated", price: "Estimasi Rp15.000.000–Rp30.000.000", description: "Aplikasi yang dirancang sesuai kebutuhan bisnis. Harga akhir, akun publikasi, dan cakupan ditetapkan dalam proposal." },
  { name: "Website Company Profile", price: "Mulai Rp3.000.000", description: "Website untuk memperkenalkan bisnis, layanan, dan kontak Anda." },
  { name: "Aplikasi Web Custom", price: "Mulai Rp7.500.000", description: "Aplikasi web dan dashboard yang disesuaikan dengan kebutuhan operasional." },
  { name: "Konsultasi & Perencanaan", price: "Mulai Rp500.000 per sesi", description: "Diskusikan kebutuhan, ruang lingkup, dan rencana proyek bersama kami." },
  { name: "Server Starter", price: "Rp250.000 per bulan", description: "Layanan server untuk website atau aplikasi kecil; kapasitas dan cakupan pengelolaan dijelaskan dalam penawaran." },
  { name: "Server Business", price: "Rp500.000 per bulan", description: "Layanan server untuk aplikasi bisnis; kapasitas dan cakupan pengelolaan dijelaskan dalam penawaran." },
  { name: "Server Pro", price: "Mulai Rp900.000 per bulan", description: "Layanan server untuk kebutuhan lebih besar dengan kapasitas dan pengelolaan sesuai penawaran." },
];

export default async function PackagesPage() {
  const site = await getSite();
  return (
    <main className="bg-black text-white min-h-screen pt-40 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4">Produk & layanan</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Solusi untuk proyek digital Anda.</h1>
        <p className="text-[#AAAAAA] max-w-2xl leading-relaxed mb-14">Pilih layanan untuk memulai diskusi. Harga akhir, ruang lingkup, jadwal, dan biaya berulang disepakati dalam penawaran sebelum pekerjaan dimulai.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {packages.map((item) => (
            <article key={item.name} className="bg-black p-8 flex flex-col">
              <h2 className="text-xl font-bold mb-3">{item.name}</h2>
              <p className="text-white font-medium mb-4">{item.price}</p>
              <p className="text-[#AAAAAA] text-sm leading-relaxed flex-1">{item.description}</p>
              <a className="mt-8 text-sm font-semibold underline underline-offset-4 hover:text-[#AAAAAA]" href={waMeUrl(site.whatsappE164, `Halo, saya ingin bertanya tentang ${item.name}.`)} target="_blank" rel="noopener noreferrer">Tanyakan layanan ini</a>
            </article>
          ))}
        </div>
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Cara memulai</h2>
          <p className="text-[#AAAAAA] leading-relaxed">Konsultasikan kebutuhan Anda, lalu kami susun penawaran. Ruang lingkup, harga, jadwal, dan biaya server atau layanan berulang dibahas sebelum pekerjaan dimulai.</p>
        </div>
      </div>
    </main>
  );
}
