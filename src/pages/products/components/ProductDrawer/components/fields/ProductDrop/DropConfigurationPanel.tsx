import { Flex } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import React from 'react'
import BlockchainNetworkSelector from './BlockchainNetworkSelector'

interface Props {
    isDropEnabled: boolean
}

function DropDetailsSection({ isDropEnabled }: Props) {
    if (!isDropEnabled) return null

    return (
        <Flex mt={2} direction="column" gap={6}>
            <BlockchainNetworkSelector isDropEnabled={isDropEnabled} />
            <MessageBox
                title="Product Lock Notice"
                description="Once this product is dropped, all details will be permanently locked and cannot be changed."
                theme="warning"
            />
        </Flex>
    )
}

export default DropDetailsSection