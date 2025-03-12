import { Flex, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import { DashboardPageLink } from "pages/dashboard/stores/useDashboardStore"
import React from "react"

function ResourceItem({ title, summary, url }: DashboardPageLink) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 4, lg: 6 }}
            padding={{ base: 4, lg: 6 }}
            sx={{ button: { flexShrink: 0 } }}
        >
            <Flex direction="column" gap={1}>
                <Text fontSize={{ base: 16, lg: 18 }} fontWeight={700} color="#fff">{title}</Text>
                <Text fontSize={14} color="text.subtextPlaceholder.dark">{summary}</Text>
            </Flex>

            <button onClick={() => window.open(url)}>
                <AppIcons.ChevronRight color="white" />
            </button>
        </Flex>
    )
}

export default ResourceItem