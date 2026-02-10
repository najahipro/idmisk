import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

export const getHomeLayout = unstable_cache(
    async () => {
        return await db.homeLayout.findFirst();
    },
    ["home-layout"],
    { revalidate: 3600 }
);

export const getSiteSettings = unstable_cache(
    async () => {
        return await db.siteSettings.findFirst();
    },
    ["site-settings"],
    { revalidate: 3600 }
);
