import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import Input from 'pages/invoice-management/components/Input';
import React, { useState } from 'react';
import ProductTable from './ProductTable';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function InvoiceProductModal({ isOpen, onClose }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "5xl", scrollBehavior: "outside" }}
            modalContentProps={{ width: "936px" }}
        >
            <ModalHeaderData
                icon={<AppIcons.InvoiceProduct />}
                title="Products"
                description="Select one of the products to add into your invoice."
            />

            <ModalBody display={"flex"} flexDirection={"column"} gap={6}>
                <Input
                    inputProps={{
                        width: "300px",
                        height: 12,
                        placeholder: "Product name",
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value)
                    }}
                />
                <ProductTable debouncedSearchTerm={debouncedSearchTerm} />
            </ModalBody>
        </AppModal>
    )
}

export default InvoiceProductModal