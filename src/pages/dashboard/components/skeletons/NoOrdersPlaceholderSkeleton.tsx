import { Flex, Grid, SimpleGrid, Skeleton } from "@chakra-ui/react"
import React from "react"

export default function NoOrdersPlaceholderSkeleton() {
    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            alignItems="start"
            gap={{ base: 4, xl: 6 }}
        >
            {/* First Card Skeleton */}
            <Flex
                height="100%"
                direction="column"
                border="1px solid #222"
                borderRadius={16}
                overflow="hidden"
                gap={{ base: 4, md: 0 }}
            >
                <Flex height="100%" direction="column" gap={1} padding={{ base: 4, lg: 6 }}>
                    <Skeleton height={{ base: 18, md: 20 }} width="40%" />
                    <Skeleton height={{ base: 14, md: 16 }} width="80%" />
                    <Flex gap={3} mt={3}>
                        <Skeleton height={{ base: 12, md: 14 }} width="100px" />
                        <Skeleton height={{ base: 12, md: 14 }} width="100px" />
                    </Flex>
                </Flex>
                <Skeleton height="200px" />
            </Flex>

            {/* Second and Third Cards Skeleton */}
            <SimpleGrid height="full" gap="inherit">
                {[...Array(2)].map((_, index) => (
                    <Flex
                        key={index}
                        height="100%"
                        direction="column"
                        border="1px solid #222"
                        borderRadius={16}
                        overflow="hidden"
                        gap={{ base: 4, md: 0 }}
                    >
                        <Flex height="100%" direction="column" gap={1} padding={{ base: 4, lg: 6 }}>
                            <Skeleton height={{ base: 18, md: 20 }} width="50%" />
                            <Skeleton height={{ base: 14, md: 16 }} width="90%" />
                            <Flex gap={3} mt={3}>
                                <Skeleton height={{ base: 12, md: 14 }} width="100px" />
                            </Flex>
                        </Flex>
                        <Skeleton height="200px" />
                    </Flex>
                ))}
            </SimpleGrid>
        </Grid>
    )
} 