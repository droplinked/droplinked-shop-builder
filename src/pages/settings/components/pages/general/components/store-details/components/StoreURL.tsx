import { Flex } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore'
import { SHOP_URL } from 'lib/utils/app/variable'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { Link } from 'react-router-dom'

export default function StoreURL() {
    const { shop } = useAppStore()

    const { shopDomain, name } = shop
    const link = shopDomain ? `https://${shopDomain}` : `${SHOP_URL}/${name}`

    const shopLink = () => (
        <Flex alignItems={"center"} gap={"6px"} sx={{ path: { stroke: "#179ef8" } }}>
            <Link to={link} target='_blank'>
                <AppTypography color={"#179EF8"} fontSize={16}>
                    {shopDomain ? `https://${shopDomain}` : `${SHOP_URL}/[${name}]`}
                </AppTypography>
            </Link>
            <ClipboardText text={link} />
        </Flex>
    )

    return (
        <SectionContent title="Store URL" rightContent={shopLink()} />
    )
}
