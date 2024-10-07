import { switchShopService } from "lib/apis/shop/shopServices"
import useAppStore from "lib/stores/app/appStore"
import AppStorage from "lib/utils/app/sessions"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

const useShopSwitcher = () => {
    const { updateState } = useAppStore()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (shopId: string) => switchShopService(shopId),
        onSuccess: async (response) => {
            const { data: { access_token, refresh_token, shop, user } } = response
            AppStorage.set_tokens(access_token, refresh_token)
            updateState({ key: "shop", params: shop })
            updateState({ key: "user", params: user })
            navigate("/analytics")
        }
    })
}

export default useShopSwitcher