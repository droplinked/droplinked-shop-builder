import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import PremiumBadge from 'pages/settings/components/common/PremiumBadge'
import SectionContent from 'pages/settings/components/common/SectionContent'
import DomainField from './DomainField'
import { Box, Flex } from '@chakra-ui/react'
import Domain from './Domain'
import { getShopAPIKeyService } from 'lib/apis/shop/shopServices'
import { useQuery } from 'react-query'
import { useHasPermission } from 'lib/stores/app/appStore'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'


export default function PublicApiKey() {
    const hasPermission = useHasPermission()
    const hasShopApiPermission = hasPermission("shopfront_apis")
    const { isFetching, data: { data }, refetch } = useQuery("shopAPIKey", getShopAPIKeyService, { enabled: hasShopApiPermission })
    const { domains } = data.data

    return (
        <SectionContainer
            title="Public API Key"
            badge={
                <PremiumBadge />
            }>
            <SectionContent
                title="Domain"
                description="Add a domain to generate a unique API key for secure store access."
                rightContent={
                    <Flex flexDirection={"column"} gap={4}>
                        <Box mb={{ base: 4, md: 6 }}>
                            <AppSkeleton borderRadius={8} isLoaded={!isFetching}>
                                <DomainField refetch={refetch} domains={domains} />
                            </AppSkeleton>
                        </Box>
                        <AppSkeleton borderRadius={8} isLoaded={!isFetching}>
                            <Domain />
                        </AppSkeleton>
                    </Flex>
                }
            />
        </SectionContainer>
    )
}
