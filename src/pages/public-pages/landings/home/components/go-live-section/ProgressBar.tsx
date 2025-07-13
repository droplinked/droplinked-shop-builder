import { Box } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export default function ProgressBar({ percentage }: { percentage: number }) {
    const { isRTL } = useLocaleResources('homePage')

    return (
        <Box
            width={{ base: "8px", md: "100%" }}
            height={{ base: "100%", md: "8px" }}
            borderRadius="8px"
            padding="0px 2px"
            background="neutral.background"
            mt={{ base: 0, md: 4 }}
            position="relative"
            flexShrink={0}
        >
            <Box
                height={{ base: `${percentage}%`, md: "100%" }}
                width={{ base: "100%", md: `${percentage}%` }}
                borderRadius="6px"
                background={
                    isRTL
                        ? "linear-gradient(90deg, #2BCFA1 0%, rgba(43, 207, 161, 0.00) 100%)"
                        : "linear-gradient(270deg, #2BCFA1 0%, rgba(43, 207, 161, 0.00) 100%)"
                }
                transition="all 1s ease-out"
            />
            <Box
                position="absolute"
                top={{ base: `${percentage - 0.5}%`, md: "50%" }}
                left={{
                    base: "50%",
                    md: isRTL ? `${100 - percentage + 0.5}%` : `${percentage - 0.5}%`
                }}
                transform="translate(-50%, -50%)"
                width="2px"
                height="2px"
                borderRadius="4px"
                background="#141414"
                transition="all 1s ease-out"
            />
        </Box>
    )
}
