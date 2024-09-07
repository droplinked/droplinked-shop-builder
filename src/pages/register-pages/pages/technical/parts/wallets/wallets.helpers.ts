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

export const calculateTotalPercent = (wallets) => {
    if (!wallets || wallets.length === 0) {
        return {
            totalPercent: 0,
            remainingPercent: 100,
            excessPercent: 0,
            message: "No wallets found. Please add wallet addresses to continue.",
            status: "NO_WALLET",
        };
    }

    // Check if all wallets have a non-empty address
    const allHaveAddresses = wallets.every(wallet => wallet.destinationAddress && wallet.destinationAddress.trim() !== '');
    const allHaveDefinedPercent = wallets.every(wallet => wallet.percent !== undefined);

    if (!allHaveAddresses || !allHaveDefinedPercent) {
        return {
            totalPercent: 0,
            remainingPercent: 100,
            excessPercent: 0,
            message: "Some wallets are missing addresses. Please fill in all wallet addresses to proceed.",
            status: "MISSING_ADDRESSES",
        };
    }

    // Calculate the total percentage
    const totalPercent = wallets.reduce((acc, wallet) => acc + (wallet.percent || 0), 0);
    
    // Calculate remaining and excess percentages
    const remainingPercent = totalPercent < 100 ? 100 - totalPercent : 0;
    const excessPercent = totalPercent > 100 ? totalPercent - 100 : 0;

    let message = "";
    let status = "SUCCESS";

    if (remainingPercent > 0) {
        message = `The total percentage is short by ${remainingPercent}%. Please adjust your values to make it 100%.`;
        status = "PERCENTAGE_SHORT";
    } else if (excessPercent > 0) {
        message = `The total percentage exceeds 100% by ${excessPercent}%. Please reduce the values accordingly.`;
        status = "PERCENTAGE_EXCEEDS";
    }

    return {
        totalPercent,
        remainingPercent,
        excessPercent,
        message,
        status,
    };
};


// Helper function to persist wallet address updates to the state.
export const persistWalletAddressUpdate = (wallets, paymentMethods, chain, updateState) => {
    const { totalPercent } = calculateTotalPercent(wallets);

    if (totalPercent !== 100) {
        return;
    }

    const updatedPaymentMethods = [...paymentMethods];

    wallets.forEach((wallet) => {
        const newWalletAddress = wallet.destinationAddress.trim();

        if (!newWalletAddress) return;

        const targetPaymentMethod = updatedPaymentMethods.find((payment) => payment?.type === chain?.type);

        if (targetPaymentMethod) {
            const existingWallet = targetPaymentMethod.destinationAddress?.find((w) => w._id === wallet._id);
            const isDuplicateAddress = targetPaymentMethod.destinationAddress?.some(
                (w) => w.destinationAddress === newWalletAddress
            );

            if (isDuplicateAddress) {
                return;
            }

            if (existingWallet) {
                existingWallet.destinationAddress = newWalletAddress;
                existingWallet.percent = wallet.percent;
            } else {
                targetPaymentMethod.destinationAddress.push({
                    destinationAddress: newWalletAddress,
                    percent: wallet.percent,
                });
            }

            if (!newWalletAddress) {
                targetPaymentMethod.isActive = false;
                targetPaymentMethod?.tokens?.forEach((token) => (token.isActive = false));
            }
        } else {
            const newPaymentMethod = {
                ...chain,
                destinationAddress: [
                    {
                        destinationAddress: newWalletAddress,
                        percent: wallet.percent,
                    },
                ],
            };

            if (!newWalletAddress) {
                newPaymentMethod.isActive = false;
                newPaymentMethod.tokens.forEach((token) => (token.isActive = false));
            }

            updatedPaymentMethods.push(newPaymentMethod);
        }
    });

    updateState("paymentMethods", updatedPaymentMethods);
};