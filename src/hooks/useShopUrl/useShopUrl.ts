
import useAppStore from "lib/stores/app/appStore";
import { SHOP_URL } from "utils/app/variable";

const useShopUrl = () => {
    const { shop } = useAppStore()

    if (!shop) return SHOP_URL

    const { shopDomain, name } = shop

    if (Array.isArray(shopDomain) && shopDomain.length > 0)
        return `https://${shopDomain[0]}`

    if (typeof shopDomain === 'string' && shopDomain)
        return `https://${shopDomain}`

    return `${SHOP_URL}/${name}`
}

export default useShopUrl