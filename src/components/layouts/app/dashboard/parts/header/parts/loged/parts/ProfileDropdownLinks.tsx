import { Flex, Link } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { appDeveloment } from 'lib/utils/app/variable';
import React from 'react';

interface ILink {
    label: string
    href: string
    icon: JSX.Element
}

interface Props {
    shop: any
}

function ProfileDropdownLinks({ shop }: Props) {
    const links: ILink[] = [
        { label: "Store", href: `https://${appDeveloment ? 'dev.' : ''}droplinked.io/${shop?.name}`, icon: <AppIcons.WhiteShopIcon width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Credit", href: "/dashboard/settings/coupons", icon: <AppIcons.WhiteOpenWallet width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Settings", href: "/dashboard/settings/shop-info", icon: <AppIcons.SettingIcon width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Help", href: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", icon: <AppIcons.HelpCenter width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
    ]

    const renderLinkAttributes = (link: ILink) =>
        <Flex alignItems={"center"} gap={"12px"}>
            {link.icon}
            <AppTypography color={"#FFFFFF"} fontSize={"16px"}>{link.label}</AppTypography>
        </Flex>

    return (
        <Flex direction={"column"} gap="24px">
            {links.map(link => <Link href={link.href} target={["Store", "Help"].includes(link.label) ? "_blank" : ""}>
                {
                    link.label !== "Credit" ?
                        renderLinkAttributes(link) :
                        <Flex justifyContent={"space-between"} alignItems={"center"} gap={"12px"}>
                            {renderLinkAttributes(link)}
                            <AppTypography color={"#2BCFA1"} fontSize={"16px"} fontWeight={600}>${shop?.credit.toFixed(2)}</AppTypography>
                        </Flex>
                }
            </Link>

            )}
        </Flex>
    )
}

export default ProfileDropdownLinks