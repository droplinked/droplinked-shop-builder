import { getShopSubscriptionDataService } from "lib/apis/subscription/subscriptionServices"
import useShopPermissionsStore from "lib/stores/app/shopPermissionsStore"
import { useQuery } from "react-query"

const useShopSubscriptionData = () => {
    const updateShopSubscriptionData = useShopPermissionsStore(state => state.updateShopSubscriptionData)

    const queryObj = useQuery({
        queryKey: "shop-subscription-plan",
        queryFn: () => getShopSubscriptionDataService(),
        refetchOnWindowFocus: false,
        onSuccess: (data) => updateShopSubscriptionData(data.data)
    })

    return queryObj
}

export default useShopSubscriptionData