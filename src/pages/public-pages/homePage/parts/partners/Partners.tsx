import { Flex } from '@chakra-ui/react'
import React from 'react'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import PartnersSlider from './parts/slider/PartnersSlider'

function Partners() {
    return (
        <Flex direction={"column"} gap={5}>
            <LandingTitle title='Partners' />
            <LandingDescription text='Explore the network of collaborators taking commerce to the next level!' />
            <PartnersSlider />
        </Flex>
    )
}

export default Partners