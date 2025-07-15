import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { appVersion } from 'utils/app/variable'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import userMenuEnLocale from 'locales/layout/ProducerLayout/en.json'
import userMenuArLocale from 'locales/layout/ProducerLayout/ar.json'

function MenuItemAppVersion() {
    const { t } = useLocaleResources('layout/ProducerLayout', {
        en: userMenuEnLocale,
        ar: userMenuArLocale
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