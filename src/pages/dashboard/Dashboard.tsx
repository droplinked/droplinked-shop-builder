import useAppToast from "hooks/toast/useToast"
import { getDashboardPageData } from "lib/apis/dashboard/dashboardServices"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import DashboardContent from "./components/DashboardContent"
import NoOrdersPlaceholder from "./components/NoOrdersPlaceholder"
import useDashboardPageStore from "./stores/useDashboardStore"


function Dashboard() {
    const updateDashboardPageState = useDashboardPageStore(state => state.updateDashboardPageState)
    const { showToast } = useAppToast()

    const { isFetching, isError, data } = useQuery({
        queryKey: ["dashboardData"],
        queryFn: getDashboardPageData,
        onSuccess: data => updateDashboardPageState("dashboardData", data),
        onError: () => showToast({ type: "error", message: "Error fetching data" })
    })

    useEffect(() => {
        updateDashboardPageState("isLoading", isFetching)
    }, [updateDashboardPageState, isFetching])

    const noOrders = isError || data?.shopStats?.orders === 0

    return noOrders ? <NoOrdersPlaceholder /> : <DashboardContent />
}

export default Dashboard