import React, { useState } from 'react'
import Chart1 from '../../videos/chart1.webm'
import Chart2 from '../../videos/chart2.webm'
import { Box, Flex, Text } from '@chakra-ui/react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import { BarchartSm } from 'assets/icons/Finance/BarChart/BarchartSm'
import { ChartSm } from 'assets/icons/Finance/Chart/ChartSm'
import InlineVideoPlayer from 'pages/public-pages/redesign-landings/_shared/components/InlineVideoPlayer'

export default function Charts() {
    const [chartNumber, setChartNumber] = useState(1)
    const amounts = [
        {
            label: "Affiliate",
            value: 22,
        },
        {
            label: "Distributor",
            value: 38,
        },
        {
            label: "Producer",
            value: 40,
        }
    ]

    return (
        <Flex flexDirection="column">
            <Flex justifyContent="space-between" pt={6} px={6}>
                <Flex flexDirection="column" gap={4}>
                    <Text
                        fontSize={{ base: "14px", "xl": "16px" }}
                        fontWeight={500}
                        color="text.white"
                    >
                        Orders
                    </Text>
                    <Flex gap={6} alignItems="center">
                        {amounts.map((amount, index) => (
                            <Flex key={index} gap={3} alignItems="center">
                                <Box>
                                    <Box background="main.primary" height="20px" width="2px" />
                                    <Box background="Z" height="20px" width="2px" />
                                </Box>
                                <Box>
                                    <Text
                                        fontSize={{ base: "12px", "xl": "14px" }}
                                        fontWeight={500}
                                        color="text.white"
                                    >
                                        {amount.value}%
                                    </Text>
                                    <Text
                                        mt="2px"
                                        fontSize="12px"
                                        color="text.subtext.placeholder.dark"
                                    >
                                        {amount.label}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
                <Flex
                    gap={1}
                    alignItems="center"
                    backdropFilter="blur(10px)"
                    borderRadius={8}
                    border="1px solid rgba(10, 10, 10, 0.10)"
                    p={2}
                >
                    <Box
                        background={chartNumber === 1 ? "rgba(43, 207, 161, 0.10)" : "transparent"}
                        opacity={chartNumber === 1 ? 1 : 0.25}
                        padding={2}
                        borderRadius={4}
                        onClick={() => setChartNumber(1)}
                        cursor="pointer"
                    >
                        <BarchartSm color="#2BCFA1" />
                    </Box>

                    <Box
                        background={chartNumber === 2 ? "rgba(43, 207, 161, 0.10)" : "transparent"}
                        opacity={chartNumber === 2 ? 1 : 0.25}
                        padding={2}
                        borderRadius={4}
                        onClick={() => setChartNumber(2)}
                        cursor="pointer"
                    >
                        <ChartSm color="#2BCFA1" />
                    </Box>
                </Flex>
            </Flex>
            <InlineVideoPlayer src={chartNumber === 1 ? Chart1 : Chart2} loop={false} />
        </Flex>
    )
}
