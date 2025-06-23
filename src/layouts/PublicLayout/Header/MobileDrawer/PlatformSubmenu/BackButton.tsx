import { Flex, Text } from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import React from 'react'

interface Props {
    onClose: () => void
}

export default function BackButton({ onClose }: Props) {
    return (
        <Flex
            as="button"
            alignItems="center"
            gap={1}
            padding={{ base: 4, md: "24px 36px" }}
            fontSize={14}
            fontWeight={500}
            color="text.white"
            onClick={onClose}
        >
            <ChevronleftMd color='#fff' />
            Back
        </Flex>
    )
} 