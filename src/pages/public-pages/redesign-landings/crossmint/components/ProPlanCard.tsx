import { Flex } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProPlanCard() {
    return (
        <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="start"
            height={{ base: "auto", md: "20rem" }}
        >
            <Link to={AUTH_ROUTES.SIGN_UP}>
                <AppButton marginLeft={6}>
                    Claim Now
                </AppButton>
            </Link>

            <AppImage
                position="relative"
                bottom={{ base: "unset", md: "7rem", xl: "10rem" }}
                transform={{ base: "scale(1)", md: "scale(0.8)", xl: "scale(1)" }}
                alt='pro-plan-card'
                src='/assets/images/crossmint-landing/proPlanVisual.png'
            />
        </Flex>
    )
}
