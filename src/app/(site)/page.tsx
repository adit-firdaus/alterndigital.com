import HomePage from "@/components/HomePage";
import { getSite } from "@/lib/site";
import { getPayloadCached } from "@/lib/payload";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [site, payload] = await Promise.all([getSite(), getPayloadCached()]);

  if (!site) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-6 text-center text-[#AAAAAA] text-sm">
        Site global is empty. After setting env, run <code className="text-white">bun run seed</code>.
      </div>
    );
  }

  const [services, pricing, portfolio] = await Promise.all([
    payload.find({
      collection: "services",
      sort: "sortOrder",
      limit: 100,
      pagination: false,
    }),
    payload.find({
      collection: "pricing-packages",
      sort: "sortOrder",
      limit: 100,
      pagination: false,
    }),
    payload.find({
      collection: "portfolio-items",
      sort: "sortOrder",
      limit: 100,
      pagination: false,
      depth: 1,
    }),
  ]);

  return (
    <HomePage
      site={site}
      services={services.docs}
      pricingPackages={pricing.docs}
      portfolioItems={portfolio.docs}
    />
  );
}
