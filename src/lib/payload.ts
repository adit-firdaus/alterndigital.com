import { getPayload } from "payload";
import { cache } from "react";

import config from "@payload-config";

/** Single Payload instance per request (Next.js cache). */
export const getPayloadCached = cache(async () => getPayload({ config }));
