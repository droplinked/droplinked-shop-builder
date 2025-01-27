import { useLegalUsage } from "lib/stores/app/appStore"
import productTypeLegalUsageMap from "lib/utils/helpers/productTypeLegalUsageMap"
import { ProductType } from "../utils/types"

const useProductTypeLegality = (productType: ProductType | "drop") => {
    const shopLegalUsage = useLegalUsage()
    const { errorMessage, key } = productTypeLegalUsageMap[productType]
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