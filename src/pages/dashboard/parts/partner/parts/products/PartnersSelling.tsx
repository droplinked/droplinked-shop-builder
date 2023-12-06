import { Flex } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/common/image/AppImage'
import React from 'react'

function PartnersSelling() {
    return (
        <Flex>
            <AppImage src={faker.image.image()} width="48px" height="48px" borderRadius="100%" boxShadow="-3px 0px 10px 0px rgba(0, 0, 0, 0.25)" />
            <AppImage src={faker.image.image()} width="48px" height="48px" borderRadius="100%" boxShadow="-3px 0px 10px 0px rgba(0, 0, 0, 0.25)" marginLeft="-15px" />
            <AppImage src={faker.image.image()} width="48px" height="48px" borderRadius="100%" boxShadow="-3px 0px 10px 0px rgba(0, 0, 0, 0.25)" marginLeft="-15px" />
            <AppImage src={faker.image.image()} width="48px" height="48px" borderRadius="100%" boxShadow="-3px 0px 10px 0px rgba(0, 0, 0, 0.25)" marginLeft="-15px" />
            <AppImage src={faker.image.image()} width="48px" height="48px" borderRadius="100%" boxShadow="-3px 0px 10px 0px rgba(0, 0, 0, 0.25)" marginLeft="-15px" />
        </Flex>
    )
}

export default PartnersSelling