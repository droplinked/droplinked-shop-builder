import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import useAppStore from 'lib/stores/app/appStore'
import { SHOP_URL } from 'lib/utils/app/variable'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { Link } from 'react-router-dom'
// TODO: Import ClipboardText component
// import ClipboardText from 'path/to/ClipboardText' 

export default function StoreURL() {
    // TODO: First, call all hooks (useAppStore, useAppToast, etc.)
    const { shop } = useAppStore() // Call custom hook for app store
    const { showToast } = useAppToast() // Call custom hook for toast notifications

    // TODO: Add a space after calling hooks

    // TODO: Then define component vars and functions
    const { shopDomain, name } = shop // Extract necessary data from the store
    const link = shopDomain ? `https://${shopDomain}` : `${SHOP_URL}/${name}` // Generate the store URL dynamically

    // TODO: Check if ClipboardText can be used instead of `navigator.clipboard.writeText`
    // TODO: If ClipboardText can be used, replace the `handleCopyLink` logic with ClipboardText component.
    // ClipboardText could provide cleaner functionality for copying to clipboard with built-in support for the feedback to the user.

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link) // Copy the link to clipboard
        showToast({ type: "success", message: "Store URL copied successfully" }) // Show success toast notification
    }

    const shopLink = () => {
        return (
            <Flex alignItems={"center"} gap={"6px"}>
                <Link to={link} target='_blank'>
                    <AppTypography color={"#179EF8"} fontSize={16}>
                        {shop?.shopDomain ? `https://${shop?.shopDomain}` : `${SHOP_URL}/[${shop.name}]`}
                    </AppTypography>
                </Link>
                {/* TODO: If ClipboardText is used, replace AppIcons.Copy with ClipboardText */}
                {/* Example usage: <ClipboardText text={link} /> */}
                <AppIcons.Copy onClick={handleCopyLink} style={{ cursor: "pointer" }} />
            </Flex>
        )
    }

    // TODO: Return JSX after defining functions and variables
    return (
        <SectionContent title="Store URL" rightContent={shopLink()} />
    )
}
