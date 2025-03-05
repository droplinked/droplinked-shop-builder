import { Box, Flex, Text } from "@chakra-ui/react"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React, { ReactNode } from "react"
import DataPointCard from "./DataPointCard"
import StatIndicator from "./StatIndicator"
import StylizedTitle from "./StylizedTitle"

interface MetricCardProps {
    icon: ReactNode
    title: string
    totalValue: number
    directValue: number
    affiliateValue: number
    isLoading: boolean
}

function MetricCard({ icon, title, totalValue, directValue, affiliateValue, isLoading }: MetricCardProps) {
    // Calculate percentages relative to totalValue (avoid division by zero)
    const directPercentage = totalValue ? (directValue / totalValue) * 100 : 0
    const affiliatePercentage = totalValue ? (affiliateValue / totalValue) * 100 : 0

    // Create breakdown details for Direct and Affiliate metrics
    const metricBreakdown = [
        { label: "Direct", percentage: directPercentage, color: "#2BCFA1" },
        { label: "Affiliate", percentage: affiliatePercentage, color: "#C5A3FF" }
    ]

    // Helper function to render the value display based on title.
    // If title is "Net Profit", use FormattedPrice; otherwise, use Text.
    const renderValueDisplay = (fontSize: number | Record<string, number>) => {
        return title === "Net Profit" ?
            <FormattedPrice
                price={totalValue}
                fontSize={fontSize}
                abbreviationProps={{ color: "#7B7B7B" }}
            />
            :
            <Text fontSize={fontSize} color="#FFF">
                {totalValue}
            </Text>
    }

    // Primary display uses larger font sizes
    const primaryValueDisplay = renderValueDisplay({ base: 18, lg: 20 })
    // Secondary display uses a smaller font size
    const secondaryValueDisplay = renderValueDisplay(14)

    // Only include metrics with a percentage greater than 0
    const activeMetrics = metricBreakdown.filter(metric => metric.percentage > 0)

    return (
        <RuledGrid columns={1} nested color="white">
            <DataPointCard icon={icon} title={title} isLoading={isLoading}>
                {primaryValueDisplay}
            </DataPointCard>

            {totalValue > 0 && (
                <Box padding={{ base: 4, lg: 6 }}>
                    {/* Progress Bar */}
                    <Flex gap="6px">
                        {activeMetrics.map(({ percentage, color }) => (
                            <Box key={color} flex={percentage} h="16px" borderRadius={4} bg={color} />
                        ))}
                    </Flex>

                    {/* Breakdown */}
                    <Flex direction="column" gap={4} marginTop={6} >
                        {activeMetrics.map(({ label, percentage, color }) => (
                            <Flex
                                key={label}
                                flexWrap="wrap"
                                justifyContent="space-between"
                                alignItems="center"
                                gap={2}
                            >
                                <StylizedTitle bgColor={color} title={label}  />
                                <StatIndicator percentage={percentage}>
                                    {secondaryValueDisplay}
                                </StatIndicator>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            )}
        </RuledGrid>
    )
}

export default MetricCard