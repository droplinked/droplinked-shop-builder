import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

export default function ProPlanCard() {
    const { isLoggedIn } = useAppStore()
    const bottomAmount = useBreakpointValue({ base: "unset", md: "7rem", xl: "10rem" })
    const transformAmount = useBreakpointValue({ base: "scale(1)", md: "scale(0.8)", xl: "scale(1)" })
    const url = isLoggedIn ? "/analytics/dashboard" : AUTH_ROUTES.SIGN_UP

    return (
        <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="start"
            height={{ base: "auto", md: "20rem" }}
            width="100%"
        >
            <Link to={url}>
                <AppButton marginLeft={6}>
                    Start Now
                </AppButton>
            </Link>

            <img
                style={{
                    position: "relative",
                    bottom: bottomAmount,
                    transform: transformAmount
                }}
                alt='pro-plan-card'
                src='https://upload-file-droplinked.s3.amazonaws.com/ac3d91291f97b251af7b19c6c22096e1b6afcae4db1565556447a6e24304e954.png'
            />
        </Flex>
    )
}
