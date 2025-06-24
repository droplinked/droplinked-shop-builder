import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import { getShopAPIKeyService } from 'lib/apis/shop/shopServices'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { useQuery } from 'react-query'
import { useHasPermission } from 'stores/app/appStore'
import { appDevelopment } from 'utils/app/variable'
import DomainField from './DomainField'
import Domains from './Domains'


export default function PublicApiKey() {
    const hasPermission = useHasPermission()
    const hasShopApiPermission = hasPermission("shopfront_apis")
    const { isFetching, data, refetch } = useQuery("shopAPIKey", getShopAPIKeyService, { enabled: hasShopApiPermission })
    const { domains, clientId } = data?.data?.data || {}

    return (
        <SectionContainer
            title="Public API Key"
            badge={<AccessLevelBadge justLevel level="Premium" />}
            rightContent={
                <ExternalLink
                    href={`https://${appDevelopment ? "apiv3dev" : "apiv3"}.droplinked.com/v1/public-apis/document`}
                    textDecor={"none"}
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={16}
                    fontWeight={500}
                    gap={"6px"}
                    target='_blank'
                >
                    API Documentation
                    <AppIcons.ExternalLink style={{ display: "inline-block" }} />
                </ExternalLink>
            }
        >
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
                            <Domains refetch={refetch} clientId={clientId} domains={domains} />
                        </AppSkeleton>
                    </Flex>
                }
            />
        </SectionContainer>
    )
}
