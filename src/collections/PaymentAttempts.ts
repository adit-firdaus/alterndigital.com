import type { CollectionConfig } from "payload";
import { staffOnly } from "@/lib/portal/access";

export const PaymentAttempts: CollectionConfig = {
  slug: "payment-attempts",
  admin: { useAsTitle: "reference", defaultColumns: ["reference", "invoice", "status", "createdAt"] },
  access: { create: staffOnly, read: staffOnly, update: staffOnly, delete: () => false },
  fields: [
    { name: "reference", type: "text", required: true, unique: true },
    { name: "invoice", type: "relationship", relationTo: "invoices", required: true, unique: true },
    { name: "status", type: "select", required: true, defaultValue: "creating", options: ["creating", "pending", "paid", "expired", "review"] },
    { name: "sessionId", type: "text" },
    { name: "checkoutUrl", type: "text" },
    { name: "transactionId", type: "text" },
  ],
};
