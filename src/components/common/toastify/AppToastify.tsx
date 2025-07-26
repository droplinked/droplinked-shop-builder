import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react'
import { Toaster } from 'sonner'

function AppToastify() {
    const { isRTL } = useLocaleResources('common')
    return (
        <Toaster
            position={isRTL ? 'bottom-left' : 'bottom-right'}
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