import { Text } from '@chakra-ui/react'
import AppDialog, { IAppDialog } from 'components/shared/dialog'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import requestInterfaces from '../../interfaces'

interface Iprops {
    close: Function
    open: boolean
    status: requestInterfaces.IRequestStatus
    approveClick: Function
    loading: boolean
}

function NotificationsModal({ close, open, status, approveClick, loading }: Iprops) {
    return (
        <AppDialog
            close={() => { }}
            open={open}
            text={(
                <Text>
                    You are Confirming permission to co-sell this product, Are you sure you want to <Text display={"inline"} fontFamily={"aven"} fontWeight="bold">{typeof status === "string" ? capitalizeFirstLetter(status) : ""}</Text> this request?
                </Text>
            )}
            title={"Are you sure?"}
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => close(),
                    buttonProps: {
                        cancelType: true
                    }
                },
                {
                    children: capitalizeFirstLetter(status),
                    onClick: approveClick,
                    buttonProps: {
                        loading: loading
                    }
                }
            ]}
        />
    )
}

export default NotificationsModal