import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTable from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DeleteAddress from './delete/DeleteAddress'
import AddressModal from './modal/AddressModal'

interface Iprops {
    addressService: any
}

function ShopInfoAddress({ addressService }: Iprops) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [AddressID, setAddressID] = useState(null)
    const isRegister = useLocation().pathname.includes("register")
    const address = addressService?.data?.data?.data

    // Open modal edit mode
    const editModal = useCallback((addressID: string) => {
        setAddressID(addressID)
        onOpen()
    }, [])

    useEffect(() => setAddressID(null), [addressService.data])

    const rows = useMemo(() => {
        return address ? address.map((el: any) => ({
            State: {
                value: `${el.country}, ${el.state}`
            },
            Address: {
                value: `${el.addressLine1}`
            },
            zipcode: {
                caption: "Zip Code",
                value: `${el.zip}`
            },
            Options: {
                props: {
                    style: {
                        textAlign: "center"
                    }
                },
                value: (
                    <Flex gap={4} justifyContent="center">
                        <AppIcons.EditIcon style={{ cursor: "pointer" }} onClick={() => editModal(el._id)} width="16px" height="16px" />
                        {isRegister && <DeleteAddress addressID={el._id} addressRefetch={() => addressService.mutate()} />}
                    </Flex>
                )
            },
        })) : []
    }, [address])

    return (
        <VStack align={"stretch"}>
            <Box><FieldLabel textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired label='Store Address' /></Box>
            <Flex justifyContent={"space-between"} alignItems="baseline">
                <AppTypography fontSize='14px' color={"#C2C2C2"}>Add the physical location of your store or the place where your products are stored.</AppTypography>
                {isRegister && !address?.length && !addressService.isLoading ? (
                    <Box>
                        <BasicButton sizes={"medium"} width={"100%"} onClick={onOpen} marginBottom={1} variant='outline'>Add Address</BasicButton>
                    </Box>
                ) : null}
            </Flex>
            <AppTable rows={rows} />
            {isOpen && <AddressModal close={onClose} addressID={AddressID} onSuccess={addressService.mutate} open={isOpen} />}
        </VStack>
    )
}

export default ShopInfoAddress