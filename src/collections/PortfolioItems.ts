import type { CollectionConfig } from "payload";
import { staffOnly } from "@/lib/portal/access";

export const PortfolioItems: CollectionConfig = {
  slug: "portfolio-items",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "updatedAt"],
  },
  access: {
    read: () => true,
    create: staffOnly, update: staffOnly, delete: staffOnly,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "year", type: "text", required: true },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description:
          "Optional external image URL (e.g. during migration). Used when no upload is set.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
