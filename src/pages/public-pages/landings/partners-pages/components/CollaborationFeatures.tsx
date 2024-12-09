import { Box, Flex, Grid, Image, SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import D3Paragraph from './common/D3Paragraph'
import { usePartnerContext } from '../context/partner.context'



export default function CollaborationFeatures() {
    const { partnerName, planType, planDurationMonths } = usePartnerContext();

    const features = [
        {
            icon: <AppIcons.D3ProPlan className='d3-icon' />,
            title: `${planDurationMonths} Month ${planType} Plan`,
            description: `Enjoy premium features for ${planDurationMonths} months for being a loyal ${partnerName} customer.`,
            image: "https://upload-file-droplinked.s3.amazonaws.com/333a3fac7efdf0af33855603c3cf412949a26b2a648772bf0caa4e1effa75742.png"
        },
        {
            icon: <AppIcons.D3Access className='d3-icon' />,
            title: "Access +10k Products Instantly",
            description: "Choose from a vast catalog to customize and sell unique merchandise on demand.",
            image: {
                base: "https://upload-file-droplinked.s3.amazonaws.com/b237d01671a1d6a4ae95d5ea0ecfe9a60357e8c7303038cb49325a07ea24e0e1.png",
                md: "https://upload-file-droplinked.s3.amazonaws.com/b237d01671a1d6a4ae95d5ea0ecfe9a60357e8c7303038cb49325a07ea24e0e1.png"
            }
        },
        {
            icon: <AppIcons.D3Web3Support className='d3-icon' />,
            title: "Web3 Technology Support",
            description: "Seamlessly integrate NFTs alongside blockchain features to create novel experiences with assets you own or want to offer.",
            image: "https://upload-file-droplinked.s3.amazonaws.com/89cf86dd82ff59b8377f12e4ee58f2d51cda9acc3aca8e1e5c31c6698a6fc1bc.png"
        }
    ]

    return (
        <Grid templateColumns={{ base: "1fr", lg: "45% 55%" }} alignItems="start" gap={4}>
            <FeatureCard {...features[0]} />
            <SimpleGrid height={"full"} gap={4}>
                {features.slice(1).map((feature) => <FeatureCard key={feature.title} {...feature} />)}
            </SimpleGrid>
        </Grid>
    )
}

function FeatureCard({ icon, title, description, image }) {
    const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')
    const imageUrl = typeof image === 'string' ?
        image :
        isSmallerThan768 ? image.base : image.md

    return (
        <Flex
            height="100%"
            direction="column"
            border="1px solid #222"
            borderRadius={16}
            overflow="hidden"
            gap={{ base: 4, md: 0 }}
        >
            <Flex height="100%" direction="column" gap={{ base: 4, md: 8 }} padding={{ base: 4, md: 8 }}>
                {icon}
                <Box>
                    <AppTypography fontSize={{ base: 18, md: 20 }} fontWeight={700} color="white">
                        {title}
                    </AppTypography>
                    <D3Paragraph mt={1}>{description as string}</D3Paragraph>
                </Box>
            </Flex>
            <Image src={imageUrl} alt={title} />
        </Flex>
    )
}