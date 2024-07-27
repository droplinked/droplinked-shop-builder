import { Link as ChakraLink, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { SHOP_URL } from 'lib/utils/app/variable';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

interface ILink {
    label: string
    href: string
    icon: JSX.Element
}

function ProfileDropdownLinks({ shop, close }: { shop: any, close: () => void }) {
    const links: ILink[] = [
        { label: "Credit", href: "/dashboard/settings/coupons", icon: <AppIcons.WhiteOpenWallet /> },
        { label: "View Shop", href: `${SHOP_URL}/${shop?.name}`, icon: <AppIcons.Eye /> },
        { label: "Change Shop", href: "/shop-management", icon: <AppIcons.WhiteShopIcon /> },
        { label: "Settings", href: "/dashboard/settings/shop-info", icon: <AppIcons.SettingIcon /> },
        { label: "Help", href: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", icon: <AppIcons.HelpCenter /> }
    ]

    const renderLinkAttributes = (link: ILink) =>
        <Flex alignItems={"center"} gap={3} sx={{ svg: { width: 6, height: 6 } }}>
            {link.icon}
            <AppTypography color={"#FFFFFF"} fontSize={16}>{link.label}</AppTypography>
        </Flex>

    return (
        <Flex direction={"column"} gap={6}>
            {links.map((link, index) => {
                return link.href.startsWith("https://") ?
                    <ChakraLink key={index} href={link.href} target={"_blank"}>{renderLinkAttributes(link)}</ChakraLink > :
                    <ReactLink key={index} to={link.href} onClick={() => close()}>
                        {link.label === "Credit" ?
                            <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
                                {renderLinkAttributes(link)}
                                <AppTypography color={"#2BCFA1"} fontSize={16} fontWeight={600}>${shop?.credit?.toFixed(2)} USD</AppTypography>
                            </Flex>
                            :
                            renderLinkAttributes(link)
                        }
                    </ReactLink>
            })}
        </Flex>
    )
}

export default ProfileDropdownLinks