import { Divider, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import AppTypography from 'components/common/typography/AppTypography';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import useAppStore from 'lib/stores/app/appStore';
import React, { useEffect, useRef } from 'react';
import ProfileDropdownLinks from './parts/ProfileDropdownLinks/ProfileDropdownLinks';

function HeaderDashboardLoggedin() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { logoutUser } = useProfile();
    const { shop, user } = useAppStore();
    const popoverRef = useRef<HTMLDivElement>(null);

    const logout = () => {
        logoutUser();
        onClose();
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            variant="unstyled"
        >
            <PopoverTrigger>
                <Flex alignItems="center" gap="12px" cursor="pointer">
                    <AppTypography userSelect={"none"} color={"lightGray"} fontSize={"18px"} fontWeight={"500"}>{shop.name}</AppTypography>
                    <AppIcons.ShopIcon />
                </Flex>
            </PopoverTrigger>
            <PopoverContent
                ref={popoverRef}
                width="280px"
                right="32px"
                outline="none !important"
                border="none !important"
                borderRadius="8px"
                shadow="none !important"
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
        </Popover>
    )
}

export default HeaderDashboardLoggedin;
