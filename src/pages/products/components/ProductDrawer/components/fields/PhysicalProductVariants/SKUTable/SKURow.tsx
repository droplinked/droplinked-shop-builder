import { Td, Tr } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import Input from 'components/redesign/input/Input'
import { SKU } from 'pages/products/utils/types'
import React from 'react'
import InfinityToggleButton from '../../../common/InfinityToggleButton'
import SkuVariants from '../../../common/SkuVariants'

interface SKURowProps {
    currentSKU: SKU
    index: number
    onInputChange: (index: number, field: string, value: any) => void
    onToggleQuantity: (index: number) => void
    onRemoveSKU: (index: number) => void
}

export default function SKURow({ currentSKU, index, onInputChange, onToggleQuantity, onRemoveSKU }: SKURowProps) {
    return (
        <Tr>
            <Td>
                <SkuVariants options={currentSKU.options} />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        type: 'number',
                        step: '0.01',
                        numberType: 'float',
                        value: currentSKU.price ?? '',
                        onChange: (e) => onInputChange(index, 'price', parseFloat(e.target.value) || 0)
                    }}
                    leftElement={<CurrencyIcon />}
                />
            </Td>
            <Td>
                <Input
                    inputContainerProps={{ padding: '8px', pl: 4 }}
                    inputProps={{
                        type: 'number',
                        step: '1',
                        numberType: 'int',
                        value: currentSKU.quantity ?? '',
                        onChange: (e) => onInputChange(index, 'quantity', parseInt(e.target.value, 10) || 0)
                    }}
                    rightElement={
                        <InfinityToggleButton
                            isActive={currentSKU.quantity === 1000000}
                            onToggle={() => onToggleQuantity(index)}
                        />
                    }
                />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        value: currentSKU.externalID || '',
                        onChange: (e) => onInputChange(index, 'externalID', e.target.value),
                    }}
                />
            </Td>
            <Td sx={{ path: { fill: '#FF2244' } }}>
                <button type="button" onClick={() => onRemoveSKU(index)}>
                    <AppIcons.Close />
                </button>
            </Td>
        </Tr>
    )
}