import React from 'react'
import useInvoiceStore from '../../store/invoiceStore'
import SectionedContent from '../SectionedContent'
import InvoiceAddress from './InvoiceAddress'
import InvoiceContactInformation from './InvoiceContactInformation'
import InvoiceShippingMethods from './shipping-methods/InvoiceShippingMethods'

function InvoiceClientDetails() {
    const { areAllProductsDigital } = useInvoiceStore()

    return (
        <SectionedContent title="Client Details">
            <InvoiceContactInformation />
            {!areAllProductsDigital && <InvoiceAddress />}
            {!areAllProductsDigital && <InvoiceShippingMethods />}
        </SectionedContent>
    )
}

export default InvoiceClientDetails