import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import { AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion'
import type { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

export type SidebarGroupType = (typeof producerSidebarLinks)[number]
export type SidebarItemType = SidebarGroupType['items'][number]

export default function SidebarGroup({ sidebarGroup }: { sidebarGroup: SidebarGroupType }) {
    return (
        <Flex direction="column" gap={2}>
            <Text marginInline={3} fontSize={12} color="text.subtext.placeholder.dark">
                {sidebarGroup.group}
            </Text>

            {sidebarGroup.items.map((item) => (
                <Flex key={item.title} direction="column" gap={1}>
                    {item.linkTo
                        ? <SidebarLinkItem item={item} />
                        : <SidebarAccordionItem item={item} />
                    }
                </Flex>
            ))}
        </Flex>
    )
}

function SidebarLinkItem({ item }: { item: SidebarItemType }) {
    return (
        <ChakraLink
            as={RouterLink}
            href={item.linkTo ?? undefined}
            display="flex"
            alignItems="center"
            gap={2}
            padding={3}
            fontSize={14}
            color="text.white"
            textDecoration="none"
            onClick={item.onClick}
            isExternal={item.external}
        >
            {item.icon}
            {item.title}
        </ChakraLink>
    )
}

function SidebarAccordionItem({ item }: { item: SidebarItemType }) {
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
                display="flex"
                justifyContent="space-between"
                padding={3}
                fontSize={14}
                color="text.white"
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
                    {item.list?.map((listItem) => (
                        <ChakraLink
                            key={listItem.listTitle}
                            as={RouterLink}
                            href={listItem.linkTo}
                            fontSize={14}
                            color="text.subtext.placeholder.light"
                            textDecoration="none"
                        >
                            {listItem.listTitle}
                        </ChakraLink>
                    ))}
                </Flex>
            </AppAccordionPanel>
        </AppAccordionItem>
    )
} 