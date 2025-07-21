import { ISettings } from "pages/settings/utils/formConfigs";
import { JSX } from "react";
import { ToasterProps } from "sonner";

type TypeOptions = 'success' | 'error' | 'info' | 'warning';

interface IValidateHandlers {
    values: ISettings,
    showToast: (params: { type: TypeOptions, message: string | JSX.Element, options?: ToasterProps }) => void;
    t: (key: string, params?: Record<string, any>) => string;
}

export const handleValidations = ({ values, showToast, t }: IValidateHandlers): boolean => {
    //we ensure that the total percentage of the wallets does not exceed 100
    if (!handleValidatePercentage({ values, showToast, t })) return false;

    //we ensure there are no wallets with 0 percentage
    if (!handleValidateZeroPercentage({ values, showToast, t })) return false;

    //we ensure that user has selected at least one payment method
    if (!handleValidatePaymentMethods({ values, showToast, t })) return false;

    //we ensure that user has selected at least one login method
    if (!handleValidateLoginMethods({ values, showToast, t })) return false;

    return true;
}

const handleValidatePercentage = ({ values, showToast, t }: IValidateHandlers): boolean => {
    const walletOverLimit = values.paymentWallets.find((wallet) => {
        const sumPercent = wallet.destinationAddress.reduce((sum, d) => sum + (d.percent || 0), 0);
        return sumPercent > 100;
    });
    const walletType = walletOverLimit?.type === "SOL" ? "Solana" : "EVM"
    if (walletOverLimit) {
        showToast({
            type: "error",
            message: t("validationHandlers.validation.walletPercentageExceeds", { walletType }),
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}

const handleValidateZeroPercentage = ({ values, showToast, t }: IValidateHandlers): boolean => {
    const walletWithZeroPercent = values.paymentWallets.find((wallet) => {
        return wallet.destinationAddress.some(d => d.percent === 0);
    });

    const walletType = walletWithZeroPercent?.type === "SOL" ? "Solana" : "EVM"
    if (walletWithZeroPercent) {
        showToast({
            type: "error",
            message: t("validationHandlers.validation.walletPercentageZero", { walletType }),
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}

const handleValidatePaymentMethods = ({ values, showToast, t }: IValidateHandlers): boolean => {
    const walletLength = values.paymentMethods.filter((method) => method.isActive).length;
    if (walletLength < 1) {
        showToast({
            type: "error",
            message: t("validationHandlers.validation.paymentMethodRequired"),
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}

const handleValidateLoginMethods = ({ values, showToast, t }: IValidateHandlers): boolean => {
    const walletLength = values.loginMethods.filter((method) => method.isActivated).length;
    if (walletLength < 1) {
        showToast({
            type: "error",
            message: t("validationHandlers.validation.loginMethodRequired"),
            options: { duration: 5000 }
        });
        return false;
    }
    return true;
}