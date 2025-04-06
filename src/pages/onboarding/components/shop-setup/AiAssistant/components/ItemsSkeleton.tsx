import { Flex, Text } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function ItemsSkeleton() {
    return (
        Array(3).fill(0).map((_, index) =>
            <AppSkeleton isLoaded={false} borderRadius={8} key={index}>
                <Flex
                    paddingInline={4}
                    paddingBlock={3}
                    borderRadius={8}
                    alignItems="center"
                    cursor="pointer"
                    transition="all 0.3s ease"
                >
                    <Text
                        fontSize={16}
                        fontWeight={400}
                        transition="color 0.3s ease"
                    >
                        Loading
                    </Text>
                </Flex>
            </AppSkeleton>
        )
    )
}
