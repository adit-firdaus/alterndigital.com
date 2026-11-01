const categories = ["mobile", "website", "web_app", "server", "consulting"] as const;
type Category = (typeof categories)[number];

export function parseOrder(input: Record<string, unknown>): { title: string; category: Category; requirements: string } | null {
  const { title, category, requirements } = input;
  if (typeof title !== "string" || typeof category !== "string" || typeof requirements !== "string") return null;
  const name = title.trim();
  const details = requirements.trim();
  if (name.length < 3 || name.length > 120 || details.length < 10 || details.length > 5000 || !categories.includes(category as Category)) return null;
  return { title: name, category: category as Category, requirements: details };
}
