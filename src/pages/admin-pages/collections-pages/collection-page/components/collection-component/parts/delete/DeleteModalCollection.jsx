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
            title="Sure delete collection ?"
            buttons={[
                {
                    children: "Cancel",
                    onClick: () => close(),
                    buttonProps: {
                        cancelType: true
                    }
                },
                {
                    children: "Yes i sure",
                    buttonProps: {
                        loading: isLoading
                    },
                    onClick: () => {
                        mutate({ collectionID }, {
                            onSuccess: () => {
                                toast.success("Delete collection")
                                onSuccess()
                                close()
                            },
                            onError: () => toast.error("Somthing wrong")
                        })
                    }
                }
            ]}
        />
    )
}

export default DeleteModalCollection