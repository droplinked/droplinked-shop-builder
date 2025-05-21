import { Box, Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import TabletSidebarGroup from './TabletSidebarGroup'

function TabletSidebar() {
    return (
        <Flex
            as="aside"
            position="sticky"
            top={0}
            height="100vh"
            direction="column"
            gap={6}
        >
            <Box paddingTop={7} paddingInline={4}>
                <Drop3 color='#2BCFA1' width='40px' height='40px' />
            </Box>

            <Box
                flex="1"
                paddingBottom={6}
                paddingInline={4}
                overflowY="auto"
            >
                {producerSidebarLinks.map((sidebarGroup) => (
                    <TabletSidebarGroup key={sidebarGroup.group} sidebarGroup={sidebarGroup} />
                ))}
            </Box>
        </Flex>
    )
}

export default TabletSidebar