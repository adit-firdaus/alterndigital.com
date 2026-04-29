import { notFound } from "next/navigation";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getSite } from "@/lib/site";
import { getPayloadCached } from "@/lib/payload";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [site, payload] = await Promise.all([getSite(), getPayloadCached()]);

  if (!site) notFound();

  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
  });

  const doc = docs[0];
  if (!doc) notFound();

  const features = (doc.features ?? []).map((row) => row.line);
  const process = (doc.processSteps ?? []).map((row) => ({
    step: row.step,
    title: row.title,
    desc: row.description,
  }));
  const technologies = (doc.technologies ?? []).map((row) => row.name);

  return (
    <ServiceDetailPage
      site={site}
      service={{
        icon: doc.icon as "code2" | "globe" | "smartphone" | "monitor-cog",
        title: doc.title,
        titleID: doc.titleID,
        tagline: doc.tagline,
        taglineID: doc.taglineID,
        description: doc.description,
        descEN: doc.descEN,
        features,
        process,
        technologies,
        waText: doc.waText,
      }}
    />
  );
}
