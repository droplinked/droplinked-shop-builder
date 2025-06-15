import { Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
    icon: React.ReactNode
    button: React.ReactElement
}

const LinkItem = ({ icon, button }: Props) => (
    <Flex alignItems="center" gap="6px">
        {icon}
        {button}
    </Flex>
)

export default LinkItem