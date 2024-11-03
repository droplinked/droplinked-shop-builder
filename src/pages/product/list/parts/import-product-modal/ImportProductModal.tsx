import { Link } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { useState } from 'react'
import ImportProductModalBody from './components/ImportProductModalBody'
import ImportProductModalFooter from './components/ImportProductModalFooter'

interface Props {
    isOpen: boolean
    closeModal: () => void
}

function ImportProductModal({ isOpen, closeModal }: Props) {
    const [uploadedFile, setUploadedFile] = useState(null)

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: closeModal, size: "2xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBottom: "0px !important" }}
        >
            <ModalHeaderData
                icon={<AppIcons.ConfirmPlan />}
                title="Import Products"
                description="Easily import products using a CSV or Excel file. Download our sample template to ensure your file is formatted correctly."
            >
                <Link
                    href='https://upload-file-flatlay.s3.us-west-2.amazonaws.com/622e15c810c2e7fb08c93b7ffa185228feb223ea821a3a596dfdd64c63854597_or.xlsx'
                    textDecoration="underline"
                    fontSize={14}
                    fontWeight={600}
                    color="#179EF8"
                    cursor="pointer"
                    download="Droplinked-Shipping-Template.xlsx"
                >
                    Download Template
                </Link>
            </ModalHeaderData>
            <ImportProductModalBody file={uploadedFile} onFileChange={setUploadedFile} />
            <ImportProductModalFooter file={uploadedFile} closeModal={closeModal} />
        </AppModal>
    )
}

export default ImportProductModal
