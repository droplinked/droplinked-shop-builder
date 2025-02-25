import { VStack } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import MessageBox from 'components/redesign/message-box/MessageBox'
import React from 'react'

export default function TokenPayInformation() {
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
                Learn More
                <AppIcons.ExternalLink style={{ display: "inline-block" }} />
            </ExternalLink>

            <MessageBox
                theme='warning'
                title='Wallet Requirement'
                description='In order to receive native token payments with Tokenpay, you must connect an EVM or Solana based wallet. Otherwise, all received money will be converted to USD/USDC and applied to credits.'
            />
        </VStack>
    )
}
