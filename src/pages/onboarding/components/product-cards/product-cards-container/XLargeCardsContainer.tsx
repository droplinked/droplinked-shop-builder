import { Box, Flex, FlexProps } from "@chakra-ui/react"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React, { PropsWithChildren } from "react"
import DroplinkedBrand from "../../common/DroplinkedBrand"

interface SidebarSectionProps extends FlexProps {
    itemsCount?: number
    highlightedItemIndex?: number
}

export default function XLargeCardsContainer({ children }: PropsWithChildren) {
    const { isRTL } = useLocaleResources('onboarding')

    return (
        <Flex
            as="section"
            height="100%"
            borderTop="8px solid #141414"
            borderLeft={isRTL ? "unset" : "8px solid #141414"}
            borderRight={isRTL ? "8px solid #141414" : "unset"}
            borderTopLeftRadius={isRTL ? "unset" : 24}
            borderTopRightRadius={isRTL ? 24 : "unset"}
            bgColor="neutral.gray.1000"
        >
            <Sidebar />
            <MainContent>
                {children}
            </MainContent>
        </Flex>
    )
}

// Sidebar Component (Extracted for better organization)
function Sidebar() {
    return (
        <Flex
            as="aside"
            flex={1}
            direction="column"
            borderRight="1px solid #292929"
            padding={6}
        >
            <DroplinkedBrand
                marginBottom={6}
                dropProps={{ width: '32px', height: '32px', color: '#616161' }}
                typographyProps={{ width: '127px', height: '24px', color: '#616161' }}
            />
            <SidebarSection itemsCount={2} highlightedItemIndex={1} marginBlock={9} />
            <SidebarSection itemsCount={5} marginBottom={9} />
            <SidebarSection itemsCount={3} />
        </Flex>
    )
}

// Sidebar Section Component (Extracted repeated pattern)
function SidebarSection({ itemsCount = 1, highlightedItemIndex, ...rest }: SidebarSectionProps) {
    function renderItems(count: number) {
        return Array.from({ length: count }, (_, index) => {
            const isHighlighted = index === highlightedItemIndex
            return (
                <Flex
                    key={index}
                    alignItems="center"
                    gap={2}
                    padding={3}
                    borderRadius={isHighlighted ? 8 : undefined}
                    bgColor={isHighlighted ? "#222222" : undefined}
                >
                    <Box
                        w="20px"
                        h="20px"
                        borderRadius={4}
                        bgColor={isHighlighted ? "#333333" : "#262626"}
                    />
                    <Box
                        w={isHighlighted ? "200px" : "160px"}
                        h="12px"
                        borderRadius={4}
                        bgColor={isHighlighted ? "#333333" : "#222222"}
                    />
                </Flex>
            )
        })
    }

    return (
        <Flex as="section" direction="column" gap={2} {...rest}>
            <Box w="73px" h="16px" borderRadius={4} bgColor="#222222" />
            <Flex direction="column" gap={2}>
                {renderItems(itemsCount)}
            </Flex>
        </Flex>
    )
}

// Main Content Component (Extracted for clarity)
function MainContent({ children }: PropsWithChildren) {
    return (
        <Flex as="main" flex={3} direction="column">
            <header>
                <Flex padding="16px 24px" borderBottom="1px solid #292929">
                    <Box w="117px" h="24px" borderRadius={6} bgColor="#292929" />
                </Flex>
            </header>
            <Box as="section" padding={6}>
                <Box w="216px" h="36px" marginBottom={1} borderRadius={8} bgColor="#292929" />
                <Box w="400px" h="24px" marginBottom={9} borderRadius={4} bgColor="#222222" />
                {children}
            </Box>
        </Flex>
    )
}