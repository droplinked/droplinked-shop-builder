import { Box, Link as ChakraLink, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { NavLink as RouterLink, useLocation } from "react-router-dom"
import { SidebarItemType } from "../SidebarGroup"

function TabletSidebarItem({ item }: { item: SidebarItemType }) {
    const disclosure = useDisclosure()
    const location = useLocation()

    const activeStyles = { bg: 'neutral.gray.800' }

    const baseButtonStyles = {
        borderRadius: 8,
        padding: '10px',
        transition: 'background-color 0.2s',
        _hover: activeStyles
    }

    // Determine if the current path matches this item or one of its children
    const isActive = item.linkTo
        ? location.pathname === item.linkTo
        : item.list?.some((li) => location.pathname.startsWith(li.linkTo))

    // If the item is a direct link, render it immediately
    if (item.linkTo) {
        return (
            <ChakraLink
                as={RouterLink}
                to={item.linkTo}
                onClick={item.onClick}
                isExternal={item.external}
                {...baseButtonStyles}
                {...(isActive ? activeStyles : {})}
            >
                {item.icon}
            </ChakraLink>
        )
    }

    // Otherwise, render a popover with a list of links
    return (
        <Popover placement="right-start" {...disclosure}>
            <PopoverTrigger>
                <Box as="button" {...baseButtonStyles}  {...(isActive ? activeStyles : {})}>
                    {item.icon}
                </Box>
            </PopoverTrigger>
            <PopoverContent
                left={6}
                width="288px"
                border="none"
                borderRadius={8}
                bgColor="neutral.gray.1000"
            >
                <PopoverHeader
                    borderBottomColor="neutral.gray.800"
                    padding={4}
                    fontSize={14}
                    color="text.white"
                >
                    {item.title}
                </PopoverHeader>
                <PopoverBody
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    padding="16px 20px"
                >
                    {item.list?.map((listItem, index) => (
                        <ChakraLink
                            key={index}
                            as={RouterLink}
                            to={listItem.linkTo}
                            fontSize={14}
                            color="text.subtext.placeholder.light"
                            onClick={disclosure.onClose}
                        >
                            {listItem.listTitle}
                        </ChakraLink>
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default TabletSidebarItem