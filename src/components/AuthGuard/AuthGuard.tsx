import React, { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

interface AuthGuardProps extends PropsWithChildren { }

function AuthGuard({ children }: AuthGuardProps) {
    const { user } = useAppStore()
    const navigate = useNavigate()

    // If no user or user status is not authorized, redirect back
    if (!user || !['SHOP_INFO_COMPLETED', 'ACTIVE'].includes(user.status)) {
        return navigate("/", { replace: true })
    }

    return <>{children}</>
}

export default AuthGuard
