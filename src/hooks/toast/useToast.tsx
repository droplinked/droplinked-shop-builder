import React, { JSX } from "react";
import { toast, ToasterProps } from "sonner";
import { CustomToast } from "./components/CustomToast";

type ToastType = "success" | "error" | "info" | "warning";

const useAppToast = () => {
    const showToast = (toastObject: {
        type: ToastType;
        message: string | JSX.Element;
        description?: string;
        options?: ToasterProps;
    }) => {
        const { type, message, description, options } = toastObject;

        return toast.custom(
            (id) => (
                <CustomToast
                    id={id}
                    type={type}
                    title={message}
                    description={description}
                />
            ),
            options
        );
    };

    return { showToast };
};

export default useAppToast;
