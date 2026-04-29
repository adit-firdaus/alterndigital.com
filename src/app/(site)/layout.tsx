import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSite, getFooterServices } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  if (!site) {
    return { title: "PT ALTERN DIGITAL TECHNOLOGIES" };
  }
  return {
    title: site.metaTitle,
    description: site.metaDescription,
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();
  if (!site) {
    return (
      <html lang="id" className="h-full">
        <body className={`${inter.className} min-h-full antialiased bg-black text-white`}>
          <p className="p-8 text-center text-sm text-[#AAAAAA]">
            Site configuration missing. Set <code className="text-white">DATABASE_URL</code> and{" "}
            <code className="text-white">PAYLOAD_SECRET</code>, then run{" "}
            <code className="text-white">bun run seed</code>.
          </p>
          {children}
        </body>
      </html>
    );
  }

  const services = await getFooterServices();

  return (
    <html lang="id" className="h-full">
      <body className={`${inter.className} min-h-full antialiased bg-black text-white`}>
        <Navbar />
        {children}
        <Footer
          site={site}
          services={services.map((s) => ({ slug: s.slug, footerNavLabel: s.footerNavLabel }))}
        />
        <WhatsAppButton />
      </body>
    </html>
  );
}
