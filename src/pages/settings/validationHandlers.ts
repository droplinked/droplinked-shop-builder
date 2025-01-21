import { ISettings } from "pages/settings/formConfigs";
import { ToastOptions, TypeOptions } from "react-toastify";

interface IValidateHandlers {
    values: ISettings,
    showToast: (params: { type: TypeOptions, message: string | JSX.Element, options?: ToastOptions }) => void;
}

export const handleValidations = ({ values, showToast }: IValidateHandlers): boolean => {
    //we ensure that the total percentage of the wallets does not exceed 100
    if (!handleValidatePercentage({ values, showToast })) return false;

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
            options: { autoClose: 5000 }
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
            options: { autoClose: 5000 }
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
            options: { autoClose: 5000 }
        });
        return false;
    }
    return true;
}