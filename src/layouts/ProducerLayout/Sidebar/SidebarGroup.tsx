import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import { AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion'
import type { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import { NavLink as RouterLink, useLocation } from 'react-router-dom'

export type SidebarGroupType = (typeof producerSidebarLinks)[number]
export type SidebarItemType = SidebarGroupType['items'][number]

const activeStyles = { bg: 'neutral.gray.800' } as const
const linkBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    borderRadius: 8,
    padding: 3,
    fontSize: 14,
    color: 'text.white',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
    _hover: activeStyles,
} as const

export default function SidebarGroup({ sidebarGroup }: { sidebarGroup: SidebarGroupType }) {
    return (
        <Flex direction="column" gap={2}>
            <Text marginInline={3} fontSize={12} color="text.subtext.placeholder.dark">
                {sidebarGroup.group}
            </Text>

            <Flex direction="column" gap={1}>
                {sidebarGroup.items.map((item, index) => (
                    item.linkTo
                        ? <SidebarLinkItem key={index} item={item} />
                        : <SidebarAccordionItem key={index} item={item} />
                ))}
            </Flex>
        </Flex>
    )
}

function SidebarLinkItem({ item }: { item: SidebarItemType }) {
    const location = useLocation()
    const isActive = location.pathname === item.linkTo

    return (
        <ChakraLink
            as={RouterLink}
            to={item.linkTo ?? undefined}
            onClick={item.onClick}
            isExternal={item.external}
            {...linkBaseStyles}
            {...(isActive ? activeStyles : {})}
        >
            {item.icon}
            {item.title}
        </ChakraLink>
    )
}

function SidebarAccordionItem({ item }: { item: SidebarItemType }) {
    const location = useLocation()
    const isGroupActive = item.list?.some((li) => location.pathname.startsWith(li.linkTo))

    return (
        <AppAccordionItem
            width="100%"
            display="flex"
            flexDirection="column"
            gap={3}
            itemId={item.title}
        >
            <AppAccordionTrigger
                width="100%"
                {...linkBaseStyles}
                {...(isGroupActive ? activeStyles : {})}
            >
                <Flex alignItems="center" gap={2}>
                    {item.icon}
                    {item.title}
                </Flex>
                <AppAccordionChevron />
            </AppAccordionTrigger>

            <AppAccordionPanel paddingLeft={5} paddingBottom={3}>
                <Flex
                    flexDirection="column"
                    gap={3}
                    paddingInline={5}
                    borderLeft="1px solid"
                    borderColor="neutral.gray.700"
                >
                    {item.list?.map((listItem) => {
                        const isActive = location.pathname.startsWith(listItem.linkTo)
                        return (
                            <ChakraLink
                                key={listItem.listTitle}
                                as={RouterLink}
                                to={listItem.linkTo}
                                fontSize={14}
                                color="text.subtext.placeholder.light"
                                {...(isActive ? { color: 'text.white', fontWeight: 500 } : {})}
                            >
                                {listItem.listTitle}
                            </ChakraLink>
                        )
                    })}
                </Flex>
            </AppAccordionPanel>
        </AppAccordionItem>
    )
} 