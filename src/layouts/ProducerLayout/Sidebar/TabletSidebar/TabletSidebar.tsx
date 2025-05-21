import { Box, Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import TabletSidebarGroup from './TabletSidebarGroup'

function TabletSidebar() {
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
                {producerSidebarLinks.map((sidebarGroup) => (
                    <TabletSidebarGroup key={sidebarGroup.group} sidebarGroup={sidebarGroup} />
                ))}
            </Flex>
        </>
    )
}

export default TabletSidebar