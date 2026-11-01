"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return <button className="text-sm underline" onClick={async () => { const response = await fetch("/api/customers/logout", { method: "POST" }); if (response.ok) { router.push("/portal/masuk"); router.refresh(); } }}>Keluar</button>;
}
