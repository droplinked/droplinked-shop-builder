import { Flex } from '@chakra-ui/react'
import React from 'react'
import LandingDescription from '../parts/description/LandingDescription'
import LandingTitle from '../parts/title/LandingTitle'
import PartnersSlider from './parts/slider/PartnersSlider'

function Partners() {
    return (
        <Flex maxWidth={"100%"} direction={"column"} gap={4}>
            <Flex direction={"column"} gap={2}>
                <LandingTitle title='Partners' />
                <LandingDescription text='Explore the network of collaborators taking commerce to the next level!' />
            </Flex>
            <PartnersSlider />
        </Flex>
    )
}

export default Partners