import { MessageCircle, ArrowRight } from "lucide-react";
import { getSite } from "@/lib/site";
import { waMeUrl } from "@/lib/wa";

export default async function WhatsAppButton() {
  const site = await getSite();
  if (!site) return null;

  const href = waMeUrl(site.whatsappE164, site.whatsappDefaultMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-button"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-white text-black px-5 py-3 hover:bg-[#EEEEEE] transition-colors duration-200"
      style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
    >
      <MessageCircle className="w-4 h-4 flex-shrink-0" />
      <span className="text-xs font-bold uppercase tracking-wider">{site.floatButtonLabel}</span>
      <ArrowRight className="w-3 h-3 flex-shrink-0" />
    </a>
  );
}
