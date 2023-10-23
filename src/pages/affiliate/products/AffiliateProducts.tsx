import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import { ShopRecordedService } from 'lib/apis/shop/shopServices'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import AffiliateProduct from '../parts/product/AffiliateProduct'

function AffiliateProducts() {
    const { data, mutate } = useMutation(() => ShopRecordedService())

    useEffect(() => {
        mutate()
    }, [])    

    return (
        <AppCard>
            <VStack align={"stretch"} spacing={7}>
                <Box></Box>
                <SimpleGrid columns={5}>
                    {data?.data?.data && data?.data?.data?.data.map((el, key) => (
                        <AffiliateProduct key={key} image={el.products[0].media.find(image => image.isMain === "true")?.thumbnail} link='' shop={{ icon: el.logo, name: el.name }} />
                    ))}
                </SimpleGrid>
            </VStack>
        </AppCard>
    )
}

export default AffiliateProducts