import { getShopSubscriptionDataService } from "services/subscription/subscriptionServices"
import { useUpdateShopPermissions } from "stores/app/appStore"
import { useQuery } from "react-query"

const useShopSubscriptionData = () => {
    const updateShopSubscriptionData = useUpdateShopPermissions()

    const queryObj = useQuery({
        queryKey: ["shop-subscription-plan"],
        queryFn: () => getShopSubscriptionDataService(),
        onSuccess: (data) => updateShopSubscriptionData(data.data)
    })

    return queryObj
}

export default useShopSubscriptionData