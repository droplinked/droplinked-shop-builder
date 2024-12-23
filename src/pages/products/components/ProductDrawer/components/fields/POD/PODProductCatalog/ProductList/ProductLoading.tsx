import { Flex, Skeleton, SkeletonProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends SkeletonProps {
    numberOfSkeletons?: number
}

function ProductLoading({ numberOfSkeletons = 1, ...rest }: Props) {
    return (
        <Flex direction="column" gap={4}>
            {Array.from({ length: numberOfSkeletons }).map((_, index) =>
                <Skeleton
                    key={index}
                    width="full"
                    height={20}
                    borderRadius={8}
                    isLoaded={false}
                    {...rest}
                >
                    {" "}
                </Skeleton>
            )}
        </Flex>
    )
}

export default ProductLoading