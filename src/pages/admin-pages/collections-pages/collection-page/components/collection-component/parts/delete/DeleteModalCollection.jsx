import { useDisclosure } from '@chakra-ui/react'
import AppDialog from 'components/shared/dialog'
import { deleteCollectionService } from 'lib/apis/collection/services'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

function DeleteModalCollection({ open, close, collectionID, onSuccess }) {
    const { mutate, isLoading } = useMutation((params) => deleteCollectionService(params))

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
                    buttonProps: {
                        isLoading: isLoading
                    },
                    onClick: () => {
                        mutate({ collectionID }, {
                            onSuccess: () => {
                                toast.success("Delete collection")
                                onSuccess()
                                close()
                            },
                            onError: () => toast.error("Oops! Something went wrong")
                        })
                    }
                }
            ]}
        />
    )
}

export default DeleteModalCollection