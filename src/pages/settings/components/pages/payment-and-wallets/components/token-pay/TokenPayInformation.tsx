import { VStack } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export default function TokenPayInformation() {
    const { t } = useLocaleResources('settings');

    return (
        <VStack spacing="4" align="start" width="100%">
            <ExternalLink
                href={"#"}
                textDecor={"none"}
                display={"flex"}
                alignItems={"center"}
                fontSize={16}
                fontWeight={500}
                gap={"6px"}
                target='_blank'
            >
                {t('settings.paymentsWallets.tokenPay.paymentTokens.learnMore')}
                <AppIcons.ExternalLink style={{ display: "inline-block" }} />
            </ExternalLink>

            <MessageBox
                theme='warning'
                title={t('settings.paymentsWallets.tokenPay.walletRequirement.title')}
                description={t('settings.paymentsWallets.tokenPay.walletRequirement.description')}
            />
        </VStack>
    )
}
