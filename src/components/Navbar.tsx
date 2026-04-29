import { getSite } from "@/lib/site";
import { waMeUrl } from "@/lib/wa";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const site = await getSite();
  if (!site) return null;

  const waHref = waMeUrl(site.whatsappE164, site.whatsappDefaultMessage);
  const navItems = (site.navItems ?? []).map((row) => ({
    label: row.label,
    hash: row.hash,
  }));

  return (
    <NavbarClient
      brandShort={site.brandShort}
      brandLegal={site.brandLegal}
      navItems={navItems}
      waHref={waHref}
      ctaLabel={site.navbarCtaLabel}
    />
  );
}
