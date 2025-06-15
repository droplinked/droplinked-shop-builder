import { Box } from '@chakra-ui/react'
import React from 'react'

export default function ProgressBar({ percentage }: { percentage: number }) {
    return (
        <Box
            width={{ base: "8px", md: "100%" }}
            height={{ base: "200px", md: "8px" }}
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
                background="linear-gradient(270deg, #2BCFA1 0%, rgba(43, 207, 161, 0.00) 100%)"
                transition="all 1s ease-out"
            />
            <Box
                position="absolute"
                top={{ base: `${percentage - 0.5}%`, md: "50%" }}
                left={{ base: "50%", md: `${percentage - 0.5}%` }}
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
