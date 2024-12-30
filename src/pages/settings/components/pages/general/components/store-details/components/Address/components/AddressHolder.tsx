import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
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
            border={"1px solid #292929"}
        >
            <Flex gap={2} alignItems={"start"}>
                <AppIcons.Location />
                <AppTypography fontSize={{ base: 14, md: 16 }} color={"#fff"}>
                    {`${addressLine1}, ${city}, ${state} ${zip}, ${country}`}
                </AppTypography>
            </Flex>
            <AppIcons.EditOutlined
                style={{ cursor: "pointer" }}
                onClick={onOpen}
            />
        </Flex>
    )
}
