import "dotenv/config";

import { getPayload } from "payload";

import config from "@payload-config";
import { siteGlobalSeed } from "./site-global-defaults";
import { seedPortfolio, seedServices } from "./site-data";

async function upsertService() {
  const payload = await getPayload({ config });

  for (const s of seedServices) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
    });

    const data = {
      slug: s.slug,
      icon: s.icon,
      sortOrder: s.sortOrder,
      cardSubtitle: s.cardSubtitle,
      cardTitle: s.cardTitle,
      cardDescription: s.cardDescription,
      title: s.title,
      titleID: s.titleID,
      tagline: s.tagline,
      taglineID: s.taglineID,
      description: s.description,
      descEN: s.descEN,
      features: s.features.map((line) => ({ line })),
      processSteps: s.processSteps.map((p) => ({
        step: p.step,
        title: p.title,
        description: p.description,
      })),
      technologies: s.technologies.map((name) => ({ name })),
      waText: s.waText,
      footerNavLabel: s.footerNavLabel,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "services",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({
        collection: "services",
        data,
      });
    }
  }

  for (const item of seedPortfolio) {
    const existing = await payload.find({
      collection: "portfolio-items",
      where: { title: { equals: item.title } },
      limit: 1,
    });
    const data = {
      title: item.title,
      category: item.category,
      year: item.year,
      imageUrl: item.imageUrl,
      sortOrder: item.sortOrder,
    };
    if (existing.docs[0]) {
      await payload.update({
        collection: "portfolio-items",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({ collection: "portfolio-items", data });
    }
  }

  const existingPricing = await payload.find({
    collection: "pricing-packages",
    limit: 100,
    pagination: false,
  });
  for (const p of existingPricing.docs) {
    await payload.delete({
      collection: "pricing-packages",
      id: p.id,
    });
  }

  await payload.updateGlobal({
    slug: "site",
    data: siteGlobalSeed,
  });

  console.log("Seed completed: site global, services, portfolio-items.");
}

upsertService().catch((e) => {
  console.error(e);
  process.exit(1);
});
