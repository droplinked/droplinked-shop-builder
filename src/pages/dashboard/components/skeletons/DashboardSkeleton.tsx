import { Box, Flex, Skeleton } from "@chakra-ui/react"
import React from "react"

export default function DashboardSkeleton() {
    return (
        <Flex direction="column" gap={{ base: 6, md: 9, lg: 12 }}>
            {/* Revenue Stats Skeleton */}
            <Flex direction="column" gap={4}>
                <Flex gap={{ base: 4, xl: 6 }} flexWrap="wrap">
                    {[...Array(4)].map((_, index) => (
                        <Box
                            key={index}
                            flex={{ base: "1 1 100%", md: "1 1 calc(50% - 16px)", lg: "1 1 calc(25% - 24px)" }}
                            border="1px solid"
                            borderColor="neutral.gray.800"
                            borderRadius={16}
                            padding={{ base: 4, lg: 6 }}
                        >
                            <Skeleton height="24px" width="40%" mb={4} />
                            <Skeleton height="32px" width="60%" />
                        </Box>
                    ))}
                </Flex>

                {/* Quick Actions Skeleton */}
                <Flex gap={{ base: 4, xl: 6 }} flexWrap="wrap">
                    {[...Array(4)].map((_, index) => (
                        <Box
                            key={index}
                            flex={{ base: "1 1 100%", md: "1 1 calc(50% - 16px)", lg: "1 1 calc(25% - 24px)" }}
                            border="1px solid"
                            borderColor="neutral.gray.800"
                            borderRadius={16}
                            padding={{ base: 4, lg: 6 }}
                        >
                            <Skeleton height="32px" width="100%" />
                        </Box>
                    ))}
                </Flex>
            </Flex>

            {/* Sales and Affiliates Skeleton */}
            <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, xl: 6 }}>
                <Box flex={{ base: "1", md: "0.5" }}>
                    <Box border="1px solid" borderColor="neutral.gray.800" borderRadius={16} overflow="hidden">
                        <Skeleton height="48px" />
                        <Box p={4}>
                            <Skeleton height="120px" />
                        </Box>
                    </Box>
                </Box>
                <Box flex={{ base: "1", md: "0.5" }}>
                    <Box border="1px solid" borderColor="neutral.gray.800" borderRadius={16} overflow="hidden">
                        <Skeleton height="48px" />
                        <Box p={4}>
                            <Skeleton height="120px" />
                        </Box>
                    </Box>
                </Box>
            </Flex>

            {/* Community Engagement Skeleton */}
            <Flex gap={{ base: 4, xl: 6 }} flexWrap="wrap">
                {[...Array(4)].map((_, index) => (
                    <Box
                        key={index}
                        flex={{ base: "1 1 100%", md: "1 1 calc(50% - 16px)", lg: "1 1 calc(25% - 24px)" }}
                        border="1px solid"
                        borderColor="neutral.gray.800"
                        borderRadius={16}
                        padding={{ base: 4, lg: 6 }}
                    >
                        <Skeleton height="24px" width="60%" mb={2} />
                        <Skeleton height="16px" width="80%" />
                    </Box>
                ))}
            </Flex>

            {/* Resource Links Skeleton */}
            <Flex gap={{ base: 4, xl: 6 }} flexWrap="wrap">
                {[...Array(2)].map((_, index) => (
                    <Box
                        key={index}
                        flex={{ base: "1 1 100%", md: "1 1 calc(50% - 16px)" }}
                        border="1px solid"
                        borderColor="neutral.gray.800"
                        borderRadius={16}
                        overflow="hidden"
                    >
                        <Skeleton height="48px" />
                        <Box p={4}>
                            <Skeleton height="80px" />
                        </Box>
                    </Box>
                ))}
            </Flex>
        </Flex>
    )
} 