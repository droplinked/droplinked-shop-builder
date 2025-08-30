import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

function AuthGuard({ children }: PropsWithChildren) {
    const { user } = useAppStore()

    // If no user or user status is not authorized, redirect back
    if (!user || !['SHOP_INFO_COMPLETED', 'ACTIVE'].includes(user.status)) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

export default AuthGuard
