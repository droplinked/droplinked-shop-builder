import { Text } from '@chakra-ui/react'
import AppDialog, { IAppDialog } from 'components/common/dialog'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useMemo } from 'react'
import requestInterfaces from '../../interfaces'

interface Iprops {
    close: Function
    open: boolean
    status: requestInterfaces.IRequestStatus
    approveClick: Function
    loading: boolean
}

function NotificationsModal({ close, open, status, approveClick, loading }: Iprops) {
    
    const label = useMemo(() => typeof status === "string" ? capitalizeFirstLetter(status) : "", [status])

    return (
        <AppDialog
            close={() => { }}
            open={open}
            text={(
                <Text>
                    You are Confirming permission to co-sell this product, Are you sure you want to <Text display={"inline"} fontFamily={"aven"} fontfontWeight="bold">{label}</Text> this request?
                </Text>
            )}
            title={`Are you sure you want to ${label} this product request?`}
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => close(),
                    buttonProps: {
                        variant: "outline"
                    }
                },
                {
                    children: capitalizeFirstLetter(status),
                    onClick: approveClick,
                    buttonProps: {
                        isLoading: loading
                    }
                }
            ]}
        />
    )
}

export default NotificationsModal