import type { CollectionConfig } from "payload";
import { staffOnly } from "@/lib/portal/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: { create: staffOnly, read: staffOnly, update: staffOnly, delete: staffOnly, unlock: staffOnly },
  fields: [],
};
