import { ModalBody, ModalHeader } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import AppShareableLink from 'components/redesign/shareable-link/AppShareableLink';
import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    invoiceId?: string;
}

function InvoiceDetailsModal({ isOpen, onClose, invoiceId }: Props) {
    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "5xl" }}
            modalContentProps={{ width: "936px" }}
        >
            <ModalHeader>
                <ModalHeaderData
                    icon={<AppIcons.InvoiceCreated />}
                    title="Invoice created"
                    description='A link of your invoice is sent to the customer. You can also use the following link to view the invoice.'
                />

            </ModalHeader>

            <ModalBody
                display={"flex"}
                flexDirection={"column"}
                gap={4}
            >
                <AppShareableLink link='https://google.com' />
            </ModalBody>

        </AppModal>
    )
}

export default InvoiceDetailsModal