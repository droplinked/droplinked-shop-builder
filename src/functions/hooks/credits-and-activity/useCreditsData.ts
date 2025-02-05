import { useInfiniteQuery, useQuery } from 'react-query'
import { getCreditAnalytics, getCreditDetailedAnalytics } from 'lib/apis/credit/services'
import useCreditStore from 'pages/credits-and-activity/stores/CreditStore'

export default function useCreditsData() {
    const { date, dataFilter } = useCreditStore()

    const analyticsQuery = useQuery({
        queryKey: ["credit-analytics", date],
        queryFn: () => getCreditAnalytics({ endDate: date[1], startDate: date[0] }),
        onSuccess: (data) => {
            useCreditStore.getState().updateCreditState('analyticsData', data?.data?.data)
            useCreditStore.getState().updateCreditState('isFetching', false)
        },
        onError: () => {
            useCreditStore.getState().updateCreditState('isFetching', false)
        }
    })

    const transactionsQuery = useInfiniteQuery({
        queryKey: ["credit-detailed-analytics", date, dataFilter],
        queryFn: ({ pageParam = 1 }) => getCreditDetailedAnalytics({
            endDate: date[1],
            startDate: date[0],
            page: pageParam,
            limit: 20,
            type: dataFilter
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    })

    return {
        analyticsQuery,
        transactionsQuery,
        refetchAll: () => {
            analyticsQuery.refetch()
            transactionsQuery.refetch()
        }
    }
}
