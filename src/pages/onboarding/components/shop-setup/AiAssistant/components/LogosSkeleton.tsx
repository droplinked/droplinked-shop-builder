import { Avatar } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function LogosSkeleton() {
    return (
        Array(3).fill(0).map((_, index) =>
            <AppSkeleton isLoaded={false} p={1} borderRadius="full" key={index}>
                <Avatar
                    width={{ base: "56px", md: "76px" }}
                    height={{ base: "56px", md: "76px" }}
                />
            </AppSkeleton>
        )
    )
}
