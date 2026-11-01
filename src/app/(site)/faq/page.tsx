import Link from "next/link";
import { getSite } from "@/lib/site";
import { waMeUrl } from "@/lib/wa";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const site = await getSite();
  const questions = [
    ["Apa yang dikerjakan Altern Digital?", "Kami menyediakan layanan pengembangan software, website, aplikasi mobile, dan konsultasi IT. Lihat katalog untuk gambaran layanan dan harga yang tersedia."],
    ["Bagaimana cara memulai proyek?", "Hubungi kami dengan kebutuhan Anda. Kami akan mendiskusikan ruang lingkup, jadwal, dan biaya sebelum pekerjaan disepakati."],
    ["Mengapa harga proyek dapat berbeda?", "Harga tergantung fitur, kompleksitas, dan kebutuhan setiap proyek. Harga akhir disampaikan dalam penawaran untuk disepakati bersama."],
    ["Di mana aplikasi Starter dipublikasikan?", "Paket aplikasi mobile Starter menggunakan akun Google Play Altern Digital. Kebutuhan akun publikasi lain dibahas dalam penawaran proyek."],
    ["Bagaimana biaya server ditentukan?", "Kebutuhan kapasitas dan biaya layanan server dibahas dalam penawaran. Tanyakan juga biaya berulang dan pengelolaannya sebelum menyetujui proyek."],
    ["Bagaimana data pelanggan digunakan?", "Informasi yang Anda berikan digunakan untuk menanggapi pertanyaan, menyiapkan penawaran, menjalankan layanan, dan menangani transaksi. Rincian tersedia dalam Kebijakan Privasi."],
    ["Bagaimana pembatalan dan refund?", "Ajukan melalui kontak resmi kami. Penanganan dan perhitungan biaya dijelaskan dalam Kebijakan Refund & Pembatalan."],
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4">Bantuan</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">Pertanyaan yang sering diajukan</h1>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {questions.map(([question, answer]) => (
            <section key={question} className="py-7">
              <h2 className="font-semibold text-lg mb-3">{question}</h2>
              <p className="text-[#AAAAAA] leading-relaxed">{answer}</p>
            </section>
          ))}
        </div>
        <p className="text-[#AAAAAA] mt-10 leading-relaxed">Lihat <Link href="/paket" className="text-white underline">produk dan harga</Link>, <Link href="/kebijakan/privasi" className="text-white underline">kebijakan privasi</Link>, dan <Link href="/kebijakan/refund-pembatalan" className="text-white underline">kebijakan refund</Link>, atau hubungi kami melalui <a href={waMeUrl(site.whatsappE164, site.whatsappDefaultMessage)} className="text-white underline">WhatsApp</a> atau <a href={`mailto:${site.footerEmailAddress}`} className="text-white underline">email</a>.</p>
      </div>
    </main>
  );
}
