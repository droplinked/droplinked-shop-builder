import AppIcons from 'assets/icon/Appicons'
import fileTemplate from "assets/samples/import_product_template.xlsx"
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { useState } from 'react'
import ImportProductModalBody from './ImportProductModalBody'
import ImportProductModalFooter from './ImportProductModalFooter'
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl'

interface Props {
    isOpen: boolean
    onClose: () => void
    importWithUrl: UseImportWithUrl
}

function ImportProductModal({ isOpen, onClose, importWithUrl }: Props) {
    const [uploadedFile, setUploadedFile] = useState(null)

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "2xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<AppIcons.Download />}
                title="Import Products"
                description="Import inventory catalogs effortlessly by uploading a CSV or Excel file. Also, you can use our fetch tool to import one product or an entire catalog easily from Shopify or WooCommerce using a URL."
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
                    Download Template
                </ExternalLink>
            </ModalHeaderData>
            <ImportProductModalBody file={uploadedFile} onFileChange={setUploadedFile} importWithUrl={importWithUrl} />
            <ImportProductModalFooter file={uploadedFile} closeModal={onClose} importWithUrl={importWithUrl} />
        </AppModal>
    )
}

export default ImportProductModal