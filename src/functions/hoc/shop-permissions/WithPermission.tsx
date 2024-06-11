import AppPermissionDenied from 'components/common/permission-denied/AppPermissionDenied';
import useShopPermissionsStore from 'lib/stores/app/shopPermissionsStore';
import React, { PropsWithChildren } from 'react';


interface Props extends PropsWithChildren {
    requiredPermission: string
    action?: "default" | "hide"
}

function WithPermission({ children, requiredPermission, action = "default" }: Props) {
    const hasPermission = useShopPermissionsStore(state => state.hasPermission)

    if (hasPermission(requiredPermission)) {
        return children
    }

    return action === "default" ? <AppPermissionDenied /> : null
}

export default WithPermission