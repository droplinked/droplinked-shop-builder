import { Flex } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Link } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import { BUILDER_URL } from 'utils/app/variable'

export default function LinkContainer() {
    const { shop: { referralDetails } } = useAppStore()
    const { code } = referralDetails ?? {}
    const link = `${BUILDER_URL}/onboarding?entry=signup&referral=${code?.toLowerCase()}`

    return (
        <Flex alignItems={"center"} gap={"6px"}>
            <Link to={link}>
                <AppTypography color={"neutral.white"} fontSize={16}>{link}</AppTypography>
            </Link>
            <ClipboardText text={link} />
        </Flex>
    )
}
