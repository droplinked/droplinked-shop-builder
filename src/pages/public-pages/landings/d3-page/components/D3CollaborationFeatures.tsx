import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IDetailsItem } from '../../types/interfaces'
import D3Paragraph from './common/D3Paragraph'

type Feature = { image: string } & IDetailsItem

export default function D3CollaborationFeatures() {
    const features: Feature[] = [
        {
            icon: <AppIcons.D3ProPlan />,
            title: "6 Month Pro Plan Access",
            description: "Enjoy premium features for six months for being a loyal D3 customer.",
            image: ""
        },
        {
            icon: <AppIcons.D3Access />,
            title: "Access Thousands of Products",
            description: "Choose from a vast catalog to customize and sell unique merchandise on demand.",
            image: "https://upload-file-droplinked.s3.amazonaws.com/8273463bd617dd09cabee8bfb3a018e476b8113c35621fafe1d094f40d6871b5.png"
        },
        {
            icon: <AppIcons.D3Web3Support />,
            title: "Web3 Technology Support",
            description: "Seamlessly integrate NFTs alongside blockchain features to create novel experiences with assets you own or want to offer.",
            image: "https://upload-file-droplinked.s3.amazonaws.com/3e1d6749d6b4bf9b59a32e37174e6cc3cb561ecb2f56d672ae4c1489a3c86967.png"
        }
    ]

    return (
        <Grid
            templateColumns={{ base: "1fr", lg: "45% 55%" }}
            alignItems={"start"}
            gap={4}
        >
            <FeatureCard feature={features[0]} />
            <SimpleGrid gap={4}>
                {features.slice(1).map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
            </SimpleGrid>
        </Grid>
    )
}

function FeatureCard({ feature }: { feature: Feature }) {
    const { icon, title, description, image } = feature

    return (
        <Flex
            direction={"column"}
            border="1px solid #222"
            borderRadius={16}
            overflow={"hidden"}
        >
            <Flex direction={"column"} gap={8} padding={8}>
                {icon}
                <Box>
                    <AppTypography fontSize={20} fontWeight={700} color={"white"}>{title}</AppTypography>
                    <D3Paragraph marginTop={1}>{description as string}</D3Paragraph>
                </Box>
            </Flex>
            {<AppImage src={image} />}
        </Flex>
    )
}