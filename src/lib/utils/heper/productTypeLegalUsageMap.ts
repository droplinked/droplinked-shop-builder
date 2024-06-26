import { product_type } from "lib/apis/product/interfaces";
import { LegalUsageKey } from "lib/apis/subscription/interfaces";
import AppErrors from "../statics/errors/errors";

const productTypeLegalUsageMap: Record<product_type | "drop", { errorMessage: string, key: LegalUsageKey }> = {
    "DIGITAL": { errorMessage: AppErrors.permission.product_creation_limit_reached, key: "digital_product" },
    "PRINT_ON_DEMAND": { errorMessage: AppErrors.permission.product_creation_limit_reached, key: "print_on_demand" },
    "NORMAL": { errorMessage: AppErrors.permission.product_creation_limit_reached, key: "physical_product" },
    "drop": { errorMessage: AppErrors.permission.drop_limit_reached, key: "physical_product" }
}

export default productTypeLegalUsageMap