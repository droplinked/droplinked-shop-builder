import { Flex, Hide, Show } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AuthModal from "components/modals/auth-modal/AuthModal";
import useHookStore from "functions/hooks/store/useHookStore";
import React, { useState } from "react";
import DesktopHeader from "./parts/desktop-header/DesktopHeader";
import MobileHeader from "./parts/mobile-header/MobileHeader";

function HeaderMain() {
    const { app: { shop } } = useHookStore()
    const [header_state, set_header_state] = useState<{ auth_modal: boolean; scrolled: boolean }>({ auth_modal: false, scrolled: false })
    const toggleAuthModal = () => set_header_state((p) => ({ ...p, auth_modal: !p.auth_modal }))
    window.onscroll = () => {
        if (window.scrollY > 10) set_header_state((p) => ({ ...p, scrolled: true }))
        else set_header_state((p) => ({ ...p, scrolled: false }))
        return () => (window.onscroll = null)
    }

    const products_menu = [
        {
            label: "Products",
            links: [
                { label: "Physical Products", description: "Monetize Inventory with Tailored Storefronts", icon: <AppIcons.Bag />, href: "/physical-product" },
                { label: "Product on Demand", description: "Transform Artwork and IP with Mint to Merch", icon: <AppIcons.Shirt />, href: "/pod-product" },
                { label: "Digital Goods", description: "Minting and Monetizing Assets", icon: <AppIcons.Gallery />, href: "/digital-product" },
                { label: "Tokenpay", description: "Token Powered Commerce Driven by Your Community", icon: <AppIcons.Coins />, href: "/tokenpay" },
            ],
        },
        {
            label: "Commerce Tools",
            links: [
                { label: "DIMST", description: "On-Chain Inventory Management", icon: <AppIcons.Coins />, href: "/roi" },
                // { label: "DPP", description: "Digital Product Passport", icon: <AppIcons.Gallery />, href: "/dpp" }
            ],
        },
    ]

    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                position="fixed"
                top={0}
                left={0}
                right={0}
                borderBottom={header_state.scrolled ? "1px solid #3C3C3C" : "transparent"}
                padding={{ base: "12px 16px", sm: "12px 36px", md: "16px 64px", lg: "20px 128px", xl: "24px 156px", "2xl": "192px" }}
                backgroundColor={header_state.scrolled ? "#141414" : "transparent"}
                zIndex={999}
                style={{ transition: `all 1s ease` }}
            >
                <Hide below="md"><DesktopHeader products_menu={products_menu} toggleAuthModal={toggleAuthModal} /></Hide>
                <Show below="md"><MobileHeader products_menu={products_menu} toggleAuthModal={toggleAuthModal} /></Show>
            </Flex>
            <AuthModal show={header_state.auth_modal} shopName={shop?.name} close={toggleAuthModal} />
        </>
    );
}

export default HeaderMain;
