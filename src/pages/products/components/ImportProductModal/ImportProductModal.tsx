import AppIcons from 'assets/icon/Appicons'
import fileTemplate from "assets/samples/import_product_template.xlsx"
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl'
import React, { useState } from 'react'
import ImportProductModalBody from './ImportProductModalBody'
import ImportProductModalFooter from './ImportProductModalFooter'

interface Props {
    isOpen: boolean
    onClose: () => void
    importWithUrl: UseImportWithUrl
}

function ImportProductModal({ isOpen, onClose, importWithUrl }: Props) {
    const { t } = useLocaleResources('products');
    const [uploadedFile, setUploadedFile] = useState(null)
    const { invalidateProductsQuery } = useInvalidateProductsQuery()

    const handleClose = () => {
        invalidateProductsQuery()
        onClose()
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: handleClose, size: "2xl", isCentered: false }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<AppIcons.Download />}
                title={t('importModal.title')}
                description={t('importModal.description')}
                descriptionProps={{
                    color: "#B1B1B1 !important",
                }}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
            >
                <ExternalLink
                    fontSize={14}
                    fontWeight={600}
                    href={fileTemplate}
                    download="import_product_template.xlsx"
                >
                    {t('importModal.downloadTemplate')}
                </ExternalLink>
            </ModalHeaderData>
            <ImportProductModalBody file={uploadedFile} onFileChange={setUploadedFile} importWithUrl={importWithUrl} />
            <ImportProductModalFooter file={uploadedFile} closeModal={onClose} importWithUrl={importWithUrl} />
        </AppModal>
    )
}

export default ImportProductModal