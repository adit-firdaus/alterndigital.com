export type OrderStatus = "submitted" | "quoted" | "in_progress" | "completed";

export function orderSteps(status: OrderStatus) {
  const steps = [
    { key: "submitted", label: "Permintaan diterima" },
    { key: "quoted", label: "Penawaran disiapkan" },
    { key: "in_progress", label: "Sedang dikerjakan" },
    { key: "completed", label: "Selesai" },
  ] as const;
  const current = steps.findIndex((step) => step.key === status);
  return steps.map((step, index) => ({ ...step, state: index < current ? "done" : index === current ? "current" : "upcoming" }));
}
