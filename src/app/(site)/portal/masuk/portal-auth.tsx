"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalAuth() {
  const router = useRouter();
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    try {
      if (register) {
        const created = await fetch("/api/customers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(form.get("name") || "").trim(), email, password }) });
        if (!created.ok) throw new Error("Pendaftaran gagal. Periksa data atau gunakan email lain.");
      }
      const response = await fetch("/api/customers/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (!response.ok) throw new Error("Email atau kata sandi tidak sesuai.");
      router.push("/portal"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi."); }
    finally { setBusy(false); }
  }
  const inputClass = "w-full bg-white/5 border border-white/20 px-4 py-3 text-white mt-2";
  return <div className="max-w-md"><h1 className="text-4xl font-bold mb-4">{register ? "Buat akun" : "Masuk ke portal"}</h1><p className="text-[#AAAAAA] mb-8">Pantau permintaan dan invoice Anda di satu tempat.</p><form onSubmit={submit} className="space-y-5">
    {register && <label className="block text-sm">Nama<input className={inputClass} name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>}
    <label className="block text-sm">Email<input className={inputClass} name="email" type="email" required autoComplete="email" /></label>
    <label className="block text-sm">Kata sandi<input className={inputClass} name="password" type="password" required minLength={10} autoComplete={register ? "new-password" : "current-password"} /></label>
    {error && <p role="alert" className="text-red-300 text-sm">{error}</p>}
    <button disabled={busy} className="bg-white text-black px-6 py-3 font-semibold disabled:opacity-50">{busy ? "Memproses…" : register ? "Daftar" : "Masuk"}</button>
  </form><button type="button" className="mt-6 text-sm underline" onClick={() => { setRegister(!register); setError(""); }}>{register ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}</button><p className="text-[#AAAAAA] text-sm mt-5">Lupa kata sandi? Hubungi tim melalui kontak di bagian bawah halaman untuk bantuan.</p></div>;
}
