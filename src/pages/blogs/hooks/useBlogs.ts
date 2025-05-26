import { getShopBlogsService } from "services/blog/services"
import { useInfiniteQuery, useQueryClient } from "react-query"

export const BLOG_LIST_QUERY_KEY = "BLOG_LIST"

const useBlogs = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: [BLOG_LIST_QUERY_KEY, searchTerm],
        queryFn: ({ pageParam = 1 }) => getShopBlogsService({
            page: pageParam,
            limit: 10,
            search: searchTerm
        }),
        getNextPageParam: (lastPage) => lastPage?.data?.nextPage ?? null
    })
}

export const useInvalidateBlogList = () => {
    const queryClient = useQueryClient()

    return () => queryClient.invalidateQueries([BLOG_LIST_QUERY_KEY])
}

export default useBlogs