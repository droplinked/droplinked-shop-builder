import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { appDeveloment } from 'lib/utils/app/variable';
import React from 'react';
import { Link } from 'react-router-dom';

interface Link {
    label: string
    href: string
    icon: JSX.Element
}

interface Props {
    shop: any
}

function ProfileDropdownLinks({ shop }: Props) {
    const links: Link[] = [
        { label: "Store", href: `https://${appDeveloment ? 'dev.' : ''}droplinked.io/${shop?.name}`, icon: <AppIcons.WhiteShopIcon width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Credit", href: "/dashboard", icon: <AppIcons.WhiteOpenWallet width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Settings", href: "/dashboard/settings/shop-info", icon: <AppIcons.SettingIcon width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Help", href: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", icon: <AppIcons.HelpCenter width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
    ]

    return (
        <Flex direction={"column"} gap="24px">
            {links.map(link => {
                return link.label !== "Credit" ?
                    <Link to={link.href} target={"_blank"}><LinkAttributes link={link} /></Link>
                    :
                    <Flex justifyContent={"space-between"} alignItems={"center"} gap={"12px"}>
                        <LinkAttributes link={link} />
                        <AppTypography color={"#2BCFA1"} fontSize={"16px"}>${shop?.credit.toFixed(2)}</AppTypography>
                    </Flex>
            })}
        </Flex>
    )
}

function LinkAttributes({ link }: { link: Link }) {
    return (
        <Flex alignItems={"center"} gap={"12px"}>
            {link.icon}
            <AppTypography color={"#FFFFFF"} fontSize={"16px"}>{link.label}</AppTypography>
        </Flex>
    )
}

export default ProfileDropdownLinks