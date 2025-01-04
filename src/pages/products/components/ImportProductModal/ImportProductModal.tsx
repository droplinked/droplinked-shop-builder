import { Link } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'

import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { useState } from 'react'
import ImportProductModalBody from './ImportProductModalBody'
import ImportProductModalFooter from './ImportProductModalFooter'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ImportProductModal({ isOpen, onClose }: Props) {
    const [uploadedFile, setUploadedFile] = useState(null)

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "2xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<ModalHeaderIconWrapper><AppIcons.Download /></ModalHeaderIconWrapper>}
                title="Import Products"
                description="Easily import products using a CSV file. Download our sample template to ensure your file is formatted correctly."
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
            >
                <Link
        
                    textDecoration="underline"
                    fontSize={14}
                    fontWeight={600}
                    color="#179EF8"
                    cursor="pointer"
                    download="import_product_template.xlsx"
                >
                    Download Template
                </Link>
            </ModalHeaderData>
            <ImportProductModalBody file={uploadedFile} onFileChange={setUploadedFile} />
            <ImportProductModalFooter file={uploadedFile} closeModal={onClose} />
        </AppModal>
    )
}

export default ImportProductModal