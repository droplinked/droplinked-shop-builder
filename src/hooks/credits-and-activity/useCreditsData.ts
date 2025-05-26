import { useInfiniteQuery, useQuery } from 'react-query'
import { getCreditAnalytics, getCreditDetailedAnalytics } from 'services/credit/services'
import useCreditStore from 'pages/credits-and-activity/stores/CreditStore'

export default function useCreditsData() {
    const { date, selectedFilter, updateCreditState } = useCreditStore()

    const analyticsQuery = useQuery({
        queryKey: ["credit-analytics", date],
        queryFn: () => getCreditAnalytics({ endDate: date[1], startDate: date[0] }),
        onSuccess: (data) => {
            updateCreditState('analyticsData', data?.data?.data)
            updateCreditState('isFetching', false)
        },
        onError: () => {
            updateCreditState('isFetching', false)
        }
    })

    const transactionsQuery = useInfiniteQuery({
        queryKey: ["credit-detailed-analytics", date, selectedFilter],
        queryFn: ({ pageParam = 1 }) => getCreditDetailedAnalytics({
            endDate: date[1],
            startDate: date[0],
            page: pageParam,
            limit: 20,
            type: selectedFilter
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    })

    return {
        analyticsQuery,
        transactionsQuery,
        refetchAll: () => {
            analyticsQuery.refetch()
            transactionsQuery.refetch()
        },
        isLoading: analyticsQuery.isFetching || transactionsQuery.isFetching,
    }
}
