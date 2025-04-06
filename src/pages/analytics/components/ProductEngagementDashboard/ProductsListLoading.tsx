import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

interface Props {
    count?: number
}

export default function ProductsListLoading({ count = 4 }: Props) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Flex key={index} align="center" gap={4} padding={{ base: 4, xl: "16px 24px" }}>
                    {/* Placeholder for the AppImage */}
                    <Skeleton
                        width={12}
                        height={12}
                        borderRadius={4}
                    />

                    {/* Placeholder for the Flex with product name and price */}
                    <Flex
                        flex={1}
                        flexWrap="wrap"
                        flexDirection={{ base: "column", md: "row" }}
                        justifyContent="space-between"
                        gap={6}
                    >
                        {/* Placeholder for productName */}
                        <Skeleton
                            height="14px"
                            width={{ base: "100%", md: "60%" }} // Approximate width for text
                        />

                        {/* Placeholder for FormattedPrice */}
                        <Skeleton
                            height="14px"
                            width={{ base: "100%", md: "30%" }} // Approximate width for price
                        />
                    </Flex>

                    {/* Placeholder for the Chevron button */}
                    <SkeletonCircle
                        size="5"
                        flexShrink={0}
                        marginInline="10px" // To match the padding of 10px in the button
                    />
                </Flex>
            ))}
        </>
    )
}