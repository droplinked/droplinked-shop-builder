import { switchShopService } from "lib/apis/shop/shopServices"
import useAppStore from "lib/stores/app/appStore"
import AppStorage from "utils/app/sessions"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

const useShopSwitcher = (shouldCreateWallet?: boolean) => {
    const { updateState } = useAppStore()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (shopId: string) => switchShopService(shopId),
        onSuccess: async (response) => {
            const { data: { access_token, refresh_token, shop, user } } = response
            AppStorage.setTokens(access_token, refresh_token)
            updateState({ key: "shop", params: shop })
            updateState({ key: "user", params: user })
            !shouldCreateWallet && navigate("/analytics")
        }
    })
}

export default useShopSwitcher