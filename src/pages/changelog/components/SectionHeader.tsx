import { Flex, Heading } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    icon: ReactNode
    title: string
}

function SectionHeader({ icon, title }: Props) {
    return (
        <Flex alignItems="center" gap={2}>
            {icon}
            <Heading as="h3" fontSize={{ base: 16, xl: 18 }} fontWeight={500} color="text.white">
                {title}
            </Heading>
        </Flex>
    )
}

export default SectionHeader