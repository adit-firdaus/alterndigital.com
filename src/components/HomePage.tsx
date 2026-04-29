import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ServiceIconCard } from "@/lib/service-icons";
import { waMeUrl, waPricingInterestUrl } from "@/lib/wa";
import type { PortfolioItem, PricingPackage, Service, Site } from "@/payload-types";

function portfolioImageSrc(item: PortfolioItem): string {
  const img = item.image;
  if (img && typeof img === "object" && "url" in img && img.url) {
    return img.url;
  }
  return item.imageUrl || "";
}

const GeometricBg = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path
          d="M 80 0 L 0 0 0 80"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          strokeOpacity="0.05"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    {[
      [12, 22], [28, 42], [50, 18], [68, 52], [85, 28],
      [22, 65], [48, 72], [72, 78], [8, 48], [60, 38],
      [35, 88], [90, 62],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle
          cx={`${x}%`}
          cy={`${y}%`}
          r="3"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.18"
        />
        <circle cx={`${x}%`} cy={`${y}%`} r="1" fill="white" fillOpacity="0.12" />
      </g>
    ))}

    {[
      [12, 22, 28, 42], [28, 42, 50, 18], [50, 18, 68, 52],
      [68, 52, 85, 28], [28, 42, 22, 65], [22, 65, 48, 72],
      [48, 72, 72, 78], [50, 18, 60, 38], [60, 38, 68, 52],
      [8, 48, 22, 65], [72, 78, 90, 62], [35, 88, 48, 72],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
    ))}
  </svg>
);

export type HomePageProps = {
  site: Site;
  services: Service[];
  pricingPackages: PricingPackage[];
  portfolioItems: PortfolioItem[];
};

export default function HomePage({
  site,
  services,
  pricingPackages,
  portfolioItems,
}: HomePageProps) {
  const heroWa = waMeUrl(site.whatsappE164, site.whatsappDefaultMessage);
  const contactWa = heroWa;
  const stats = site.homeStats ?? [];

  return (
    <div className="bg-black text-white min-h-screen">
      <section
        id="beranda"
        data-testid="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
      >
        <GeometricBg />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-32 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#AAAAAA] mb-6">{site.heroKicker}</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
            {site.heroTitleLine1}
            <br />
            {site.heroTitleLine2}
          </h1>
          <p className="text-[#AAAAAA] text-base md:text-lg tracking-wide mb-12 max-w-2xl mx-auto">
            {site.heroSubtitle}
          </p>
          <a
            href={heroWa}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-button"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#EEEEEE] transition-colors duration-200"
          >
            {site.heroCtaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section
        id="layanan"
        data-testid="services-section"
        className="py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-3">{site.servicesEyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{site.servicesTitle}</h2>
            <p className="text-[#AAAAAA] mt-3 text-base md:text-lg">{site.servicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/layanan/${service.slug}`}
                data-testid={`service-card-${service.slug}`}
                className="bg-black p-8 group hover:bg-white/5 transition-colors duration-200 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="text-white mb-6 group-hover:text-[#AAAAAA] transition-colors duration-200">
                    <ServiceIconCard icon={service.icon} />
                  </div>
                  <p className="text-[#666666] text-xs uppercase tracking-widest mb-2">
                    {service.cardSubtitle}
                  </p>
                  <h3 className="text-lg font-bold text-white mb-3">{service.cardTitle}</h3>
                  <p className="text-[#AAAAAA] text-sm leading-relaxed">{service.cardDescription}</p>
                </div>
                <div className="flex items-center gap-2 text-[#666666] text-xs uppercase tracking-widest mt-6 group-hover:text-white transition-colors duration-200">
                  <span>{site.servicesMoreLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="harga"
        data-testid="pricing-section"
        className="py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-3">{site.pricingEyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{site.pricingTitle}</h2>
            <p className="text-[#AAAAAA] mt-3 text-base md:text-lg">{site.pricingSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.map((pkg, i) => (
              <div
                key={pkg.id}
                data-testid={`pricing-card-${i}`}
                className="bg-white p-8 flex flex-col hover:bg-[#f5f5f5] transition-colors duration-200"
              >
                <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-3">{pkg.name}</h3>
                <p className="text-3xl font-bold text-black mb-1">{pkg.price}</p>
                <p className="text-[#666666] text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {(pkg.features ?? []).map((row, j) => (
                    <li key={row.id ?? j} className="flex items-start gap-2 text-sm text-[#333333]">
                      <span className="text-black mt-0.5 font-bold">—</span>
                      <span>{row.line}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waPricingInterestUrl(
                    site.whatsappE164,
                    site.waLegalSuffix,
                    pkg.waText,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`pricing-wa-btn-${i}`}
                  className="flex items-center justify-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-4 hover:bg-[#333333] transition-colors duration-200"
                >
                  {site.pricingCardWaLabel}
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="tentang"
        data-testid="about-section"
        className="py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4">{site.aboutEyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8">
                {site.aboutTitleLine1}
                <br />
                {site.aboutTitleLine2}
              </h2>
              <p className="text-[#AAAAAA] text-base md:text-lg leading-relaxed mb-6">{site.aboutBody1}</p>
              <p className="text-[#666666] text-sm leading-relaxed">{site.aboutBody2}</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {stats.map((stat, i) => (
                <div key={stat.id ?? i} data-testid={`stat-${i}`} className="bg-black p-8">
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-[#AAAAAA] text-sm">{stat.label}</p>
                  <p className="text-[#666666] text-xs mt-0.5">{stat.labelEN}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="portofolio"
        data-testid="portfolio-section"
        className="py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-3">{site.portfolioEyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{site.portfolioTitle}</h2>
            <p className="text-[#AAAAAA] mt-3 text-base md:text-lg">{site.portfolioSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {portfolioItems.map((project, i) => {
              const src = portfolioImageSrc(project);
              return (
                <div
                  key={project.id}
                  data-testid={`portfolio-item-${i}`}
                  className="bg-black group overflow-hidden"
                >
                  <div className="relative overflow-hidden h-48">
                    {src ? (
                      <Image
                        src={src}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        style={{ filter: "grayscale(100%) contrast(1.1)" }}
                      />
                    ) : null}
                  </div>
                  <div className="p-6 border-t border-white/10">
                    <p className="text-[#666666] text-xs uppercase tracking-widest mb-2">
                      {project.category} &middot; {project.year}
                    </p>
                    <h3 className="text-white font-semibold text-base">{project.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-testid="contact-cta-section"
        className="py-32 bg-black border-t border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4">{site.contactCtaEyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">{site.contactCtaTitle}</h2>
          <p className="text-[#AAAAAA] text-base md:text-lg mb-12 max-w-xl mx-auto">{site.contactCtaBody}</p>
          <a
            href={contactWa}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-cta-button"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#EEEEEE] transition-colors duration-200"
          >
            {site.contactCtaButtonLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
