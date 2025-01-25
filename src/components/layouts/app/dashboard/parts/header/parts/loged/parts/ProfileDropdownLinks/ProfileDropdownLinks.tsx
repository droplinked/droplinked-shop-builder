import { Link as ChakraLink, Flex, Spinner } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';
import { getShopCredit } from 'lib/apis/shop/shopServices';
import { SHOP_URL } from 'lib/utils/app/variable';
import React from 'react';
import { useQuery } from 'react-query';
import { Link as ReactLink } from 'react-router-dom';

interface ILink {
    label: string
    href: string
    icon: JSX.Element
}

interface Props {
    shop: any
    close: () => void
    isOpen: boolean
}

function ProfileDropdownLinks({ shop, close, isOpen }: Props) {
    const { isFetching, data } = useQuery({
        queryKey: ["shop-credit", isOpen],
        queryFn: () => getShopCredit(),
        refetchOnMount: true,
    })

    const { getFormattedPrice } = useCurrencyConverter()

    const links: ILink[] = [
        { label: "Credit", href: "/analytics/account-settings", icon: <AppIcons.WhiteOpenWallet /> },
        { label: "View Shop", href: `${SHOP_URL}/${shop?.name}`, icon: <AppIcons.Eye stroke='#fff' /> },
        { label: "Change Shop", href: "/shop-management", icon: <AppIcons.WhiteShopIcon /> },
        { label: "Settings", href: "/analytics/account-settings", icon: <AppIcons.SettingIcon /> },
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
                                {isFetching ?
                                    <Spinner color='#2BCFA1' />
                                    :
                                    <AppTypography
                                        color={"#2BCFA1"}
                                        fontSize={16}
                                        fontWeight={600}
                                        textAlign={"right"}
                                    >
                                        {getFormattedPrice({ amount: data.data.data.credit, toUSD: false, toFixed: true })}
                                    </AppTypography>
                                }
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