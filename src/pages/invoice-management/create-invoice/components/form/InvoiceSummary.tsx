import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'pages/invoice-management/components/Input'
import React from 'react'
import SectionedContent from '../SectionedContent'
import CartSummaryRow from './CartSummaryRow'

function InvoiceSummary() {
    return (
        <SectionedContent as={"aside"} width={"420px"} title="Summary">
            <Input
                icon={<AppIcons.InvoiceDiscount />}
                inputGroupProps={{ height: 12 }}
                inputProps={{ placeholder: "Enter gift card or discount" }}
            />

            <Flex direction={"column"} gap={4}>
                <CartSummaryRow title='Total cart' value={256} />
                <CartSummaryRow title='Tax' value={256} />
                <CartSummaryRow title='Total shipping' value={256} />
            </Flex>

            <CartSummaryRow title='Total order' value={256} isValueBold />
        </SectionedContent>
    )
}

export default InvoiceSummary