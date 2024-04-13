import { Flex, Link } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { getShopPrivateKeyService } from 'lib/apis/shop/shopServices'
import { appDevelopment } from 'lib/utils/app/variable'
import React from 'react'
import { useQuery } from 'react-query'

function PrivateKey() {
    const { isLoading, data } = useQuery("shopPrivateKey", getShopPrivateKeyService, { refetchOnWindowFocus: false })
    const privateKey = data?.data.data.privateKey

    return (
        <Flex direction={"column"} gap={"36px"}>
            <Flex direction={"column"} gap={"8px"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize='18px' fontWeight='bold'>Private Key</AppTypography>
                    <Link href={`https://${appDevelopment ? 'apiv3dev' : 'apiv3'}.droplinked.com/api/privateapis#/`} target="_blank">
                        <AppTypography fontSize={"14px"} color={"#33A9EC"} textDecoration={"underline"} textDecorationColor={"#33A9EC"}>Documentation</AppTypography>
                    </Link>
                </Flex>
                <AppTypography fontSize={"16px"} color={"#C2C2C2"}>
                    Use your unique Private Key for specialized services in Shop Builder. You should keep this key confidential and exposing it will compromise the security of your services.
                </AppTypography>
            </Flex>

            {isLoading ? <AppSkeleton isLoaded={false} width={"100%"} height="24px">{''}</AppSkeleton> :
                privateKey ? <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize={"16px"} color={"#C2C2C2"}>{privateKey}</AppTypography>
                    <ClipboardText text={`${privateKey}`} />
                </Flex> : null
            }

        </Flex>
    )
}

export default PrivateKey