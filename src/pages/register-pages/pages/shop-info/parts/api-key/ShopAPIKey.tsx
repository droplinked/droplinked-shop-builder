import { Flex, Link } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import WithPermission from 'functions/hoc/shop-permissions/WithPermission'
import { ShopOAuth2Client } from 'lib/apis/shop/interfaces'
import { getShopAPIKeyService, updateShopAPIKeyService } from 'lib/apis/shop/shopServices'
import { useHasPermission } from 'lib/stores/app/shopPermissionsStore'
import { appDevelopment } from 'lib/utils/app/variable'
import React, { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import APIKeyContext from './context'
import RemoveAPIKey from './parts/remove-api-key/RemoveAPIKey'
import UpdateAPIKey from './parts/update-api-key/UpdateAPIKey'

export default function ShopAPIKey() {
    const hasPermission = useHasPermission()
    const getShopAPIKey = useQuery("shopAPIKey", getShopAPIKeyService, { refetchOnWindowFocus: false, enabled: hasPermission("shopfront_apis") })
    const updateShopAPIKey = useMutation((params: ShopOAuth2Client) => updateShopAPIKeyService(params))
    const fetchedData = useMemo(() => getShopAPIKey.data?.data.data, [getShopAPIKey.data])

    return (
        <Flex direction={"column"} gap={"36px"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <AppTypography fontSize='18px' fontWeight='bold'>API Key</AppTypography>
                <WithPermission requiredPermission='shopfront_apis' action='hide'>
                    <Link
                        href={`https://${appDevelopment ? 'apiv3dev' : 'apiv3'}.droplinked.com/v1/public-apis/document`}
                        target="_blank">
                        <AppTypography
                            fontSize={"14px"}
                            color={"#33A9EC"}
                            textDecoration={"underline"}
                            textDecorationColor={"#33A9EC"}>
                            API Documentation
                        </AppTypography>
                    </Link>
                </WithPermission>
            </Flex>
            <APIKeyContext.Provider value={{ getShopAPIKey, updateShopAPIKey, fetchedData }}>
                <UpdateAPIKey />
                <RemoveAPIKey />
            </APIKeyContext.Provider>
        </Flex>
    )
}