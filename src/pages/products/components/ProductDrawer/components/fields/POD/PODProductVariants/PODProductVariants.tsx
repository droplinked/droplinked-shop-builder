import { Flex } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import { convertPropertiesToPODSKUs } from 'pages/products/utils/skuUtils'
import { ProductProperty } from 'pages/products/utils/types'
import React, { useEffect } from 'react'
import ProductFieldWrapper from '../../../common/ProductFieldWrapper'
import ProductBulkPriceUpdater from '../../ProductBulkPriceUpdater'
import ProductVariantCard from '../../ProductVariantCard'
import PODSKUTable from './PODSKUTable'

export default function PODProductVariants() {
    const { values, setFieldValue } = useProductForm()
    const { _id, properties } = values

    // Synchronize SKUs if the product is new
    useEffect(() => {
        if (!_id) {
            const createdSKUs = convertPropertiesToPODSKUs(values)
            setFieldValue('sku', createdSKUs)
        }
    }, [_id, values, setFieldValue])

    return (
        <ProductFieldWrapper
            label="Variants"
            description="Product variants, like colors and sizes, are automatically added by the POD provider."
            isRequired
        >
            <Flex direction="column" gap={9}>
                <VariantList properties={properties} />
                <PODSKUTable />
                <ProductBulkPriceUpdater />
            </Flex>
        </ProductFieldWrapper>
    )
}

function VariantList({ properties }: { properties: ProductProperty[] }) {
    return (
        <Flex direction="column" gap={4}>
            {properties.map((property, index) => (
                <ProductVariantCard variant={property} key={index} />
            ))}
        </Flex>
    )
}