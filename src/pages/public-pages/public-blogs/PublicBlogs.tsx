import { Box, Flex } from "@chakra-ui/react";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import arLocale from "locales/public-pages/public-blogs/ar.json";
import enLocale from "locales/public-pages/public-blogs/en.json";
import React from "react";
import { useLoaderData } from "react-router";
import { getPublicBlogsServerSide } from "services/blog/server-services";
import { LazyLoad } from "../landings/_shared/components/LazyLoad";
import MaxWidthWrapper from "../landings/_shared/components/MaxWidthWrapper";
import SignUpCta from "../landings/_shared/components/SignUpCta";
import BackgroundImage from "./components/common/BackgroundImage";
import BlogGrid from "./components/common/‌BlogGrid/BlogGrid";
import BlogsCarousel from "./components/common/BlogsCarousel/BlogsCarousel";
import Categories from "./components/TopCategoriesSection/TopCategoriesSection";
import LatestBlogsGrid from "./components/LatestBlogsGrid/LatestBlogsGrid";
import PublicBlogsHeader from "./components/PublicBlogsHeader";
import useBlogs from "./hooks/useBlogs";

export async function loader() {
    const initialBlogs = await getPublicBlogsServerSide({ page: 1, limit: 9 });
    console.log(initialBlogs)
    return {
        initialBlogs: initialBlogs.data || [],
        totalBlogs: initialBlogs.totalDocuments || 0,
    };
}

function BlogPage() {
    useLocaleResources("public-pages/public-blogs", {
        en: enLocale,
        ar: arLocale,
    });

    const { initialBlogs, totalBlogs } = useLoaderData<typeof loader>();
    const { blogs, isLoading, isFetching, hasMore, loadMore } = useBlogs(
        initialBlogs,
        totalBlogs
    );

    const sections = [
        { id: "blog-header", component: <PublicBlogsHeader /> },
        { id: "trending-grid", component: <LatestBlogsGrid /> },
        { id: "discover-slider", component: <BlogsCarousel /> },
        {
            id: "blog-grid",
            component: (
                <BlogGrid
                    blogs={blogs}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                />
            ),
        },
        { id: "categories", component: <Categories /> },
        { id: "sign-up-cta", component: <SignUpCta /> },
    ];

    return (
        <Box dir="ltr">
            <BackgroundImage zIndex={1} />

            {/* Content container */}
            <Box position="relative" zIndex={2}>
                <MaxWidthWrapper>
                    <Flex
                        direction="column"
                        gap={{ base: "80px", lg: "128px" }}
                    >
                        {sections.map((section) => (
                            <LazyLoad key={section.id}>
                                {section.component}
                            </LazyLoad>
                        ))}
                    </Flex>
                </MaxWidthWrapper>
            </Box>
        </Box>
    );
}

export default BlogPage;
