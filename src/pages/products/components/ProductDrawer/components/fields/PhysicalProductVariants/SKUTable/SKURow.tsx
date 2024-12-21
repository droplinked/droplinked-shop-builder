import { Td, Tr } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { SKU } from 'pages/products/utils/types'
import React from 'react'
import InfinityToggleButton from './InfinityToggleButton'
import SKUDisplay from './SKUDisplay'

interface SKURowProps {
    sku: SKU
    index: number
    onInputChange: (index: number, field: keyof SKU, value: any) => void
}

export default function SKURow({ sku, index, onInputChange }: SKURowProps) {
    const handleInputChange = (field: keyof SKU) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value === '') return onInputChange(index, field, 0)
        if (field === 'quantity') {
            const numericValue = parseInt(value, 10)
            if (!isNaN(numericValue) && numericValue >= 0)
                onInputChange(index, field, numericValue)
        }
        else if (field === 'price') {
            const numericValue = parseFloat(value)
            if (!isNaN(numericValue) && numericValue >= 0)
                onInputChange(index, field, numericValue)
        }
        else onInputChange(index, field, value)
    }

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
                        value: sku.price !== undefined ? sku.price : '',
                        onChange: handleInputChange('price')
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
                        value: sku.quantity !== undefined ? sku.quantity : '',
                        onChange: handleInputChange('quantity')
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
                        onChange: handleInputChange('externalID')
                    }}
                />
            </Td>
        </Tr>
    )
}