import { DrawerHeader as ChakraDrawerHeader, DrawerCloseButton, Heading } from '@chakra-ui/react'
import React from 'react'

interface Props {
    isEditing?: boolean
}

const ShippingProfileDrawerHeader = ({ isEditing = false }: Props) => {
    const title = isEditing ? 'Edit Shipping Profile' : 'Create Shipping Profile'

    return (
        <ChakraDrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
            padding={9}
        >
            <Heading as="h3" fontSize={24} fontWeight={700} color="neutral.white">
                {title}
            </Heading>
            <DrawerCloseButton position="static" color="white" />
        </ChakraDrawerHeader>
    )
}

export default ShippingProfileDrawerHeader
