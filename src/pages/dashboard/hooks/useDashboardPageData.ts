import useAppToast from "functions/hooks/toast/useToast"
import { getDashboardPageData } from "lib/apis/dashboard/dashboardServices"
import { useQuery } from "react-query"
import useDashboardPageStore from "../stores/useDashboardStore"

const useDashboardPageData = () => {
    const { showToast } = useAppToast()
    const { updateDashboardPageState } = useDashboardPageStore()

    return useQuery({
        queryKey: ["dashboardData"],
        queryFn: getDashboardPageData,
        onSuccess: (data) => updateDashboardPageState("dashboardData", data),
        onError: () => showToast({ type: "error", message: "Error fetching data" }),
        onSettled: () => updateDashboardPageState("isLoading", false)
    })
}

export default useDashboardPageData