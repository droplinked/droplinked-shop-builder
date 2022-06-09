import { ToastContainer, toast } from 'react-toastify';
import { createContext } from 'react';

import "react-toastify/dist/ReactToastify.css";

export const toastValue = createContext(null)

export  function ToastContext({ children }) {

    const successToast = (text) =>{
        toast.success(text)
    }

    const errorToast = (text) =>{
        toast.error(text)
    }

    return (
        <toastValue.Provider value={{successToast , errorToast}}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </toastValue.Provider>
    )
}