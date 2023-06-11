import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppDialog from 'components/common/dialog'
import useAppToast from 'functions/hooks/toast/useToast'
import { deleteAddressService } from 'lib/apis/address/addressServices'
import { IdeleteAddressService } from 'lib/apis/address/interfaces'
import React, { useCallback } from 'react'
import { useMutation } from 'react-query'

interface IProps {
    addressRefetch: Function
    addressID: string
}

function DeleteAddress({ addressID, addressRefetch }: IProps) {
    const { mutateAsync, isLoading } = useMutation((params: IdeleteAddressService) => deleteAddressService(params))
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showToast } = useAppToast()

    // Delete address
    const deleted = useCallback(async (addressID: string) => {
        try {
            await mutateAsync({ addressID })
            addressRefetch()
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }, [])

    return (
        <>
            <AppIcons.deleteIcon style={{ cursor: "pointer" }} onClick={onOpen} width="16px" height="16px" />
            <AppDialog
                open={isOpen}
                close={onClose}
                title="Confirm delete address"
                buttons={[
                    {
                        children: "Cancel",
                        onClick: () => { },
                        buttonProps: {
                            variant: "outline"
                        }
                    },
                    {
                        children: "Delete",
                        onClick: () => deleted(addressID),
                        buttonProps: {
                            isLoading: isLoading
                        }
                    },

                ]}
            />
        </>
    )
}

export default DeleteAddress