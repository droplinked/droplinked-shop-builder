import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

interface Props {
    count?: number
}

export default function ProductsListLoading({ count = 4 }: Props) {
    return (
        <Flex direction="column">
            {Array.from({ length: count }).map((_, index) => (
                <Flex
                    key={index}
                    align="center"
                    gap={{ base: 2, md: 4 }}
                    padding={{ base: 3, md: 4 }}
                    borderBottom={index === count - 1 ? 'none' : '1px solid #292929'}
                >
                    {/* Image placeholder */}
                    <Skeleton boxSize={{ base: '40px', md: '48px' }} borderRadius="4px" />

                    {/* Text placeholders */}
                    <Flex
                        flex={1}
                        flexDirection={{ base: 'column', md: 'row' }}
                        flexWrap="wrap"
                        justifyContent="space-between"
                        gap={1}
                    >
                        <Skeleton
                            height={{ base: '16px', md: '18px' }}
                            width={{ base: '60%', md: '40%' }}
                        />
                        <Skeleton
                            height={{ base: '16px', md: '18px' }}
                            width={{ base: '40%', md: '30%' }}
                        />
                    </Flex>

                    {/* Action button placeholder */}
                    <Skeleton as="button" boxSize={{ base: '24px', md: '28px' }} borderRadius="full" />
                </Flex>
            ))}
        </Flex>
    )
}