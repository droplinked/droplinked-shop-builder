import { GridItem, SimpleGrid } from '@chakra-ui/react'
import Input from 'components/redesign/input/Input'
import CurrencySelect from 'components/redesign/select/CurrencySelect'
import useAppStore from 'lib/stores/app/appStore'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import InfinityToggleButton from '../../common/InfinityToggleButton'

function DigitalProductSKU() {
    const { values: { sku }, setFieldValue } = useProductForm()
    const { shop: { currency } } = useAppStore()

    const updateSkuField = (field: string, value: any) => {
        const updatedSku = [...sku]
        if (field === 'price' || field === 'quantity')
            updatedSku[0][field] = parseFloat(value) || 0
        setFieldValue('sku', updatedSku)
    }

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2 }}
            rowGap={9}
            columnGap={4}
            sx={{ input: { fontSize: 16 } }}
        >
            <Input
                label="Price"
                inputProps={{
                    isRequired: true,
                    type: 'number',
                    numberType: 'float',
                    value: sku?.[0]?.price || '',
                    onChange: (e) => updateSkuField('price', e.target.value)
                }}
            />

            <GridItem alignSelf="flex-end">
                <CurrencySelect h="50px" value={currency?.abbreviation} isDisabled />
            </GridItem>

            <Input
                label="Quantity"
                inputContainerProps={{ padding: '10px' }}
                inputProps={{
                    type: 'number',
                    numberType: 'int',
                    min: 0,
                    value: sku?.[0]?.quantity || '',
                    onChange: (e) => updateSkuField('quantity', e.target.value)
                }}
                rightElement={
                    <InfinityToggleButton
                        isActive={sku?.[0].quantity === 1000000}
                        onToggle={() => updateSkuField('quantity', 1000000)}
                    />
                }
            />

            <Input
                label="External ID"
                inputProps={{
                    value: sku?.[0]?.externalID || '',
                    onChange: (e) => updateSkuField('externalID', e.target.value)
                }}
            />
        </SimpleGrid>
    )
}

export default DigitalProductSKU