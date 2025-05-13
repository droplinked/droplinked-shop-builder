import { ISettings } from "pages/settings/formConfigs";
import { JSX } from "react";
import { ToasterProps } from "sonner";

type TypeOptions = 'success' | 'error' | 'info' | 'warning';

interface IValidateHandlers {
    values: ISettings,
    showToast: (params: { type: TypeOptions, message: string | JSX.Element, options?: ToasterProps }) => void;
}

export const handleValidations = ({ values, showToast }: IValidateHandlers): boolean => {
    //we ensure that the total percentage of the wallets does not exceed 100
    if (!handleValidatePercentage({ values, showToast })) return false;

    //we ensure there are no wallets with 0 percentage
    if (!handleValidateZeroPercentage({ values, showToast })) return false;

    //we ensure that user has selected at least one payment method
    if (!handleValidatePaymentMethods({ values, showToast })) return false;

    //we ensure that user has selected at least one login method
    if (!handleValidateLoginMethods({ values, showToast })) return false;

    return true;
}

const handleValidatePercentage = ({ values, showToast }: IValidateHandlers): boolean => {
    const walletOverLimit = values.paymentWallets.find((wallet) => {
        const sumPercent = wallet.destinationAddress.reduce((sum, d) => sum + (d.percent || 0), 0);
        return sumPercent > 100;
    });
    const walletType = walletOverLimit?.type === "SOL" ? "Solana" : "EVM"
    if (walletOverLimit) {
        showToast({
            type: "error",
            message: `Please double-check your ${walletType} wallets section, the total percentage must not exceed 100.`,
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}

// Add this new validation function
const handleValidateZeroPercentage = ({ values, showToast }: IValidateHandlers): boolean => {
    const walletWithZeroPercent = values.paymentWallets.find((wallet) => {
        return wallet.destinationAddress.some(d => d.percent === 0);
    });

    const walletType = walletWithZeroPercent?.type === "SOL" ? "Solana" : "EVM"
    if (walletWithZeroPercent) {
        showToast({
            type: "error",
            message: `Please ensure all ${walletType} wallet percentages are greater than 0.`,
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}

const handleValidatePaymentMethods = ({ values, showToast }: IValidateHandlers): boolean => {
    const walletLength = values.paymentMethods.filter((method) => method.isActive).length;
    if (walletLength < 1) {
        showToast({
            type: "error",
            message: `Please select at least one payment method.`,
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}

const handleValidateLoginMethods = ({ values, showToast }: IValidateHandlers): boolean => {
    const walletLength = values.loginMethods.filter((method) => method.isActivated).length;
    if (walletLength < 1) {
        showToast({
            type: "error",
            message: `Please select at least one login method.`,
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}