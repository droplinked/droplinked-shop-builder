import { Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';

const SkeletonGroup = ({ alignEnd = false }) => (
    <Flex direction="column" gap={2}>
        <Skeleton width="180px" alignSelf={alignEnd ? "flex-end" : "flex-start"} />
        <Flex gap={2}>
            <Skeleton width="116px" />
            <Skeleton width="116px" />
        </Flex>
    </Flex>
)

function ShippingMethodsLoading() {
    return (
        <Flex direction="column" gap={4}>
            {Array.from({ length: 3 }).map((_, index) => (
                <Flex
                    key={index}
                    gap={3}
                    border="1.5px solid"
                    borderColor="neutral.gray.700"
                    borderRadius={8}
                    p={4}
                    sx={{ ".chakra-skeleton": { height: 5, borderRadius: 4, startColor: "#3C3C3C00", endColor: "#3C3C3C52" } }}
                >
                    <Skeleton width={5} height={5} borderRadius="full !important" />
                    <Flex flex={1} justify="space-between">
                        <SkeletonGroup />
                        <SkeletonGroup alignEnd />
                    </Flex>
                </Flex>
            ))}
        </Flex>
    )
}

export default ShippingMethodsLoading