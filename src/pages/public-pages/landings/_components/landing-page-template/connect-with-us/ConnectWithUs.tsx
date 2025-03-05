import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import SpectrumHeader from '../../spectrum-header/SpectrumHeader'
import EmailForm from './EmailForm'

export default function ConnectWithUs() {
    return (
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            alignItems="center"
            gap={{ base: 9, md: "64px" }}
            borderRadius={16}
            paddingBlock={{ base: 6, md: 12, lg: 20 }}
            paddingInline={{ base: 6, lg: 12 }}
            bgImage={"https://upload-file-droplinked.s3.amazonaws.com/82bf95e7ff580686be284a05e57992873234f1af575eb59e616e9217ac9b3ab1.png"}
            bgSize={"cover"}
        >
            <IntroSection />
            <EmailForm />
        </SimpleGrid>
    )
}

const IntroSection = () => (
    <Flex direction="column" gap={4}>
        <SpectrumHeader fontSize={{ base: 20, lg: 28 }}>Let's Stay Connected</SpectrumHeader>
        <AppTypography fontSize={{ base: 16, md: 18 }} color="neutral.gray.400">
            We appreciate your interest and would love to stay in touch. Feel free to add your email to our mailing list to stay up to date on all the latest features and releases.
        </AppTypography>
    </Flex>
)