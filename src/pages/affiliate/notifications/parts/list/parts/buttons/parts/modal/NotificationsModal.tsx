import { Text } from '@chakra-ui/react'
import AppDialog, { IAppDialog } from 'components/shared/dialog'
import React from 'react'

interface Iprops {
    close : Function
    open:boolean
    accept : Boolean | null
}

function NotificationsModal({close, open,accept}:Iprops) {
    return (
        <AppDialog
            close={close}
            open={open}
            text={(
                <Text>
                    You are Confirming permission to co-sell this product, Are you sure you want to <Text display={"inline"} fontFamily={"aven"} fontWeight="bold">{accept ? "Accept" : "Deny"}</Text> this request?
                </Text>
            )}
            title={"Are you sure?"}
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => { },
                    buttonProps: {
                        cancelType: true
                    }
                },
                {
                    children: accept ? "Accept" : "Deny",
                    onClick: () => { },
                }
            ]}
        />
    )
}

export default NotificationsModal