import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import { addGiftCardToCartService } from 'lib/apis/invoice/invoiceServices'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import useInvoiceStore from '../../store/invoiceStore'
import SectionedContent from '../SectionedContent'
import CartSummaryRow from './CartSummaryRow'
import InvoiceMemo from './InvoiceMemo'
import Button from 'components/redesign/button/Button'

function InvoiceSummary() {
    const [giftCardCode, setGiftCardCode] = useState("")
    const [isLoading, setLoading] = useState(false)
    const { _id, totalCart, items } = useInvoiceStore((state) => state.cart)
    const updateCart = useInvoiceStore((state) => state.updateCart)
    const { showToast } = useAppToast()

    const handleAddGiftCard = async () => {
        try {
            setLoading(true)
            if (!items?.length)
                return showToast({ type: "error", message: "You need to add product to cart first" })
            const { data } = await addGiftCardToCartService(_id, giftCardCode)
            updateCart(data)
            showToast({ type: "success", message: "Gift card added successfully" })
        }
        catch (error) {
            showToast({ type: "error", message: (error as Error).message })
        }
        finally { setLoading(false) }
    }

    return (
        <SectionedContent as={"aside"} width={{ base: "100%", lg: "380px" }} title="Summary">
            <Input
                leftElement={<AppIcons.InvoiceDiscount color='white' />}
                inputGroupProps={{ height: 12 }}
                inputProps={{
                    value: giftCardCode,
                    onChange: (e) => setGiftCardCode(e.target.value),
                    placeholder: "Enter gift card or discount",
                }}
                inputContainerProps={{
                    padding: "8px 10px 8px 16px"
                }}
                rightElement={
                    <Button
                        onClick={handleAddGiftCard}
                        isDisabled={!giftCardCode || isLoading}
                        isLoading={isLoading}
                        paddingBlock={2}
                        paddingInline={2}
                        fontSize={14}
                        height={"min-content"}
                    >
                        Apply
                    </Button>
                }
            />

            <Flex direction={"column"} gap={4}>
                <CartSummaryRow title='Total cart' value={totalCart?.subtotal} />
                <CartSummaryRow title='Tax' value={totalCart?.estimatedTaxes} />
                <CartSummaryRow title='Total shipping' value={totalCart?.shipping} />
            </Flex>

            <CartSummaryRow title='Total order' value={totalCart?.totalPayment} isValueBold />

            <InvoiceMemo />
        </SectionedContent>
    )
}

export default InvoiceSummary