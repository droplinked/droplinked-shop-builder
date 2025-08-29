import { generateRobotsTxt } from "@forge42/seo-tools/robots";
import { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { origin, hostname } = new URL(request.url);

    // Block all crawlers on dev and staging environments
    if (hostname === 'dev.droplinked.com' || hostname === 'stage.droplinked.com') {
        const robotsConfig = [
            {
                userAgent: "*",
                disallow: ["/"], // Block everything
            },
        ];

        const robotsTxt = generateRobotsTxt(robotsConfig);
        return new Response(robotsTxt, {
            headers: {
                "Content-Type": "text/plain",
                "Cache-Control": "public, max-age=86400", // Cache for 24 hours
            },
        });
    }

    // Production configuration
    const robotsConfig = [
        {
            userAgent: "*",
            allow: ["/"],
            disallow: ["/analytics/*"],
            crawlDelay: 1, // Balanced for e-commerce platform
            sitemap: [`${origin}/sitemap.xml`],
        },
        {
            userAgent: "Googlebot",
            allow: ["/"],
            disallow: ["/analytics/*"],
            crawlDelay: 0.5, // Optimized for faster product indexing
            sitemap: [`${origin}/sitemap.xml`],
        },
        {
            userAgent: "Bingbot",
            allow: ["/"],
            disallow: ["/analytics/*"],
            crawlDelay: 0.8, // Slightly faster for Bing
            sitemap: [`${origin}/sitemap.xml`],
        },
        {
            userAgent: "facebookexternalhit",
            allow: ["/"],
            disallow: ["/analytics/*"],
            crawlDelay: 2, // Social media crawlers can be slower
            sitemap: [`${origin}/sitemap.xml`],
        },
    ];

    const robotsTxt = generateRobotsTxt(robotsConfig);

    return new Response(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400", // Cache for 24 hours
        },
    });
};
