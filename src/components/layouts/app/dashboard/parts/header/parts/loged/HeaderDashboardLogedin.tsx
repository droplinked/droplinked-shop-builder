import { Divider, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import useHookStore from 'functions/hooks/store/useHookStore';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { appDeveloment } from 'lib/utils/app/variable';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShopnameText } from '../../HeaderLayout-style';

function HeaderDashboardLogedin() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { logoutUser } = useProfile()
    const { app: { shop } } = useHookStore();
    const logout = useCallback(() => {
        logoutUser()
        onClose()
    }, []);
    const links = [
        { label: "Store", href: `https://${appDeveloment ? 'dev.' : ''}droplinked.io/${shop?.name}`, icon: <AppIcons.WhiteShopIcon width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Credit", href: "/dashboard", icon: <AppIcons.WhiteOpenWallet width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Settings", href: "/dashboard/settings/shop-info", icon: <AppIcons.SettingIcon width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
        { label: "Help", href: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", icon: <AppIcons.HelpCenter width={"24px"} height={"24px"} color={"#FFFFFF"} /> },
    ]

    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            variant="unstyle"
        >
            <PopoverTrigger>
                <Flex alignItems="center" gap="12px" cursor="pointer">
                    <ShopnameText>{shop?.name}</ShopnameText>
                    <AppIcons.ShopIcon />
                </Flex>
            </PopoverTrigger>
            <PopoverContent
                bg="#292929"
                borderRadius="8px"
                p="16px 36px"
                h="auto"
                w="auto"
                right="27px"
                border="none !important"
                outline="none !important"
                shadow="none !important"
            >
                <PopoverBody>
                    <Flex direction={"column"} gap="24px">
                        <Flex alignItems={"center"} gap={"16px"}>
                            <AppImage src={shop?.logo} objectFit={"cover"} width="48px" height="48px" borderRadius="4px" />
                            <Flex direction={"column"} justifyContent={"space-between"}>
                                <AppTypography color={"#FFFFFF"} fontSize={"16px"}>{shop?.name}</AppTypography>
                                <AppTypography color={"#808080"} fontSize={"14px"}>Casper</AppTypography>
                            </Flex>
                        </Flex>
                        <Divider />
                        <Flex direction={"column"} gap="24px">
                            {links.map(link => {
                                return link.label !== "Credit" ?
                                    <Link to={link.href} target={"_blank"}>
                                        <Flex alignItems={"center"} gap={"12px"}>
                                            {link.icon}
                                            <AppTypography color={"#FFFFFF"} fontSize={"16px"}>{link.label}</AppTypography>
                                        </Flex>
                                    </Link>
                                    :
                                    <Flex justifyContent={"space-between"} alignItems={"center"} gap={"12px"}>
                                        <Flex alignItems={"center"} gap={"12px"}>
                                            {link.icon}
                                            <AppTypography color={"#FFFFFF"} fontSize={"16px"}>{link.label}</AppTypography>
                                        </Flex>
                                        <AppTypography color={"#2BCFA1"} fontSize={"16px"}>${shop?.credit.toFixed(2)}</AppTypography>
                                    </Flex>
                            })}
                        </Flex>
                        <Divider />
                        <Flex alignItems={"center"} gap={"12px"} cursor={"pointer"} onClick={logout}>
                            <AppIcons.Logout width={"24px"} height={"24px"} color={"#FFFFFF"} />
                            <AppTypography color={"#E63F43"} fontSize={"16px"}>Log out</AppTypography>
                        </Flex>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default HeaderDashboardLogedin