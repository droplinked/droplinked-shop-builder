import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { appVersion } from 'utils/app/variable'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import userMenuEnLocale from 'locales/layout/userMenu/en.json'
import userMenuArLocale from 'locales/layout/userMenu/ar.json'

function MenuItemAppVersion() {
    const { t } = useLocaleResources('layout/userMenu', {
        en: userMenuEnLocale,
        ar: userMenuArLocale
    })

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            padding="12px 24px"
        >
            <Text fontSize={14} color="text.subtext.placeholder.dark">{t('labels.version')}</Text>
            <Text fontSize={14} fontWeight={500} color="text.subtext.placeholder.light">{appVersion}</Text>
        </Flex>
    )
}

export default MenuItemAppVersion