import { Divider, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import useHookStore from 'functions/hooks/store/useHookStore';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useCallback } from 'react';
import { ShopnameText } from '../../HeaderLayout-style';
import ProfileDropdownLinks from './parts/ProfileDropdownLinks';

function HeaderDashboardLogedin() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { logoutUser } = useProfile()
    const { app: { shop } } = useHookStore();
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
                            <AppImage src={shop?.logo} objectFit={"contain"} backgroundPosition={"center"} width="48px" height="48px" borderRadius="4px" />
                            <AppTypography color={"#FFFFFF"} fontSize={"16px"}>{shop?.name}</AppTypography>
                        </Flex>
                        <Divider />
                        <ProfileDropdownLinks shop={shop} />
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