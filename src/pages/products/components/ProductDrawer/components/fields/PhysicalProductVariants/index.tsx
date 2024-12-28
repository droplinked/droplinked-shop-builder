import { Flex } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import AddVariantsButton from './AddVariantsButton'
import ProductSKUSettings from './SKUSettings/ProductSKUSettings'
import VariantCard from './VariantCard'
import VariantForm from './VariantForm'

function PhysicalProductVariants() {
    const [isVariantFormVisible, setVariantFormVisibility] = useState(false)
    const { values: { properties, sku } } = useProductForm()

    const canAddVariants = properties.length < 2
    const handleAddVariantClick = () => setVariantFormVisibility(true)
    const handleDiscardVariant = () => setVariantFormVisibility(false)

    return (
        <ProductFieldWrapper
            label="Variants"
            description="Add different versions of this product (e.g., size, color)."
            isRequired
        >
            <Flex direction="column" gap={9}>
                <Flex direction="column" gap={4}>
                    {isVariantFormVisible
                        ? <VariantForm handleDiscard={handleDiscardVariant} />
                        : canAddVariants && <AddVariantsButton onClick={handleAddVariantClick} />
                    }

                    {properties.map((property, index) => <VariantCard key={index} variant={property} />)}

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
        </ProductFieldWrapper>
    )
}

export default PhysicalProductVariants