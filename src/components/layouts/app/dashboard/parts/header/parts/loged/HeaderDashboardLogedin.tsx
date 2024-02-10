import { Divider, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import AppTypography from 'components/common/typography/AppTypography';
import useHookStore from 'functions/hooks/store/useHookStore';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useCallback } from 'react';
import { ShopnameText } from '../../HeaderLayout-style';
import ProfileDropdownLinks from './parts/ProfileDropdownLinks/ProfileDropdownLinks';

function HeaderDashboardLogedin() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { logoutUser } = useProfile()
    const { app: { shop, user } } = useHookStore();
    const logout = useCallback(() => {
        logoutUser()
        onClose()
    }, []);

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
                right="27px"
                width="280px"
                shadow="none !important"
                outline="none !important"
                border="none !important"
                borderRadius="8px"
                padding="24px"
                bg="#292929"
            >
                <PopoverBody>
                    <Flex direction={"column"} gap="24px">
                        <Flex alignItems={"center"} gap={"16px"}>
                            <AppImage src={shop?.logo} objectFit={"contain"} backgroundPosition={"center"} width="48px" height="48px" borderRadius="4px" />
                            <Flex direction={"column"} justifyContent={"space-between"}>
                                <AppTypography color={"#FFFFFF"} fontSize={"16px"} fontWeight={500}>
                                    {user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : 'Welcome'}
                                </AppTypography>
                                {shop?.description &&
                                    <AppTypography color={"#808080"} fontSize={"14px"} position={"relative"}>
                                        {shop.description.length <= 15 ? shop.description :
                                            <AppTooltip label={shop?.description}>{`${shop?.description.slice(0, 15)}...`}</AppTooltip>
                                        }
                                    </AppTypography>
                                }
                            </Flex>
                        </Flex>
                        <Divider />
                        <ProfileDropdownLinks shop={shop} close={onClose} />
                        <Divider />
                        <Flex alignItems={"center"} gap={"12px"} cursor={"pointer"} onClick={logout}>
                            <AppIcons.Logout width={"24px"} height={"24px"} color={"#FFFFFF"} />
                            <AppTypography color={"#E63F43"} fontSize={"16px"}>Log out</AppTypography>
                        </Flex>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover >
    )
}

export default HeaderDashboardLogedin