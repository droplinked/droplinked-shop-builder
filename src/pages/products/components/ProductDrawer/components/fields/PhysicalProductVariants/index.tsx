import { Flex } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import { getFieldErrorMessage } from 'pages/products/utils/formHelpers'
import { ProductProperty } from 'pages/products/utils/types'
import React, { useState } from 'react'
import ProductVariantCard from '../ProductVariantCard'
import AddVariantsButton from './AddVariantsButton'
import ProductSKUSettings from './SKUSettings/ProductSKUSettings'
import VariantForm from './VariantForm/VariantForm'

export default function PhysicalProductVariants() {
    const [isVariantFormVisible, setVariantFormVisibility] = useState(false)
    const [editingVariant, setEditingVariant] = useState<ProductProperty>(null)
    const { values: { properties, sku }, errors } = useProductForm()

    const canAddVariants = properties.length < 2

    const handleAddVariant = () => {
        setEditingVariant(null)
        setVariantFormVisibility(true)
    }

    const handleEditVariant = (editingVariant: ProductProperty) => {
        setEditingVariant(editingVariant)
        setVariantFormVisibility(true)
    }

    const handleDiscardVariant = () => setVariantFormVisibility(false)

    return (
        <FormFieldWrapper
            label="Variants"
            description="Add different versions of this product (e.g., size, color)."
            isRequired
            errorMessage={getFieldErrorMessage(errors.sku)}
        >
            <Flex direction="column" gap={9}>
                <Flex direction="column" gap={4}>
                    {isVariantFormVisible
                        ? <VariantForm handleDiscard={handleDiscardVariant} editingVariant={editingVariant} />
                        : canAddVariants && <AddVariantsButton onClick={handleAddVariant} />
                    }

                    {properties.map((property, index) =>
                        <ProductVariantCard key={index} variant={property} onEdit={handleEditVariant} />
                    )}

                    {!canAddVariants && (
                        <MessageBox
                            title="Variant Limit Warning"
                            description="Can’t add any more variants. You can only add up to 2 variants."
                            theme="warning"
                        />
                    )}
                </Flex>

                {sku.length > 0 && <ProductSKUSettings />}
            </Flex>
        </FormFieldWrapper>
    )
}