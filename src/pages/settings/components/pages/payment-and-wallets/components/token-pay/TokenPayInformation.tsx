import { VStack } from '@chakra-ui/react'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export default function TokenPayInformation() {
    const { t } = useLocaleResources('settings');

    return (
        <VStack spacing="4" align="start" width="100%">
            <InteractiveText
                to="#"
                target="_blank"
                hasExternalIcon
            >
                {t('settings.paymentsWallets.tokenPay.paymentTokens.learnMore')}
            </InteractiveText>

            <MessageBox
                theme='warning'
                title={t('settings.paymentsWallets.tokenPay.walletRequirement.title')}
                description={t('settings.paymentsWallets.tokenPay.walletRequirement.description')}
            />
        </VStack>
    )
}