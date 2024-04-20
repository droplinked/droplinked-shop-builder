import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import PartnersSlider from './parts/slider/PartnersSlider'

function Partners() {
    return (
        <Flex direction={"column"} alignItems="center" justifyContent="center">
            <LandingTitle title='Partners' />
            <Box padding="10px 0 30px 0"><LandingDescription text='Explore the network of collaborators taking commerce to the next level!' /></Box>
            <PartnersSlider />
        </Flex>
    )
}

export default Partners