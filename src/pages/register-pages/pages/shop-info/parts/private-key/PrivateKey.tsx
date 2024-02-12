import { Flex, Link } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import { appDeveloment } from 'lib/utils/app/variable'
import React from 'react'

function PrivateKey() {
    return (
        <Flex direction={"column"} gap={"36px"}>
            <Flex direction={"column"} gap={"8px"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography fontSize='18px' fontWeight='bold'>API KEY</AppTypography>
                    <Link href={`https://${appDeveloment ? 'apiv3dev' : 'apiv3'}.droplinked.com/v1/public-apis/document`} target="_blank">
                        <AppTypography fontSize={"14px"} color={"#33A9EC"} textDecoration={"underline"} textDecorationColor={"#33A9EC"}>Documentation</AppTypography>
                    </Link>
                </Flex>
                <AppTypography fontSize={"16px"} color={"#C2C2C2"}>
                    Use your unique Private Key for specialized services in Shop Builder. You should keep this key confidential and exposing it will compromise the security of your services.
                </AppTypography>
            </Flex>

            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <AppTypography fontSize={"16px"} color={"#C2C2C2"}>ABCD-1234-EFGH-5678</AppTypography>
                <ClipboardText text='ABCD-1234-EFGH-5678' />
            </Flex>
        </Flex>
    )
}

export default PrivateKey