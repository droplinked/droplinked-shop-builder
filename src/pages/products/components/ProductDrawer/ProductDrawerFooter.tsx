import { DrawerFooter as ChakraDrawerFooter, Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useProductForm from 'pages/products/hooks/useProductForm'
import { checkIfProductIsRecorded } from 'pages/products/utils/skuUtils'
import React from 'react'

interface Props {
    onClose: () => void
}

const ProductDrawerFooter = ({ onClose }: Props) => {
    const { values, setFieldValue, handleSubmit, isSubmitting } = useProductForm()
    const { _id: editingProductId, sku, publish_product } = values

    const isProductRecorded = checkIfProductIsRecorded(sku)
    const isButtonDisabled = isProductRecorded || isSubmitting

    const handleAction = (action: string) => {
        const isSavingAsDraft = action === 'save-as-draft'
        const publishStatus = isSavingAsDraft ? 'DRAFTED' : 'PUBLISHED'
        setFieldValue('publish_status', publishStatus)
        setFieldValue('publish_product', !isSavingAsDraft)
        handleSubmit()
    }

    return (
        <ChakraDrawerFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderTop="1px solid #292929"
            padding={9}
            css={{ button: { fontSize: 14, fontWeight: 500 } }}
        >
            <Button type="button" variant="secondary" isDisabled={isSubmitting} onClick={onClose}>
                Discard
            </Button>

            <Flex gap={4}>
                <Button
                    type="button"
                    variant="outline"
                    borderColor="#2BCFA1"
                    color="#2BCFA1"
                    isDisabled={isButtonDisabled}
                    isLoading={isSubmitting && !publish_product}
                    onClick={() => handleAction('save-as-draft')}
                >
                    Save as draft
                </Button>
                <Button
                    type="button"
                    isDisabled={isButtonDisabled}
                    isLoading={isSubmitting && publish_product}
                    onClick={() => handleAction('publish-product')}
                >
                    {editingProductId ? 'Update Product' : 'Add Product'}
                </Button>
            </Flex>
        </ChakraDrawerFooter>
    )
}

export default ProductDrawerFooter