import { notFound } from "next/navigation";
import { getSite } from "@/lib/site";

export const dynamic = "force-dynamic";

const policies: Record<string, { title: string; sections: [string, string][] }> = {
  "syarat-ketentuan": {
    title: "Syarat & Ketentuan",
    sections: [
      ["Layanan dan persetujuan", "Altern Digital Technologies menyediakan jasa pengembangan perangkat lunak, website, aplikasi mobile, konsultasi, dan layanan server. Dengan menggunakan layanan kami, Anda menyetujui ketentuan ini dan ketentuan proyek yang disepakati."],
      ["Pemesanan dan harga", "Hubungi kami untuk membahas kebutuhan. Penawaran atau perjanjian proyek menjelaskan cakupan, hasil kerja, jadwal, revisi, harga, dan tahapan pembayaran. Harga awal dalam katalog adalah dalam Rupiah; harga akhir ditetapkan dalam penawaran. Pajak atau biaya tambahan yang berlaku akan dijelaskan sebelum disetujui."],
      ["Pembayaran dan pelaksanaan", "Metode dan jadwal pembayaran dicantumkan dalam invoice atau perjanjian. Pekerjaan dimulai sesuai jadwal yang disepakati setelah pembayaran yang disyaratkan terkonfirmasi. Jadwal dapat berubah apabila materi atau persetujuan pelanggan terlambat, kebutuhan berubah, atau terjadi gangguan pihak ketiga; kami akan mengomunikasikannya."],
      ["Server dan biaya berulang", "Layanan server dan biaya berulang ditagihkan terpisah kecuali penawaran menyatakan lain. Kapasitas, pengelolaan, masa layanan, dan biaya tambahan ditetapkan dalam penawaran. Domain, akun developer, dan layanan pihak ketiga tidak termasuk kecuali dinyatakan dalam penawaran."],
      ["Aplikasi dan hak atas hasil kerja", "Paket Starter dipublikasikan melalui akun Google Play Altern Digital. Kepemilikan dan penyerahan source code, aset, lisensi pihak ketiga, dan pemindahan aplikasi diatur dalam perjanjian proyek; pelanggan perlu meninjaunya sebelum menyetujui penawaran."],
      ["Kewajiban pengguna", "Pelanggan wajib memberikan informasi dan materi yang benar, memiliki hak untuk menggunakannya, serta tidak menggunakan layanan untuk penipuan, pelanggaran hukum, spam, atau penyalahgunaan sistem."],
      ["Kekayaan intelektual dan tanggung jawab", "Merek dan konten website milik pemiliknya masing-masing. Hak atas hasil proyek mengikuti perjanjian proyek. Altern Digital menangani keluhan secara wajar dan tidak menjamin layanan pihak ketiga bebas gangguan; ketentuan ini tidak menghapus hak yang wajib diberikan berdasarkan hukum yang berlaku."],
      ["Keluhan dan perubahan", "Hubungi kami melalui kontak di bawah untuk menyampaikan keluhan; kami menargetkan respons awal dalam tiga hari kerja. Jika belum terselesaikan, para pihak mengupayakan musyawarah dan dapat menggunakan jalur penyelesaian sesuai hukum Indonesia. Ketentuan yang diperbarui akan dipublikasikan di halaman ini."],
    ],
  },
  "refund-pembatalan": {
    title: "Kebijakan Refund & Pembatalan",
    sections: [
      ["Cakupan", "Kebijakan ini berlaku untuk pembelian jasa dan layanan server dari Altern Digital. Ketentuan khusus pada penawaran atau perjanjian yang disetujui pelanggan berlaku sepanjang tidak mengurangi hak pelanggan yang diwajibkan hukum."],
      ["Pembatalan proyek", "Pelanggan dapat meminta pembatalan melalui kontak resmi. Sebelum pekerjaan dimulai, pembayaran dikembalikan setelah dikurangi biaya pihak ketiga yang sudah dikeluarkan dan tidak dapat dipulihkan. Setelah pekerjaan dimulai, kami menghitung nilai pekerjaan yang telah dilakukan dan biaya pihak ketiga yang tidak dapat dipulihkan; sisa pembayaran dikembalikan setelah perhitungan disampaikan."],
      ["Kapan refund dapat diajukan", "Refund dapat diminta jika terjadi pembayaran ganda atau salah nominal, layanan tidak diberikan sesuai kesepakatan, atau proyek dibatalkan. Kami akan meninjau bukti dan kondisi masing-masing kasus. Pekerjaan yang sudah diselesaikan dan diterima serta biaya pihak ketiga yang tidak dapat dipulihkan umumnya tidak dikembalikan, tanpa mengurangi hak pelanggan menurut hukum."],
      ["Layanan server", "Pembatalan perpanjangan server perlu disampaikan sebelum periode berikutnya dimulai. Biaya periode berjalan dan biaya pihak ketiga yang telah digunakan atau tidak dapat dipulihkan diperhitungkan dalam peninjauan refund."],
      ["Cara mengajukan", "Hubungi email atau WhatsApp resmi di bawah dengan nomor invoice, bukti pembayaran, alasan, dan detail rekening penerima bila diminta. Jangan mengirim kata sandi, OTP, atau data kartu pembayaran."],
      ["Waktu dan metode", "Kami menargetkan respons awal dalam tiga hari kerja dan penyelesaian peninjauan dalam lima hari kerja setelah informasi lengkap diterima. Refund yang disetujui ditargetkan diproses dalam tujuh sampai empat belas hari kerja melalui transfer bank atau metode lain yang disepakati. Biaya transfer atau potongan yang berlaku akan diberitahukan sebelum pengembalian."],
    ],
  },
  privasi: {
    title: "Kebijakan Privasi",
    sections: [
      ["Data yang digunakan", "Ketika Anda menghubungi kami atau memesan layanan, kami dapat menerima nama, kontak, informasi usaha, kebutuhan proyek, dan informasi transaksi yang Anda berikan. Data ini digunakan untuk menjawab pertanyaan, menyiapkan penawaran, menyediakan layanan, dan mengelola pembayaran serta keluhan."],
      ["Pihak ketiga", "Komunikasi atau pembayaran dapat menggunakan penyedia pihak ketiga seperti WhatsApp, penyedia email, penyedia infrastruktur, atau penyedia pembayaran yang digunakan untuk transaksi. Penyedia tersebut memproses data sesuai layanan dan kebijakan mereka."],
      ["Penyimpanan dan hak Anda", "Kami membatasi akses ke informasi sesuai kebutuhan operasional dan menyimpannya selama diperlukan untuk layanan, administrasi, dan kewajiban yang berlaku. Anda dapat menghubungi kami untuk meminta akses, koreksi, atau penghapusan data; permintaan ditangani sesuai hukum dan kewajiban penyimpanan yang berlaku."],
      ["Perubahan", "Kami dapat memperbarui kebijakan ini dan mempublikasikan versi terbaru pada halaman ini. Hubungi kami jika ada pertanyaan mengenai penggunaan data Anda."],
    ],
  },
};

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  const site = await getSite();

  return (
    <main className="bg-black text-white min-h-screen pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4">Informasi layanan</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">{policy.title}</h1>
        <div className="space-y-8">
          {policy.sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-semibold mb-3">{heading}</h2><p className="text-[#AAAAAA] leading-relaxed">{body}</p></section>)}
          <section><h2 className="text-xl font-semibold mb-3">Kontak</h2><p className="text-[#AAAAAA] leading-relaxed">{site.brandLegal}<br />{site.footerAddressLine1} {site.footerAddressLine2}<br /><a className="text-white underline" href={`mailto:${site.footerEmailAddress}`}>{site.footerEmailDisplay}</a><br />{site.footerPhoneDisplay}</p></section>
        </div>
      </div>
    </main>
  );
}
