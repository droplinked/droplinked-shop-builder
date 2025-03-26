import { Box, Flex, Text } from "@chakra-ui/react"
import { ChevronrightMd } from "assets/icons/Navigation/ChevronRight/ChevronrightMd"
import { DashboardPageLink } from "pages/dashboard/stores/useDashboardStore"
import React from "react"

function ResourceItem({ title, summary, url }: DashboardPageLink) {
    const titleStyles = {
        fontSize: { base: 16, xl: 18 },
        fontWeight: 700,
        color: "text.white"
    }

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 4, xl: 6 }}
            padding={{ base: 4, xl: 6 }}
        >
            {summary ?
                <Flex direction="column" gap={1}>
                    <Text {...titleStyles}>{title}</Text>
                    <Text fontSize={14} color="text.subtextPlaceholder.dark">{summary}</Text>
                </Flex>
                :
                <Text {...titleStyles}>{title}</Text>
            }

            <Box
                as="button"
                flexShrink={0}
                padding="10px"
                onClick={() => window.open(url)}
            >
                <ChevronrightMd color='white' />
            </Box>
        </Flex>
    )
}

export default ResourceItem