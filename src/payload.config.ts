import path from "path";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { PortfolioItems } from "./collections/PortfolioItems";
import { PricingPackages } from "./collections/PricingPackages";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { Site } from "./globals/Site";

/** Payload admin import map & generated types live next to this file. */
const baseDir = path.resolve(process.cwd(), "src");

const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const r2Enabled = Boolean(
  process.env.R2_BUCKET &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_ENDPOINT &&
    process.env.R2_PUBLIC_URL,
);

const allowSchemaPush =
  process.env.NODE_ENV === "development" || process.env.ALLOW_PAYLOAD_SCHEMA_PUSH === "true";

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir,
    },
  },
  collections: [Users, Media, Services, PricingPackages, PortfolioItems],
  globals: [Site],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(baseDir, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: allowSchemaPush,
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: r2Enabled,
      clientUploads: true,
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const publicBase = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `${publicBase}/${key}`;
          },
        },
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
  ],
});
