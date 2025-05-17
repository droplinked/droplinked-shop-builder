import { DrawerFooter as ChakraDrawerFooter, Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useAppToast from 'hooks/toast/useToast'
import useProductForm from 'pages/products/hooks/useProductForm'
import { getFieldErrorMessage } from 'pages/products/utils/formHelpers'
import { checkIfProductIsRecorded } from 'pages/products/utils/skuUtils'
import React from 'react'

interface Props {
    onClose: () => void
}

const ProductDrawerFooter = ({ onClose }: Props) => {
    const { showToast } = useAppToast()
    const { values, errors, setFieldValue, handleSubmit, isSubmitting } = useProductForm()
    const { _id: editingProductId, sku, publish_product } = values

    const isProductRecorded = checkIfProductIsRecorded(sku)
    const isButtonDisabled = isProductRecorded || isSubmitting

    const handleAction = async (action: string) => {
        if (isProductRecorded) return

        const errorMessage = getFieldErrorMessage(errors)
        if (errorMessage) {
            showToast({ type: 'error', message: errorMessage })
            return
        }

        const isSavingAsDraft = action === 'save-as-draft'
        const publishStatus = isSavingAsDraft ? 'DRAFTED' : 'PUBLISHED'

        await Promise.all([
            setFieldValue('publish_product', !isSavingAsDraft),
            setFieldValue('publish_status', publishStatus)
        ])

        handleSubmit()
    }

    return (
        <ChakraDrawerFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderTop="1px solid"
            borderColor="neutral.gray.800"
            padding={9}
            css={{ button: { fontSize: 14, fontWeight: 500 } }}
        >
            <AppButton type="button" variant="secondary" isDisabled={isSubmitting} onClick={onClose}>
                Discard
            </AppButton>

            <Flex gap={4}>
                <AppButton
                    type="button"
                    variant="outlined"
                    isDisabled={isButtonDisabled}
                    isLoading={isSubmitting && !publish_product}
                    onClick={() => handleAction('save-as-draft')}
                >
                    Save as draft
                </AppButton>

                <AppButton
                    type="button"
                    isDisabled={isButtonDisabled}
                    isLoading={isSubmitting && publish_product}
                    onClick={() => handleAction('publish-product')}
                >
                    {editingProductId ? 'Update Product' : 'Add Product'}
                </AppButton>
            </Flex>
        </ChakraDrawerFooter>
    )
}

export default ProductDrawerFooter