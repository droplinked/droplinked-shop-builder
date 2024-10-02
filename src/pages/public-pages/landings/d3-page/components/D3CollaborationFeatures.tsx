import { Box, Flex, Grid, Image, SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IDetailsItem } from '../../types/interfaces'
import D3Paragraph from './common/D3Paragraph'

type Feature = { image: string | { base: string, md: string } } & IDetailsItem

export default function D3CollaborationFeatures() {
    const features: Feature[] = [
        {
            icon: <AppIcons.D3ProPlan className='d3-icon' />,
            title: "6 Month Pro Plan",
            description: "Enjoy premium features for six months for being a loyal D3 customer.",
            image: "https://upload-file-droplinked.s3.amazonaws.com/b2ab77f6817eda666fbf91efc298620a93f7688df5592c2c048e916dd357beb5.png"
        },
        {
            icon: <AppIcons.D3Access className='d3-icon' />,
            title: "Access +10k Products",
            description: "Choose from a vast catalog to customize and sell unique merchandise on demand.",
            image: {
                base: "https://upload-file-droplinked.s3.amazonaws.com/04efd571a6aa665289570959c00e702266d4f749c44883c8c68949eb8f77cc8e.png",
                md: "https://upload-file-droplinked.s3.amazonaws.com/8273463bd617dd09cabee8bfb3a018e476b8113c35621fafe1d094f40d6871b5.png"
            }
        },
        {
            icon: <AppIcons.D3Web3Support className='d3-icon' />,
            title: "Web3 Technology Support",
            description: "Seamlessly integrate NFTs alongside blockchain features to create novel experiences with assets you own or want to offer.",
            image: "https://upload-file-droplinked.s3.amazonaws.com/f93a05cd57cf7f8ae3ff77e5e86685e93fa8f2a76c5f1e74beaaf13641a68e19.png"
        }
    ]

    return (
        <Grid templateColumns={{ base: "1fr", lg: "45% 55%" }} alignItems="start" gap={4}>
            <FeatureCard {...features[0]} />
            <SimpleGrid gap={4}>
                {features.slice(1).map((feature) => <FeatureCard key={feature.title} {...feature} />)}
            </SimpleGrid>
        </Grid>
    )
}

function FeatureCard({ icon, title, description, image }: Feature) {
    const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')
    const imageUrl = typeof image === 'string' ?
        image :
        isSmallerThan768 ? image.base : image.md

    return (
        <Flex
            direction="column"
            border="1px solid #222"
            borderRadius={16}
            overflow="hidden"
            gap={{ base: 4, md: 0 }}
        >
            <Flex direction="column" gap={{ base: 4, md: 8 }} padding={{ base: 4, md: 8 }}>
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