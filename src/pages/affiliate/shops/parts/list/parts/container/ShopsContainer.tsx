import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ShopsMore from './parts/more/ShopsMore'
import ShopsProfile from '../../../../../parts/pofile/ShopsProfile'
import ShopsProduct from './parts/products/ShopsProduct'
import { faker } from '@faker-js/faker'
import { shopsContainerContext } from './context'

interface Iprops {
    shop: any
}

function ShopsContainer({ shop }: Iprops) {
    return (
        <shopsContainerContext.Provider value={{ shop }}>
            <Flex gap={[3, 5]} borderTop={"1px solid #262626"} padding={"25px 0"}>
                <Box width={"17%"} paddingRight={[3, 10]} borderRight={"1px solid #262626"}>
                    <ShopsProfile
                        avatar={shop?.logo}
                        title={shop?.name}
                        desciption={shop?.description}
                        shopname={shop?.name}
                    />
                </Box>
                <Box width={"68%"}><ShopsProduct /></Box>
                <Box width={"15%"}><ShopsMore /></Box>
            </Flex>
        </shopsContainerContext.Provider>
    )
}

export default ShopsContainer