import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainCard from '../parts/card/MainCard'

function Partners({ loaded }) {
    const data = [
        {
            title: 'Unstoppable Domains',
            url: '',
            icon: '/assets/images/homepage/uns.svg'
        },
        {
            title: 'Casper Punks',
            url: '',
            icon: '/assets/images/homepage/casper.svg'
        },
        {
            title: 'Skale',
            url: '',
            icon: '/assets/images/homepage/skale.svg'
        },
        {
            title: 'Polygon',
            url: '',
            icon: '/assets/images/homepage/polygan.svg'
        }
    ]

    const checkLoad = useMemo(() => loaded.includes('partners'), [loaded])

    return (
        <Box position="relative">
            <Image src="assets/images/homepage/shape.svg" position="absolute" zIndex="1" right="42%" top="-90px" width="34px" />
            <Flex justifyContent="center" alignItems="center">
                <VStack width="95%" maxWidth={checkLoad ? "1400px" : "100%"} opacity={checkLoad ? 1 : 0} transition={".7s"} justifyContent="center" color="#FFF">
                    <Box><AppTypography size="34px" weight='bolder'>Partners</AppTypography></Box>
                    <Box padding="10px 0 30px 0"><AppTypography size="20px" color="#888">Explore the Network of collaborators taking commerce to the next level!</AppTypography></Box>
                    <Flex width="100%" justifyContent="space-between">
                        {data.map((el, key) => (
                            <MainCard transition="1s" key={key}>
                                <Image width="64px" height="64px" src={el.icon} alt={el.title} />
                                <AppTypography height="72px" size='24px' weight='bolder' color="#f5f5f5">{el.title}</AppTypography>
                                <Link to=''><AppTypography backgroundColor="#292929" color="#C2C2C2" textAlign="center" borderRadius="8px" lineHeight="40px" height="40px" size='16px' weight='normal'>View Store</AppTypography></Link>
                            </MainCard>
                        ))}
                    </Flex>
                </VStack>
            </Flex>
        </Box>
    )
}

export default Partners