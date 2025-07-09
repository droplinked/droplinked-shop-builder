import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

export default function GetStartedCard() {
    const bottomAmount = useBreakpointValue({ base: "unset", md: "7rem", xl: "10rem" })
    const transformAmount = useBreakpointValue({ base: "scale(1)", md: "scale(0.8)", xl: "scale(1)" })

    return (
        <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="start"
            height={{ base: "auto", md: "20rem" }}
            width="100%"
        >
            <AppButton m={6}>
                Get Started
            </AppButton>

            <img
                style={{
                    position: "relative",
                    bottom: bottomAmount,
                    transform: transformAmount
                }}
                alt='get-started-card'
                src='https://upload-file-droplinked.s3.amazonaws.com/433b27784eeaf4b1f0da8063e62a58b8c190be7c95029303f40fff433f6a4f64.png'
            />
        </Flex>
    )
}