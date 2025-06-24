import { Flex, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import ClaimNowButton from './ClaimNowButton'

export default function ProPlanCard() {
    const bottomAmount = useBreakpointValue({ base: "unset", md: "7rem", xl: "10rem" })
    const transformAmount = useBreakpointValue({ base: "scale(1)", md: "scale(0.8)", xl: "scale(1)" })

    return (
        <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="start"
            height={{ base: "auto", md: "20rem" }}
        >
            <ClaimNowButton marginLeft={6} />

            <img
                style={{
                    position: "relative",
                    bottom: bottomAmount,
                    transform: transformAmount
                }}
                alt='pro-plan-card'
                src='/assets/images/crossmint-landing/proPlanVisual.png'
            />
        </Flex>
    )
}
