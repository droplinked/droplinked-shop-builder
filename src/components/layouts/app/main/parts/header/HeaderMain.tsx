import { Box, Flex, HStack, PopoverBody, Show, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppPopoverOnHover from "components/common/PopoverMenu/PopOverOnHover";
import AppTypography from "components/common/typography/AppTypography";
import HeaderDashboardLogedin from "components/layouts/app/dashboard/parts/header/parts/loged/HeaderDashboardLogedin";
import AuthModal from "components/modals/auth-modal/AuthModal";
import useHookStore from "functions/hooks/store/useHookStore";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function HeaderMain() {
    const { app: { shop } } = useHookStore();
    const [header_state, set_header_state] = useState<{ auth_modal: boolean; scrolled: boolean }>({ auth_modal: false, scrolled: false });
    const toggleAuthModal = () => set_header_state((p) => ({ ...p, auth_modal: !p.auth_modal }));
    window.onscroll = () => {
        if (window.scrollY > 10) set_header_state((p) => ({ ...p, scrolled: true }));
        else set_header_state((p) => ({ ...p, scrolled: false }));
        return () => (window.onscroll = null);
    };

    const products_menu = [
        {
            label: "Products",
            links: [
                { label: "Physical Products", desctiption: "All our items in one place", icon: <AppIcons.Bag />, href: "/physical-product" },
                { label: "Digital Products", desctiption: "Shop by type and interest", icon: <AppIcons.Gallery />, href: "/digital-product" },
                { label: "Print on Demand", desctiption: "Themed and seasonal product selections", icon: <AppIcons.Shirt />, href: "/pod-product" },
            ],
        },
        {
            label: "Services",
            links: [{ label: "Token Integration", desctiption: "All our items in one place", icon: <AppIcons.Coins />, href: "tokenpay" }],
        },
    ];
    return (
        <>
            <Flex
                justifyContent="space-between"
                position="fixed"
                top="0"
                right="0"
                left="0"
                padding={{ base: "10px 15px", sm: "12px 36px", md: "16px 64px", lg: "20px 128px", xl: "24px 158px", "2xl": "192px" }}
                zIndex="10"
                alignItems="center"
                borderBottom={header_state.scrolled ? "1px solid #3C3C3C" : "transparent"}
                backgroundColor={header_state.scrolled ? "#141414" : "transparent"}
                style={{ transition: `all 1s ease` }}
            >
                <HStack spacing={{ base: "24px", md: "36px" }}>
                    <Link to="/">
                        <Box width={{ base: "94px", md: "140px", lg: "164px", xl: "210px" }}>
                            <AppIcons.Droplinked width={"100%"} height={"32px"} />
                        </Box>
                    </Link>
                    <Show above='md'>
                        <HStack color="#FFF" spacing={{ base: "10px", sm: "20px", md: "48px" }} alignItems="center">
                            <Link to="about">
                                <AppTypography color="#878787" fontSize={{ base: "12px", sm: "14px", md: "16px" }} fontWeight={600} transition={"0.2s"} _hover={{ color: "#fff" }} whiteSpace={"nowrap"}>
                                    About Us
                                </AppTypography>
                            </Link>
                            <AppPopoverOnHover
                                nodes={{
                                    trigger: {
                                        children: (
                                            <AppTypography color="#878787" fontSize={{ base: "12px", sm: "14px", md: "16px" }} fontWeight={600} transition={"0.2s"} _hover={{ color: "#fff" }}>
                                                Products
                                            </AppTypography>
                                        ),
                                    },
                                    content: {
                                        children: (
                                            <PopoverBody display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" gap="36px" alignSelf={"stretch"}>
                                                <VStack alignSelf={"stretch"} spacing={"36px"} width={"full"} alignItems={"flex-start"}>
                                                    {products_menu.map((menu_item) => (
                                                        <VStack key={menu_item?.label} spacing={"12px"} align={"stretch"}>
                                                            <AppTypography color={"white"} fontSize={"16px"} fontWeight={"600"}>
                                                                {menu_item?.label}
                                                            </AppTypography>
                                                            <HStack align={"stretch"} spacing={"16px"} display={"grid"} gridTemplateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}>
                                                                {menu_item?.links?.map((link) => (
                                                                    <Link key={link.label} to={link.href}>
                                                                        <Flex alignItems={"flex-start"} gap={4}>
                                                                            <Box flexShrink={0} backgroundColor={"#F2F2F2"} padding={"12px"} rounded={"8px"}>
                                                                                {link.icon}
                                                                            </Box>
                                                                            <VStack display={"flex"} alignItems={"flex-start"}>
                                                                                <AppTypography fontSize={"16px"} color={"white"} fontWeight={"400"}>
                                                                                    {link.label}
                                                                                </AppTypography>
                                                                                <AppTypography fontSize={"14px"} color={"white"} fontWeight={"500"} opacity={"0.5"}>
                                                                                    {link.desctiption}
                                                                                </AppTypography>
                                                                            </VStack>
                                                                        </Flex>
                                                                    </Link>
                                                                ))}
                                                            </HStack>
                                                        </VStack>
                                                    ))}
                                                </VStack>
                                            </PopoverBody>
                                        ),
                                        props: {
                                            backgroundColor: "#1C1C1C",
                                            justifyContent: "flex-end",
                                            padding: { base: "10px 15px", sm: "12px 36px", md: "16px 64px", lg: "20px 128px", xl: "24px 158px", "2xl": "192px" },
                                            alignItems: "center",
                                            alignSelf: "stretch",
                                            gap: "80px",
                                            width: "100vw",
                                            border: "none",
                                            marginTop: { sm: "1px", md: "8px", lg: "10px", xl: "16px" },
                                        },
                                    },
                                }}
                            />
                            <Link to="/plans">
                                <AppTypography color="#878787" fontSize={{ base: "12px", sm: "14px", md: "16px" }} fontWeight={600} transition={"0.2s"} _hover={{ color: "#fff" }}>
                                    Pricing
                                </AppTypography>
                            </Link>
                            {/* <a href="https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked" target="_blank">
                            <AppTypography color="#FFF" fontSize={{ base: "12px", sm: "14px" }}>
                                Help Center
                            </AppTypography>
                        </a> */}
                        </HStack>
                    </Show>
                </HStack>
                <Box>
                    {shop ? (
                        <HeaderDashboardLogedin />
                    ) : (
                        <AppTypography
                            borderRadius="8px"
                            cursor="pointer"
                            onClick={toggleAuthModal}
                            color="#C2C2C2"
                            border="2px solid #292929"
                            padding={{ base: "6px 13px", lg: "6px 23px" }}
                            fontSize="12px"
                        >
                            Sign In
                        </AppTypography>
                    )}
                </Box>
            </Flex>
            <AuthModal show={header_state.auth_modal} shopName={shop?.name} close={toggleAuthModal} />
        </>
    );
}

export default HeaderMain;
