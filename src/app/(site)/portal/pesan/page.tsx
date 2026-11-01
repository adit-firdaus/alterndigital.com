import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadCached } from "@/lib/payload";
import { createOrder } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewOrderPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const payload = await getPayloadCached();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user || user.collection !== "customers") redirect("/portal/masuk");
  const { error } = await searchParams;
  const inputClass = "w-full bg-white/5 border border-white/20 px-4 py-3 text-white mt-2";
  return <main className="bg-black text-white min-h-screen pt-40 pb-24"><div className="max-w-2xl mx-auto px-6"><h1 className="text-4xl font-bold mb-4">Ceritakan kebutuhan Anda</h1><p className="text-[#AAAAAA] mb-8">Kami akan meninjau permintaan dan mendiskusikan penawaran sebelum Anda membayar.</p><form action={createOrder} className="space-y-5">
    <label className="block text-sm">Nama proyek<input className={inputClass} name="title" required minLength={3} maxLength={120} /></label>
    <label className="block text-sm">Layanan<select className={inputClass} name="category" required defaultValue=""><option value="" disabled>Pilih layanan</option><option value="mobile">Aplikasi mobile</option><option value="website">Website</option><option value="web_app">Aplikasi web</option><option value="server">Server</option><option value="consulting">Konsultasi</option></select></label>
    <label className="block text-sm">Kebutuhan<textarea className={inputClass} name="requirements" required minLength={10} maxLength={5000} rows={6} /><span className="block text-[#AAAAAA] mt-2">Jangan masukkan kata sandi, API key, atau data kartu pembayaran.</span></label>
    {error && <p role="alert" className="text-red-300">Mohon periksa kembali judul dan kebutuhan Anda.</p>}
    <button className="bg-white text-black px-6 py-3 font-semibold">Kirim permintaan</button>
  </form></div></main>;
}
