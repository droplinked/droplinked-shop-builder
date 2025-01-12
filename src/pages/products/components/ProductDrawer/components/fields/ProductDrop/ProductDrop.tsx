import { Flex } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import SwitchBox from '../../common/SwitchBox'
import BlockchainNetworkSelector from './BlockchainNetworkSelector'

interface Props {
    isDropEnabled: boolean
    onToggleDrop: (checked: boolean) => void
}

function ProductDrop({ isDropEnabled, onToggleDrop }: Props) {
    const { values: { digitalDetail, sku }, setFieldValue } = useProductForm()

    const handleDropToggle = (checked: boolean): void => {
        onToggleDrop(checked)
        if (!checked) {
            setFieldValue('digitalDetail', { ...digitalDetail, chain: '' })
            setFieldValue('sku', sku.map(s => ({ ...s, royalty: null })))
        }
    }

    return (
        <SwitchBox
            title="Drop"
            description="Enable onchain records for this digital product."
            isChecked={isDropEnabled}
            onToggle={e => handleDropToggle(e.target.checked)}
        >
            {isDropEnabled && (
                <Flex
                    direction="column"
                    gap={6}
                    mt={2}
                >
                    <BlockchainNetworkSelector isDropEnabled={isDropEnabled} />
                    <MessageBox
                        title="Product Lock Notice"
                        description="Once this product is dropped, all details will be permanently locked and cannot be changed."
                        theme="warning"
                    />
                </Flex>
            )}
        </SwitchBox>
    )
}

export default ProductDrop