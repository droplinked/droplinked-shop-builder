import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import { addGiftCardToCartService } from 'services/invoice/invoiceServices'
import AppInput from 'components/redesign/input/AppInput'
import React, { useState } from 'react'
import useInvoiceStore from '../../store/invoiceStore'
import SectionedContent from '../SectionedContent'
import CartSummaryRow from './CartSummaryRow'
import InvoiceMemo from './InvoiceMemo'
import AppButton from 'components/redesign/button/AppButton'

function InvoiceSummary() {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const [giftCardCode, setGiftCardCode] = useState("")
    const [isLoading, setLoading] = useState(false)
    const { _id, totalCart, items } = useInvoiceStore((state) => state.cart)
    const updateCart = useInvoiceStore((state) => state.updateCart)
    const { showToast } = useAppToast()

    const handleAddGiftCard = async () => {
        try {
            setLoading(true)
            if (!items?.length)
                return showToast({ type: "error", message: t('InvoiceSummary.giftCard.addProductFirst') })
            const { data } = await addGiftCardToCartService(_id, giftCardCode)
            updateCart(data)
            showToast({ type: "success", message: t('InvoiceSummary.giftCard.addedSuccessfully') })
        }
        catch (error) {
            showToast({ type: "error", message: (error as Error).message })
        }
        finally { setLoading(false) }
    }

    return (
        <SectionedContent as={"aside"} width={{ base: "100%", lg: "380px" }} title={t('InvoiceSummary.title')}>
            <AppInput
                leftElement={<AppIcons.InvoiceDiscount color='white' />}
                inputGroupProps={{ height: 12 }}
                inputProps={{
                    value: giftCardCode,
                    onChange: (e) => setGiftCardCode(e.target.value),
                    placeholder: t('InvoiceSummary.giftCard.placeholder'),
                }}
                inputContainerProps={{
                    padding: "8px 10px 8px 16px"
                }}
                rightElement={
                    <AppButton
                        onClick={handleAddGiftCard}
                        isDisabled={!giftCardCode || isLoading}
                        isLoading={isLoading}
                        paddingBlock={2}
                        paddingInline={2}
                        height={"min-content"}
                    >
                        {t('InvoiceSummary.giftCard.apply')}
                    </AppButton>
                }
            />

            <Flex direction={"column"} gap={4}>
                <CartSummaryRow title={t('InvoiceSummary.rows.totalCart')} value={totalCart?.subtotal} />
                <CartSummaryRow title={t('InvoiceSummary.rows.tax')} value={totalCart?.estimatedTaxes} />
                <CartSummaryRow title={t('InvoiceSummary.rows.totalShipping')} value={totalCart?.shipping} />
            </Flex>

            <CartSummaryRow title={t('InvoiceSummary.rows.totalOrder')} value={totalCart?.totalPayment} isValueBold />

            <InvoiceMemo />
        </SectionedContent>
    )
}

export default InvoiceSummary