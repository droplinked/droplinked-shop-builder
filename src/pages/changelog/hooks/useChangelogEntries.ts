import { getChangelogEntries } from "lib/apis/changelog/services"
import { useInfiniteQuery } from "react-query"

const useChangelogEntries = () => {
    return useInfiniteQuery({
        queryKey: ["changelog-entries"],
        queryFn: ({ pageParam = 1 }) => getChangelogEntries({ page: pageParam, limit: 10 }),
        getNextPageParam: (lastPage) => lastPage.data.nextPage
    })
}

export default useChangelogEntries