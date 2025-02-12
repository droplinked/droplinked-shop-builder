import useAppToast from "functions/hooks/toast/useToast"
import { getDashboardPageData } from "lib/apis/dashboard/dashboardServices"
import { useQuery } from "react-query"
import useDashboardPageStore from "../stores/useDashboardStore"

const useDashboardPageData = () => {
    const { showToast } = useAppToast()
    const { updateDashboardPageState } = useDashboardPageStore()

    return useQuery({
        queryFn: getDashboardPageData,
        onSuccess: (data) => {
            updateDashboardPageState("dashboardData", data)
            updateDashboardPageState("isLoading", false)
        },
        onError: () => {
            showToast({ type: "error", message: "Error fetching data" })
            updateDashboardPageState("isLoading", false)
        },
    })
}

export default useDashboardPageData