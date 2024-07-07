import AppErrors from "lib/utils/statics/errors/errors";

export const makePayments = ({ paymentMethods, paymentPublic }: { paymentMethods: any; paymentPublic: any }) => {
    return paymentPublic?.map((payment: any) => {
        const correspondingMethod = paymentMethods?.find((method) => method.type === payment.type);
        return {
            ...payment,
            destinationAddress: correspondingMethod?.destinationAddress || "",
            isActive: correspondingMethod?.isActive || false,
            tokens:
                payment.tokens?.map((token) => ({
                    ...token,
                    isActive: correspondingMethod?.tokens.find((currentToken) => currentToken.type === token.type)?.isActive || false,
                })) || [],
        };
    });
};

export const handleActivateWallet = (wallet: { name: string; isActivated: boolean }, loginMethods, chain, showToast, getPermissionValue, updateState) => {
    const maxActiveLoginMethodCount = getPermissionValue("web3_network_login");
    const selectedLoginMethods = [...loginMethods];
    const targetChain = selectedLoginMethods.findIndex((c) => c.name === chain.name);
    if (wallet.isActivated) {
        const activePaymentMethods = loginMethods
            .filter((method) => method.name !== "Google")
            .reduce((count, method) => {
                return count + method.wallets.filter((wallet) => wallet.isActivated).length;
            }, 0);
        if (!(maxActiveLoginMethodCount === "Unlimited" || chain.name === "Google") && !(activePaymentMethods < +maxActiveLoginMethodCount))
            return showToast({ message: AppErrors.permission.maxActiveLoginMethods(maxActiveLoginMethodCount), type: "error" });
        targetChain > -1 ? selectedLoginMethods[targetChain].wallets.push({ ...wallet }) : selectedLoginMethods.push({ ...chain, wallets: [{ ...wallet }] });
    } else {
        // if (selectedLoginMethods.length === 1 && loginMethods[0].wallets.length === 1) return
        selectedLoginMethods[targetChain].wallets = selectedLoginMethods[targetChain].wallets.filter((w) => w.name !== wallet.name);
        if (!selectedLoginMethods[targetChain].wallets.length) {
            selectedLoginMethods.splice(targetChain, 1);
        }
    }
    updateState("loginMethods", selectedLoginMethods);
};

export const canActivateNewPaymentMethod = (chain, selectedPaymentMethods, getPermissionValue, showToast): boolean => {
    const maxActivePaymentMethodCount = getPermissionValue("web3_payment");
    if (maxActivePaymentMethodCount === "Unlimited" || chain.type === "STRIPE") return true;

    const activePaymentMethods = selectedPaymentMethods
        .filter((payment) => payment.isActive || payment.type !== "STRIPE") //We filter stripe because it's not a web3 payment method
        .reduce((count, payment) => {
            if (payment.type === "COINBASE") return count + (payment.isActive ? 1 : 0);
            return count + payment.tokens.filter((token) => token.isActive).length;
        }, 0);

    if (activePaymentMethods < +maxActivePaymentMethodCount) return true;

    showToast({ message: AppErrors.permission.maxActivePaymentMethods(maxActivePaymentMethodCount), type: "error" });
    return false;
};
