import AppPermissionDenied from 'components/common/permission-denied/AppPermissionDenied';
import useShopPermissionsStore from 'lib/stores/app/shopPermissionsStore';
import React, { PropsWithChildren } from 'react';


interface Props extends PropsWithChildren {
    requiredPermission: string
}

function WithPermission({ requiredPermission, children }: Props) {
    const hasPermission = useShopPermissionsStore(state => state.hasPermission)

    if (hasPermission(requiredPermission)) {
        return children
    }

    return <AppPermissionDenied />
}

export default WithPermission