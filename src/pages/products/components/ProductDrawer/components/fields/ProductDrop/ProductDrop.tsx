import { Flex } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import SwitchBox from '../../common/SwitchBox'
import BlockchainNetworkSelector from './BlockchainNetworkSelector'

function ProductDrop() {
    const { values: { digitalDetail, sku }, setFieldValue } = useProductForm()
    const [isDropEnabled, setIsDropEnabled] = useState<boolean>(!!digitalDetail.chain)

    const handleDropToggle = (checked: boolean): void => {
        setIsDropEnabled(checked)
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
            onToggle={(e: React.ChangeEvent<HTMLInputElement>) => handleDropToggle(e.target.checked)}
        >
            {isDropEnabled && (
                <Flex direction="column" gap={6} mt={2}>
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