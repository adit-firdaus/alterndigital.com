import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadCached } from "@/lib/payload";
import { orderSteps } from "@/lib/portal/status";
import LogoutButton from "./logout-button";
import { payInvoice } from "./actions";

export const dynamic = "force-dynamic";

export default async function PortalPage({ searchParams }: { searchParams: Promise<{ payment?: string; created?: string }> }) {
  const payload = await getPayloadCached();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user || user.collection !== "customers") redirect("/portal/masuk");
  const [orders, invoices] = await Promise.all([
    payload.find({ collection: "orders", user, overrideAccess: false, sort: "-createdAt", limit: 100, depth: 0 }),
    payload.find({ collection: "invoices", user, overrideAccess: false, sort: "-createdAt", limit: 100, depth: 0 }),
  ]);
  const { payment, created } = await searchParams;
  const notices: Record<string, string> = { return: "Anda telah kembali dari halaman pembayaran. Status invoice hanya berubah setelah pembayaran terverifikasi.", cancel: "Pembayaran dibatalkan. Invoice tetap dapat dilihat di bawah.", unavailable: "Pembayaran online belum tersedia. Hubungi tim kami untuk bantuan.", invalid: "Invoice tidak tersedia untuk pembayaran.", review: "Pembayaran sedang ditinjau. Hubungi tim kami sebelum mencoba lagi." };
  const sandboxReady = process.env.IPAYMU_MODE === "sandbox" && Boolean(process.env.IPAYMU_VA && process.env.IPAYMU_API_KEY && process.env.IPAYMU_SITE_URL);
  return <main className="bg-black text-white min-h-screen pt-40 pb-24"><div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
    <div className="flex flex-wrap items-start justify-between gap-6 mb-12"><div><p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-3">Portal pelanggan</p><h1 className="text-4xl font-bold">Halo, {user.name}</h1><p className="text-[#AAAAAA] mt-3">Pantau permintaan, perkembangan proyek, dan invoice Anda.</p></div><div className="flex items-center gap-6"><Link className="bg-white text-black px-6 py-3 text-sm font-semibold" href="/portal/pesan">Buat permintaan</Link><LogoutButton /></div></div>
    {(created || (payment && notices[payment])) && <p role="status" className="border border-white/20 p-4 mb-8 text-[#DDDDDD]">{created ? "Permintaan telah dikirim. Kami akan meninjaunya." : notices[payment!]}</p>}
    {!user.identityConfirmed && <p className="border border-white/20 p-4 mb-8 text-[#DDDDDD]">Tim kami akan memverifikasi identitas Anda melalui kontak resmi sebelum menerbitkan invoice. Anda tetap dapat mengirim dan memantau permintaan.</p>}
    <section className="mb-16"><h2 className="text-2xl font-semibold mb-6">Permintaan & proyek</h2>{orders.docs.length === 0 ? <div className="border border-white/10 p-8 text-[#AAAAAA]">Belum ada permintaan. Mulai dengan tombol Buat permintaan.</div> : <div className="grid gap-5">{orders.docs.map((order) => <article key={order.id} className="border border-white/10 p-7"><h3 className="text-xl font-semibold">{order.title}</h3><p className="text-sm text-[#AAAAAA] mt-2 whitespace-pre-wrap">{order.requirements}</p><ol className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-7">{orderSteps(order.status).map((step) => <li key={step.key} className={`border-t-2 pt-3 text-sm ${step.state === "upcoming" ? "border-white/15 text-[#777777]" : "border-white text-white"}`}><span className="block text-xs uppercase mb-1">{step.state === "done" ? "Selesai" : step.state === "current" ? "Saat ini" : "Berikutnya"}</span>{step.label}</li>)}</ol>{order.progressNote && <p className="text-[#AAAAAA] text-sm mt-6 whitespace-pre-wrap">{order.progressNote}</p>}</article>)}</div>}</section>
    <section><h2 className="text-2xl font-semibold mb-6">Invoice</h2>{invoices.docs.length === 0 ? <div className="border border-white/10 p-8 text-[#AAAAAA]">Belum ada invoice. Invoice akan muncul setelah penawaran disepakati.</div> : <div className="grid gap-4">{invoices.docs.map((invoice) => <article key={invoice.id} className="border border-white/10 p-7 flex flex-wrap justify-between gap-5"><div><h3 className="font-semibold">{invoice.number}</h3><p className="text-[#AAAAAA] mt-2">{invoice.description}</p><p className="text-sm text-[#AAAAAA] mt-2">Jatuh tempo: {new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Jakarta" }).format(new Date(invoice.dueDate))}</p></div><div><p className="font-semibold">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(invoice.amount)}</p><p className="text-sm text-[#AAAAAA] mt-2">{invoice.status === "paid" ? "Lunas" : invoice.status === "expired" ? "Kedaluwarsa" : "Menunggu pembayaran"}</p>{invoice.status === "pending" && (sandboxReady ? <form action={payInvoice} className="mt-4"><input type="hidden" name="invoiceId" value={invoice.id} /><button className="bg-white text-black px-4 py-2 text-sm font-semibold">Bayar dengan iPaymu Sandbox</button></form> : <p className="text-sm text-[#AAAAAA] mt-2">Hubungi tim kami untuk detail pembayaran.</p>)}</div></article>)}</div>}</section>
  </div></main>;
}
