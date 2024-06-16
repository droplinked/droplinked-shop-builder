import { getShopSubscriptionDataService } from "lib/apis/subscription/subscriptionServices"
import useShopPermissionsStore, { useUpdateShopPermissions } from "lib/stores/app/shopPermissionsStore"
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