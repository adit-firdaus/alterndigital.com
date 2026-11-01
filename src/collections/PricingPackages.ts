import type { CollectionConfig } from "payload";
import { staffOnly } from "@/lib/portal/access";

export const PricingPackages: CollectionConfig = {
  slug: "pricing-packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "updatedAt"],
  },
  access: {
    read: () => true,
    create: staffOnly, update: staffOnly, delete: staffOnly,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "price", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "features",
      type: "array",
      minRows: 1,
      fields: [{ name: "line", type: "text", required: true }],
    },
    { name: "waText", type: "text", required: true },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
