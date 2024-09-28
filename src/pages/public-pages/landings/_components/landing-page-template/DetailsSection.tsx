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
        <Details title={title} description={description}>
            <Grid
                width="100%"
                templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
                templateRows="repeat(1, 1fr)"
                gap={{ base: 6, xl: 9 }}
            >
                {detailItems.map(({ icon, title, description }, index) => (
                    <DetailItem
                        key={index}
                        icon={icon}
                        title={title}
                        description={description}
                    />
                ))}
            </Grid>
        </Details>
    )
}

const DetailItem = ({ icon, title, description }) => (
    <Container gap={6}>
        {icon}
        <Flex direction="column" gap={4}>
            <CustomHeading title={title} fontSize={20} />
            <AppTypography fontSize={16} color="#fff">{description}</AppTypography>
        </Flex>
    </Container>
)