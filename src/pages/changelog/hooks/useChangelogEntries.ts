import useAppToast from "hooks/toast/useToast"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { getChangelogEntries } from "services/changelog/services"
import { useInfiniteQuery } from "react-query"

const useChangelogEntries = () => {
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('changelogPage')

    return useInfiniteQuery({
        queryKey: ["changelog-entries"],
        queryFn: ({ pageParam = 1 }) => getChangelogEntries({ page: pageParam, limit: 10 }),
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
        onError: () => {
            showToast({
                type: "error",
                message: t('useChangelogEntries.entriesLoadFailed')
            })
        }
    })
}

export default useChangelogEntries