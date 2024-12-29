import { Td, Tr } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { SKU } from 'pages/products/utils/types'
import React from 'react'
import InfinityToggleButton from '../../../common/InfinityToggleButton'
import SKUDisplay from './SKUDisplay'

interface SKURowProps {
    sku: SKU
    index: number
    onInputChange: (index: number, field: keyof SKU, value: any) => void
}

export default function SKURow({ sku, index, onInputChange }: SKURowProps) {
    const toggleQuantity = () => {
        const newQuantity = sku.quantity === 1000000 ? 0 : 1000000
        onInputChange(index, 'quantity', newQuantity)
    }

    return (
        <Tr>
            <Td>
                <SKUDisplay options={sku.options} />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        type: 'number',
                        step: '0.01',
                        numberType: 'float',
                        value: sku.price ?? '',
                        onChange: (e) => onInputChange(index, 'price', parseFloat(e.target.value) || 0),
                    }}
                    leftElement={<AppIcons.GrayDollar />}
                />
            </Td>
            <Td>
                <Input
                    inputContainerProps={{ padding: '8px', pl: 4 }}
                    inputProps={{
                        type: 'number',
                        step: '1',
                        numberType: 'int',
                        value: sku.quantity ?? '',
                        onChange: (e) => onInputChange(index, 'quantity', parseInt(e.target.value, 10) || 0),
                    }}
                    rightElement={
                        <InfinityToggleButton
                            isActive={sku.quantity === 1000000}
                            onToggle={toggleQuantity}
                        />
                    }
                />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        value: sku.externalID || '',
                        onChange: (e) => onInputChange(index, 'externalID', e.target.value),
                    }}
                />
            </Td>
        </Tr>
    )
}