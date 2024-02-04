import { Box, SimpleGrid } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function PartnersLoading() {
    return (
        <SimpleGrid columns={5} spacing="40px" paddingTop="30px">
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
            <AppSkeleton isLoaded={false}><Box width="140px" height="20px" backgroundColor="#eee"></Box></AppSkeleton>
        </SimpleGrid>
    )
}

export default PartnersLoading