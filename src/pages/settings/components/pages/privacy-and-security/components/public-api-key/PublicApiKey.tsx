import { Box, Flex } from '@chakra-ui/react'
import Domains from './Domains'
import { getShopAPIKeyService } from 'services/shop/shopServices'
import { useQuery } from 'react-query'
import { useHasPermission } from 'stores/app/appStore'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { appDevelopment } from 'utils/app/variable'
import DomainField from './DomainField'

export default function PublicApiKey() {
    const { t } = useLocaleResources('settings');
    const hasPermission = useHasPermission()
    const hasShopApiPermission = hasPermission("shopfront_apis")
    const { isFetching, data, refetch } = useQuery("shopAPIKey", getShopAPIKeyService, { enabled: hasShopApiPermission })
    const { domains, clientId } = data?.data?.data || {}

    return (
        <SectionContainer
            title={t("PublicApiKey.title")}
            badge={
                <AccessLevelBadge justLevel level="Premium" />
            }
            rightContent={
                <InteractiveText
                    to={`https://${appDevelopment ? "apiv3dev" : "apiv3"}.droplinked.com/v1/public-apis/document`}
                    target="_blank"
                    hasExternalIcon
                >
                    {t("PublicApiKey.apiDocumentation")}
                </InteractiveText>
            }
        >
            <SectionContent
                title={t("PublicApiKey.domain.title")}
                description={t("PublicApiKey.domain.description")}
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
