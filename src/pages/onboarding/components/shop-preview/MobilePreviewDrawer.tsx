import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { ChevrondownLg } from 'assets/icons/Navigation/ChevronDown/ChevrondownLg';
import { ShopLg } from 'assets/icons/System/Shop/ShopLg';
import React from 'react';
import MobileDrawerButton from './MobileDrawerButton';
import MobilePreview from './MobilePreview';

export default function MobilePreviewDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MobileDrawerButton onOpen={onOpen} />
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent background={"#1C1C1C"}>
                    <DrawerHeader borderColor={"#292929"} background={"#141414"}>
                        <Flex justifyContent={"space-between"} alignItems={"center"} onClick={onClose}>
                            <Flex gap={4} alignItems={"center"}>
                                <Flex
                                    padding={3}
                                    justify={"center"}
                                    align={"center"}
                                    border={"1px solid #292929"}
                                    borderRadius={8}
                                    background={"#1c1c1c"}
                                >
                                    <ShopLg color={"#fff"} />
                                </Flex>
                                <Text color={"#fff"} fontSize={16} fontWeight={500}>
                                    Store Preview
                                </Text>
                            </Flex>
                            <ChevrondownLg color='#fff' />
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody padding="0">
                        <MobilePreview />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
