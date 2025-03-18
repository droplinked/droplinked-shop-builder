import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { Avatar, Box, Flex } from '@chakra-ui/react'

interface Props {
    logos: string[]
}

export default function GeneratedLogo({ logos }: Props) {
    const { updateOnboardingState, storeSetup } = useOnboardingStore()
    const selectedLogo = storeSetup.logo

    const handleClick = (url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, logo: url })
    }

    useEffect(() => {
        handleClick(logos[0])
    }, [])

    return (
        <GeneratedContentWrapper title='Logo'>
            <Flex alignItems="center" gap={4}>
                {logos.map((logo, index) => {
                    return (
                        <Box
                            {...(selectedLogo === logo) && { border: "1px solid #2BCFA1" }}
                            borderRadius="full"
                            p={1}
                            cursor="pointer"
                        >
                            <Avatar
                                src={logo}
                                key={index}
                                onClick={() => handleClick(logo)}
                                width={{ base: "56px", md: "76px" }}
                                height={{ base: "56px", md: "76px" }}
                            />
                        </Box>
                    )
                })}
            </Flex>
        </GeneratedContentWrapper>
    )
}
