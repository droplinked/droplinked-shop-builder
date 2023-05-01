import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ShopsMore from './parts/more/ShopsMore'
import ShopsProfile from '../../../../../parts/pofile/ShopsProfile'
import ShopsProduct from './parts/products/ShopsProduct'
import { faker } from '@faker-js/faker'

function ShopsContainer() {
    return (
        <Flex gap={5} borderTop={"1px solid #262626"} padding={"25px 0"}>
            <Box width={"17%"} paddingRight={10} borderRight={"1px solid #262626"}>
                <ShopsProfile
                    avatar={faker.image.avatar()}
                    title={faker.commerce.productName()}
                    desciption={faker.commerce.productDescription()}
                />
            </Box>
            <Box width={"68%"}><ShopsProduct /></Box>
            <Box width={"15%"}><ShopsMore /></Box>
        </Flex>
    )
}

export default ShopsContainer