import { Box, Link as ChakraLink, Divider, Flex, Popover, PopoverContent, PopoverTrigger, Portal, Text, useDisclosure } from "@chakra-ui/react"
import AppTooltip from "components/common/tooltip/AppTooltip"
import React from "react"
import { NavLink as RouterLink, useLocation } from "react-router-dom"
import { SidebarItemType } from "../SidebarGroup"

export default function TabletSidebarItem({ item }: { item: SidebarItemType }) {
    const disclosure = useDisclosure()
    const location = useLocation()

    const activeStyles = { bg: "neutral.gray.800" }
    const baseButtonStyles = {
        borderRadius: 8,
        padding: "10px",
        transition: "background-color 0.2s",
        _hover: activeStyles
    }

    // Determine if the current path matches this item or one of its children
    const isActive = item.linkTo
        ? location.pathname === item.linkTo
        : item.list?.some((li) => location.pathname.startsWith(li.linkTo))

    // If the item is a direct link, render it immediately
    if (item.linkTo) {
        return (
            <AppTooltip label={item.title}>
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
            </AppTooltip>
        )
    }

    // Otherwise, render a popover with a list of links
    return (
        <Popover placement="right-start" {...disclosure}>
            <PopoverTrigger>
                <Box>
                    <AppTooltip label={item.title}>
                        <Box
                            as="button"
                            {...baseButtonStyles}
                            {...(isActive ? activeStyles : {})}
                        >
                            {item.icon}
                        </Box>
                    </AppTooltip>
                </Box>
            </PopoverTrigger>

            <Portal>
                <PopoverContent
                    left={6}
                    width="288px"
                    border="none"
                    bgColor="transparent"
                    boxShadow="none"
                    position="relative"
                    zIndex="popover"
                >
                    <Box position="relative">
                        <Box position="absolute" top="36px" transform="translateY(-50%)" left="-11px">
                            <LeftArrowSVG />
                        </Box>

                        <Flex 
                            position="relative" 
                            bg="neutral.gray.1000" 
                            borderRadius="lg" 
                            border="1px solid"
                            borderColor="neutral.gray.800"
                            flexDirection="column" 
                            overflow="hidden"
                        >
                            <Flex w="full" p="4" justifyContent="start" alignItems="center" gap="3">
                                <Text flex="1" color="white" fontSize="sm" fontWeight="normal" lineHeight="tight">
                                    {item.title}
                                </Text>
                            </Flex>

                            <Divider borderColor="neutral.gray.800" />

                            <Flex w="full" px="5" py="4" flexDirection="column" gap="3">
                                {item.list?.map((listItem, index) => (
                                    <ChakraLink
                                        key={index}
                                        as={RouterLink}
                                        to={listItem.linkTo}
                                        fontSize={14}
                                        color="text.subtext.placeholder.light"
                                        isExternal={listItem.external}
                                        onClick={() => {
                                            disclosure.onClose()
                                            listItem.onClick?.()
                                        }}
                                    >
                                        {listItem.listTitle}
                                    </ChakraLink>
                                ))}
                            </Flex>
                        </Flex>

                        <Box position="absolute" top="36px" transform="translateY(-50%)" left="-10px">
                            <BackgroundArrowSVG />
                        </Box>
                    </Box>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}


const LeftArrowSVG = () => (
    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.75 6.83494C0.0833318 7.79719 0.083336 10.2028 1.75 11.1651L10.75 16.3612C12.4167 17.3235 14.5 16.1207 14.5 14.1962V3.80385C14.5 1.87934 12.4167 0.676535 10.75 1.63878L1.75 6.83494Z"
            fill="#1C1C1C"
            stroke="#292929"
        />
    </svg>
)

const BackgroundArrowSVG = () => (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1 9.73205C-0.333332 8.96225 -0.333334 7.03775 0.999999 6.26795L10 1.0718C11.3333 0.301996 13 1.26425 13 2.80385V13.1962C13 14.7358 11.3333 15.698 10 14.9282L1 9.73205Z"
            fill="#1C1C1C"
        />
    </svg>
)