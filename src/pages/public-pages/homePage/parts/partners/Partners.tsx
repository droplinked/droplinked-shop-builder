import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainCard from '../parts/card/MainCard'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'

function Partners({ loaded }) {
    const data = [
        {
            title: 'Unstoppable Domains',
            url: 'https://shop.unstoppabledomains.com/',
            icon: '/assets/images/homepage/uns.svg'
        },
        {
            title: 'Casper Punks',
            url: 'https://shop.casperpunks.io/',
            icon: '/assets/images/homepage/casper.svg'
        },
        {
            title: 'Skale',
            url: 'https://droplinked.io/skale',
            icon: '/assets/images/homepage/skale.svg'
        },
        {
            title: 'Polygon',
            url: 'https://droplinked.io/polygon',
            icon: '/assets/images/homepage/polygan.svg'
        }
    ]

    const checkLoad = useMemo(() => loaded.includes('partners'), [loaded])

    return (
        <Flex alignItems="center" justifyContent="center" height="100%">
            <Box position="relative">
                <Image src="assets/images/homepage/shape.svg" position="absolute" zIndex="1" right="42%" top="-90px" width={{ base: "24px", md: "34px" }} />
                <Flex justifyContent="center" alignItems="center">
                    <VStack width="95%" maxWidth={checkLoad ? "1400px" : "100%"} opacity={checkLoad ? 1 : 0} transition={".7s"} justifyContent="center" color="#FFF">
                        <Box><LandingTitle title='Partners' /></Box>
                        <Box padding="10px 0 30px 0"><LandingDescription text='Explore the network of collaborators taking commerce to the next level!' /></Box>
                        <Flex width="100%" flexWrap={{ base: "wrap", md: "nowrap" }} transition=".7s" justifyContent="center" gap={{ base: "4%", md: checkLoad ? "40px" : "70px", xl: checkLoad ? "64px" : "130px" }}>
                            {data.map((el, key) => (
                                <MainCard transition="1s" padding={{ base: "25px", lg: "40px" }} key={key}>
                                    <Image width={{ base: "36px", md: "64px" }} paddingBottom="10px" src={el.icon} alt={el.title} />
                                    <AppTypography height={{ base: "42px", sm: "30px", md: "40px", lg: "72px" }} size={{ base: "14px", sm: "16px", lg: "24px" }} weight='bolder' color="#f5f5f5">{el.title}</AppTypography>
                                    <a href={el.url} target="_blank"><AppTypography backgroundColor="#292929" color="#C2C2C2" textAlign="center" borderRadius="8px" lineHeight="40px" height="40px" size={{ base: '14px', md: '16px' }} weight='normal'>View Store</AppTypography></a>
                                </MainCard>
                            ))}
                        </Flex>
                    </VStack>
                </Flex >
            </Box >
        </Flex>
    )
}

export default Partners