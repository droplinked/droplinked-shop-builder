import { Link } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import fileTemplate from "assest/samples/import_product_template.xlsx"
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'functions/hooks/toast/useToast'
import { uploadCsvFile } from 'lib/apis/product/productServices'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import ImportProductModalBody from './components/ImportProductModalBody'
import ImportProductModalFooter from './components/ImportProductModalFooter'

interface Props {
    isOpen: boolean
    closeModal: () => void
}

function ImportProductModal({ isOpen, closeModal }: Props) {
    const [uploadedFile, setUploadedFile] = useState(null)
    const formdata = new FormData()
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation(() => uploadCsvFile(formdata))

    const uploadPicture = () => {
        formdata.append("file", uploadedFile)
        mutateAsync().then((res) => {
            showToast({ message: res.data.message, type: 'success' })
            setUploadedFile(null)
            closeModal();
        }).catch((error) => {
            const message = error.response.data.data.message;
            showToast({ message: message, type: 'error' })
        })
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: closeModal, size: "2xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<AppIcons.ImportProduct />}
                title="Import Products"
                description="Easily import products using a CSV file. Download our sample template to ensure your file is formatted correctly."
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
            >
                <Link
                    href={fileTemplate}
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
            <ImportProductModalFooter file={uploadedFile} closeModal={closeModal} onClick={uploadPicture} isLoading={isLoading} />
        </AppModal>
    )
}

export default ImportProductModal