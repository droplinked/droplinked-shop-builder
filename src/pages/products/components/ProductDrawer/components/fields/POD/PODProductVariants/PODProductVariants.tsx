import { Flex } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import { getFieldErrorMessage } from 'pages/products/utils/formHelpers'
import { convertPropertiesToPODSKUs } from 'pages/products/utils/skuUtils'
import { ProductProperty } from 'pages/products/utils/types'
import React, { useEffect } from 'react'
import ProductBulkPriceUpdater from '../../ProductBulkPriceUpdater'
import ProductVariantCard from '../../ProductVariantCard'
import PODSKUTable from './PODSKUTable'

export default function PODProductVariants() {
    const { t } = useLocaleResources('products');
    const { values, setFieldValue, errors } = useProductForm()
    const { _id, sku, properties } = values

    useEffect(() => {
        if (!_id && !sku.length) {
            const createdSKUs = convertPropertiesToPODSKUs(values)
            setFieldValue('sku', createdSKUs)
        }
    }, [_id, sku, convertPropertiesToPODSKUs, setFieldValue])

    return (
        <FormFieldWrapper
            label={t('ProductForm.pod.productVariants.label')}
            description={t('ProductForm.pod.productVariants.description')}
            isRequired
            errorMessage={getFieldErrorMessage(errors.sku)}
        >
            <Flex direction="column" gap={9}>
                <VariantList properties={properties} />
                <PODSKUTable />
                <ProductBulkPriceUpdater />
            </Flex>
        </FormFieldWrapper>
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