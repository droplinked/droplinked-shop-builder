import { Flex } from "@chakra-ui/react"
import useAppToast from "hooks/toast/useToast"
import { getDashboardPageData } from "lib/apis/dashboard/dashboardServices"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import DashboardContent from "./components/DashboardContent"
import GreetingBanner from "./components/GreetingBanner"
import NoOrdersPlaceholder from "./components/NoOrdersPlaceholder"
import useDashboardPageStore from "./stores/useDashboardStore"


function Dashboard() {
    const { showToast } = useAppToast()
    const updateDashboardPageState = useDashboardPageStore(state => state.updateDashboardPageState)

    const { isFetching, isError, data } = useQuery({
        queryKey: ["dashboardData"],
        queryFn: getDashboardPageData,
        onSuccess: data => updateDashboardPageState("dashboardData", data),
        onError: () => showToast({ type: "error", message: "Error fetching data" })
    })

    useEffect(() => {
        updateDashboardPageState("isLoading", isFetching)
    }, [updateDashboardPageState, isFetching])

    function renderContent() {
        const noOrders = isError || data?.shopStats?.orders === 0
        return noOrders ? <NoOrdersPlaceholder /> : <DashboardContent />
    }

    return (
        <Flex direction="column" gap={{ base: 6, lg: 9, xl: 12 }}>
            <NoOrdersPlaceholder />
            {/* {renderContent()} */}
        </Flex>
    )
}

export default Dashboard