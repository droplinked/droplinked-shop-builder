import { Box } from '@chakra-ui/react'
import React from 'react'

export default function ProgressBar({ percentage }: { percentage: number }) {
    return (
        <Box
            width="100%"
            height="8px"
            borderRadius="8px"
            padding="0px 2px"
            background="neutral.background"
            mt={4}
            position="relative"
        >
            <Box
                height="100%"
                borderRadius="6px"
                background="linear-gradient(270deg, #2BCFA1 0%, rgba(43, 207, 161, 0.00) 100%)"
                width={`${percentage}%`}
                transition="width 1s ease-out"
            />
            <Box
                position="absolute"
                top="50%"
                left={`${percentage - 0.5}%`}
                transform="translate(-50%, -50%)"
                width="2px"
                height="2px"
                borderRadius="4px"
                background="#141414"
                transition="left 1s ease-out"
            />
        </Box>
    )
}
