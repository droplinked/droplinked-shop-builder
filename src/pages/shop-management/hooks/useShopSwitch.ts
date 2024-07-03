import { switchShopService } from "lib/apis/shop/shopServices"
import useAppStore from "lib/stores/app/appStore"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

const useShopSwitcher = () => {
    const { updateState } = useAppStore()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (shopId: string) => switchShopService(shopId),
        onSuccess: (response) => {
            const { data: { access_token, refresh_token, shop, user } } = response
            updateState({ key: "access_token", params: access_token })
            updateState({ key: "refresh_token", params: refresh_token })
            updateState({ key: "shop", params: shop })
            updateState({ key: "user", params: user })
            navigate("/dashboard")
        }
    })
}

export default useShopSwitcher