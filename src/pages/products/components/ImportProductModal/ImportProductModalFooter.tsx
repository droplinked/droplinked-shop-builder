import { ModalFooter } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { uploadProductCSV } from 'services/product/productServices'
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
    const { t } = useLocaleResources('products');
    const formData = new FormData()
    const { targetShopUrl } = useProductPageStore()
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation(uploadProductCSV)
    const { startCrawling, crawlingLoading } = importWithUrl

    const handleFileUpload = async () => {
        if (!file) return

        formData.append('file', file)

        try {
            const response = await mutateAsync(formData)
            showToast({ message: response.data.message, type: 'success' })
            closeModal()
        } catch (error: any) {
            const errorMessage = error?.response?.data?.data?.message || t('common.error')
            showToast({ message: errorMessage, type: 'error' })
        }
    }

    const handleSubmit = () => {
        if (file) {
            handleFileUpload()
        } else {
            startCrawling()
        }
    }

    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            paddingBlock="36px !important"
        >
            <AppButton variant="secondary" disabled={isLoading} onClick={closeModal}>
                {t('importModal.footer.cancel')}
            </AppButton>
            <AppButton onClick={handleSubmit} isLoading={crawlingLoading || isLoading} isDisabled={!file && !targetShopUrl}>
                {isLoading ? t('common.uploading') : t('importModal.footer.import')}
            </AppButton>
        </ModalFooter>
    )
}

export default ImportProductModalFooter