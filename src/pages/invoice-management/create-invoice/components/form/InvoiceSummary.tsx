import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'pages/invoice-management/components/Input'
import React from 'react'
import useInvoiceStore from '../../store/invoiceStore'
import SectionedContent from '../SectionedContent'
import CartSummaryRow from './CartSummaryRow'
import InvoiceMemo from './InvoiceMemo'

function InvoiceSummary() {
    const { totalCart } = useInvoiceStore((state) => state.cart)

    return (
        <SectionedContent as={"aside"} width={{ base: "100%", lg: "420px" }} title="Summary">
            <Input
                icon={<AppIcons.InvoiceDiscount />}
                inputGroupProps={{ height: 12 }}
                inputProps={{ placeholder: "Enter gift card or discount" }}
            />

            <Flex direction={"column"} gap={4}>
                <CartSummaryRow title='Total cart' value={totalCart?.subtotal || 0} />
                <CartSummaryRow title='Tax' value={totalCart?.estimatedTaxes || 0} />
                <CartSummaryRow title='Total shipping' value={totalCart?.shipping || 0} />
            </Flex>

            <CartSummaryRow title='Total order' value={totalCart?.totalPayment || 0} isValueBold />

            <InvoiceMemo />
        </SectionedContent>
    )
}

export default InvoiceSummary