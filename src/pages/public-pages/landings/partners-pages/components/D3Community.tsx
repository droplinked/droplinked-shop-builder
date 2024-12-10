import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import D3Heading from './common/PrimaryHeading'
import LandingText from './common/LandingText'


export default function D3Community() {
    return (
        <Flex direction="column" justifyContent="flex-start">
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
            image: "https://upload-file-droplinked.s3.amazonaws.com/9b5b310685dd2f480b27b8980ce892908037b38a5c246d2f8dcbfd2e7f4c0eab.png"
        },
        {
            icon: <AppIcons.D3CoreChain className='d3-icon' />,
            title: "Core Chain",
            description: ".core",
            image: "https://upload-file-droplinked.s3.amazonaws.com/c5753e8c166c078687805a45636260bd6480333d40a446352d092fca7e5fce0b.png"
        },
        {
            icon: <AppIcons.D3Shiba className='d3-icon' />,
            title: "Shiba Inu",
            description: ".shib",
            image: "https://upload-file-droplinked.s3.amazonaws.com/5e3838825b62d47c642ea1f773bbf04f40778d4330fcd78914eaaccf1544e83f.png"
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
            <LandingText>{description as string}</LandingText>
        </Flex>
    )
}