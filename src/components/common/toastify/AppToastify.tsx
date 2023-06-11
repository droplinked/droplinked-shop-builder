import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function AppToastify() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

export default AppToastify