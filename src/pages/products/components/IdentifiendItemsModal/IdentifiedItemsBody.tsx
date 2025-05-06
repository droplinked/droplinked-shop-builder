import { ModalBody } from '@chakra-ui/react'
import React from 'react'

export default function IdentifiedItemsBody() {
    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={{ lg: '48px !important', md: '32px !important', base: '16px !important' }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
        >

        </ModalBody>
    )
}
