import { Flex, GridItem, SimpleGrid } from '@chakra-ui/react'
import ErrorMessage from 'components/redesign/error-message/ErrorMessage'
import AppInput from 'components/redesign/input/AppInput'
import CurrencySelect from 'components/redesign/select/CurrencySelect'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useAppStore from 'stores/app/appStore'
import useProductForm from 'pages/products/hooks/useProductForm'
import { getFieldErrorMessage } from 'pages/products/utils/formHelpers'
import React from 'react'
import InfinityToggleButton from '../../common/InfinityToggleButton'

function DigitalProductSKU() {
    const { t } = useLocaleResources('products')
    const { values: { sku }, errors, setFieldValue } = useProductForm()
    const { shop: { currency } } = useAppStore()

    // As you know, digital products have only 1 SKU, and we initialize it in the `getFormInitialValues` function in formHelpers.ts
    const skuData = sku[0]
    const errorMessage = getFieldErrorMessage(errors.sku)

    const handleFieldUpdate = (field: string, value: any) => {
        const updatedSku = [...sku]
        updatedSku[0][field] = value
        setFieldValue('sku', updatedSku)
    }

    return (
        <Flex direction="column" gap={2}>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                rowGap={9}
                columnGap={4}
                sx={{ input: { fontSize: 16 } }}
            >
                <AppInput
                    label={t('digitalProductSKU.price')}
                    inputProps={{
                        isRequired: true,
                        type: 'number',
                        numberType: 'float',
                        placeholder: t('digitalProductSKU.pricePlaceholder'),
                        value: skuData.price || '',
                        onChange: (e) => handleFieldUpdate('price', parseFloat(e.target.value))
                    }}
                />

                <GridItem alignSelf="flex-end">
                    <CurrencySelect h="50px" value={currency?.abbreviation} isDisabled />
                </GridItem>

                <AppInput
                    label={t('digitalProductSKU.quantity')}
                    inputContainerProps={{ padding: '10px' }}
                    inputProps={{
                        type: 'number',
                        numberType: 'int',
                        min: 0,
                        placeholder: t('digitalProductSKU.quantityPlaceholder'),
                        value: skuData.quantity || '',
                        onChange: (e) => handleFieldUpdate('quantity', parseInt(e.target.value))
                    }}
                    rightElement={
                        <InfinityToggleButton
                            isActive={skuData.quantity === 1000000}
                            onToggle={() => handleFieldUpdate('quantity', 1000000)}
                        />
                    }
                />

                <AppInput
                    label={t('digitalProductSKU.externalID')}
                    inputProps={{
                        placeholder: t('digitalProductSKU.externalIDPlaceholder'),
                        value: skuData.externalID || '',
                        onChange: (e) => handleFieldUpdate('externalID', e.target.value)
                    }}
                />
            </SimpleGrid>

            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Flex>
    )
}

export default DigitalProductSKU