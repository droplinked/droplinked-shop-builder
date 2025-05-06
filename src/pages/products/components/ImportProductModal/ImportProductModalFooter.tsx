import { ModalFooter } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useAppToast from 'hooks/toast/useToast'
import { uploadProductCSV } from 'lib/apis/product/productServices'
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import { useMutation } from 'react-query'

interface Props {
    file: File | null
    closeModal: () => void
    importWithUrl: UseImportWithUrl
}

function ImportProductModalFooter({ file, closeModal, importWithUrl }: Props) {
    const formData = new FormData()
    const { targetShopUrl } = useProductPageStore()
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation(uploadProductCSV)
    const { crawlProducts, isCrawling } = importWithUrl

    const handleFileUpload = async () => {
        if (!file) return

        formData.append('file', file)

        try {
            const response = await mutateAsync(formData)
            showToast({ message: response.data.message, type: 'success' })
            closeModal()
        } catch (error: any) {
            const errorMessage = error?.response?.data?.data?.message || 'An error occurred'
            showToast({ message: errorMessage, type: 'error' })
        }
    }

    const handleSubmit = () => {
        if (file) {
            handleFileUpload()
        } else {
            crawlProducts()
        }
    }

    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            paddingBlock="36px !important"
        >
            <Button variant="secondary" disabled={isLoading} onClick={closeModal}>
                Discard
            </Button>
            <Button onClick={handleSubmit} isLoading={isCrawling || isLoading} isDisabled={!file && !targetShopUrl}>
                {isLoading ? 'Uploading' : 'Validate'}
            </Button>
        </ModalFooter>
    )
}

export default ImportProductModalFooter