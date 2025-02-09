import { Box, Flex, Text } from "@chakra-ui/react"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React, { ReactNode } from "react"
import DataPointCard from "../DataPointCard"
import StatIndicator from "../StatIndicator"

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

    return (
        <RuledGrid columns={1} nested color="white">
            <DataPointCard icon={icon} title={title}>
                <FormattedPrice price={value} fontSize={20} abbreviationProps={{ color: "#7B7B7B" }} />
            </DataPointCard>

            <Box padding={6}>
                {/* Progress Bar */}
                <Flex gap="6px">
                    <Box h="16px" flex={progressDirect} borderRadius={4} bg="#2BCFA1" />
                    <Box h="16px" flex={progressAffiliate} borderRadius={4} bg="#C5A3FF" />
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
                                <Flex alignItems="center" gap={2}>
                                    <Box w={1} h={4} borderRadius={4} bgColor={color} />
                                    <Text fontSize={14} color="#FFF">{label}</Text>
                                </Flex>
                                <StatIndicator percentage={progress}>
                                    <FormattedPrice price={value} fontSize={14} abbreviationProps={{ color: "#7B7B7B" }} />
                                </StatIndicator>
                            </Flex>
                        )
                    )}
                </Flex>
            </Box>
        </RuledGrid>
    )
}

export default MetricCard