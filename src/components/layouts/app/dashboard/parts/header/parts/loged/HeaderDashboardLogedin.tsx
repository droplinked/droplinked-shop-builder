import { Box, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons';
import useHookStore from 'functions/hooks/store/useHookStore';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { appDeveloment } from 'lib/utils/app/variable';
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import { ShopnameText } from '../../HeaderLayout-style'

function HeaderDashboardLogedin() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { logoutUser } = useProfile()
    const { app: { shop } } = useHookStore();

    const logout = useCallback(() => {
        logoutUser()
        onClose();
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
                    <Link to="/dashboard" onClick={() => onClose()}>
                        <Text
                            fontFamily="Avenir Next"
                            fontStyle="normal"
                            fontWeight="500"
                            fontSize="14px"
                            color="#FFFFFF"
                            w="100%"
                            textAlign="center"
                            cursor="pointer"
                        >
                            Dashboard
                        </Text>
                    </Link>
                    <Box mb="20px" />
                    <a
                        href={`https://${appDeveloment ? 'dev.' : ''}droplinked.io/${shop?.name}`}
                        onClick={onClose}
                        target="_blank"
                    >
                        <Text
                            fontFamily="Avenir Next"
                            fontStyle="normal"
                            fontWeight="500"
                            fontSize="14px"
                            color="#FFFFFF"
                            w="100%"
                            textAlign="center"
                            cursor="pointer"
                        >
                            View Store
                        </Text>
                    </a>
                    <Box mb="20px" />
                    <Text
                        fontFamily="Avenir Next"
                        fontStyle="normal"
                        fontWeight="500"
                        fontSize="14px"
                        color="#FFFFFF"
                        w="100%"
                        textAlign="center"
                        cursor="pointer"
                        onClick={logout}
                    >
                        Logout
                    </Text>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default HeaderDashboardLogedin