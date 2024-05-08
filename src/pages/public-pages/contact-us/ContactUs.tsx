import { Box, Flex, Image, Show } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import CustomHeading from '../landings/parts/heading/Heading'
import ContactUsForm from './parts/form/Form'

function ContactUs() {
    return (
        <Box position="relative" >
            <Image src='/assets/images/homepage/ef1.png' position="fixed" top={{ base: "-100px", md: "-300px" }} right={{ base: "-200px", lg: "0" }} zIndex="0" />
            <Image src='/assets/images/homepage/ef2.png' width="800px" position="absolute" bottom="-300px" left="0" zIndex="0" />
            <Flex direction={"column"} alignItems={"center"} gap={20} paddingBlock={120} paddingInline={{ base: "16px", sm: "28px" }}>
                <Flex direction={"column"} alignItems={"center"} gap={4}>
                    <CustomHeading title='Get in touch' fontSize={{ base: 32, md: 48, lg: 64 }} />
                    <AppTypography textAlign={"center"} fontSize={{ base: 20, md: 24 }} fontWeight={500} color={"#fff"}>Reach out, and let's create a universe of possibilities together!</AppTypography>
                </Flex>
                <Flex
                    width={{ base: "100%", xl: "75%" }}
                    maxWidth="1400px"
                    direction={{ base: "column", md: "row" }}
                    alignItems={"start"}
                    gap={9}
                    borderRadius={24}
                    backgroundColor={"#1C1C1C"}
                    padding={{ base: 5, md: 7, xl: 9 }}
                    zIndex={1}
                >
                    <Box width={{ base: "100%", md: "50%" }}>
                        <ContactUsForm />
                    </Box>
                    <Show above='md'>
                        <Image
                            width={{ base: "100%", md: "50%" }}
                            height={{ base: "504px", lg: "488px" }}
                            src='assets/images/homepage/contact-us.png'
                            objectFit={"cover"}
                            borderRadius={12}
                        />
                    </Show>
                </Flex>
            </Flex>
        </Box >
    )
}

export default ContactUs