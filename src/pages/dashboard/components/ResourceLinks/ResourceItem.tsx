import { Box, Link as ChakraLink, Flex, Text } from "@chakra-ui/react"
import { ChevronleftMd } from "assets/icons/Navigation/ChevronLeft/ChevronleftMd"
import { ChevronrightMd } from "assets/icons/Navigation/ChevronRight/ChevronrightMd"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { DashboardPageLink } from "pages/dashboard/hooks/useLocalizedDashboardLinks"
import React from "react"

function ResourceItem({ title, summary, url }: DashboardPageLink) {
    const { isRTL } = useLocaleResources("dashboardPage")

    const titleStyles = {
        fontSize: { base: 16, xl: 18 },
        fontWeight: 700,
        color: "text.white"
    }

    return (
        <ChakraLink
            href={url}
            isExternal
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 4, xl: 6 }}
            padding={{ base: 4, xl: 6 }}
        >
            {summary ?
                <Flex direction="column" gap={1}>
                    <Text {...titleStyles}>{title}</Text>
                    <Text fontSize={14} color="text.subtext.placeholder.dark">{summary}</Text>
                </Flex>
                :
                <Text {...titleStyles}>{title}</Text>
            }

            <Box flexShrink={0} padding="10px">
                {isRTL ? <ChevronleftMd /> : <ChevronrightMd />}
            </Box>
        </ChakraLink>
    )
}

export default ResourceItem