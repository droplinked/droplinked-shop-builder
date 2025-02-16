import { Flex } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore'
import { BUILDER_URL } from 'lib/utils/app/variable'
import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkContainer() {
    const { shop: { referralDetails } } = useAppStore()
    const { code } = referralDetails ?? {}
    const link = `${BUILDER_URL}/?modal=signup&referral=${code?.toLowerCase()}`

    return (
        <Flex alignItems={"center"} gap={"6px"}>
            <Link to={link}>
                <AppTypography color={"#fff"} fontSize={16}>{link}</AppTypography>
            </Link>
            <ClipboardText text={link} />
        </Flex>
    )
}
