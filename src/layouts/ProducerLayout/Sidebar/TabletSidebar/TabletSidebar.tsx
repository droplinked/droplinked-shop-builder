import { Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import TabletSidebarGroup from './TabletSidebarGroup'

function TabletSidebar() {
    return (
        <Flex
            as="aside"
            direction="column"
            alignItems="center"
            gap={6}
            paddingTop={7}
            paddingBottom={6}
            paddingInline={4}
        >
            <Drop3 color='#2BCFA1' width='40px' height='40px' />

            <Flex
                width="100%"
                direction="column"
                gap={6}
                paddingBlock={9}
            >
                {producerSidebarLinks.map((sidebarGroup) => (
                    <TabletSidebarGroup key={sidebarGroup.group} sidebarGroup={sidebarGroup} />
                ))}
            </Flex>
        </Flex>
    )
}

export default TabletSidebar