import { Flex } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { convertPropertiesToPODSKUs } from 'pages/products/utils/skuUtils'
import React, { useEffect } from 'react'
import ProductFieldWrapper from '../../../common/ProductFieldWrapper'
import ProductBulkPriceUpdater from '../../ProductBulkPriceUpdater'
import ProductVariantCard from '../../ProductVariantCard'
import PODSKUTable from './PODSKUTable'

function PODProductVariants() {
    const { values, setFieldValue } = useProductForm()
    const availableVariants = useProductPageStore(s => s.available_variants)

    useEffect(() => {
        const createdSKUs = convertPropertiesToPODSKUs(values)
        setFieldValue("sku", createdSKUs)
    }, [convertPropertiesToPODSKUs, availableVariants])

    return (
        <ProductFieldWrapper
            label="Variants"
            description='Product variants, like colors and sizes, are automatically added by POD provider.'
            isRequired
        >
            <Flex direction="column" gap={9}>
                <Flex direction="column" gap={4}>
                    {values.properties.map((property, index) => (
                        <ProductVariantCard variant={property} key={index} />
                    ))}
                </Flex>
                <PODSKUTable />
                <ProductBulkPriceUpdater />
            </Flex>
        </ProductFieldWrapper>
    )
}

export default PODProductVariants