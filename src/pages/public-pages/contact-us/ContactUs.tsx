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
                    width={{ base: "100%", lg: "75%" }}
                    maxWidth="1400px"
                    direction={{ base: "column", md: "row" }}
                    alignItems={"start"}
                    gap={9}
                    borderRadius={24}
                    backgroundColor={"#1C1C1C"}
                    padding={{ base: 5, md: 7, xl: 9 }}
                    zIndex={1}
                >
                    <Box
                        width={{ base: "100%", md: "50%" }}
                        order={{ base: 2, md: 1 }}
                    >
                        <ContactUsForm />
                    </Box>
                    <Show above='md'>
                        <Box
                            position={"relative"}
                            width={{ base: "100%", md: "50%" }}
                            height={{ base: "504px", lg: "488px" }}
                            flexShrink={0}
                            order={{ base: 1, md: 2 }}
                            borderRadius={12}
                            background={"linear-gradient(0deg, rgba(10, 13, 23, 0.75) 20.4%, rgba(10, 13, 23, 0.00) 100%), url('assets/images/homepage/contact-us.png') lightgray 50% / cover no-repeat"}
                        />
                    </Show>
                </Flex>
            </Flex>
        </Box >
    )
}

export default ContactUs