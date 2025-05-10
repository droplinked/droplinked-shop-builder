import useAppToast from "hooks/toast/useToast"
import { getChangelogEntries } from "lib/apis/changelog/services"
import { useInfiniteQuery } from "react-query"

const useChangelogEntries = () => {
    const { showToast } = useAppToast()

    return useInfiniteQuery({
        queryKey: ["changelog-entries"],
        queryFn: ({ pageParam = 1 }) => getChangelogEntries({ page: pageParam, limit: 10 }),
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
        onError: () => {
            showToast({
                type: "error",
                message: "Failed to fetch changelog entries"
            })
        }
    })
}

export default useChangelogEntries