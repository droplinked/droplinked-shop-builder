import { Flex } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useAppToast from 'functions/hooks/toast/useToast'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductTypeLegality from 'pages/products/hooks/useProductTypeLegality'
import React from 'react'
import SwitchBox from '../../common/SwitchBox'
import BlockchainNetworkSelector from './BlockchainNetworkSelector'

interface Props {
    isDropEnabled: boolean
    onToggleDrop: (checked: boolean) => void
}

function ProductDrop({ isDropEnabled, onToggleDrop }: Props) {
    const { values, setFieldValue } = useProductForm()
    const { _id, product_type, publish_status, digitalDetail, sku } = values
    const { showToast } = useAppToast()
    const { isLegal, errorMessage } = useProductTypeLegality("drop")

    const handleDropToggle = (checked: boolean) => {
        if (_id && product_type === "DIGITAL" && publish_status === "PUBLISHED")
            return showToast({ type: "error", message: "This product has already been published." })

        if (!isLegal && checked)
            return showToast({ type: "error", message: errorMessage })

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
            switchProps={{
                isChecked: isDropEnabled,
                onChange: e => handleDropToggle(e.target.checked)
            }}
        >
            {isDropEnabled && (
                <Flex
                    mt={2}
                    direction="column"
                    gap={6}
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