import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function Contact() {
    return (
        <Flex justifyContent="center" >
            <Flex width="95%" maxWidth="1400px" alignItems="center" gap="20px">
                <VStack width="60%" spacing="20px" align="stretch" marginTop="20px">
                    <Box><AppTypography color="#2BCFA1" size='34px' weight='bolder'>Contact droplinked team</AppTypography></Box>
                    <Box><AppTypography paddingTop="20px" size='18px' color="#f5f5f5">
                        Are you a large retailer, brand or enterprise organization?
                        <br />
                        droplinked provides interoperable infrastructure that scales with you.
                    </AppTypography></Box>
                    <Box paddingTop="20px"><BasicButton>Get Started</BasicButton></Box>
                </VStack>
                <Box width="50%"><Image src='assets/images/homepage/contact.svg' transform="scale(1.4)" /></Box>
            </Flex>
        </Flex>
    )
}

export default Contact