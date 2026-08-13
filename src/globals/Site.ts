import type { GlobalConfig } from "payload";

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site (SEO, brand, navigation, footer, home)",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "SEO",
          fields: [
            { name: "metaTitle", type: "text", required: true },
            { name: "metaDescription", type: "textarea", required: true },
          ],
        },
        {
          label: "Brand",
          fields: [
            { name: "brandShort", type: "text", required: true },
            { name: "brandLegal", type: "text", required: true },
          ],
        },
        {
          label: "WhatsApp",
          fields: [
            {
              name: "whatsappE164",
              type: "text",
              required: true,
              admin: { description: "Country + number, no + (e.g. 6282331565165)." },
            },
            {
              name: "whatsappDefaultMessage",
              type: "textarea",
              required: true,
              admin: {
                description: "Plain text for hero / float / navbar CTA (URL-encoded automatically).",
              },
            },
            {
              name: "waLegalSuffix",
              type: "text",
              required: true,
              defaultValue: "ALTERN DIGITAL TECHNOLOGIES.",
              admin: {
                description: "Appended after pricing/service waText in generated WhatsApp links.",
              },
            },
          ],
        },
        {
          label: "Navigation",
          fields: [
            { name: "navbarCtaLabel", type: "text", required: true },
            {
              name: "navItems",
              type: "array",
              minRows: 1,
              fields: [
                { name: "label", type: "text", required: true },
                {
                  name: "hash",
                  type: "text",
                  required: true,
                  admin: { description: "Anchor e.g. #beranda" },
                },
              ],
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            { name: "footerTaglineLine1", type: "text", required: true },
            { name: "footerTaglineLine2", type: "text", required: true },
            { name: "footerTaglineLine3", type: "text", required: true },
            { name: "footerContactTitle", type: "text", required: true },
            { name: "footerPhoneDisplay", type: "text", required: true },
            { name: "footerEmailDisplay", type: "text", required: true },
            { name: "footerEmailAddress", type: "text", required: true },
            { name: "footerAddressLine1", type: "text", required: true },
            { name: "footerAddressLine2", type: "textarea", required: true },
            { name: "footerServicesTitle", type: "text", required: true },
            { name: "footerCopyright", type: "text", required: true },
            { name: "footerBottomLine", type: "text", required: true },
          ],
        },
        {
          label: "Home",
          fields: [
            { name: "heroKicker", type: "text", required: true },
            { name: "heroTitleLine1", type: "text", required: true },
            { name: "heroTitleLine2", type: "text", required: true },
            { name: "heroSubtitle", type: "textarea", required: true },
            { name: "heroCtaLabel", type: "text", required: true },
            { name: "servicesEyebrow", type: "text", required: true },
            { name: "servicesTitle", type: "text", required: true },
            { name: "servicesSubtitle", type: "text", required: true },
            { name: "servicesMoreLabel", type: "text", required: true, defaultValue: "Selengkapnya" },
            { name: "pricingEyebrow", type: "text", required: true },
            { name: "pricingTitle", type: "text", required: true },
            { name: "pricingSubtitle", type: "text", required: true },
            { name: "pricingCardWaLabel", type: "text", required: true },
            { name: "aboutEyebrow", type: "text", required: true },
            { name: "aboutTitleLine1", type: "text", required: true },
            { name: "aboutTitleLine2", type: "text", required: true },
            { name: "aboutBody1", type: "textarea", required: true },
            { name: "aboutBody2", type: "textarea", required: true },
            {
              name: "homeStats",
              type: "array",
              minRows: 1,
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "labelEN", type: "text", required: true },
              ],
            },
            { name: "portfolioEyebrow", type: "text", required: true },
            { name: "portfolioTitle", type: "text", required: true },
            { name: "portfolioSubtitle", type: "text", required: true },
            { name: "contactCtaEyebrow", type: "text", required: true },
            { name: "contactCtaTitle", type: "text", required: true },
            { name: "contactCtaBody", type: "textarea", required: true },
            { name: "contactCtaButtonLabel", type: "text", required: true },
          ],
        },
        {
          label: "Service detail pages",
          fields: [
            {
              name: "serviceSectionFeaturesHeading",
              type: "text",
              required: true,
              defaultValue: "Yang Kami Kerjakan / What We Do",
            },
            {
              name: "serviceSectionProcessEyebrow",
              type: "text",
              required: true,
              defaultValue: "Proses Kerja / Our Process",
            },
            {
              name: "serviceSectionProcessTitle",
              type: "text",
              required: true,
              defaultValue: "Bagaimana Kami Bekerja",
            },
            {
              name: "serviceSectionTechEyebrow",
              type: "text",
              required: true,
              defaultValue: "Teknologi / Technologies",
            },
            { name: "serviceCtaEyebrow", type: "text", required: true },
            { name: "serviceCtaTitle", type: "text", required: true },
            { name: "serviceCtaBody", type: "textarea", required: true },
            { name: "serviceCtaButtonLabel", type: "text", required: true },
          ],
        },
        {
          label: "Floating button",
          fields: [{ name: "floatButtonLabel", type: "text", required: true }],
        },
      ],
    },
  ],
};
