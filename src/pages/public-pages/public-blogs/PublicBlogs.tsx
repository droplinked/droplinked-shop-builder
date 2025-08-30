import { Box, Flex } from "@chakra-ui/react";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import arLocale from "locales/public-pages/public-blogs/ar.json";
import enLocale from "locales/public-pages/public-blogs/en.json";
import React from "react";
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

export function meta() {
    return [
        { title: "The Droplinked Blog | Product Updates, Features & Onchain News" },
        {
            name: "description",
            content: "Get the latest Droplinked news, feature announcements, and updates on new blockchain integrations. The official Droplinked blog is your #1 source for product information.",
        },
        {
            name: "keywords",
            content: "Droplinked News, Onchain Commerce, Product Feature Updates, Blockchain Integrations",
        },
        {
            property: "og:title",
            content: "The Droplinked Blog | Product Updates, Features & Onchain News",
        },
        {
            property: "og:description",
            content: "Get the latest Droplinked news, feature announcements, and updates on new blockchain integrations. The official Droplinked blog is your #1 source for product information.",
        },
    ];
}

function BlogPage() {
    useLocaleResources("public-pages/public-blogs", {
        en: enLocale,
        ar: arLocale,
    });
    const { blogs, isLoading, isFetching, hasMore, loadMore } = useBlogs();

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
