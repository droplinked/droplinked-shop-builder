import { Flex, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import React from "react"

export interface ResourceItemProps {
    title: string
    description: string
    link: string
    isLastItem: boolean
}

function ResourceItem({ title, description, link, isLastItem }: ResourceItemProps) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 4, lg: 6 }}
            borderBottom={isLastItem ? "unset" : "1px solid #292929"}
            padding={{ base: 4, lg: 6 }}
            textAlign="left"
            sx={{ button: { flexShrink: 0 } }}
        >
            <Flex direction="column" gap={1}>
                <Text fontSize={{ base: 16, lg: 18 }} fontWeight={700} color="#fff">{title}</Text>
                <Text fontSize={14} color="#7B7B7B">{description}</Text>
            </Flex>

            <button onClick={() => window.open(link)}>
                <AppIcons.ChevronRight />
            </button>
        </Flex>
    )
}

export default ResourceItem