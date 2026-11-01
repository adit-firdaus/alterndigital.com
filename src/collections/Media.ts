import type { CollectionConfig } from "payload";
import { staffOnly } from "@/lib/portal/access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: staffOnly, update: staffOnly, delete: staffOnly,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
