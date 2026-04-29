import { Code2, Globe, MonitorCog, Smartphone } from "lucide-react";

import type { Service } from "@/payload-types";

type IconKey = Service["icon"];

const detailClass = "w-12 h-12 stroke-1";
const cardClass = "w-8 h-8 stroke-1";

export function ServiceIconCard({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "code2":
      return <Code2 className={cardClass} />;
    case "globe":
      return <Globe className={cardClass} />;
    case "smartphone":
      return <Smartphone className={cardClass} />;
    case "monitor-cog":
      return <MonitorCog className={cardClass} />;
    default:
      return <Code2 className={cardClass} />;
  }
}

export function ServiceIconDetail({ icon }: { icon: IconKey }) {
  switch (icon) {
    case "code2":
      return <Code2 className={detailClass} />;
    case "globe":
      return <Globe className={detailClass} />;
    case "smartphone":
      return <Smartphone className={detailClass} />;
    case "monitor-cog":
      return <MonitorCog className={detailClass} />;
    default:
      return <Code2 className={detailClass} />;
  }
}
