import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppCard from 'components/shared/card/AppCard'
import React from 'react'
import AffiliateProduct from '../parts/product/AffiliateProduct'
import ShopsFilter from '../shops/parts/filter/ShopsFilter'

function Shop() {
    return (
        <VStack align={"stretch"}>
            <AppCard>
                <VStack spacing={4}>
                    <Box><Image src={faker.image.avatar()} width="100px" borderRadius={"100%"} /></Box>
                    <Box><Text fontFamily={"aven"} color="#2EC99E" fontSize={"2xl"}>{faker.company.name()}</Text></Box>
                    <Box><Text color="#FFF" fontSize={"1xl"}>{faker.company.catchPhrase()}</Text></Box>
                </VStack>
            </AppCard>

            <AppCard>
                <VStack paddingBottom={10} spacing={16} align={"stretch"}>
                    <Box><ShopsFilter /></Box>
                    <Flex flexWrap={"wrap"} gap="2%" rowGap={7}>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, key) => (
                            <Box width={["23.5%","15%"]}>
                                <AffiliateProduct key={key} image={faker.image.image()} title={faker.commerce.productName()} />
                            </Box>
                        ))}
                    </Flex>
                </VStack>
            </AppCard>
        </VStack>
    )
}

export default Shop