import { useLegalUsage } from "stores/app/appStore"
import { productTypeUsageLimits } from "constants/productType"
import { ProductType } from "../utils/types"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"

const useProductTypeLegality = (productType: ProductType | "drop") => {
    const shopLegalUsage = useLegalUsage()
    const { t } = useLocaleResources('products')
    const { errorMessage, key } = productTypeUsageLimits(t)[productType]
    const currentLegalUsage = shopLegalUsage.find((obj: any) => obj.key === key)

    if (
        currentLegalUsage?.remaining === "Unlimited" ||
        +currentLegalUsage?.remaining > 0
    ) {
        return { isLegal: true, errorMessage: '' }
    }

    return { isLegal: false, errorMessage }

}

export default useProductTypeLegality