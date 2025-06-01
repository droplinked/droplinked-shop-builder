import { Box, Flex, Image, Show } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import ContactUsForm from './parts/form/Form'
import SpectrumHeader from '../landings/_components/spectrum-header/SpectrumHeader'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/contact-us/ar.json'
import enLocale from 'locales/public-pages/contact-us/en.json'

function ContactUs() {
    const { t } = useLocaleResources("contactUs", {
        ar: arLocale,
        en: enLocale,
    })

    return (
        <Box position="relative" >
            <Image src='/assets/images/homepage/ef1.png' position="fixed" top={{ base: "-100px", md: "-300px" }} right={{ base: "-200px", lg: "0" }} zIndex="0" />
            <Image src='/assets/images/homepage/ef2.png' width="800px" position="absolute" bottom="-300px" left="0" zIndex="0" />
            <Flex direction={"column"} alignItems={"center"} gap={20} paddingBlock={120} paddingInline={{ base: "16px", sm: "28px" }}>
                <Flex direction={"column"} alignItems={"center"} gap={4}>
                    <SpectrumHeader fontSize={{ base: 32, md: 48, lg: 64 }}>{t('header.title')}</SpectrumHeader>
                    <AppTypography textAlign={"center"} fontSize={{ base: 20, md: 24 }} fontWeight={500} color={"#fff"}>{t('header.subtitle')}</AppTypography>
                </Flex>
                <Flex
                    width={{ base: "100%", xl: "75%" }}
                    maxWidth="1400px"
                    direction={{ base: "column", md: "row" }}
                    alignItems={"start"}
                    gap={9}
                    borderRadius={24}
                    backgroundColor={"neutral.gray.1000"}
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
                            src='https://upload-file-flatlay.s3.us-west-2.amazonaws.com/dfde56b6e38bf9c95228a80c89e2320a568002d4dc4142a76c11bd7e08a073eb.png_or.png'
                            objectFit={"cover"}
                            borderRadius={12}
                        />
                    </Show>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ContactUs