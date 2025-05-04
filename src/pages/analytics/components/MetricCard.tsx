import { Box, Flex, Text } from "@chakra-ui/react"
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import HorizontalBarChart from "components/redesign/horizontal-bar-chart/horizontalBarChart"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import StylizedTitle from "components/redesign/stylized-title/StylizedTitle"
import React, { ReactNode } from "react"
import DataPointCard from "./DataPointCard"

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
        { label: "Direct", percentage: directPercentage, color: "main.primary" },
        { label: "Affiliate", percentage: affiliatePercentage, color: "#C5A3FF" }
    ]

    // Only include metrics with a percentage greater than 0
    const activeMetrics = metricBreakdown.filter(metric => metric.percentage > 0)

    // Create a color map for the horizontal bar chart
    const colorMap = metricBreakdown.reduce((acc, { label, color }) => ({ ...acc, [label]: color }), {})

    // Helper function to render the value display based on title.
    // If title is "Net Profit", use FormattedPrice; otherwise, use Text.
    const renderValueDisplay = (fontSize: number | Record<string, number>) => {
        return title === "Net Profit" ?
            <FormattedPrice
                price={totalValue}
                fontSize={fontSize}
                abbreviationProps={{ color: "text.subtext.placeholder.dark" }}
            />
            :
            <Text fontSize={fontSize} color="text.white">
                {totalValue}
            </Text>
    }

    return (
        <RuledGrid columns={1} nested>
            <DataPointCard icon={icon} title={title} isLoading={isLoading}>
                {renderValueDisplay({ base: 18, xl: 20 })}
            </DataPointCard>

            {totalValue > 0 && (
                <Box padding={{ base: 4, xl: 6 }}>
                    <HorizontalBarChart data={activeMetrics} getValue={metric => metric.percentage} getLabel={metric => metric.label} colorMap={colorMap} />

                    {/* Breakdown */}
                    <Flex direction="column" gap={4} marginTop={6}>
                        {activeMetrics.map(({ label, percentage, color }) => (
                            <Flex
                                key={label}
                                flexWrap="wrap"
                                justifyContent="space-between"
                                alignItems="center"
                                columnGap={4}
                                rowGap={2}
                            >
                                <StylizedTitle bgColor={color} title={label} />
                                <DotSeparatedList>
                                    <Text fontSize={14} color="text.white">{percentage.toFixed(2)}%</Text>
                                    {renderValueDisplay(14)}
                                </DotSeparatedList>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            )}
        </RuledGrid>
    )
}

export default MetricCard