import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import NavigationLink from 'pages/settings/components/common/NavigationLink'
import React from 'react'

export default function TokenPayInformation() {
    return (
        <VStack spacing="4" align="start" width="100%">
            <NavigationLink to={"#"} title='Learn More' />
            <Flex gap={2} p="4" bg="#ffd9511a" border="1px solid #ffd850" borderRadius="lg">
                <AppIcons.YellowWarning style={{ width: "20px", height: "20px" }} />
                <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold" color="white">
                        Wallet Requirement
                    </Text>
                    <Text fontSize="sm" color="white">
                        In order to receive native token payments with Tokenpay, you must connect an EVM or Solana based wallet. Otherwise, all received money will be converted to USD/USDC and applied to
                        credits.
                    </Text>
                </Box>
            </Flex>
        </VStack>
    )
}
