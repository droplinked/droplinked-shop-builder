const permissionErrors = {
    permission_denied: "Permission Denied",
    maxActiveLoginMethods: (maxActiveLoginMethodCount: string) => `You can only activate up to ${maxActiveLoginMethodCount} login methods`,
    maxActivePaymentMethods: (maxActivePaymentMethodCount: string) => `You can only activate up to ${maxActivePaymentMethodCount} payment methods`
}

export default permissionErrors