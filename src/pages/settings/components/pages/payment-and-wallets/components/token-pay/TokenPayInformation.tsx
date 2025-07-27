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
                rel="noopener noreferrer"
                hasExternalIcon
            >
                {t('PaymentsWallets.tokenPay.paymentTokens.learnMore')}
            </InteractiveText>

            <MessageBox
                theme='warning'
                            title={t('PaymentsWallets.tokenPay.walletRequirement.title')}
            description={t('PaymentsWallets.tokenPay.walletRequirement.description')}
            />
        </VStack>
    )
}