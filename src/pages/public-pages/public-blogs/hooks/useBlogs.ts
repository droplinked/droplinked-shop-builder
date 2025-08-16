import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getPublicBlogsService } from "services/blog/services";
import { IBlogListItem, ICategory } from "../types/blog.types";

function useBlogs() {
    const [page, setPage] = useState(1);
    const [allBlogs, setAllBlogs] = useState<IBlogListItem[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollPositionRef = useRef<number>(0);
    const limit = 9;

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["public-blogs", page, limit],
        queryFn: () => getPublicBlogsService({ page, limit }),
        keepPreviousData: false, // Changed to false to prevent scroll issues
    });

    const currentPageBlogs: IBlogListItem[] = data?.data?.data?.data || [];
    const totalBlogs = data?.data?.data?.totalDocuments || 0;

    // Accumulate blogs from all pages
    useEffect(() => {
        if (currentPageBlogs.length > 0) {
            if (page === 1) {
                // First page - replace all blogs
                setAllBlogs(currentPageBlogs);
                setIsLoadingMore(false);
            } else {
                // Subsequent pages - append to existing blogs
                setAllBlogs((prev) => {
                    const existingIds = new Set(prev.map((blog) => blog._id));
                    const newBlogs = currentPageBlogs.filter(
                        (blog) => !existingIds.has(blog._id)
                    );
                    return [...prev, ...newBlogs];
                });
                setIsLoadingMore(false);

                // Restore scroll position after a short delay
                if (scrollPositionRef.current > 0) {
                    requestAnimationFrame(() => {
                        window.scrollTo({
                            top: scrollPositionRef.current,
                            behavior: "instant",
                        });
                        scrollPositionRef.current = 0;
                    });
                }
            }
        }
    }, [currentPageBlogs, page]);

    const blogs = allBlogs;
    const hasMore = allBlogs.length < totalBlogs;

    // Extract categories from blogs data
    const extractCategories = (blogs: IBlogListItem[]): ICategory[] => {
        const categoryMap = new Map<string, { name: string; count: number }>();

        blogs?.forEach((blog) => {
            if (blog.category) {
                const existing = categoryMap.get(blog.category);
                if (existing) {
                    existing.count++;
                } else {
                    categoryMap.set(blog.category, {
                        name: blog.category,
                        count: 1,
                    });
                }
            }
        });

        return Array.from(categoryMap.entries()).map(
            ([id, { name, count }]) => ({
                id,
                name,
                blogCount: count,
            })
        );
    };

    const categories = extractCategories(blogs);

    // Get blogs by category
    const getBlogsByCategory = (categoryId: string): IBlogListItem[] => {
        return blogs.filter((blog) => blog.category === categoryId);
    };

    // Get featured blogs
    const getFeaturedBlogs = (): IBlogListItem[] => {
        return blogs.filter((blog) => blog.isFeatured);
    };

    // Get latest blogs
    const getLatestBlogs = (limit: number = 5): IBlogListItem[] => {
        return blogs
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            .slice(0, limit);
    };

    // Load more blogs
    const loadMore = () => {
        if (hasMore && !isFetching && !isLoadingMore) {
            // Save current scroll position
            scrollPositionRef.current = window.scrollY;
            setIsLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    return {
        blogs,
        categories,
        isLoading,
        isFetching: isFetching || isLoadingMore,
        hasMore,
        totalBlogs,
        loadMore,
        getBlogsByCategory,
        getFeaturedBlogs,
        getLatestBlogs,
    };
}

export default useBlogs;
