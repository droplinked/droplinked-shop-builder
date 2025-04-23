import React, { JSX } from "react";
import { toast, ToasterProps } from "sonner";
import { CustomToast } from "./components/CustomToast";

type ToastType = "success" | "error" | "info" | "warning";

const useAppToast = () => {
    // Helper function to create a custom toast
    const showCustomToast = (toastData: {
        type: ToastType;
        title: string;
        description?: string;
        options?: ToasterProps;
    }) => {
        const { type, title, description, options } = toastData;

        return toast.custom(
            (id) => (
                <CustomToast
                    id={id}
                    type={type}
                    title={title}
                    description={description}
                />
            ),
            options
        );
    };

    // Legacy method for backward compatibility
    const showToast = (toastObject: {
        type: ToastType;
        message: string | JSX.Element;
        description?: string;
        options?: ToasterProps;
    }) => {
        const { type, message, description, options } = toastObject;

        // Convert the old format to the new one
        return showCustomToast({
            type,
            title: typeof message === 'string' ? message : 'Notification',
            description: description,
            options
        });
    };

    return { showToast, showCustomToast };
};

export default useAppToast;
