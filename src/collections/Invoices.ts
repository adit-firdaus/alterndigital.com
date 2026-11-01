import type { CollectionConfig } from "payload";
import { isStaff, staffOnly } from "@/lib/portal/access";

export const Invoices: CollectionConfig = {
  slug: "invoices",
  admin: { useAsTitle: "number", defaultColumns: ["number", "customer", "amount", "status", "dueDate"] },
  access: {
    read: ({ req }) => isStaff(req.user) ? true : req.user?.collection === "customers" ? { customer: { equals: req.user.id } } : false,
    create: staffOnly, update: staffOnly, delete: staffOnly,
  },
  hooks: {
    beforeValidate: [async ({ data, originalDoc, req }) => {
      const customer = data?.customer ?? originalDoc?.customer;
      const orderValue = data?.order ?? originalDoc?.order;
      const amount = data?.amount ?? originalDoc?.amount;
      const customerId = typeof customer === "object" && customer !== null ? customer.id : customer;
      const orderId = typeof orderValue === "object" && orderValue !== null ? orderValue.id : orderValue;
      if (originalDoc?.id && ((data?.amount !== undefined && data.amount !== originalDoc.amount) || (data?.customer !== undefined && String(customerId) !== String(typeof originalDoc.customer === "object" ? originalDoc.customer.id : originalDoc.customer)) || (data?.order !== undefined && String(orderId) !== String(typeof originalDoc.order === "object" ? originalDoc.order.id : originalDoc.order)))) {
        const attempts = await req.payload.find({ collection: "payment-attempts", where: { invoice: { equals: originalDoc.id } }, limit: 1, req });
        if (attempts.totalDocs) throw new Error("Invoice amount and ownership cannot change after checkout starts.");
      }
      if (amount != null && (!Number.isSafeInteger(amount) || amount < 1)) throw new Error("Invoice amount must be a positive whole number of rupiah.");
      if (customerId && orderId) {
        const order = await req.payload.findByID({ collection: "orders", id: orderId, depth: 0, req });
        const ownerId = typeof order.customer === "object" ? order.customer.id : order.customer;
        if (String(ownerId) !== String(customerId)) throw new Error("Invoice customer must match the order customer.");
        if (!originalDoc?.id || data?.customer !== undefined || data?.order !== undefined) {
          const account = await req.payload.findByID({ collection: "customers", id: customerId, depth: 0, req });
          if (!account.identityConfirmed) throw new Error("Confirm the customer identity before issuing an invoice.");
        }
      }
      return data;
    }],
  },
  fields: [
    { name: "number", type: "text", required: true, unique: true },
    { name: "customer", type: "relationship", relationTo: "customers", required: true, index: true },
    { name: "order", type: "relationship", relationTo: "orders", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "amount", type: "number", required: true, min: 1 },
    { name: "dueDate", type: "date", required: true },
    { name: "status", type: "select", required: true, defaultValue: "pending", options: ["pending", "paid", "expired"] },
  ],
};
