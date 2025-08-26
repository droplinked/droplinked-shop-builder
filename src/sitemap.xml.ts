import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // @ts-ignore
    const { routes } = await import("virtual:react-router/server-build");
    console.log(routes)
    const { origin } = new URL(request.url);
    const sitemap = await generateRemixSitemap({
        domain: origin,
        ignore: ["/analytics/*", "/accept-invitation/*", "/analytics", "/invoice/*", "/shop-management"],
        routes
    });

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
};