import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export default function EmptyView() {
    const { t } = useLocaleResources("purchaseHistory")

    const image = "https://upload-file-droplinked.s3.amazonaws.com/034943afd4f8e2e778699badbb32189a2f831ea25ac7a362983ce6444cb8eaa4.png"

    return (
        <Flex alignItems="center" justifyContent="center" flexDirection="column" gap="64px" mt="15vh">
            <AppImage src={image} alt={t("EmptyView.emptyFormAlt")} width="320px" height="268px" />
            <Text color="text.disabled.dark">{t("EmptyView.title")}</Text>
        </Flex>
    )
}
