import { Box, Flex, Text } from "@chakra-ui/react"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React, { ReactNode } from "react"
import DataPointCard from "../DataPointCard"
import StatIndicator from "../StatIndicator"
import StylizedTitle from "../StylizedTitle"

interface Props {
    icon: ReactNode
    title: string
    value: number
    changePercentage: number
    progressDirect: number
    progressAffiliate: number
    directValue: number
    affiliateValue: number
}

function MetricCard(props: Props) {
    const { icon, title, value, changePercentage, progressDirect, progressAffiliate, directValue, affiliateValue } = props

    const metricDetails = [
        { label: "Direct", progress: progressDirect, value: directValue, color: "#2BCFA1" },
        { label: "Affiliate", progress: progressAffiliate, value: affiliateValue, color: "#C5A3FF" }
    ]

    const x1 = title === "Net Profit"
        ? <FormattedPrice price={value} fontSize={{ base: 18, lg: 20 }} abbreviationProps={{ color: "#7B7B7B" }} />
        : <Text fontSize={{ base: 18, lg: 20 }} color="#FFF">{value}</Text>

    const x2 = title === "Net Profit"
        ? <FormattedPrice price={value} fontSize={14} abbreviationProps={{ color: "#7B7B7B" }} />
        : <Text fontSize={14} color="#FFF">{value}</Text>

    return (
        <RuledGrid columns={1} nested color="white">
            <DataPointCard icon={icon} title={title}>
                {x1}
            </DataPointCard>

            <Box padding={{ base: 4, lg: 6 }}>
                {/* Progress Bar */}
                <Flex gap="6px">
                    {metricDetails.map(({ progress, color }) =>
                        <Box key={color} flex={progress} h="16px" borderRadius={4} bg={color} />
                    )}
                </Flex>

                {/* Breakdown */}
                <Flex direction="column" gap={4} marginTop={6}>
                    {metricDetails.map(({ label, progress, value, color }) =>
                        (progress || value) && (
                            <Flex
                                key={label}
                                justifyContent="space-between"
                                align="center"
                            >
                                <StylizedTitle bgColor={color} title={label} />
                                <StatIndicator percentage={progress}>{x2}</StatIndicator>
                            </Flex>
                        )
                    )}
                </Flex>
            </Box>
        </RuledGrid>
    )
}

export default MetricCard