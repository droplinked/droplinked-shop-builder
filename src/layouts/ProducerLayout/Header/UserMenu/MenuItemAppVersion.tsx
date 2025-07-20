import { Flex, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { appVersion } from 'utils/app/variable'
import EnLocale from 'locales/layout/UserMenu/en.json'
import ArLocale from 'locales/layout/UserMenu/ar.json'

function MenuItemAppVersion() {
    const { t } = useLocaleResources('layout/UserMenu', {
        en: EnLocale,
        ar: ArLocale
    })

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            padding="12px 24px"
        >
            <Text fontSize={14} color="text.subtext.placeholder.dark">{t('UserMenu.MenuItemAppVersion.labels.version')}</Text>
            <Text fontSize={14} fontWeight={500} color="text.subtext.placeholder.light">{appVersion}</Text>
        </Flex>
    )
}

export default MenuItemAppVersion