import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainCard from '../parts/card/MainCard'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import PartnersSlider from './parts/PartnersSlider'

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
        <Flex direction={"column"} alignItems="center" justifyContent="center" height="100%">
            <LandingTitle title='Partners' />
            <Box padding="10px 0 30px 0"><LandingDescription text='Explore the network of collaborators taking commerce to the next level!' /></Box>
            <PartnersSlider />
        </Flex>
    )
}

export default Partners