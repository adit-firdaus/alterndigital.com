import type { CollectionConfig } from "payload";
import { isStaff, staffOnly } from "@/lib/portal/access";

export const Customers: CollectionConfig = {
  slug: "customers",
  auth: { verify: false, maxLoginAttempts: 5, lockTime: 600000, removeTokenFromResponses: true },
  admin: { useAsTitle: "email" },
  access: {
    create: () => true,
    read: ({ req }) => isStaff(req.user) ? true : req.user?.collection === "customers" ? { id: { equals: req.user.id } } : false,
    update: ({ req }) => isStaff(req.user) ? true : req.user?.collection === "customers" ? { id: { equals: req.user.id } } : false,
    delete: staffOnly,
    unlock: staffOnly,
  },
  hooks: {
    beforeOperation: [({ args, operation }) => {
      if ((operation === "create" || operation === "update") && "data" in args && args.data && "password" in args.data && typeof args.data.password === "string" && args.data.password.length < 10) throw new Error("Password must be at least 10 characters.");
      return args;
    }],
  },
  fields: [
    { name: "name", type: "text", required: true, minLength: 2, maxLength: 120 },
    { name: "password", type: "text", minLength: 10, virtual: true, hidden: true },
    { name: "identityConfirmed", type: "checkbox", defaultValue: false, access: { create: staffOnly, update: staffOnly }, admin: { description: "Confirm identity through an independent channel before assigning invoices." } },
  ],
};
