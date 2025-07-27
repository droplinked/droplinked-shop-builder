import { ModalBody } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import AppShareableLink from 'components/redesign/shareable-link/AppShareableLink'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import { SHOP_URL } from 'utils/app/variable'
import InvoiceProductTable from 'pages/invoice-management/create-invoice/components/form/product-table/InvoiceProductTable'
import useInvoiceInformation from 'pages/invoice-management/hooks/useInvoiceInformation'
import React from 'react'
import SummaryBox from './SummaryBox'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'

interface Props {
    isOpen: boolean
    onClose: () => void
    invoiceId?: string
}

function InvoiceDetailsModal({ isOpen, onClose, invoiceId }: Props) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const { invoiceInformationMap, data } = useInvoiceInformation(invoiceId)
    const invoiceLink = `${SHOP_URL}/paylink/invoice/${invoiceId ?? data._id}`

    const renderSummaryBoxes = () => {
        return Object.entries(invoiceInformationMap).map(([key, value]) =>
            <SummaryBox key={key} title={key} rows={value} />
        )
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: '5xl', scrollBehavior: 'outside' }}
            modalContentProps={{ width: '936px' }}
        >
            <ModalHeaderData
                icon={
                    <ModalHeaderIconWrapper>
                        <AppIcons.InvoiceCreated />
                    </ModalHeaderIconWrapper>
                }
                title={t('InvoiceDetailsModal.title')}
                description={t('InvoiceDetailsModal.description')}
            />

            <ModalBody
                display="flex"
                flexDirection="column"
                gap={4}
                pt="4px !important"
            >
                <AppShareableLink link={invoiceLink} />

                {renderSummaryBoxes()}

                <InvoiceProductTable invoice={data} hasActionColumn={false} hasFooter={false} />
            </ModalBody>
        </AppModal>
    )
}

export default InvoiceDetailsModal