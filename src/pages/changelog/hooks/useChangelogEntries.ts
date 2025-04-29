import { getChangelogEntries } from "lib/apis/changelog/services"
import { useInfiniteQuery } from "react-query"

const useChangelogEntries = () => {
    return useInfiniteQuery({
        queryKey: ["changelog-entries"],
        queryFn: ({ pageParam = 1 }) => getChangelogEntries({ page: pageParam, limit: 10 }),
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    })
}

export default useChangelogEntries