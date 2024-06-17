import { Flex, Link } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import WithPermission from 'functions/hoc/shop-permissions/WithPermission'
import { getShopPrivateKeyService } from 'lib/apis/shop/shopServices'
import { useHasPermission } from 'lib/stores/app/appStore'
import { appDevelopment } from 'lib/utils/app/variable'
import React from 'react'
import { useQuery } from 'react-query'

function PrivateKey() {
    const hasPermission = useHasPermission()
    const { isLoading, data } = useQuery("shopPrivateKey", getShopPrivateKeyService, { refetchOnWindowFocus: false, enabled: hasPermission("report_apis") })
    const privateKey = data?.data.data.privateKey

    return (
        <Flex direction={"column"} gap={"36px"}>
            <Flex direction={"column"} gap={"8px"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize='18px' fontWeight='bold'>Private Key</AppTypography>
                    <WithPermission requiredPermission='report_apis' action='hide'>
                        <Link href={`https://${appDevelopment ? 'apiv3dev' : 'apiv3'}.droplinked.com/api/privateapis#/`} target="_blank">
                            <AppTypography fontSize={"14px"} color={"#33A9EC"} textDecoration={"underline"} textDecorationColor={"#33A9EC"}>Documentation</AppTypography>
                        </Link>
                    </WithPermission>
                </Flex>
                <AppTypography fontSize={"16px"} color={"#C2C2C2"}>
                    Use your unique Private Key for specialized services in Shop Builder. You should keep this key confidential and exposing it will compromise the security of your services.
                </AppTypography>
            </Flex>

            <WithPermission requiredPermission='report_apis'>
                {isLoading ? <AppSkeleton isLoaded={false} width={"100%"} height="24px">{''}</AppSkeleton> :
                    privateKey ? <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <AppTypography fontSize={"16px"} color={"#C2C2C2"}>{privateKey}</AppTypography>
                        <ClipboardText text={`${privateKey}`} />
                    </Flex> : null
                }
            </WithPermission>
        </Flex>
    )
}

export default PrivateKey