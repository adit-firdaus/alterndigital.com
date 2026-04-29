import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceIconDetail } from "@/lib/service-icons";
import { waServiceInterestUrl } from "@/lib/wa";
import type { Site } from "@/payload-types";

export type ServiceDetailView = {
  icon: "code2" | "globe" | "smartphone" | "monitor-cog";
  title: string;
  titleID: string;
  tagline: string;
  taglineID: string;
  description: string;
  descEN: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  technologies: string[];
  waText: string;
};

export default function ServiceDetailPage({
  service,
  site,
}: {
  service: ServiceDetailView;
  site: Site;
}) {
  const ctaHref = waServiceInterestUrl(site.whatsappE164, site.waLegalSuffix, service.waText);

  return (
    <div className="bg-black text-white min-h-screen">
      <section
        data-testid="service-detail-hero"
        className="pt-40 pb-24 bg-black border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <Link
            href="/"
            data-testid="back-to-home"
            className="inline-flex items-center gap-2 text-[#AAAAAA] text-xs uppercase tracking-widest mb-12 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-3 h-3" />
            Kembali ke Beranda / Back to Home
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="text-white flex-shrink-0">
              <ServiceIconDetail icon={service.icon} />
            </div>
            <div>
              <p className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-3">
                {service.tagline}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-3">
                {service.title}
              </h1>
              <p className="text-[#AAAAAA] text-lg md:text-xl">{service.titleID}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        data-testid="service-detail-description"
        className="py-24 border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-white text-base md:text-lg leading-relaxed mb-6">
              {service.description}
            </p>
            <p className="text-[#666666] text-sm leading-relaxed">{service.descEN}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-6">
              {site.serviceSectionFeaturesHeading}
            </p>
            <ul className="space-y-3">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-[#AAAAAA] text-sm">
                  <span className="text-white mt-0.5 font-bold">—</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        data-testid="service-detail-process"
        className="py-24 border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-3">
            {site.serviceSectionProcessEyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            {site.serviceSectionProcessTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10">
            {service.process.map((step, i) => (
              <div key={i} className="bg-black p-6">
                <p className="text-[#333333] text-3xl font-bold mb-4">{step.step}</p>
                <p className="text-white font-semibold text-sm mb-2">{step.title}</p>
                <p className="text-[#AAAAAA] text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-testid="service-detail-technologies"
        className="py-24 border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-6">
            {site.serviceSectionTechEyebrow}
          </p>
          <div className="flex flex-wrap gap-px bg-white/10 w-fit">
            {service.technologies.map((tech, i) => (
              <div
                key={i}
                className="bg-black px-6 py-4 text-[#AAAAAA] text-sm font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="service-detail-cta-section" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#666666] mb-4">{site.serviceCtaEyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{site.serviceCtaTitle}</h2>
          <p className="text-[#AAAAAA] text-base md:text-lg mb-12 max-w-xl mx-auto">{site.serviceCtaBody}</p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="service-detail-cta"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#EEEEEE] transition-colors duration-200"
          >
            {site.serviceCtaButtonLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
