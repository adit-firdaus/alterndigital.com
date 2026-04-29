import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "icon",
      type: "select",
      required: true,
      options: [
        { label: "Code", value: "code2" },
        { label: "Globe", value: "globe" },
        { label: "Smartphone", value: "smartphone" },
        { label: "Monitor / Cog", value: "monitor-cog" },
      ],
    },
    { name: "cardSubtitle", type: "text", required: true },
    { name: "cardTitle", type: "text", required: true },
    { name: "cardDescription", type: "textarea", required: true },
    { name: "title", type: "text", required: true },
    { name: "titleID", type: "text", required: true },
    { name: "tagline", type: "text", required: true },
    { name: "taglineID", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "descEN", type: "textarea", required: true },
    {
      name: "features",
      type: "array",
      minRows: 1,
      fields: [{ name: "line", type: "text", required: true }],
    },
    {
      name: "processSteps",
      type: "array",
      minRows: 1,
      fields: [
        { name: "step", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "technologies",
      type: "array",
      minRows: 1,
      fields: [{ name: "name", type: "text", required: true }],
    },
    { name: "waText", type: "text", required: true },
    {
      name: "footerNavLabel",
      type: "text",
      required: true,
      admin: {
        description: "Short label for footer & deep links (e.g. “Custom Software Development”).",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first on the homepage." },
    },
  ],
};
