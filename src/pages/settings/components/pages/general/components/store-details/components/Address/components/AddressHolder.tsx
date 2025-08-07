import { Flex } from '@chakra-ui/react'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { LocationMd } from 'assets/icons/System/Location/LocationMd'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Props {
    onOpen: () => void
    addressData: {
        addressLine1: string
        addressLine2: string
        city: string
        country: string
        zip: string
        state: string
    }
}

export default function AddressHolder({ onOpen, addressData }: Props) {
    const { addressLine1, city, country, zip, state } = addressData

    return (
        <Flex
            justifyContent={"space-between"}
            borderRadius={"8px"}
            width={"100%"}
            px={4}
            py={3}
            border={"1px solid"}
            borderColor="neutral.gray.800"
        >
            <Flex gap={2} alignItems={"start"}>
                <LocationMd color='#fff' />
                <AppTypography fontSize={{ base: 14, md: 16 }} color={"#fff"}>
                    {`${addressLine1}, ${city}, ${state} ${zip}, ${country}`}
                </AppTypography>
            </Flex>
            <button onClick={onOpen}>
                <EditMd color='#fff' />
            </button>
        </Flex>
    )
}
