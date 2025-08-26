import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import { LoaderFunctionArgs } from "react-router";
import { getPublicBlogsServerSide } from "./services/blog/server-services";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // @ts-ignore
  const { routes } = await import("virtual:react-router/server-build");
  console.log("Routes structure:", JSON.stringify(routes, null, 2));
  const { origin } = new URL(request.url);

  // Function to determine priority and changefreq based on route data
  const getRouteMetadata = (routeId: string, routePath: string) => {
    // Landing pages - high priority
    if (routeId.startsWith("pages/public-pages/landings/")) {
      return { priority: "0.9", changefreq: "monthly" };
    }

    // Main public pages - medium-high priority
    if (routeId.startsWith("pages/public-pages/")) {
      return { priority: "0.7", changefreq: "monthly" };
    }

    // Home page - high priority
    if (routePath === "/" || routePath === "") {
      return { priority: "1.0", changefreq: "monthly" };
    }

    // Default for other pages
    return { priority: "0.5", changefreq: "monthly" };
  };

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
    console.error("Error fetching blogs for sitemap:", error);
  }

  const sitemap = await generateRemixSitemap({
    domain: origin,
    ignore: [
      "/analytics/*",
      "/accept-invitation/*",
      "/analytics",
      "/invoice/*",
      "/shop-management",
    ],
    routes,
  });

  // Enhance the generated sitemap with custom priority and changefreq
  let enhancedSitemap = sitemap;

  // Extract URLs from the original sitemap and enhance them
  const urlMatches = sitemap.match(/<url>[\s\S]*?<\/url>/g);

  if (urlMatches) {
    urlMatches.forEach((originalUrl: string) => {
      const locMatch = originalUrl.match(/<loc>(.*?)<\/loc>/);
      if (locMatch) {
        const fullUrl = locMatch[1];
        const path = fullUrl.replace(origin, "").replace(/^\//, ""); // Remove leading slash

        // Find matching route to get route ID
        let routeId = "";

        // Search through routes to find matching path
        const findRouteId = (routesObj: any, targetPath: string): string => {
          if (typeof routesObj === "object" && routesObj !== null) {
            for (const [key, value] of Object.entries(routesObj)) {
              if (typeof value === "object" && value !== null) {
                const route = value as any;
                if (
                  route.path === targetPath ||
                  route.path === `/${targetPath}`
                ) {
                  return route.id || key;
                }
                // Recursively search in nested routes
                const nestedResult = findRouteId(route, targetPath);
                if (nestedResult) return nestedResult;
              }
            }
          }
          return "";
        };

        routeId = findRouteId(routes, path);

        const metadata = getRouteMetadata(routeId, path);

        // Create enhanced URL with priority and changefreq
        const enhancedUrl = originalUrl.replace(
          /<\/loc>/,
          `</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${metadata.changefreq}</changefreq>
    <priority>${metadata.priority}</priority>`
        );

        enhancedSitemap = enhancedSitemap.replace(originalUrl, enhancedUrl);
      }
    });
  }

  // If the sitemap generator doesn't support additionalPaths, we'll manually add blog URLs
  if (allBlogs.length > 0) {
    // Get unique categories for category routes
    const categories = [
      ...new Set(
        allBlogs
          .filter((blog) => blog.isVisible && blog.category)
          .map((blog) => blog.category)
      ),
    ];

    // Create blog URLs with image information
    const blogUrls = allBlogs
      .filter((blog) => blog.isVisible && blog.slug) // Only include visible blogs with slugs
      .map((blog) => {
        const lastmod = blog.updatedAt || blog.createdAt;
        const priority = blog.isFeatured ? "0.8" : "0.6";

        // Add image information if available
        const imageTag = blog.image
          ? `
    <image:image>
      <image:loc>${blog.image.startsWith("http") ? blog.image : `${origin}${blog.image}`}</image:loc>
      <image:title>${blog.title.replace(
        /[<>&"']/g,
        (char) =>
          ({
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&apos;",
          })[char] || char
      )}</image:title>
      <image:caption>${(blog.searchEngineSummary || blog.title).replace(
        /[<>&"']/g,
        (char) =>
          ({
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&apos;",
          })[char] || char
      )}</image:caption>
    </image:image>`
          : "";

        return `  <url>
    <loc>${origin}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`;
      })
      .join("\n");

    // Create category URLs
    const categoryUrls = categories
      .map((category) => {
        return `  <url>
    <loc>${origin}/blogs/categories/${encodeURIComponent(category)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("\n");

    // Insert blog and category URLs into the sitemap before the closing </urlset> tag
    // Also add image namespace to the sitemap
    let modifiedSitemap = enhancedSitemap.replace(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
    );

    modifiedSitemap = modifiedSitemap.replace(
      "</urlset>",
      `${blogUrls}\n${categoryUrls}\n</urlset>`
    );

    return new Response(modifiedSitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }

  return new Response(enhancedSitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
