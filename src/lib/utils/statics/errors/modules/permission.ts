import { LegalUsageKey } from "lib/apis/subscription/interfaces";

const permissionErrors = {
    permission_denied: "Permission Denied",
    maxActiveLoginMethods: (maxActiveLoginMethodCount: string) => `You can only activate up to ${maxActiveLoginMethodCount} login methods`,
    maxActivePaymentMethods: (maxActivePaymentMethodCount: string) => `You can only activate up to ${maxActivePaymentMethodCount} payment methods`,
    shop_subscription_data_unavailable: "Oops! It looks like we can not access subscription data at the moment. Give it another try soon?",
    product_creation_limit_reached: (legalUsageKey: LegalUsageKey) => {
        const titles: Record<LegalUsageKey, string> = {
            digital_product: "Digital Product",
            print_on_demand: "Print on Demand",
            physical_product: "Physical Product",
            event: "Event",
            drop: "Drop"
        }
        const title = titles[legalUsageKey]
        return `${title} creation limit reached. Consider upgrading your plan to create more.`
    },
    drop_limit_reached: "Drop limit reached. Consider upgrading your plan to drop more.",
}

export default permissionErrors