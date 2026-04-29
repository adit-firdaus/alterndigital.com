import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import type { Service, Site } from "@/payload-types";
import { waMeUrl } from "@/lib/wa";

type FooterProps = {
  site: Site;
  services: Pick<Service, "slug" | "footerNavLabel">[];
};

export default function Footer({ site, services }: FooterProps) {
  const phoneWaHref = waMeUrl(site.whatsappE164, site.whatsappDefaultMessage);

  return (
    <footer
      id="kontak"
      data-testid="footer"
      className="bg-black border-t border-white/10 pt-16 pb-8"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-5">
              <p className="text-white font-bold text-xl tracking-[0.15em] uppercase">{site.brandShort}</p>
              <p className="text-[#666666] text-[10px] tracking-wider uppercase mt-1">{site.brandLegal}</p>
            </div>
            <p className="text-[#AAAAAA] text-sm leading-relaxed">
              {site.footerTaglineLine1}
              <br />
              {site.footerTaglineLine2}
              <br />
              {site.footerTaglineLine3}
            </p>
          </div>

          <div>
            <p className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {site.footerContactTitle}
            </p>
            <div className="space-y-3">
              <a
                href={phoneWaHref}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp"
                className="flex items-start gap-3 text-[#AAAAAA] text-sm hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-1" />
                <span>{site.footerPhoneDisplay}</span>
              </a>
              <a
                href={`mailto:${site.footerEmailAddress}`}
                data-testid="footer-email"
                className="flex items-start gap-3 text-[#AAAAAA] text-sm hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-1" />
                <span>{site.footerEmailDisplay}</span>
              </a>
              <div className="flex items-start gap-3 text-[#AAAAAA] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-1" />
                <span>
                  {site.footerAddressLine1}
                  <br />
                  {site.footerAddressLine2}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {site.footerServicesTitle}
            </p>
            <div className="space-y-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/layanan/${s.slug}`}
                  data-testid={`footer-link-${s.slug}`}
                  className="block text-[#AAAAAA] text-sm hover:text-white transition-colors duration-200"
                >
                  {s.footerNavLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#666666] text-xs">{site.footerCopyright}</p>
          <p className="text-[#666666] text-xs">{site.footerBottomLine}</p>
        </div>
      </div>
    </footer>
  );
}
