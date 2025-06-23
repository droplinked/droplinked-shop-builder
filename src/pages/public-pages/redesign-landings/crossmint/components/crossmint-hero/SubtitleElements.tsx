import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import Crossmint from 'assets/brand-identity/Crossmint'
import Drop3 from 'assets/brand-identity/Drop3'
import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import AppButton from 'components/redesign/button/AppButton'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SubtitleElements() {
    const droplinkedSize = useBreakpointValue({ base: "24px", md: "36px", lg: "48px" })
    const crossmintSize = useBreakpointValue({ base: "20px", md: "32px", lg: "40px" })

    return (
        <Flex flexDirection="column" alignItems="center" mt={{ base: 4, lg: 6 }} gap={4}>
            <Link to={AUTH_ROUTES.SIGN_UP}>
                <AppButton>
                    Claim Now
                </AppButton>
            </Link>

            <Flex
                justifyContent="center"
                alignItems="center"
                gap={4}
                width="100%"
                paddingBlock={{ base: "48px", md: "88px", lg: "48px" }}
            >
                <Box
                    height="2px"
                    width="100%"
                    background="linear-gradient(90deg, rgba(43, 207, 161, 0.00) 0%, rgba(43, 207, 161, 0.20) 100%)"
                    borderRadius="2px"
                />

                <Flex
                    border="1px solid rgba(43, 207, 161, 0.20)"
                    borderRadius="128px"
                    p={{ base: 3, md: 4 }}
                    gap={{ base: 4, md: 6 }}
                    alignItems="center"
                >
                    <IconWrapper
                        icon={<Drop3 width={droplinkedSize} height={droplinkedSize} color='#fff' />}
                        background="rgba(43, 207, 161, 0.32)"
                        border="1px solid"
                        borderColor="rgba(43, 207, 161, 0.10)"
                        borderRadius="48px"
                        backdropFilter="blur(12.5px)"
                        width={{ base: "48px", md: "64px", lg: "88px" }}
                        height={{ base: "48px", md: "64px", lg: "88px" }}
                    />

                    <TransferLg color='#fff' />

                    <IconWrapper
                        icon={<Crossmint width={crossmintSize} height={crossmintSize} color='#fff' />}
                        background="rgba(43, 207, 161, 0.32)"
                        border="1px solid"
                        borderColor="rgba(43, 207, 161, 0.10)"
                        borderRadius="48px"
                        backdropFilter="blur(12.5px)"
                        width={{ base: "48px", md: "64px", lg: "88px" }}
                        height={{ base: "48px", md: "64px", lg: "88px" }}
                    />
                </Flex>

                <Box
                    height="2px"
                    width="100%"
                    background="linear-gradient(90deg, rgba(43, 207, 161, 0.20) 0%, rgba(43, 207, 161, 0.00) 100%)"
                    borderRadius="2px"
                />

            </Flex>
        </Flex>
    )
}
