import AppDialog from 'components/shared/dialog'
import { IdeleteCollectionService } from 'lib/apis/collection/interfaces'
import { deleteCollectionService } from 'lib/apis/collection/services'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

interface IProps {
    open: boolean
    close: Function
    fetch: Function
    collectionID: string
}
function ConfirmDeleteCollection({ open, close, collectionID, fetch }: IProps) {
    const { mutate, isLoading } = useMutation((params: IdeleteCollectionService) => deleteCollectionService(params))

    return (
        <AppDialog
            open={open}
            close={() => { }}
            title="Confirm Collection Deletion"
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
                    children: "Delete Collection",
                    buttonProps: { isLoading },
                    onClick: () => {
                        mutate({ collectionID }, {
                            onSuccess: () => {
                                toast.success("Delete Collection")
                                fetch()
                                close()
                            },
                            onError: async () => toast.error("Somthing wrong")
                        })
                    }
                }
            ]}
        />
    )
}

export default ConfirmDeleteCollection