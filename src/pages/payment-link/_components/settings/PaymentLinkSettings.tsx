import { Divider } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useContext } from 'react'
import { PaymentLinkContext } from '../../context/PaymentLinkContext'
import PaymentLinkCard from '../PaymentLinkCard'
import PaymentLinkSwitch from '../PaymentLinkSwitch'
import VariantsStyle from './VariantsStyle'
import enLocale from 'locales/payment-link/en.json'
import arLocale from 'locales/payment-link/ar.json'


function PaymentLinkSettings() {
    const { t } = useLocaleResources('payment-link',{
        en: enLocale,
        ar: arLocale
      });
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)

    return (
        <PaymentLinkCard title={t('components.settings.title')}>
            <VariantsStyle />
            <Divider borderColor={"neutral.gray.700"} />
            <PaymentLinkSwitch
                title={t('components.settings.additionalNote.title')}
                description={t('components.settings.additionalNote.description')}
                checked={paymentLinkData.additionalNote}
                onChange={(checked: boolean) => updatePaymentLink('additionalNote', checked)}
            />
        </PaymentLinkCard>
    )
}

export default PaymentLinkSettings