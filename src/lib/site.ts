import { getPayloadCached } from "@/lib/payload";

export async function getSite() {
  const payload = await getPayloadCached();
  const site = await payload.findGlobal({ slug: "site", depth: 0 });
  return site;
}

export async function getFooterServices() {
  const payload = await getPayloadCached();
  const { docs } = await payload.find({
    collection: "services",
    sort: "sortOrder",
    limit: 100,
    pagination: false,
  });
  return docs;
}
