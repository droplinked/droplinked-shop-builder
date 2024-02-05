import AppDialog from 'components/common/dialog'
import React from 'react'

interface Props {
    isOpen: boolean
    close: Function
    isLoading: boolean,
    removeDomain: Function
}

function ConfirmDomainDeletion({ isOpen, close, isLoading, removeDomain }: Props) {
    return (
        <AppDialog
            open={isOpen}
            close={() => { }}
            title="Delete Domain"
            text={"Are you sure you want to delete this Domain?"}
            buttons={[
                {
                    children: "Cancel",
                    onClick: close,
                    buttonProps: { variant: "outline" }
                },
                {
                    children: "Delete",
                    buttonProps: { isLoading },
                    onClick: removeDomain
                }
            ]}
        />
    )
}

export default ConfirmDomainDeletion