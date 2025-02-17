import { IManualTransferValidation } from "./interface";

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
export const getTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const handleValidateManualTransfer = ({ manualTransferData, quantity, showToast }: IManualTransferValidation) => {
    // Check for falsy addresses
    const hasInvalidAddress = manualTransferData.some((item) => !item.receiver);
    if (hasInvalidAddress) {
        showToast({ message: "Please enter valid addresses for all transfers", type: "error" });
        return false;
    }

    const hasZeroAmount = manualTransferData.some((item) => !item.amount);
    if (hasZeroAmount) {
        showToast({ message: "Please enter a non-zero amount for all transfers", type: "error" });
        return false;
    }

    // Calculate total amount from all manual transfers
    const totalAmount = manualTransferData.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    // Check if total amount exceeds available quantity
    if (totalAmount > +quantity) {
        showToast({ message: `Total transfer amount (${totalAmount}) exceeds available quantity (${quantity})`, type: "error" });
        return false;
    }

    return true;
};
