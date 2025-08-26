import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getPublicBlogsService } from "services/blog/services";
import { IBlogListItem, ICategory } from "../types/blog.types";

function useBlogs(
    initialBlogs: IBlogListItem[] = [],
    initialTotalBlogs: number = 0
) {
    const [page, setPage] = useState(1);
    const [allBlogs, setAllBlogs] = useState<IBlogListItem[]>(initialBlogs);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollPositionRef = useRef<number>(0);
    const [totalBlogs, setTotalBlogs] = useState(initialTotalBlogs);
    const [hasInitialData, setHasInitialData] = useState(initialBlogs.length > 0);
    const limit = 9;

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["public-blogs", page, limit],
        queryFn: () => getPublicBlogsService({ page, limit }),
        keepPreviousData: false,
        enabled: true,
    });

    const currentPageBlogs: IBlogListItem[] = data?.data?.data?.data || [];

    // Accumulate blogs from all pages
    useEffect(() => {
        if (currentPageBlogs.length > 0) {
            if (page === 1 && !hasInitialData) {
                // First page without server data - replace all blogs
                setAllBlogs(currentPageBlogs);
                setIsLoadingMore(false);
            } else if (page === 1 && hasInitialData) {
                // First page with server data - update if different
                setAllBlogs(currentPageBlogs);
                setHasInitialData(false); // Mark that we've processed initial data
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
    }, [currentPageBlogs, page, hasInitialData]);

    // Update totalBlogs when data is fetched
    useEffect(() => {
        if (data?.data?.data?.totalDocuments) {
            setTotalBlogs(data.data.data.totalDocuments);
        }
    }, [data]);

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
        isLoading: hasInitialData && page === 1 ? false : isLoading,
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
