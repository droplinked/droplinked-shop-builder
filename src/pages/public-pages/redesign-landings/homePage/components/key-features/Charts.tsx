import React, { useState, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { BarchartSm } from 'assets/icons/Finance/BarChart/BarchartSm'
import { ChartSm } from 'assets/icons/Finance/Chart/ChartSm'
import InlineVideoPlayer from 'pages/public-pages/redesign-landings/_shared/components/InlineVideoPlayer'

export default function Charts() {
    const [chartNumber, setChartNumber] = useState(1)
    const [videoKey, setVideoKey] = useState(0)
    // Keep a consistent height to prevent layout shift
    const videoContainerHeight = "385px"; // Adjust based on your video's aspect ratio

    // Increment key when chart changes to force remount
    useEffect(() => {
        setVideoKey(prevKey => prevKey + 1)
    }, [chartNumber])

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

    const ChartSelector = () => (
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
                transition="all 0.3s ease-in-out"
                transform={chartNumber === 1 ? "scale(1.05)" : "scale(1)"}
                _hover={{
                    opacity: 0.9,
                    background: chartNumber === 1
                        ? "rgba(43, 207, 161, 0.15)"
                        : "rgba(43, 207, 161, 0.05)",
                    transform: "scale(1.05)"
                }}
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
                transition="all 0.3s ease-in-out"
                transform={chartNumber === 2 ? "scale(1.05)" : "scale(1)"}
                _hover={{
                    opacity: 0.9,
                    background: chartNumber === 2
                        ? "rgba(43, 207, 161, 0.15)"
                        : "rgba(43, 207, 161, 0.05)",
                    transform: "scale(1.05)"
                }}
            >
                <ChartSm color="#2BCFA1" />
            </Box>
        </Flex>
    )

    const OrdersInfo = () => (
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
                            <Box background="rgba(255, 255, 255, 0.10)" height="20px" width="2px" />
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
    )

    return (
        <Box position="relative">
            <Box
                position="relative"
                width="100%"
                minHeight={videoContainerHeight}
            >
                {chartNumber === 1 ? (
                    <InlineVideoPlayer
                        key={`chart1-${videoKey}`}
                        src="/assets/video/home-page/chart1.webm"
                        loop={false}
                    />
                ) : (
                    <InlineVideoPlayer
                        key={`chart2-${videoKey}`}
                        src="/assets/video/home-page/chart2.webm"
                        loop={false}
                    />
                )}
            </Box>

            <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                padding={6}
                justifyContent="space-between"
                zIndex={2}
            >
                <OrdersInfo />
                <ChartSelector />
            </Flex>
        </Box>
    )
}