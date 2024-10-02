import { Flex, Grid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IDetailsSection } from '../../types/interfaces'
import Container from '../container/Container'
import Details from '../details/Details'
import CustomHeading from '../heading/Heading'

export default function DetailsSection({ data }: { data: IDetailsSection }) {
    const { title, description, detailItems } = data

    return (
        <Details title={title} description={description as string}>
            <Grid
                width="100%"
                templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
                templateRows="repeat(1, 1fr)"
                gap={{ base: 4, xl: 6 }}
            >
                {detailItems.map((item, index) => <DetailItem key={index} {...item} />)}
            </Grid>
        </Details>
    )
}

const DetailItem = ({ icon, title, description }) => (
    <Container gap={6}>
        {icon}
        <Flex direction="column" gap={2}>
            <CustomHeading title={title} width={"fit-content"} fontSize={20} />
            <AppTypography fontSize={16} color="#fff">{description}</AppTypography>
        </Flex>
    </Container>
)