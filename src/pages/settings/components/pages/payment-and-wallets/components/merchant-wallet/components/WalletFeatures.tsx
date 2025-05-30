import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function WalletFeatures() {
    const { t } = useLocaleResources('settings');

    return (
        <Flex gap="9">
            <HStack>
                <Box p="2" bg="#2bcea11a" borderRadius="50px">
                    <AppIcons.Secure />
                </Box>
                <Text color="white" fontSize="sm">
                    {t("settings.merchantWallet.features.secure")}
                </Text>
            </HStack>
            <HStack>
                <Box p="2" bg="#2bcea11a" borderRadius="50px">
                    <AppIcons.GreenSpeedometer />
                </Box>
                <Text color="white" fontSize="sm">
                    {t("settings.merchantWallet.features.instant")}
                </Text>
            </HStack>
            <HStack>
                <Box p="2" bg="#2bcea11a" borderRadius="50px" sx={{ path: { stroke: "#2bcfa1" } }}>
                    <AppIcons.Refresh color='#2BCFA1' style={{ width: "16px", height: "16px" }} />
                </Box>
                <Text color="white" fontSize="sm">
                    {t("settings.merchantWallet.features.automaticConversion")}
                </Text>
            </HStack>
        </Flex>
    )
}
