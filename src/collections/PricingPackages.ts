import type { CollectionConfig } from "payload";

export const PricingPackages: CollectionConfig = {
  slug: "pricing-packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "updatedAt"],
  },
  access: {
    read: () => true,
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
