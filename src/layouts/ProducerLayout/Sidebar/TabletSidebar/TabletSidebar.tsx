import { Box, Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import { getProducerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import TabletSidebarGroup from './TabletSidebarGroup'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import enLocale from 'locales/layout/sidebar/en.json'
import arLocale from 'locales/layout/sidebar/ar.json'

export const TabletSidebar = () => {
    const { t } = useLocaleResources('layout/sidebar', {
        en: enLocale,
        ar: arLocale
    })
    const sidebarLinks = getProducerSidebarLinks(t)

    return (
        <>
            <Box paddingTop={7} paddingInline={4}>
                <Drop3 color='#2BCFA1' width='40px' height='40px' />
            </Box>

            <Flex
                flex="1"
                direction="column"
                gap={6}
                paddingBottom={6}
                paddingInline={4}
                overflowY="auto"
            >
                {sidebarLinks.map((sidebarGroup) => (
                    <TabletSidebarGroup key={sidebarGroup.group} sidebarGroup={sidebarGroup} />
                ))}
            </Flex>
        </>
    )
}

export default TabletSidebar