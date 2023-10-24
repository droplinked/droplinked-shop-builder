import { Box, SimpleGrid } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function AffiliateProductsLoading() {
    return (
        <SimpleGrid columns={5} spacing="12px">
            <AppSkeleton isLoaded={false} height="200px">{''}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="200px">{''}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="200px">{''}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="200px">{''}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="200px">{''}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="200px">{''}</AppSkeleton>
        </SimpleGrid>
    )
}

export default AffiliateProductsLoading