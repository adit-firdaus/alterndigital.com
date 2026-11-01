import PortalAuth from "./portal-auth";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <main className="bg-black text-white min-h-screen pt-40 pb-24"><div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24"><PortalAuth /></div></main>;
}
