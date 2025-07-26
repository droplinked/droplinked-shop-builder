import { product_type } from "services/product/interfaces";
import { LegalUsageKey } from "services/subscription/interfaces";
import AppErrors from "./errors";

// Maps product types to their respective legal usage and error messages
export const productTypeUsageLimits: Record<product_type | "drop", { errorMessage: string, key: LegalUsageKey }> = {
    "DIGITAL": {
        errorMessage: AppErrors.permission.productCreationLimitReached("digital_product"),
        key: "digital_product"
    },
    "PRINT_ON_DEMAND": {
        errorMessage: AppErrors.permission.productCreationLimitReached("print_on_demand"),
        key: "print_on_demand"
    },
    "NORMAL": {
        errorMessage: AppErrors.permission.productCreationLimitReached("physical_product"),
        key: "physical_product"
    },
    "drop": {
        errorMessage: AppErrors.permission.dropLimitReached,
        key: "drop"
    },
    "EVENT": {
        errorMessage: AppErrors.permission.productCreationLimitReached("event"),
        key: "event"
    }
}

