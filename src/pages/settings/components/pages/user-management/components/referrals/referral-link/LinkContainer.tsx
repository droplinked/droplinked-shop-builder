import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import useAppStore from 'lib/stores/app/appStore'
import { BUILDER_URL } from 'lib/utils/app/variable'
import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkContainer() {
    const { shop: { referralDetails } } = useAppStore()
    const { code } = referralDetails
    const { showToast } = useAppToast()
    const link = `${BUILDER_URL}/?modal=signup&referral=${code.toLowerCase()}`
    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
        showToast({ type: "success", message: "Referral link copied successfully" })
    }

    return (
        <Flex alignItems={"center"} gap={"6px"}>
            <Link to={link}>
                <AppTypography color={"#fff"} fontSize={16}>{link}</AppTypography>
            </Link>
            <AppIcons.Copy onClick={handleCopyLink} style={{ cursor: "pointer" }} />
        </Flex>
    )
}
