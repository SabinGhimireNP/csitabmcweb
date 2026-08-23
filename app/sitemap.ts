import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

type ChangeFrequency =
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

interface SitemapEntry {
    url: string;
    lastModified: Date;
    changeFrequency: ChangeFrequency;
    priority: number;
}

// Static routes configuration
const staticRoutes: Array<{
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
}> = [
        { path: "", changeFrequency: "weekly", priority: 1.0 },
        { path: "/about", changeFrequency: "monthly", priority: 0.8 },
        { path: "/events", changeFrequency: "daily", priority: 0.9 },
        { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
        { path: "/notices", changeFrequency: "daily", priority: 0.8 },
        { path: "/certificate", changeFrequency: "monthly", priority: 0.5 },
    ];

// Fetch with timeout to prevent build hanging
async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = 5000
): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, {
            ...options,
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeout);
    }
}

// Fetch dynamic events from Strapi
async function fetchEvents(): Promise<
    Array<{ documentId: string; updatedAt: string }>
> {
    const apiUrl = process.env.STRAPI_API_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiUrl || !apiToken) return [];

    try {
        const res = await fetchWithTimeout(
            `${apiUrl}/events?fields[0]=documentId&fields[1]=updatedAt`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

// Fetch dynamic notices from Strapi
async function fetchNotices(): Promise<
    Array<{ documentId: string; updatedAt: string }>
> {
    const apiUrl = process.env.STRAPI_API_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiUrl || !apiToken) return [];

    try {
        const res = await fetchWithTimeout(
            `${apiUrl}/notices?fields[0]=documentId&fields[1]=updatedAt`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

// Fetch team members from Strapi
async function fetchMembers(): Promise<
    Array<{ documentId: string; updatedAt: string }>
> {
    const apiUrl = process.env.STRAPI_API_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;

    if (!apiUrl || !apiToken) return [];

    try {
        const res = await fetchWithTimeout(
            `${apiUrl}/members?fields[0]=documentId&fields[1]=updatedAt`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url;
    const now = new Date();

    // Static routes
    const staticEntries: SitemapEntry[] = staticRoutes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // Dynamic event routes
    const events = await fetchEvents();
    const eventEntries: SitemapEntry[] = events.map((event) => ({
        url: `${baseUrl}/events/${event.documentId}`,
        lastModified: new Date(event.updatedAt),
        changeFrequency: "weekly" as ChangeFrequency,
        priority: 0.7,
    }));

    // Dynamic notice routes
    const notices = await fetchNotices();
    const noticeEntries: SitemapEntry[] = notices.map((notice) => ({
        url: `${baseUrl}/notices/${notice.documentId}`,
        lastModified: new Date(notice.updatedAt),
        changeFrequency: "weekly" as ChangeFrequency,
        priority: 0.6,
    }));

    // Dynamic member routes
    const members = await fetchMembers();
    const memberEntries: SitemapEntry[] = members.map((member) => ({
        url: `${baseUrl}/mb/${member.documentId}`,
        lastModified: new Date(member.updatedAt),
        changeFrequency: "monthly" as ChangeFrequency,
        priority: 0.5,
    }));

    return [...staticEntries, ...eventEntries, ...noticeEntries, ...memberEntries];
}
