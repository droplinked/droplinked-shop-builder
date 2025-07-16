import { Box, Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import { getFilteredSidebarLinks } from 'data/producerSidebarLinks'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import TabletSidebarGroup from './TabletSidebarGroup'

export const TabletSidebar = () => {
    const { shop } = useAppStore()
    const { t } = useLocaleResources('layout/ProducerLayout')

    const sidebarLinks = getFilteredSidebarLinks(t, shop.hasCompletedQuests)

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