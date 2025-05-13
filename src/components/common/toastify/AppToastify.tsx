import React from 'react'
import { Toaster } from 'sonner'

function AppToastify() {
    return (
        <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="dark"
            expand={false}
            duration={2500}
            style={{
                zIndex: 9000000000
            }}
        />
    )
}

export default AppToastify