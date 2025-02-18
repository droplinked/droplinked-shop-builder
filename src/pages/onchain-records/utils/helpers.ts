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
    // Create a copy of the array to work with
    let dataToValidate = [...manualTransferData];

    // Check if the last item has empty address and zero amount
    const lastItem = dataToValidate[dataToValidate.length - 1];
    if (lastItem && !lastItem.receiver && (!lastItem.amount || lastItem.amount === 0)) {
        // Remove the last item from validation
        dataToValidate = dataToValidate.slice(0, -1);
    }

    // If no items to validate after removing empty last item
    if (dataToValidate.length === 0) {
        showToast({ message: "Please enter at least one valid transfer", type: "error" });
        return false;
    }

    // Check for falsy addresses
    const hasInvalidAddress = dataToValidate.some((item) => !item.receiver);
    if (hasInvalidAddress) {
        showToast({ message: "Please enter valid addresses for all transfers", type: "error" });
        return false;
    }

    const hasZeroAmount = dataToValidate.some((item) => !item.amount);
    if (hasZeroAmount) {
        showToast({ message: "Please enter a non-zero amount for all transfers", type: "error" });
        return false;
    }

    // Calculate total amount from all manual transfers
    const totalAmount = dataToValidate.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    // Check if total amount exceeds available quantity
    if (totalAmount > +quantity) {
        showToast({ message: `Total transfer amount (${totalAmount}) exceeds available quantity (${quantity})`, type: "error" });
        return false;
    }

    return true;
};
