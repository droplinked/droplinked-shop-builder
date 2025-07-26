import { Flex } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import BlockchainNetworkSelector from './BlockchainNetworkSelector'

interface Props {
    isDropEnabled: boolean
}

function DropDetailsSection({ isDropEnabled }: Props) {
    const { t } = useLocaleResources('products')
    
    if (!isDropEnabled) return null

    return (
        <Flex mt={2} direction="column" gap={6}>
            <BlockchainNetworkSelector isDropEnabled={isDropEnabled} />
            <MessageBox
                title={t('DropConfigurationPanel.productLockNotice.title')}
                description={t('DropConfigurationPanel.productLockNotice.description')}
                theme="warning"
            />
        </Flex>
    )
}

export default DropDetailsSection