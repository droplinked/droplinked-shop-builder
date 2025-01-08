import { DrawerFooter as ChakraDrawerFooter, Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'

interface Props {
    onClose: () => void
}

const ProductDrawerFooter = ({ onClose }: Props) => {
    const { values: { publish_product }, setFieldValue, handleSubmit, isSubmitting } = useProductForm()
    const editingProductId = useProductPageStore(state => state.editingProductId)

    const handleAction = (action: string) => {
        const isSavingAsDraft = action === 'save-as-draft'
        setFieldValue('publish_status', isSavingAsDraft ? 'DRAFTED' : 'PUBLISHED')
        setFieldValue('publish_product', !isSavingAsDraft)
        handleSubmit()
    }

    const actionLabel = editingProductId ? 'Update Product' : 'Add Product'

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
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting && !publish_product}
                    onClick={() => handleAction('save-as-draft')}
                >
                    Save as draft
                </Button>
                <Button
                    type="button"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting && publish_product}
                    onClick={() => handleAction('publish-product')}
                >
                    {actionLabel}
                </Button>
            </Flex>
        </ChakraDrawerFooter>
    )
}

export default ProductDrawerFooter