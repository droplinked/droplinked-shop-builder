import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import AppShareableLink from 'components/redesign/shareable-link/AppShareableLink';
import useInvoiceInformation from 'pages/invoice-management/hooks/useInvoiceInformation';
import React from 'react';
import SummaryBox from './SummaryBox';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    invoiceId?: string;
}

function InvoiceDetailsModal({ isOpen, onClose, invoiceId }: Props) {
    const { invoiceInformationMap } = useInvoiceInformation(invoiceId)

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "5xl", scrollBehavior: "outside" }}
            modalContentProps={{ width: "936px" }}
        >
            <ModalHeaderData
                icon={<AppIcons.InvoiceCreated />}
                title="Invoice created"
                description='A link of your invoice is sent to the customer. You can also use the following link to view the invoice.'
            />

            <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
                <AppShareableLink link='https://google.com' />

                {Object.entries(invoiceInformationMap).map(([key, value], index) => (
                    <SummaryBox key={index} title={key} rows={value} />
                ))}
            </ModalBody>
        </AppModal>
    )
}

export default InvoiceDetailsModal