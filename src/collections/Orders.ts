import type { CollectionConfig } from "payload";
import { isStaff, staffOnly } from "@/lib/portal/access";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: { useAsTitle: "title", defaultColumns: ["title", "customer", "status", "updatedAt"] },
  access: {
    read: ({ req }) => isStaff(req.user) ? true : req.user?.collection === "customers" ? { customer: { equals: req.user.id } } : false,
    create: staffOnly, update: staffOnly, delete: staffOnly,
  },
  fields: [
    { name: "customer", type: "relationship", relationTo: "customers", required: true, index: true },
    { name: "title", type: "text", required: true },
    { name: "category", type: "select", required: true, options: ["mobile", "website", "web_app", "server", "consulting"] },
    { name: "requirements", type: "textarea", required: true },
    { name: "status", type: "select", required: true, defaultValue: "submitted", options: ["submitted", "quoted", "in_progress", "completed"] },
    { name: "progressNote", type: "textarea" },
  ],
};
