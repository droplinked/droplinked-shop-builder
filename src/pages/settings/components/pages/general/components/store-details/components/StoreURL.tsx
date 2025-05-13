import { Flex } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import useShopUrl from 'hooks/useShopUrl/useShopUrl'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { Link } from 'react-router-dom'

export default function StoreURL() {
    const shopUrl = useShopUrl()

    const shopLink = () => (
        <Flex alignItems={"center"} gap={"6px"} sx={{ path: { stroke: "#179ef8" } }}>
            <Link to={shopUrl} target='_blank'>
                <AppTypography color={"#179EF8"} fontSize={16}>
                    {shopUrl}
                </AppTypography>
            </Link>
            <ClipboardText text={shopUrl} />
        </Flex>
    )

    return (
        <SectionContent title="Store URL" rightContent={shopLink()} />
    )
}
