import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import { LoaderFunctionArgs } from "react-router";
import { getPublicBlogsServerSide } from "./services/blog/server-services";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // @ts-ignore
    const { routes } = await import("virtual:react-router/server-build");
    console.log(routes)
    const { origin } = new URL(request.url);

    // Fetch all blog data to include in sitemap
    let allBlogs: any[] = [];
    let page = 1;
    const limit = 50; // Fetch more blogs per page to reduce requests
    let hasMore = true;

    try {
        while (hasMore) {
            const blogsData = await getPublicBlogsServerSide({ page, limit });
            const blogs = blogsData.data || [];

            if (blogs.length === 0) {
                hasMore = false;
            } else {
                allBlogs = allBlogs.concat(blogs);
                page++;

                // If we got fewer blogs than the limit, we've reached the end
                if (blogs.length < limit) {
                    hasMore = false;
                }
            }
        }

        console.log(`Fetched ${allBlogs.length} blogs for sitemap`);
    } catch (error) {
        console.error('Error fetching blogs for sitemap:', error);
    }

    const sitemap = await generateRemixSitemap({
        domain: origin,
        ignore: ["/analytics/*", "/accept-invitation/*", "/analytics", "/invoice/*", "/shop-management"],
        routes
    });

    // If the sitemap generator doesn't support additionalPaths, we'll manually add blog URLs
    if (allBlogs.length > 0) {
        // Get unique categories for category routes
        const categories = [...new Set(allBlogs
            .filter(blog => blog.isVisible && blog.category)
            .map(blog => blog.category)
        )];

        // Create blog URLs with image information
        const blogUrls = allBlogs
            .filter(blog => blog.isVisible && blog.slug) // Only include visible blogs with slugs
            .map(blog => {
                const lastmod = blog.updatedAt || blog.createdAt;
                const priority = blog.isFeatured ? '0.8' : '0.6';

                // Add image information if available
                const imageTag = blog.image ? `
    <image:image>
      <image:loc>${blog.image.startsWith('http') ? blog.image : `${origin}${blog.image}`}</image:loc>
      <image:title>${blog.title.replace(/[<>&"']/g, (char) => ({
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    "'": '&apos;'
                }[char] || char))}</image:title>
      <image:caption>${(blog.searchEngineSummary || blog.title).replace(/[<>&"']/g, (char) => ({
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    "'": '&apos;'
                }[char] || char))}</image:caption>
    </image:image>` : '';

                return `  <url>
    <loc>${origin}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`;
            }).join('\n');

        // Create category URLs
        const categoryUrls = categories.map(category => {
            return `  <url>
    <loc>${origin}/blogs/categories/${encodeURIComponent(category)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        }).join('\n');

        // Insert blog and category URLs into the sitemap before the closing </urlset> tag
        // Also add image namespace to the sitemap
        let modifiedSitemap = sitemap.replace(
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
        );

        modifiedSitemap = modifiedSitemap.replace(
            '</urlset>',
            `${blogUrls}\n${categoryUrls}\n</urlset>`
        );

        return new Response(modifiedSitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    }

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
};