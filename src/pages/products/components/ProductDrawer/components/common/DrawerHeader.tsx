import { DrawerHeader as ChakraDrawerHeader, DrawerCloseButton, Text } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'

const DrawerHeader = () => {
    const { values } = useFormikContext()

    return (
        <ChakraDrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #292929"
            padding={9}
        >
            <Text fontSize={24} fontWeight={700} color="#FFF">
                Add Physical Product
            </Text>
            <DrawerCloseButton position="static" color="white" />
        </ChakraDrawerHeader>
    )
}

export default DrawerHeader