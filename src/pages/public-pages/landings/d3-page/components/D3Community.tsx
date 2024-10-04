import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import D3Heading from './common/D3Heading'
import D3Paragraph from './common/D3Paragraph'

export default function D3Community() {
    return (
        <Flex direction="column" justifyContent={"flex-start"}>
            <D3Heading textAlign="center">Join Your Community Today</D3Heading>
            <Details />
        </Flex>
    )
}

function Details() {
    const details = [
        {
            icon: <AppIcons.D3Victorin className='d3-icon' />,
            title: "Victorin",
            description: ".vic",
            image: "https://upload-file-droplinked.s3.amazonaws.com/54f499e01d6a1f4620c79dd8edeae98b03184f12c9e64e832e3a8419b5837ae4.png"
        },
        {
            icon: <AppIcons.D3CoreChain className='d3-icon' />,
            title: "Core Chain",
            description: ".core",
            image: "https://upload-file-droplinked.s3.amazonaws.com/f7062432e8e990ae5af2996ec1927aad8f1d90c7040736b2b99f3db5c9b339e0.png"
        },
        {
            icon: <AppIcons.D3Shiba className='d3-icon' />,
            title: "Shiba Inu",
            description: ".shib",
            image: "https://upload-file-droplinked.s3.amazonaws.com/7b69b415e009bafec4b13c76ddd012af4a174efa7b96cf59d9a3db030bac0e0c.png"
        }
    ]

    return (
        <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 4, xl: 6 }}
            mt={{ base: 12, md: 16 }}
        >
            {details.map((detail) => <DetailItem key={detail.title} {...detail} />)}
        </SimpleGrid>
    )
}

function DetailItem({ icon, title, description, image }) {
    return (
        <Flex
            direction="column"
            border="1px solid #333"
            borderRadius={24}
            padding={{ base: 4, md: 6 }}
            bgImage={image}
            bgSize="contain"
            bgPosition="right"
            bgRepeat="no-repeat"
        >
            {icon}
            <AppTypography mt={{ base: 4, md: 6 }} fontSize={{ base: 18, md: 20 }} fontWeight={700} color="white">
                {title}
            </AppTypography>
            <D3Paragraph>{description as string}</D3Paragraph>
        </Flex>
    )
}