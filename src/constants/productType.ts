import { product_type } from "services/product/interfaces";
import { LegalUsageKey } from "services/subscription/interfaces";

export const productTypeUsageLimits = (t: (key: string, options?: any) => string) => {
    return {
        "DIGITAL": {
            errorMessage: t('permissionErrors.productCreationLimitReached', { type: t('productTypes.digital') }),
            key: "digital_product"
        },
        "PRINT_ON_DEMAND": {
            errorMessage: t('permissionErrors.productCreationLimitReached', { type: t('productTypes.printOnDemand') }),
            key: "print_on_demand"
        },
        "NORMAL": {
            errorMessage: t('permissionErrors.productCreationLimitReached', { type: t('productTypes.physical') }),
            key: "physical_product"
        },
        "drop": {
            errorMessage: t('permissionErrors.dropLimitReached'),
            key: "drop"
        },
        "EVENT": {
            errorMessage: t('permissionErrors.productCreationLimitReached', { type: t('productTypes.event') }),
            key: "event"
        }
    } as Record<product_type | "drop", { errorMessage: string, key: LegalUsageKey }>;
}

