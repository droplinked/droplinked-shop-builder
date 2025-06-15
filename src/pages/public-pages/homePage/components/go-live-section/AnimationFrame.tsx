import { Box } from '@chakra-ui/react'
import React from 'react'

export default function AnimationFrame({ LottieView }: { LottieView: React.ReactNode }) {
    return (
        <Box
            position="relative"
            backgroundImage="url('https://upload-file-droplinked.s3.amazonaws.com/23cf80fd633d9c14976dbd81b510663bca2e8584b4ac09ad667e6da2c34dbd52.png')"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            padding={{ base: "8px 8px 0px 8px", md: "24px 24px 0px 24px", lg: "48px 48px 0px 48px" }}
        >
            <Box
                borderRadius="24px 24px 0px 0px"
                border="1px solid rgba(43, 207, 161, 0.16)"
                borderBottom="none"
                background="linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%)"
                backdropFilter="blur(50px)"
                padding="8px 8px 0px 8px"
                sx={{
                    "svg": {
                        borderRadius: "16px 16px 0 0"
                    }
                }}
            >
                {LottieView}
            </Box>
        </Box>
    )
}
