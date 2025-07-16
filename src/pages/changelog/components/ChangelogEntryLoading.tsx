import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'
import { ChangelogGrid } from './ChangelogGrid'

export function ChangelogEntryLoading({ count = 1 }: { count?: number }) {
    return (
        <ChangelogGrid>
            {Array.from({ length: count }).map((_, index) => <LoadingEntry key={index} />)}
        </ChangelogGrid>
    )
}

function LoadingEntry() {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            padding={{ base: 4, md: 6, lg: 4, "2xl": 6 }}
            gap={{ base: 6, "2xl": 12, "3xl": 20 }}
        >
            <Flex minW="200px" direction="column" gap={1}>
                <Skeleton height={{ base: "16px", xl: "18px" }} width="120px" />
                <Skeleton height={{ base: "14px", xl: "16px" }} width="80px" />
            </Flex>

            <Box flex={1}>
                <Skeleton height={{ base: "18px", xl: "20px" }} width="150px" marginBottom={3} />

                {/* Tags loading */}
                <Flex gap={2}>
                    <Skeleton height="24px" width="80px" />
                    <Skeleton height="24px" width="100px" />
                    <Skeleton height="24px" width="60px" />
                </Flex>

                <Skeleton height={{ base: "16px", xl: "18px" }} width="200px" marginTop={6} marginBottom={1} />

                <SkeletonText
                    noOfLines={2}
                    skeletonHeight={{ base: "14px", xl: "16px" }}
                    marginBottom={3}
                />

                <Skeleton height="20px" width="100px" />
            </Box>
        </Flex>
    )
}