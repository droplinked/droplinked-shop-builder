import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useAppToast = () => {
    const showToast = (toastObject: { type: TypeOptions, message: string | JSX.Element, options?: ToastOptions }) => {
        const { type, message, options } = toastObject
        toast[type](message, options);
    };

    return { showToast }
};

export default useAppToast;