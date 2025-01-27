import { HStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import CopyrightItem from './components/CopyrightItem'
import DotSpacer from './components/DotsSpacer'

function Copyright() {
    // Get the current year dynamically
    const currentYear = new Date().getFullYear()

    return (
        <HStack
            flexDirection={{ sm: "column", md: "row" }}
            justifyContent="space-between"
            background="#292929"
            py="20px"
            px={{ sm: "1rem", md: "6rem" }}
        >
            <AppTypography fontSize="14px" fontWeight="400" color="#B1B1B1">
                © {currentYear} All Rights Reserved
            </AppTypography>

            <HStack alignItems="center">
                <CopyrightItem href='/privacy' title='Privacy & Data Collection' />
                <DotSpacer />
                <CopyrightItem href='/terms' title='Terms of service' />
            </HStack>
        </HStack>
    )
}

export default Copyright