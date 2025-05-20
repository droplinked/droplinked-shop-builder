import { Box, Link as ChakraLink, Divider, Flex, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Portal, useDisclosure } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import { producerSidebarLinks } from 'data/producerSidebarLinks'
import React, { Fragment } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

export default function TabletSidebar() {
    return (
        <Flex direction="column" alignItems="center" gap={6} paddingTop={7} paddingBottom={6} paddingInline={4}>
            <Drop3 color='#2BCFA1' width='40px' height='40px' />

            <Flex width="100%" direction="column" gap={6} paddingBlock={9}>
                {producerSidebarLinks.map((sidebarGroup) => (
                    <TabletSidebarGroup key={sidebarGroup.group} sidebarGroup={sidebarGroup} />
                ))}
            </Flex>
        </Flex>
    )
}


function TabletSidebarGroup({ sidebarGroup }) {
    return (
        <Fragment>
            <Flex direction="column">
                {sidebarGroup.items.map((item, index) => (
                    <TabletSidebarItem key={index} item={item} />
                ))}
            </Flex>
            <Divider borderColor="neutral.gray.700" />
        </Fragment>
    )
}

function TabletSidebarItem({ item }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // If the item is a direct link, render it immediately
    if (item.linkTo) {
        return (
            <ChakraLink
                as={RouterLink}
                to={item.linkTo}
                padding="10px"
                onClick={item.onClick}
                isExternal={item.external}
            >
                {item.icon}
            </ChakraLink>
        )
    }

    // Otherwise, render a popover with a list of links
    return (
        <Popover placement="right-start" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Box as="button" padding="10px">
                    {item.icon}
                </Box>
            </PopoverTrigger>
            <Portal>
                <PopoverContent left={6} width="288px" bgColor="neutral.gray.1000" border="none" borderRadius={8}>
                    <PopoverHeader borderBottomColor="neutral.gray.800" fontSize={14} color="text.white" padding={4}>
                        {item.title}
                    </PopoverHeader>
                    <PopoverBody display="flex" flexDirection="column" gap={3} padding="16px 20px">
                        {item.list?.map((listItem, index) => (
                            <ChakraLink
                                key={index}
                                as={RouterLink}
                                to={listItem.linkTo}
                                fontSize={14}
                                color="text.subtext.placeholder.light"
                                onClick={onClose}
                            >
                                {listItem.listTitle}
                            </ChakraLink>
                        ))}
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
} 