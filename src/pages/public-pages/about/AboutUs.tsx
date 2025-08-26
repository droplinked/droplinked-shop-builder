import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import JsonLdScript from 'components/common/JsonLdScript/JsonLdScript'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/about/ar.json'
import enLocale from 'locales/public-pages/about/en.json'
import { createAboutPageSchema } from 'utils/jsonLdSchemas'
import React from 'react'

export function meta() {
    return [
        { title: "About Droplinked | Our Mission for Web3 Commerce" },
        {
            name: "description",
            content: "Learn about Droplinked's mission to simplify Web3 and empower creators and businesses with accessible, no-code tools for the future of e-commerce.",
        },
        {
            name: "keywords",
            content: "about us, company mission, Web3 e-commerce, our story, e-commerce innovation, blockchain technology",
        },
        {
            property: "og:title",
            content: "About Droplinked | Our Mission for Web3 Commerce",
        },
        {
            property: "og:description",
            content: "Learn about Droplinked's mission to simplify Web3 and empower creators and businesses with accessible, no-code tools for the future of e-commerce.",
        },
    ];
}

function AboutUs() {
    const { t } = useLocaleResources("about", {
        ar: arLocale,
        en: enLocale
    })

    const data = [
        {
            title: t("features.onchainRegistration.title"),
            description: t("features.onchainRegistration.description"),
            borderColor: "#944BFB"
        },
        {
            title: t("features.trustlessSettlement.title"),
            description: t("features.trustlessSettlement.description"),
            borderColor: "#7A66E2"
        },
        {
            title: t("features.authenticatedDistribution.title"),
            description: t("features.authenticatedDistribution.description"),
            borderColor: "#6080CA"
        },
        {
            title: t("features.collaborationRewards.title"),
            description: t("features.collaborationRewards.description"),
            borderColor: "#469AB1"
        }
    ]

    return (
        <>
            <JsonLdScript data={createAboutPageSchema()} />
            <Flex justifyContent="center" position="relative" padding={{ base: "110px 0", lg: "180px 0" }}>
                <VStack width="90%" maxWidth="1400px" align="stretch" spacing={{ base: "15px", lg: "45px" }}>
                    <Box><AppTypography color="#FFF" fontSize={{ base: "24px", sm: "32px" }} fontWeight='bold'>{t("title")}</AppTypography></Box>
                    <VStack color="#C3C3C3" align="stretch">
                        <Box><AppTypography fontSize={{ base: "16px", lg: "20px" }}>{t("description1")}</AppTypography></Box>
                        <Box><AppTypography fontSize={{ base: "16px", lg: "20px" }}>{t("description2")}</AppTypography></Box>
                        <Box><AppTypography fontSize={{ base: "16px", lg: "20px" }}>{t("description3")}</AppTypography></Box>
                        <Box><AppTypography fontSize={{ base: "16px", lg: "20px" }}>{t("description4")}</AppTypography></Box>
                    </VStack>
                    <Flex flexWrap="wrap" justifyContent="space-between" color="#FFF">
                        {data.map((el, key) => (
                            <VStack width={{ base: "48%", md: "23%" }} marginBottom="20px" align="stretch" key={key} padding={{ base: "20px", sm: "40px 20px 90px 20px", xl: "40px 30px 90px 30px" }} border={`1px solid ${el.borderColor}`} borderRadius="18px" spacing="20px">
                                <AppTypography fontSize={{ base: "18px", lg: "24px" }} fontWeight='bold' height={{ base: "auto", md: "45px", lg: "72px" }}>{el.title}</AppTypography>
                                <AppTypography fontSize="14px">{el.description}</AppTypography>
                            </VStack>
                        ))}
                    </Flex>
                </VStack>
            </Flex>
        </>
    )
}

export default AboutUs