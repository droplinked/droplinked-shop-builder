import AppDialog from 'components/common/dialog'
import useAppToast from 'functions/hooks/toast/useToast'
import { IdeleteCollectionService } from 'lib/apis/collection/interfaces'
import { deleteCollectionService } from 'lib/apis/collection/services'
import AppErrors from 'lib/utils/statics/errors/errors'
import React from 'react'
import { useMutation } from 'react-query'

interface IProps {
    open: boolean
    close: Function
    fetch: Function
    collectionID: string
}
function ConfirmDeleteCollection({ open, close, collectionID, fetch }: IProps) {
    const { mutate, isLoading } = useMutation((params: IdeleteCollectionService) => deleteCollectionService(params))
    const { showToast } = useAppToast()

    return (
        <AppDialog
            open={open}
            close={() => { }}
            title="Delete Collection"
            text={"Are you sure you want to delete this collection? You will no longer have access to this collection."}
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => close(),
                    buttonProps: {
                        variant: "outline"
                    }
                },
                {
                    children: "Delete",
                    buttonProps: { isLoading },
                    onClick: () => {
                        mutate({ collectionID }, {
                            onSuccess: () => {
                                showToast({ message: AppErrors.collection.delete_Collection, type: "success" })
                                fetch()
                                close()
                            },
                            onError: async () => showToast({ message: "Oops! Something went wrong", type: "error" })
                        })
                    }
                }
            ]}
        />
    )
}

export default ConfirmDeleteCollection