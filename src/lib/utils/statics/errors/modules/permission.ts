const permissionErrors = {
    permission_denied: "Permission Denied",
    maxActiveLoginMethods: (maxActiveLoginMethodCount: string) => `You can only activate up to ${maxActiveLoginMethodCount} login methods`,
    maxActivePaymentMethods: (maxActivePaymentMethodCount: string) => `You can only activate up to ${maxActivePaymentMethodCount} payment methods`,
    shop_subscription_data_unavailable: "Oops! It looks like we can not access subscription data at the moment. Give it another try soon?",
    product_creation_limit_reached: "Product creation limit reached. Consider upgrading your plan to create more.",
}

export default permissionErrors