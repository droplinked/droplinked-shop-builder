import { SimpleGrid, SimpleGridProps, Skeleton, SkeletonProps } from "@chakra-ui/react"
import React from "react"

interface Props {
    numberOfSkeletons?: number
    containerProps?: SimpleGridProps
    skeletonProps?: SkeletonProps
}

function LoadingPlaceholder({ numberOfSkeletons = 1, containerProps, skeletonProps }: Props) {
    return (
        <SimpleGrid
            columns={1}
            gap={4}
            {...containerProps}
        >
            {Array.from({ length: numberOfSkeletons }).map((_, index) =>
                <Skeleton
                    key={index}
                    width="full"
                    height={20}
                    borderRadius={8}
                    isLoaded={false}
                    {...skeletonProps}
                >
                    {" "}
                </Skeleton>
            )}
        </SimpleGrid>
    )
}

export default LoadingPlaceholder