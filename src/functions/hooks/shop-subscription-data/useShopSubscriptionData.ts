import { getShopSubscriptionDataService } from "lib/apis/subscription/subscriptionServices"
import { useUpdateShopPermissions } from "lib/stores/app/appStore"
import { useQuery } from "react-query"

const useShopSubscriptionData = () => {
    const updateShopSubscriptionData = useUpdateShopPermissions()

    const queryObj = useQuery({
        queryKey: "shop-subscription-plan",
        queryFn: () => getShopSubscriptionDataService(),
        refetchOnWindowFocus: false,
        onSuccess: (data) => updateShopSubscriptionData(data.data)
    })

    return queryObj
}

export default useShopSubscriptionData