import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const useAppToast = () => {
    const showToast = (message: string | JSX.Element, type: "success" | "warning" | "error" | "info", options?: any) => {
        toast[type](message, options);
    };

    return { showToast }
};

export default useAppToast;