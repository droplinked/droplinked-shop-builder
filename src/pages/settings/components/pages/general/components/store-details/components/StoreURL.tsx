import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import useAppStore from 'lib/stores/app/appStore'
import { SHOP_URL } from 'lib/utils/app/variable'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { Link } from 'react-router-dom'

export default function StoreURL() {
    const { shop } = useAppStore()
    const { shopDomain, name } = shop
    const link = shopDomain ? `https://${shopDomain}` : `${SHOP_URL}/${name}`
    const { showToast } = useAppToast()
    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
        showToast({ type: "success", message: "Store URL copied successfully" })
    }

    const shopLink = () => {
        return (
            <Flex alignItems={"center"} gap={"6px"}>
                <Link to={link} target='_blank'>
                    <AppTypography color={"#179EF8"} fontSize={16}>
                        {shop?.shopDomain ? `https://${shop?.shopDomain}` : `${SHOP_URL}/[${shop.name}]`}
                    </AppTypography>
                </Link>
                <AppIcons.Copy onClick={handleCopyLink} style={{ cursor: "pointer" }} />
            </Flex>
        )
    }

    return (
        <SectionContent title="Store URL" rightContent={shopLink()} />
    )
}
