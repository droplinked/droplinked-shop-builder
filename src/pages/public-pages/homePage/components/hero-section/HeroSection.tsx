import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

export default function HeroSection() {
    return (
        <Grid
            templateColumns="1fr"
            templateRows="repeat(2, 1fr)"
            height="100vh"
            mx={{ base: 4, lg: 6 }}
            backgroundImage="url(https://upload-file-droplinked.s3.amazonaws.com/bb43d560151ac7d20966da30d1d9affdd9b462943a49cbf40e4f893e35c94b07.png)"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            borderRadius="24px"
        >
            <Box>
                <Flex flexDirection="column" alignItems="center" gap={{ base: 2, md: 4 }}>
                    <Text
                        color="neutral.white"
                        fontWeight={500}
                        lineHeight={{ base: "52px", md: "64px", xl: "72px", "2xl": "80px" }}
                        fontSize={{ base: "36px", md: "48px", xl: "56px", "2xl": "64px" }}
                        mt={{ base: "48px", "md": "80px" }}
                        whiteSpace="pre-line"
                        textAlign="center"
                    >
                        {`Commerce That \n Earns The Most`}
                    </Text>
                    <Text
                        color="text.subtext.placeholder.light"
                        maxWidth={{ base: "90%", md: "80%", xl: "45%" }}
                        textAlign="center"
                        fontSize={{ base: "14px", md: "16px" }}
                    >
                        From the largest enterprises to solo merchants, droplinked provides tools enabling businesses and entrepreneurs to finance growth and earn more on every sale
                    </Text>
                </Flex>
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <AppButton>
                        Start Now
                    </AppButton>
                    <AppButton variant='normal' color="neutral.white">
                        Request a Demo
                    </AppButton>
                </Flex>
            </Box>
            <Box
                backgroundImage="url(https://upload-file-droplinked.s3.amazonaws.com/26ac1e9a2ec59fe9723daba8cabd655be70035baa47c53235080172f2157ec92.png)"
                backgroundSize="auto"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
            />
        </Grid>
    )
}
