import { Flex, Grid, Skeleton, Box } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from 'react-i18next';
import { IBlogListItem } from "../../../types/blog.types";
import BlogCard from "./BlogCard";
import AppButton from "components/redesign/button/AppButton";
import SectionTitle from "../SectionTitle";

interface BlogGridProps {
    blogs: IBlogListItem[];
    isLoading: boolean;
    isFetching?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    showTitle?: boolean;
}

function BlogGrid({
    blogs,
    isLoading,
    isFetching,
    hasMore,
    onLoadMore,
    showTitle = true,
}: BlogGridProps) {
    const { t } = useTranslation('public-pages/public-blogs');
    // Skeleton loading component for new blogs
    const BlogSkeleton = () => (
        <Box>
            <Skeleton height="200px" borderRadius="md" mb={4} />
            <Skeleton height="20px" mb={2} />
            <Skeleton height="16px" width="60%" />
        </Box>
    );

    const BlogsGrid = () => (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={6}
        >
            {/* Show initial loading skeletons */}
            {isLoading && blogs.length === 0 &&
                Array.from({ length: 9 }).map((_, index) => (
                    <BlogSkeleton key={`initial-skeleton-${index}`} />
                ))
            }
            
            {/* Show actual blogs */}
            {!isLoading && blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
            
            {/* Show skeleton loading for next page while fetching more */}
            {isFetching && !isLoading && hasMore &&
                Array.from({ length: 3 }).map((_, index) => (
                    <BlogSkeleton key={`load-more-skeleton-${index}`} />
                ))
            }
        </Grid>
    );

    const LoadMoreButton = () =>
        hasMore && onLoadMore && !isFetching && !isLoading ? (
            <Flex justifyContent="center" alignItems="center">
                <AppButton
                    variant="secondary"
                    size="lg"
                    mt={12}
                    onClick={onLoadMore}
                >
                    {t('BlogGrid.viewMore')}
                </AppButton>
            </Flex>
        ) : null;

    return (
        <>
            {showTitle && <SectionTitle>{t('BlogGrid.sectionTitle')}</SectionTitle>}
            <BlogsGrid />
            <LoadMoreButton />
        </>
    );
}

export default BlogGrid;
