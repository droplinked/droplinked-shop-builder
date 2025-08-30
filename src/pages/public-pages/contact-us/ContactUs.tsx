import { Box, Flex, Image, Show } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import JsonLdScript from 'components/common/JsonLdScript/JsonLdScript'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/contact-us/ar.json'
import enLocale from 'locales/public-pages/contact-us/en.json'
import React from 'react'
import ContactUsForm from './components/Form'
import SpectrumHeader from './components/SpectrumHeader'
import { createContactPageSchema } from 'utils/jsonLdSchemas'

export function meta() {
    return [
        { title: "Contact Us | Get In Touch with Droplinked" },
        {
            name: "description",
            content: "Have a question? Contact the Droplinked team for sales inquiries, customer support, or partnership opportunities. We're here to help you get started with onchain commerce.",
        },
        {
            name: "keywords",
            content: "Contact Droplinked, Droplinked Support, Droplinked Sales, Onchain Commerce Help",
        },
        {
            property: "og:title",
            content: "Contact Us | Get In Touch with Droplinked",
        },
        {
            property: "og:description",
            content: "Have a question? Contact the Droplinked team for sales inquiries, customer support, or partnership opportunities. We're here to help you get started with onchain commerce.",
        },
    ];
}

function ContactUs() {
    const { t } = useLocaleResources("contactUs", {
        ar: arLocale,
        en: enLocale,
    })

    return (
        <>
            <JsonLdScript data={createContactPageSchema()} />

            <Flex direction={"column"} alignItems={"center"} gap={20} paddingBlock={120} paddingInline={{ base: "16px", sm: "28px" }}>
                <Flex direction={"column"} alignItems={"center"} gap={4}>
                    <SpectrumHeader fontSize={{ base: 32, md: 48, lg: 64 }}>Get in touch</SpectrumHeader>
                    <AppTypography textAlign={"center"} fontSize={{ base: 20, md: 24 }} fontWeight={500} color={"#fff"}>{t('header.title')}</AppTypography>
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
        </>
    )
}

export default ContactUs